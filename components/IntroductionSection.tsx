"use client"; 

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { ArrowRight, ChevronDown, ArrowDown } from 'lucide-react';

// Update path for image served from public dir
const traditionalCeremony = '/assets/traditional_ceremony.svg'; 
import { cn } from '@/lib/utils';
import { useScrollThreshold } from '@/hooks/use-scroll-threshold'; 

export function IntroductionSection() {
  const { t } = useTranslation();
  const isScrolled = useScrollThreshold(100);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative mb-16 pb-12 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0 bg-warm-gray-dark">
          <div className="w-full h-full absolute top-0 left-0 bg-opacity-20 bg-pattern"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 pt-16 pb-20 text-center">
          {/* Title */}
          <h1 className={cn(
            "font-serif-kr text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight",
            "text-shadow-lg text-white"
          )}>
            {t('intro.title')}
          </h1>
          {/* Subtitle with background */}
          <div className="inline-block px-6 py-3 rounded-xl bg-black/40">
            <p className="text-lg md:text-xl font-medium text-white max-w-3xl mx-auto leading-relaxed">
              {t('intro.subtitle')}
            </p>
          </div>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
            <a href="#cultural-heritage" 
               onClick={(e) => { e.preventDefault(); scrollToSection('cultural-heritage'); }}
               className="btn-primary px-6 py-3 font-medium text-base transition-transform hover:scale-105 inline-flex items-center shadow-lg">
              {t('intro.exploreButton')}
              <ArrowDown className="h-5 w-5 ml-2" />
            </a>
            <a href="#prompt-templates" 
               onClick={(e) => { e.preventDefault(); scrollToSection('prompt-templates'); }}
               className="btn-secondary px-6 py-3 font-medium text-base shadow-lg">
              {t('intro.promptsButton')}
            </a>
          </div>
        </div>
        
        {/* Scroll down indicator */}
        <div className={cn(
          "absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-500",
          isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100' 
        )}>
          <div className="animate-bounce text-white flex flex-col items-center bg-black/30 px-3 py-2 rounded-full shadow-lg">
            <ChevronDown className="h-6 w-6 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]" />
            <span className="text-sm mt-1 font-medium drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
              {t('intro.scrollDown')}
            </span>
          </div>
        </div>
      </section>
      
      {/* Introduction Content Section */}
      <section id="introduction-content" className="mb-16 max-w-6xl mx-auto px-4 scroll-mt-20"> 
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Text Content */}
          <div className="md:w-1/2">
            <div className="section-title"> 
              <h2>{t('intro.contentTitle')}</h2>
              <p>{t('intro.contentSubtitle')}</p>
            </div>
            
            <p className="mb-4 leading-relaxed text-text-primary">
              {t('intro.paragraph1')}
            </p>
            <p className="mb-6 leading-relaxed text-text-primary">
              {t('intro.paragraph2')}
            </p>
            <div className="mt-6">
              <a href="#cultural-heritage" 
                 onClick={(e) => { e.preventDefault(); scrollToSection('cultural-heritage'); }}
                 className="btn btn-primary inline-flex items-center group">
                {t('intro.learnMoreButton')}
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
          {/* Image Content */} 
          <div className="md:w-1/2">
            <div className="rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
              <Image 
                src={traditionalCeremony} // Use path relative to public
                alt={t('intro.imageAlt')}
                width={600} 
                height={400} 
                className="w-full h-auto object-cover"
                unoptimized={traditionalCeremony.endsWith('.svg')} // Recommend unoptimized for SVGs
              />
            </div>
            <p className="text-sm text-center mt-3 text-text-secondary">
              {t('intro.imageCaption')}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
