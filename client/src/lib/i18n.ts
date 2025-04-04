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
      order: ['localStorage', 'querystring', 'navigator', 'htmlTag', 'path', 'subdomain'],
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
    debug: true, // Add debug mode to see what's happening
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

// Add our geo location detector
i18n.services.languageDetector.addDetector(geoLocationDetector);

// Set initial language based on user's preferences and location
(async () => {
  try {
    // Check if user has explicitly selected a language before
    const userSelected = localStorage.getItem('userSelectedLanguage') === 'true';
    const savedLanguage = localStorage.getItem('i18nextLng');
    
    // If user has explicitly selected a language and it's a valid option, use it
    if (userSelected && savedLanguage && ['en', 'ko', 'zh', 'ru'].includes(savedLanguage)) {
      i18n.changeLanguage(savedLanguage);
      console.log('Using user-selected language:', savedLanguage);
    } 
    // If we have a previously saved language that's valid, use it
    else if (savedLanguage && ['en', 'ko', 'zh', 'ru'].includes(savedLanguage)) {
      i18n.changeLanguage(savedLanguage);
      console.log('Using previously saved language:', savedLanguage);
    } 
    // Otherwise, try to detect the preferred language based on location
    else {
      const preferredLanguage = await getPreferredLanguage();
      i18n.changeLanguage(preferredLanguage);
      console.log('Using geo-detected language:', preferredLanguage);
    }
  } catch (error) {
    console.error('Failed to set initial language:', error);
    // If all else fails, use English
    i18n.changeLanguage('en');
  }
})();

export default i18n;