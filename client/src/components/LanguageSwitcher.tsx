import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';

// Flag icons for various languages
const LanguageFlags = {
  en: "🇺🇸", // USA flag for English
  ko: "🇰🇵", // North Korea flag for Korean
  zh: "🇨🇳", // China flag for Chinese
  ru: "🇷🇺", // Russia flag for Russian
};

type LanguageOption = {
  code: string;
  name: string;
};

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  const currentLanguage = i18n.language || 'en';
  
  const languageOptions: LanguageOption[] = [
    { code: 'en', name: 'English' },
    { code: 'ko', name: '한국어' }, // Korean
    { code: 'zh', name: '中文' },   // Chinese
    { code: 'ru', name: 'Русский' } // Russian
  ];

  const handleLanguageChange = (languageCode: string) => {
    // Don't do anything if clicking the already selected language
    if (languageCode === currentLanguage) {
      setIsOpen(false);
      return;
    }
    
    console.log(`Changing language to: ${languageCode}`);
    i18n.changeLanguage(languageCode);
    
    // Store user's explicit language selection
    localStorage.setItem('i18nextLng', languageCode);
    localStorage.setItem('userSelectedLanguage', 'true');
    
    // Force a re-render by setting a timestamp in localStorage
    localStorage.setItem('languageTimestamp', Date.now().toString());
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-background/50 backdrop-blur-xs border-border/50 text-primary flex gap-2 items-center px-3 py-1 h-8"
          >
            <span>{LanguageFlags[currentLanguage as keyof typeof LanguageFlags]}</span>
            <span className="font-medium">{
              languageOptions.find(lang => lang.code === currentLanguage)?.name || 'English'
            }</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[180px] bg-background/95 backdrop-blur-md">
          {languageOptions.map((language) => (
            <DropdownMenuItem
              key={language.code}
              className={`flex items-center gap-2 cursor-pointer ${
                currentLanguage === language.code ? 'bg-primary/10 font-medium' : ''
              }`}
              onClick={() => handleLanguageChange(language.code)}
            >
              <span>{LanguageFlags[language.code as keyof typeof LanguageFlags]}</span>
              <span>{language.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}