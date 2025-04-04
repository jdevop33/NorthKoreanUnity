import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { getPreferredLanguage } from './locationService';

// Define language resource files
import enTranslation from '../locales/en.json';
import koTranslation from '../locales/ko.json';
import zhTranslation from '../locales/zh.json';
import ruTranslation from '../locales/ru.json';

// Define custom language detector that uses our location service
const geoLocationDetector = {
  name: 'geoLocationDetector',
  async lookup() {
    try {
      // Get preferred language based on country detection
      const language = await getPreferredLanguage();
      return language;
    } catch (error) {
      console.error('Error in language detection:', error);
      return 'en'; // Default to English on error
    }
  },
  cacheUserLanguage(lng: string) {
    localStorage.setItem('i18nextLng', lng);
  }
};

// Initialize i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      order: ['querystring', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      lookupQuerystring: 'lng',
      lookupLocalStorage: 'i18nextLng',
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,
      caches: ['localStorage'],
    },
    resources: {
      en: { translation: enTranslation },
      ko: { translation: koTranslation },
      zh: { translation: zhTranslation },
      ru: { translation: ruTranslation },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

// Add our geo location detector
i18n.services.languageDetector.addDetector(geoLocationDetector);

// Set initial language based on user's location
(async () => {
  try {
    const preferredLanguage = await getPreferredLanguage();
    const savedLanguage = localStorage.getItem('i18nextLng');
    
    // Only set language if user hasn't manually chosen one
    if (!savedLanguage || savedLanguage === 'en') {
      i18n.changeLanguage(preferredLanguage);
    }
  } catch (error) {
    console.error('Failed to set initial language:', error);
  }
})();

export default i18n;