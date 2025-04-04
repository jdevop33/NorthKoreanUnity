"use client";

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils'; // Assuming cn utility

// Flag icons map (as per guidelines, avoid enums)
const LANGUAGE_FLAGS = {
  en: "🇺🇸", // USA flag for English
  ko: "🇰🇵", // North Korea flag for Korean
  zh: "🇨🇳", // China flag for Chinese
  ru: "🇷🇺", // Russia flag for Russian
};

interface LanguageOption {
  code: string;
  name: string;
}

const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'en', name: 'English' },
  { code: 'ko', name: '한국어' }, // Korean
  { code: 'zh', name: '中文' },   // Chinese
  { code: 'ru', name: 'Русский' } // Russian
];

// Named export
export function LanguageSwitcher() {
  const { i18n } = useTranslation(); // Removed unused t
  const [isOpen, setIsOpen] = useState(false);
  
  // Ensure a fallback if i18n.language is somehow undefined initially
  const currentLanguage = i18n.language || 'en'; 
  
  const handleLanguageChange = (languageCode: string) => {
    if (languageCode === currentLanguage) {
      setIsOpen(false);
      return;
    }
    
    console.log(`Changing language to: ${languageCode}`);
    i18n.changeLanguage(languageCode);
    
    // Store user's explicit language selection in localStorage
    // Note: localStorage is only available client-side
    localStorage.setItem('i18nextLng', languageCode);
    localStorage.setItem('userSelectedLanguage', 'true');
    
    // This timestamp might be a workaround; i18n context should ideally trigger updates.
    // Keep for now, but review i18n setup if issues persist.
    localStorage.setItem('languageTimestamp', Date.now().toString());

    setIsOpen(false);
  };

  const currentLanguageName = LANGUAGE_OPTIONS.find(lang => lang.code === currentLanguage)?.name || 'English';
  const currentLanguageFlag = LANGUAGE_FLAGS[currentLanguage as keyof typeof LANGUAGE_FLAGS] || LANGUAGE_FLAGS.en;

  return (
    <div className="relative">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex h-8 items-center gap-2 border-border/50 bg-background/50 px-3 py-1 backdrop-blur-xs"
            aria-label={`Change language, current language: ${currentLanguageName}`}
          >
            <span aria-hidden="true">{currentLanguageFlag}</span>
            <span className="font-medium">{currentLanguageName}</span>
            {/* Add chevron or indicator for dropdown */}
            {/* <ChevronDown className="ml-1 h-4 w-4 opacity-50" /> */}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[180px] bg-background/95 backdrop-blur-md">
          {LANGUAGE_OPTIONS.map((language) => (
            <DropdownMenuItem
              key={language.code}
              className={cn(
                "flex cursor-pointer items-center gap-2",
                currentLanguage === language.code && "bg-primary/10 font-medium" // Use primary color from theme for selection
              )}
              onClick={() => handleLanguageChange(language.code)}
              aria-current={currentLanguage === language.code ? 'true' : undefined}
            >
              <span aria-hidden="true">{LANGUAGE_FLAGS[language.code as keyof typeof LANGUAGE_FLAGS]}</span>
              <span>{language.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
