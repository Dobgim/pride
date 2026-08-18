import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dwuvippcaswkhflcqddf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3dXZpcHBjYXN3a2hmbGNxZGRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwODk2NDQsImV4cCI6MjEwMjY2NTY0NH0.MBSfyitlZis8ivKhYAaEbmKGWJJiPj7bZxHumuNdGhs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
