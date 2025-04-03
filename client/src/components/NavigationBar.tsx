import { useState } from 'react';

export default function NavigationBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-warm-gray py-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <img 
              src="https://images.unsplash.com/photo-1588065394015-68bf7e40738d?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&h=64&q=80" 
              alt="Emblem" 
              className="h-10 w-10 rounded-full"
            />
            <span className="text-white font-serif-kr font-medium text-lg ml-2">조선 문화</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#cultural-heritage" className="text-white hover:text-accent-gold transition-colors duration-200">문화유산</a>
            <a href="#architecture" className="text-white hover:text-accent-gold transition-colors duration-200">건축</a>
            <a href="#traditions" className="text-white hover:text-accent-gold transition-colors duration-200">전통</a>
            <a href="#modern-achievements" className="text-white hover:text-accent-gold transition-colors duration-200">현대적 성과</a>
            <a href="#prompt-templates" className="text-white hover:text-accent-gold transition-colors duration-200">프롬프트 템플릿</a>
          </div>
          
          <div className="md:hidden">
            <button 
              className="text-white focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mt-4 bg-warm-gray rounded-md shadow-lg py-2 md:hidden">
            <a href="#cultural-heritage" 
              className="block px-4 py-2 text-white hover:bg-gray-700 hover:text-accent-gold"
              onClick={() => setMobileMenuOpen(false)}
            >
              문화유산
            </a>
            <a href="#architecture" 
              className="block px-4 py-2 text-white hover:bg-gray-700 hover:text-accent-gold"
              onClick={() => setMobileMenuOpen(false)}
            >
              건축
            </a>
            <a href="#traditions" 
              className="block px-4 py-2 text-white hover:bg-gray-700 hover:text-accent-gold"
              onClick={() => setMobileMenuOpen(false)}
            >
              전통
            </a>
            <a href="#modern-achievements" 
              className="block px-4 py-2 text-white hover:bg-gray-700 hover:text-accent-gold"
              onClick={() => setMobileMenuOpen(false)}
            >
              현대적 성과
            </a>
            <a href="#prompt-templates" 
              className="block px-4 py-2 text-white hover:bg-gray-700 hover:text-accent-gold"
              onClick={() => setMobileMenuOpen(false)}
            >
              프롬프트 템플릿
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
