import { useState } from 'react';
import jucheEmblem from '../assets/juche_emblem.svg';

export default function NavigationBar() {
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
    <nav className="bg-warm-gray py-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <a href="#" onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} className="flex items-center space-x-1 group">
            <img 
              src={jucheEmblem}
              alt="주체 휘장" 
              className="h-10 w-10 rounded-full transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-text-light font-serif-kr font-medium text-lg ml-2 group-hover:text-accent-gold transition-colors duration-200">조선 문화</span>
          </a>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#cultural-heritage" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('cultural-heritage');
              }}
              className="text-text-light hover:text-accent-gold transition-colors duration-200 font-medium"
            >
              문화유산
            </a>
            <a href="#architecture" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('architecture');
              }}
              className="text-text-light hover:text-accent-gold transition-colors duration-200 font-medium"
            >
              건축
            </a>
            <a href="#traditions" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('traditions');
              }}
              className="text-text-light hover:text-accent-gold transition-colors duration-200 font-medium"
            >
              전통
            </a>
            <a href="#modern-achievements" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('modern-achievements');
              }}
              className="text-text-light hover:text-accent-gold transition-colors duration-200 font-medium"
            >
              현대적 성과
            </a>
            <a href="#prompt-templates" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('prompt-templates');
              }}
              className="text-text-light hover:text-accent-gold transition-colors duration-200 font-medium"
            >
              프롬프트 템플릿
            </a>
          </div>
          
          <div className="md:hidden">
            <button 
              className="text-text-light focus:outline-none p-2 rounded hover:bg-warm-gray-light transition-colors duration-200"
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
          <div className="mt-4 bg-warm-gray-light rounded-md shadow-lg py-2 md:hidden">
            <a href="#cultural-heritage" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('cultural-heritage');
              }}
              className="block px-4 py-2 text-text-light hover:bg-warm-gray hover:text-accent-gold font-medium"
            >
              문화유산
            </a>
            <a href="#architecture" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('architecture');
              }}
              className="block px-4 py-2 text-text-light hover:bg-warm-gray hover:text-accent-gold font-medium"
            >
              건축
            </a>
            <a href="#traditions" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('traditions');
              }}
              className="block px-4 py-2 text-text-light hover:bg-warm-gray hover:text-accent-gold font-medium"
            >
              전통
            </a>
            <a href="#modern-achievements" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('modern-achievements');
              }}
              className="block px-4 py-2 text-text-light hover:bg-warm-gray hover:text-accent-gold font-medium"
            >
              현대적 성과
            </a>
            <a href="#prompt-templates" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('prompt-templates');
              }}
              className="block px-4 py-2 text-text-light hover:bg-warm-gray hover:text-accent-gold font-medium"
            >
              프롬프트 템플릿
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
