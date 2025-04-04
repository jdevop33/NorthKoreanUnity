// components/UnificationSection.tsx - Refactored as Server Component

import Image from 'next/image';
import { Check } from 'lucide-react'; // Use Lucide Check icon

// Define paths for images served from public dir
const koreanPeninsula = '/assets/korean_peninsula.svg';
// Check icon handled by Lucide

// Define props interface for translations
interface UnificationSectionProps {
  title: string;
  description: string;
  koreanPeninsulaAlt: string;
  pointCulturalExchange: string;
  pointPeaceSpirit: string;
  pointCulturalPreservation: string;
  pointEconomicCooperation: string;
}

// Named export - Server Component
export function UnificationSection({ 
  title,
  description,
  koreanPeninsulaAlt,
  pointCulturalExchange,
  pointPeaceSpirit,
  pointCulturalPreservation,
  pointEconomicCooperation
}: UnificationSectionProps) {

  const points = [
    pointCulturalExchange,
    pointPeaceSpirit,
    pointCulturalPreservation,
    pointEconomicCooperation
  ];
  
  return (
    // Added scroll-mt-16. Corrected gradient typo.
    // Applied gradient to the outer div for the border effect
    <section id="unification" className="mb-16 bg-gradient-to-r from-primary-blue to-primary-red p-1 rounded-lg scroll-mt-16">
      {/* Inner container with white background */}
      <div className="bg-white p-8 rounded-md"> {/* Adjusted rounding */}
        {/* Section Title */} 
        <h2 className="font-serif-kr text-3xl font-semibold text-center mb-8">
          <span className="border-b-4 border-accent-gold pb-2">{title}</span>
        </h2>
        
        {/* Description Text */} 
        <p className="text-center max-w-3xl mx-auto mb-12 leading-relaxed text-text-secondary">
          {description}
        </p>
        
        {/* Content Layout */} 
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
          {/* Image */} 
          <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
            <Image 
              src={koreanPeninsula} 
              alt={koreanPeninsulaAlt}
              width={300} // Example size
              height={300} // Example size
              className="rounded-lg shadow-md w-full h-auto object-contain"
              unoptimized // SVG
            />
          </div>
          
          {/* List of Points */} 
          <div className="md:w-1/2">
            <ul className="space-y-4">
              {points.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="bg-primary-blue text-white w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-3 h-3" strokeWidth={3} />
                  </div>
                  <p className="text-gray-700">{point}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
