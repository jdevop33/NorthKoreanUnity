'use client';

import React, { useEffect, ReactNode } from 'react'; // Import React
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n'; // Import the configured i18n instance
import LanguageDetector from 'i18next-browser-languagedetector';
// Removed unused import: import { getPreferredLanguage } from '@/lib/locationService';

/* 
// Temporarily remove custom async detector due to type incompatibility with sync detector API
const geoLocationDetector = {
  name: 'geoLocationDetector',
  async lookup(options: any) { ... },
  cacheUserLanguage(lng: string, options: any) { ... }
};
*/

interface I18nProviderProps {
  children: ReactNode;
}

// Initialize the standard browser detector
const detector = new LanguageDetector();
// Don't add the custom async detector for now
// detector.addDetector(geoLocationDetector);

export function I18nProvider({ children }: I18nProviderProps) {
  
  useEffect(() => {
    // Add the standard browser language detector plugin
    // We initialize the core i18n instance in lib/i18n.ts
    // Here, we potentially enhance it with client-side detection
    // *after* it has been initialized.
    if (!i18n.isInitialized) {
        console.warn("[I18nProvider] i18n not initialized yet in useEffect. This might indicate an issue.");
        // Attempt init again only if it truly wasn't initialized, focusing on detection
        i18n
          .use(detector) // Use the standard browser detector
          .init({
            ...i18n.options, // Carry over existing config
            detection: { // Add client-side detection options
              order: ['localStorage', 'navigator', 'htmlTag'], // Removed custom detector
              lookupLocalStorage: 'i18nextLng',
              caches: ['localStorage'],
            },
            initImmediate: false, // Ensure this remains false for React
          })
          .then(() => {
             console.log("[I18nProvider] Detection initialized.");
             // Now check localStorage vs current language
             checkAndSetLanguage();
          })
          .catch(err => console.error("[I18nProvider] Error initializing detector:", err));
          
    } else if (i18n.language) { // If already initialized, just check language state
        console.log("[I18nProvider] i18n already initialized. Checking language...");
        checkAndSetLanguage();
    } else {
        // If initialized but no language set, listen for the 'languageChanged' event
        const langChangeHandler = () => {
            console.log("[I18nProvider] Language changed event received. Checking language...");
            checkAndSetLanguage();
            i18n.off('languageChanged', langChangeHandler); // Remove listener after first change
        };
        i18n.on('languageChanged', langChangeHandler);
        // Add a timeout safeguard in case languageChanged doesn't fire
        const timeoutId = setTimeout(() => {
            console.warn("[I18nProvider] Timeout waiting for languageChanged event. Checking language now.");
            checkAndSetLanguage();
            i18n.off('languageChanged', langChangeHandler);
        }, 1000);
        return () => {
             clearTimeout(timeoutId);
             i18n.off('languageChanged', langChangeHandler);
        }
    }

  }, []); // Run only once on mount

  // Function to check localStorage and update i18n language if necessary
  const checkAndSetLanguage = () => {
    try {
        const userSelected = localStorage.getItem('userSelectedLanguage') === 'true';
        const savedLanguage = localStorage.getItem('i18nextLng');
        const currentLang = i18n.language;

        console.log(`[checkAndSetLang] Current: ${currentLang}, Saved: ${savedLanguage}, UserSelected: ${userSelected}`);

        // If user explicitly selected a language before, and it's different from current
        if (userSelected && savedLanguage && savedLanguage !== currentLang && i18n.options.resources?.[savedLanguage]) {
            console.log(`[checkAndSetLang] Applying user-selected language: ${savedLanguage}`);
            i18n.changeLanguage(savedLanguage);
        } 
        // Optional: If *not* user-selected, but was saved (e.g., by detector), and differs
        // else if (!userSelected && savedLanguage && savedLanguage !== currentLang && i18n.options.resources?.[savedLanguage]) {
        //    console.log(`[checkAndSetLang] Applying previously detected/saved language: ${savedLanguage}`);
        //    i18n.changeLanguage(savedLanguage);
        // }
    } catch (error) {
        console.error("[checkAndSetLang] Error accessing localStorage or changing language:", error);
    }
  };


  // The I18nextProvider makes the instance available to useTranslation hooks
  // Add a key prop that changes when language changes to force re-render if needed
  return <I18nextProvider i18n={i18n}><React.Fragment key={i18n.language}>{children}</React.Fragment></I18nextProvider>;
}
