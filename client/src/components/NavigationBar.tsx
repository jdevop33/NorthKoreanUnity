import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import jucheEmblem from '../assets/juche_emblem.svg';
import LanguageSwitcher from './LanguageSwitcher';

export default function NavigationBar() {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="bg-warm-gray-dark py-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo and Home link */}
          <a href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
            className="flex items-center space-x-1 group shrink-0"
          >
            <img 
              src={jucheEmblem}
              alt="Juche Emblem" 
              className="h-10 w-10 rounded-full transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-white font-serif-kr font-medium text-lg ml-2 group-hover:text-accent-gold transition-colors duration-200">
              {t('navigation.home')}
            </span>
          </a>
          
          {/* Desktop Navigation Menu */}
          <div className="hidden md:flex items-center justify-end flex-grow ml-6">
            <div className="flex-1 flex items-center justify-evenly max-w-2xl">
              <a href="#cultural-heritage" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('cultural-heritage');
                }}
                className="text-white hover:text-accent-gold transition-colors duration-200 font-medium text-center whitespace-nowrap px-1 lg:px-3"
              >
                {t('navigation.heritage')}
              </a>
              <a href="#architecture" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('architecture');
                }}
                className="text-white hover:text-accent-gold transition-colors duration-200 font-medium text-center whitespace-nowrap px-1 lg:px-3"
              >
                {t('heritage.categories.architecture')}
              </a>
              <a href="#traditions" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('traditions');
                }}
                className="text-white hover:text-accent-gold transition-colors duration-200 font-medium text-center whitespace-nowrap px-1 lg:px-3"
              >
                {t('heritage.categories.ceremonies')}
              </a>
              <a href="#modern-achievements" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('modern-achievements');
                }}
                className="text-white hover:text-accent-gold transition-colors duration-200 font-medium text-center whitespace-nowrap px-1 lg:px-3"
              >
                {t('navigation.achievements')}
              </a>
            </div>
            
            <div className="flex items-center ml-4 lg:ml-6 flex-shrink-0">
              <a href="#contact" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
                className="bg-primary-red text-white px-3 lg:px-5 py-2 rounded-md hover:bg-primary-red/90 transition-colors duration-200 font-medium shadow-md mr-2 lg:mr-4 whitespace-nowrap"
              >
                {t('navigation.contact')}
              </a>
              <LanguageSwitcher />
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              className="text-white focus:outline-none p-2 rounded hover:bg-warm-gray transition-colors duration-200"
              onClick={toggleMobileMenu}
              aria-label="메뉴 열기"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mt-4 bg-warm-gray rounded-md shadow-lg py-3 md:hidden">
            <a href="#cultural-heritage" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('cultural-heritage');
              }}
              className="block px-6 py-3 text-white hover:bg-warm-gray-dark hover:text-accent-gold font-medium"
            >
              {t('navigation.heritage')}
            </a>
            <a href="#architecture" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('architecture');
              }}
              className="block px-6 py-3 text-white hover:bg-warm-gray-dark hover:text-accent-gold font-medium"
            >
              {t('heritage.categories.architecture')}
            </a>
            <a href="#traditions" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('traditions');
              }}
              className="block px-6 py-3 text-white hover:bg-warm-gray-dark hover:text-accent-gold font-medium"
            >
              {t('heritage.categories.ceremonies')}
            </a>
            <a href="#modern-achievements" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('modern-achievements');
              }}
              className="block px-6 py-3 text-white hover:bg-warm-gray-dark hover:text-accent-gold font-medium"
            >
              {t('navigation.achievements')}
            </a>
            <div className="px-6 py-3">
              <a href="#contact" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
                className="block w-full text-center bg-primary-red text-white py-3 rounded-md hover:bg-primary-red/90 font-medium"
              >
                {t('navigation.contact')}
              </a>
            </div>
            <div className="px-6 py-3 text-white">
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
