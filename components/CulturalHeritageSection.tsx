"use client"; // Required for state, observer hook, translation

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import { heritageItems } from '@/lib/data'; // Assuming data structure is correct
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { cn } from '@/lib/utils';

// Named export
export function CulturalHeritageSection() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  // Use the intersection observer hook
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.15 }); // Adjust threshold as needed

  // Hover handlers remain client-side
  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  // Client-side scroll function remains necessary for links
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    // Assign the ref from the hook to the section
    <section id="cultural-heritage" className="mb-20 pt-12 scroll-mt-16" ref={sectionRef}> 
      <div className="max-w-6xl mx-auto px-4">
        <div className="section-title"> {/* Assumes styles applied via @utility */} 
          <h2>{t('heritage.title')}</h2>
          <p>{t('heritage.subtitle')}</p>
        </div>
        
        {/* Grid container - Apply fade-in based on isVisible */}
        <div className={cn(
          "grid grid-cols-1 md:grid-cols-3 gap-8 transition-opacity duration-1000 ease-in",
          isVisible ? 'opacity-100' : 'opacity-0'
        )}>
          {heritageItems.map((item, index) => (
            <div 
              key={item.id || index} // Prefer stable ID if available
              className={cn(
                "card group transition-all duration-300", 
                // Apply slide-up animation conditionally based on visibility
                isVisible ? 'animate-slide-up' : 'opacity-0', // Assuming animate-slide-up is defined
              )}
              style={{ animationDelay: `${index * 0.1}s` }} // Stagger animation
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative overflow-hidden rounded-t-lg"> {/* Ensure overflow hidden for scale */}
                <Image 
                  src={item.image} // Assuming item.image is a valid path/URL
                  alt={t(`heritage.items.${index}.title`, item.title)} // Use dynamic key or pass t function
                  width={500} // Provide appropriate dimensions
                  height={350}
                  className={cn(
                    "w-full h-56 object-cover transition-transform duration-700 ease-in-out",
                    activeIndex === index ? 'scale-110' : 'scale-100' // Explicitly set scale-100
                  )}
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-primary-blue bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
              </div>
              <div className="card-content"> {/* Assumes styles via @utility */} 
                <h3 className="font-serif-kr font-semibold text-xl mb-3 text-text-primary group-hover:text-primary-blue transition-colors duration-300">
                  {t(`heritage.items.${index}.title`, item.title)}
                </h3>
                <p className="text-text-primary text-base mb-4">
                  {t(`heritage.items.${index}.description`, item.description)}
                </p>
                <div className="mt-4 flex justify-end">
                  {/* Consider making this a Link component if it navigates */}
                  <button className="inline-flex items-center text-primary-blue hover:text-primary-red transition-colors duration-200 text-sm font-medium group">
                    {t('heritage.readMore')}
                    <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Explore More Button */}
        <div className="text-center mt-12">
          <p className="text-text-secondary mb-6">{t('heritage.description')}</p>
          <a 
            href="#architecture" 
            onClick={(e) => { e.preventDefault(); scrollToSection('architecture'); }}
            className="btn btn-primary inline-flex items-center group"
          >
            {t('heritage.exploreArchitecture', 'Explore Architecture')}
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
