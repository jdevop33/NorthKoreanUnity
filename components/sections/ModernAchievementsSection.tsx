"use client"; // Required for observer hook and translation

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import { achievements } from '@/lib/data'; // Data import
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { cn } from '@/lib/utils';

// Define path for image served from public dir
const pyongyangCityscape = '/assets/pyongyang_cityscape.svg';

// Named export
export function ModernAchievementsSection() {
  const { t } = useTranslation();
  
  // Use the intersection observer hook for the whole section
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  // Client-side scroll function for links (if any were added, currently only href)
  // const scrollToSection = (sectionId: string) => { ... };

  return (
    // Added scroll-mt-16 and ref
    <section id="modern-achievements" className="mb-20 pt-12 scroll-mt-16" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Title */}
        <div className="section-title">
          <h2>{t('achievements.title')}</h2>
          <p>{t('achievements.subtitle')}</p>
        </div>
        
        {/* Achievements Grid Section */}
        <div className={cn(
          "bg-content-bg-off p-8 rounded-lg shadow-md mb-12 transition-opacity duration-1000 ease-in",
          isVisible ? 'opacity-100' : 'opacity-0'
        )}
             style={{ transitionDelay: '0.2s' }}>
          <p className="mb-8 leading-relaxed text-lg text-text-primary">
            {t('achievements.description')}
          </p>
          
          {/* Grid Container - apply slide-up based on isVisible */}
          <div className={cn(
            "grid grid-cols-1 md:grid-cols-3 gap-6",
            // If slide-up animation desired, apply based on visibility
            // isVisible ? 'animate-slide-up' : 'opacity-0' 
          )}>
            {achievements.map((achievement, index) => (
              <div 
                key={achievement.id || index} // Use stable ID from data
                className={cn(
                  "card group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1",
                  // Stagger animation based on visibility
                  isVisible ? 'animate-slide-up' : 'opacity-0' // Assuming animate-slide-up exists
                )}
                style={{ animationDelay: `${index * 0.15 + 0.3}s` }}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image 
                    src={achievement.image} // Path from data.ts
                    alt={t(`achievements.items.${index}.title`, achievement.title)}
                    width={400} // Example dimensions
                    height={250}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized={achievement.image.endsWith('.svg')} // Unoptimize SVGs
                  />
                  <div className="absolute inset-0 bg-primary-red bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                </div>
                <div className="card-content">
                  <h3 className="font-serif-kr text-xl font-semibold mb-3 text-primary-red">
                    {t(`achievements.items.${index}.title`, achievement.title)}
                  </h3>
                  <p className="text-text-primary">
                    {t(`achievements.items.${index}.description`, achievement.description)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Continuous Progress Section */}
        <div className={cn(
              "relative rounded-lg overflow-hidden shadow-lg transition-opacity duration-1000 ease-in", 
              isVisible ? 'opacity-100' : 'opacity-0'
             )}
             style={{ transitionDelay: '0.6s' }}>
          <Image 
            src={pyongyangCityscape}
            alt={t('achievements.modernDevelopmentAlt', 'Modern Development')}
            fill
            style={{ objectFit: 'cover' }}
            className="w-full h-96" // Set height via className when using fill
            unoptimized // SVG
            quality={75}
          />
          {/* Fixed gradient typo */}
          <div className="absolute inset-0 bg-gradient-to-t from-warm-gray-dark/80 to-transparent flex items-end z-10">
            <div className="p-8 text-white max-w-3xl">
              <h3 className="font-serif-kr text-3xl font-semibold mb-4 text-white text-shadow-sm">
                {t('achievements.continuousProgressTitle', 'Continuous Progress and Innovation')}
              </h3>
              <p className="text-lg mb-6 text-text-light text-shadow-sm">
                {t('achievements.continuousProgressText', '...')}
              </p>
              {/* Button needs scroll logic if #prompt-templates is on the same page */}
              <a href="#prompt-templates" 
                 /* onClick={(e) => { e.preventDefault(); scrollToSection('prompt-templates'); }} */
                 className="btn btn-primary px-6 py-3 inline-flex items-center group">
                {t('achievements.viewPromptTemplates', 'View Prompt Templates')}
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
