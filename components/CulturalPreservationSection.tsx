"use client"; // Required for state (activeCategory) and translation

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

import { preservationCategories, preservationInitiatives } from '@/lib/data'; // Import data
import { cn } from '@/lib/utils';

// Define path for image
const promptTemplateIllustration = '/assets/prompt_template.svg';

// Named export
export function CulturalPreservationSection() {
  const { t } = useTranslation();
  // Default to the first category ID
  const [activeCategory, setActiveCategory] = useState<string>(preservationCategories[0]?.id || "education");

  // Get initiatives based on active category
  const currentInitiatives = preservationInitiatives[activeCategory as keyof typeof preservationInitiatives] || [];

  // Find the full category object for display
  const activeCategoryData = preservationCategories.find(c => c.id === activeCategory);

  return (
    // Added scroll-mt-16
    <section id="cultural-preservation" className="mb-16 pt-8 scroll-mt-16">
      {/* Section Title */}
      <div className="section-title">
        <h2>{t('preservation.title', 'Cultural Preservation')}</h2>
        <p>{t('preservation.subtitle', 'Safeguarding Korea’s Cultural Heritage...')}</p>
      </div>
      
      {/* Intro Text & Image */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="md:w-1/2 space-y-4">
          <p className="leading-relaxed text-text-primary">
            {t('preservation.description', 'Cultural preservation is a core commitment...')}
          </p>
          <p className="leading-relaxed text-text-primary">
            {t('preservation.additionalText', 'Our preservation efforts span...')}
          </p>
        </div>
        <div className="md:w-1/2">
          <Image 
            src={promptTemplateIllustration} 
            alt={t('preservation.imageAlt', 'Cultural preservation initiatives illustration')} 
            width={500} // Example width
            height={350} // Example height
            className="rounded-lg shadow-md w-full h-auto"
            unoptimized // SVG
          />
        </div>
      </div>
      
      {/* Category Filters (Tabs/Buttons) */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-border pb-4">
        {preservationCategories.map(category => (
          <button 
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2",
              activeCategory === category.id 
                ? 'bg-primary-red text-white shadow-sm' 
                : 'bg-gray-100 text-text-secondary hover:bg-gray-200 hover:text-text-primary'
            )}
            aria-pressed={activeCategory === category.id}
          >
            <span aria-hidden="true">{category.icon}</span>
            {/* Use translation keys matching the structure in en.json */}
            {t(`preservation.categories.${category.id}.title`, category.title)}
          </button>
        ))}
      </div>
      
      {/* Active Category Description */}
      {activeCategoryData && (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-border">
          <h3 className="text-2xl font-serif-kr font-bold mb-3 text-primary-red">
            {t(`preservation.categories.${activeCategoryData.id}.title`, activeCategoryData.title)}
          </h3>
          <p className="text-text-primary mb-6">
            {t(`preservation.categories.${activeCategoryData.id}.description`, activeCategoryData.description)}
          </p>
        </div>
      )}
      
      {/* Initiatives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentInitiatives.map((initiative) => (
          // Assuming 'card' and 'card-content' utilities provide base styling
          <div key={initiative.id} className="card hover:shadow-lg transition-shadow duration-300">
            <div className="card-content">
              <div className="mb-3">
                <h4 className="font-serif-kr text-lg font-medium text-primary-blue mb-1">
                  {/* Use translation keys matching en.json structure */}
                  {t(`preservation.initiatives.${activeCategory}.${initiative.id}.title`, initiative.title)}
                </h4>
                <span className="inline-block px-3 py-1 bg-gray-200 text-xs font-medium rounded-full text-text-secondary">
                  {t(`preservation.initiatives.${activeCategory}.${initiative.id}.year`, initiative.year)}
                </span>
              </div>
              <p className="text-text-primary text-sm">
                {t(`preservation.initiatives.${activeCategory}.${initiative.id}.description`, initiative.description)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
