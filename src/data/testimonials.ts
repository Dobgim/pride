export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  product: string;
  avatar: string;
  date: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Margaret S.',
    location: 'Edinburgh, Scotland',
    rating: 5,
    text: 'My FoldPro Ultra has completely changed my life. I can get out shopping, visit family, and enjoy the park again. The customer service team were incredibly helpful when I needed advice on which model to choose.',
    product: 'FoldPro Ultra',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
    date: 'March 2025',
  },
  {
    id: 't2',
    name: 'Robert K.',
    location: 'Manchester, England',
    rating: 5,
    text: 'Excellent quality and superb build. The RoadMaster 8 handles our local country lanes with ease. The battery lasts all day which was my main concern. Delivery was fast and the setup guide was very clear.',
    product: 'RoadMaster 8',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    date: 'April 2025',
  },
  {
    id: 't3',
    name: 'Patricia W.',
    location: 'Cardiff, Wales',
    rating: 5,
    text: 'I was nervous about buying online but the team walked me through every option. My SlimLine 3 Plus fits perfectly in my car boot and folds in seconds. Honestly could not be happier with my purchase.',
    product: 'SlimLine 3 Plus',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    date: 'February 2025',
  },
  {
    id: 't4',
    name: 'David T.',
    location: 'Birmingham, England',
    rating: 4,
    text: 'The TravelLite 4 is excellent value for money. Very sturdy, comfortable seat, and the controls are intuitive. My wife and I both use it when we visit the garden centre. Great product overall.',
    product: 'TravelLite 4',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    date: 'January 2025',
  },
  {
    id: 't5',
    name: 'Susan A.',
    location: 'Bristol, England',
    rating: 5,
    text: 'The after-sales support is second to none. When I had a small issue with my charger, they sent a replacement the very next day. The CrossCountry 6+ is amazing — I take it on the coastal path regularly.',
    product: 'CrossCountry 6+',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
    date: 'May 2025',
  },
  {
    id: 't6',
    name: 'Brian M.',
    location: 'Leeds, England',
    rating: 5,
    text: 'Ordered the accessories bundle with my scooter and everything arrived perfectly packaged. The comfort seat cushion is a game changer for longer rides. Highly recommend this company.',
    product: 'FoldPro Ultra + Accessories',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&q=80',
    date: 'June 2025',
  },
];
