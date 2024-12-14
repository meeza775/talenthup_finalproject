export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-vercel-api-url.vercel.app/api'
  : 'http://localhost:3000/api';

export const IMAGE_PLACEHOLDER = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';

export const CATEGORIES = [
  'All',
  'Pizza',
  'Burgers',
  'Sushi',
  'Pasta',
  'Salads',
  'Desserts'
] as const;