export const isValidUrl = (url?: string): boolean => {
    if (!url) return false;
    
    // Lista de valores no válidos comunes en Reddit
    const invalidValues = [
      'self', 'default', 'image', 
      'nsfw', 'spoiler', 'default',
      'self', ''
    ];
    
    if (invalidValues.includes(url)) return false;
    
    try {
      // Intenta crear un objeto URL
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };