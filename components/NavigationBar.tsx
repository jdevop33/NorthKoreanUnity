"use client";

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { Menu, X } from 'lucide-react'; // Import icons

import { LanguageSwitcher } from '@/components/LanguageSwitcher'; // Use updated alias
import jucheEmblem from '@/assets/juche_emblem.svg'; // Use updated alias
import { cn } from '@/lib/utils'; // Assuming cn utility exists

// Named export
export function NavigationBar() {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false); // Close menu on mobile after clicking link
    }
  };

  const navLinks = [
    { id: 'cultural-heritage', labelKey: 'navigation.heritage' },
    { id: 'architecture', labelKey: 'heritage.categories.architecture' },
    { id: 'traditions', labelKey: 'heritage.categories.ceremonies' }, // Assuming label key was ceremonies based on original code
    { id: 'modern-achievements', labelKey: 'navigation.achievements' },
  ];

  return (
    <nav className="bg-warm-gray-dark py-3 sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo and Home link */}
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setMobileMenuOpen(false);
            }} 
            className="flex items-center space-x-2 group shrink-0"
          >
            <Image 
              src={jucheEmblem} // Keep using imported SVG
              alt="Juche Emblem Logo" 
              width={36} // Provide appropriate size
              height={36}
              className="rounded-full transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-white font-serif-kr font-medium text-lg group-hover:text-accent-gold transition-colors duration-200">
              {t('navigation.home', 'Home')}
            </span>
          </a>
          
          {/* Desktop Navigation Menu */}
          <div className="hidden md:flex items-center justify-end grow ml-6">
            <div className="flex-1 flex items-center justify-evenly max-w-2xl">
              {navLinks.map((link) => (
                <a 
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.id);
                  }}
                  className="text-white hover:text-accent-gold transition-colors duration-200 font-medium text-center whitespace-nowrap px-1 lg:px-3"
                >
                  {t(link.labelKey)}
                </a>
              ))}
            </div>
            
            <div className="flex items-center ml-4 lg:ml-6 shrink-0">
              <a 
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
                className="bg-primary-red text-white px-3 lg:px-5 py-2 rounded-md hover:bg-primary-red/90 transition-colors duration-200 font-medium shadow-md mr-2 lg:mr-4 whitespace-nowrap"
              >
                {t('navigation.contact', 'Contact')}
              </a>
              <LanguageSwitcher />
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              className="text-white focus:outline-none p-2 rounded hover:bg-warm-gray transition-colors duration-200"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? t('navigation.closeMenu', 'Close menu') : t('navigation.openMenu', 'Open menu')}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Using Conditional Rendering more cleanly */}
        <div className={cn(
          "mt-4 bg-warm-gray rounded-md shadow-lg overflow-hidden md:hidden transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "max-h-screen py-3 opacity-100" : "max-h-0 py-0 opacity-0"
        )}>
           {navLinks.map((link) => (
            <a 
              key={`mobile-${link.id}`}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.id);
              }}
              className="block px-6 py-3 text-white hover:bg-warm-gray-dark hover:text-accent-gold font-medium"
            >
              {t(link.labelKey)}
            </a>
          ))}
          <div className="px-6 py-3">
            <a 
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
              className="block w-full text-center bg-primary-red text-white py-3 rounded-md hover:bg-primary-red/90 font-medium"
            >
              {t('navigation.contact', 'Contact')}
            </a>
          </div>
          <div className="px-6 py-3 text-white">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
