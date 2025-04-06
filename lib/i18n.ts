import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Define language resource files
import enTranslation from '../locales/en.json';
import koTranslation from '../locales/ko.json';
import zhTranslation from '../locales/zh.json';
import ruTranslation from '../locales/ru.json';

// Initialize i18next instance - DO NOT run client-side detection here
i18n
  .use(initReactI18next) // initReactI18next is needed for provider/hooks
  .init({
    resources: {
      en: { translation: enTranslation },
      ko: { translation: koTranslation },
      zh: { translation: zhTranslation },
      ru: { translation: ruTranslation },
    },
    fallbackLng: 'en',
    // Keep debug false for production builds
    // debug: process.env.NODE_ENV === 'development', 
    debug: false,
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    // IMPORTANT: initImmediate must be false when using SSR/suspense
    initImmediate: false,
  });

export default i18n;
