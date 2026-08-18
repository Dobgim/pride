import { supabase } from '../supabaseClient';

/**
 * Media uploads go to Supabase Storage and only the resulting public URL is
 * stored on the product row.
 *
 * The previous approach embedded base64 data URLs directly in the `products`
 * table, so every product listing pulled every image through the REST API and
 * burned egress on each page view. Storage serves these from a CDN instead and
 * does not count against the database egress budget.
 */
export const MEDIA_BUCKET = 'product-images';

/** Build a collision-proof object path, preserving the file extension. */
const objectPath = (file: File, prefix: string) => {
  const ext = (file.name.split('.').pop() || 'bin').toLowerCase().replace(/[^a-z0-9]/g, '');
  const rand = Math.random().toString(36).slice(2, 8);
  return `${prefix}/${Date.now()}-${rand}.${ext}`;
};

/** Upload a Blob/File to the media bucket and return its public URL. */
export async function uploadToStorage(
  file: Blob,
  originalName: string,
  prefix: 'photos' | 'videos'
): Promise<string> {
  const named = new File([file], originalName, { type: file.type || 'application/octet-stream' });
  const path = objectPath(named, prefix);

  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, named, {
    cacheControl: '31536000',
    upsert: false,
  });

  if (error) throw error;

  const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
  if (!data?.publicUrl) throw new Error('Upload succeeded but no public URL was returned.');
  return data.publicUrl;
}

/**
 * Downscale and re-encode an image before upload, so a phone photo does not
 * land in the bucket at full resolution. Returns a JPEG blob.
 */
export function compressToBlob(file: File, maxWidth = 1200, maxHeight = 1200): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read the image file.'));
    reader.onload = (event) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Could not decode the image file.'));
      img.onload = () => {
        let { width, height } = img;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d')?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => (blob ? resolve(blob) : reject(new Error('Image compression failed.'))),
          'image/jpeg',
          0.82
        );
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}
