import traditionalCeremony from '../assets/traditional_ceremony.svg';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function IntroductionSection() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative mb-16 pb-12 overflow-hidden">
        {/* Darker solid background for better contrast */}
        <div className="absolute inset-0 z-0 bg-warm-gray-dark">
          {/* Background with pattern overlay */}
          <div className="w-full h-full absolute top-0 left-0 bg-opacity-20 bg-pattern"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 pt-16 pb-20">
          <div className="text-center mb-8">
            {/* Enhanced text for better readability */}
            <h1 className="font-serif-kr text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight text-shadow-lg">
              <span className="text-white">{t('intro.title')}</span>
            </h1>
            {/* Background highlight for improved contrast */}
            <div className="bg-black bg-opacity-40 inline-block px-6 py-3 rounded-xl">
              <p className="text-lg md:text-xl font-medium text-white max-w-3xl mx-auto leading-relaxed">
                {t('intro.subtitle')}
              </p>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4 mt-8">
            <a href="#cultural-heritage" 
               className="btn-primary px-6 py-3 font-medium text-base transition-transform hover:scale-105 inline-flex items-center shadow-lg">
              {t('intro.exploreButton')}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#prompt-templates" 
               className="btn-secondary px-6 py-3 font-medium text-base shadow-lg">
              {t('intro.promptsButton')}
            </a>
          </div>
        </div>
        
        {/* Scroll down indicator with improved visibility */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 ${scrolled ? 'opacity-0' : 'opacity-100'}`}>
          <div className="animate-bounce text-white flex flex-col items-center bg-black bg-opacity-30 px-3 py-2 rounded-full shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <span className="text-sm mt-1 font-medium drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">{t('intro.scrollDown')}</span>
          </div>
        </div>
      </section>
      
      {/* Introduction Content Section */}
      <section className="mb-16 max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <div className="section-title">
              <h2>{t('intro.contentTitle')}</h2>
              <p>{t('intro.contentSubtitle')}</p>
            </div>
            
            <p className="mb-4 leading-relaxed text-text-primary">
              {t('intro.paragraph1')}
            </p>
            <p className="mb-4 leading-relaxed text-text-primary">
              {t('intro.paragraph2')}
            </p>
            <div className="mt-6">
              <a href="#cultural-heritage" 
                 className="btn btn-primary inline-flex items-center group">
                {t('intro.learnMoreButton')}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
              <img 
                src={traditionalCeremony} 
                alt={t('intro.imageAlt')}
                className="w-full h-80 object-cover"
              />
            </div>
            <p className="text-sm text-center mt-3 text-text-secondary">{t('intro.imageCaption')}</p>
          </div>
        </div>
      </section>
    </>
  );
}
