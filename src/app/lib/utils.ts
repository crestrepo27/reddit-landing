// src/app/lib/utils.ts
export const isValidUrl = (url?: string): boolean => {
  if (!url) return false;
  
  const invalidValues = [
    'self', 'default', 'image', 
    'nsfw', 'spoiler', 'default',
    'self', ''
  ];
  
  if (invalidValues.includes(url)) return false;
  
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};