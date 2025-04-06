/**
 * Service to detect user's country based on IP
 * In a production environment, this would use a proper GeoIP service like:
 * - ipapi.co
 * - ipgeolocation.io
 * - ipstack.com
 */

// Country codes to language mapping
export const countryToLanguage: Record<string, string> = {
  // English speaking countries
  'US': 'en', // United States
  'CA': 'en', // Canada
  'GB': 'en', // United Kingdom
  'AU': 'en', // Australia
  'NZ': 'en', // New Zealand
  
  // Korean speaking countries
  'KR': 'ko', // South Korea
  'KP': 'ko', // North Korea
  
  // Chinese speaking countries/regions
  'CN': 'zh', // China
  'HK': 'zh', // Hong Kong
  'TW': 'zh', // Taiwan
  'SG': 'zh', // Singapore
  
  // Russian speaking countries
  'RU': 'ru', // Russia
  'BY': 'ru', // Belarus
  'KZ': 'ru', // Kazakhstan
};

/**
 * Detects user's country code
 * This is a simplified version for demo purposes
 * In production, this would call a GeoIP API service
 */
export const detectCountry = async (): Promise<string> => {
  try {
    // In a real implementation, you would use an API service like:
    // const response = await fetch('https://ipapi.co/json/');
    // const data = await response.json();
    // return data.country_code;
    
    // For demo, we're using the browser's language as a fallback
    // Get browser language (e.g., 'en-US', 'zh-CN')
    // Removed non-standard (navigator as any).userLanguage fallback
    const browserLang = navigator.language;
    
    // Extract country code from browser language if available
    if (browserLang && browserLang.includes('-')) {
      const countryCode = browserLang.split('-')[1].toUpperCase();
      return countryCode;
    }
    
    // Default to US if we can't determine
    return 'US';
  } catch (error) {
    console.error('Error detecting country:', error);
    return 'US'; // Default fallback
  }
};

/**
 * Get preferred language based on country
 */
export const getPreferredLanguage = async (): Promise<string> => {
  const countryCode = await detectCountry();
  return countryToLanguage[countryCode] || 'en'; // Default to English
};