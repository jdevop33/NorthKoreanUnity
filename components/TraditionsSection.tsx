// components/TraditionsSection.tsx - Refactored as Server Component

import Image from 'next/image';

// Define paths for images served from public dir
const calendarIcon = '/assets/calendar_icon.svg';
const foodIcon = '/assets/food_icon.svg';
const traditionalClothing = '/assets/traditional_clothing.svg';

// Define props interface for translations
interface TraditionsSectionProps {
  title: string;
  subtitle: string;
  calendarTitle: string;
  calendarDescription: string;
  calendarIconAlt: string;
  foodTitle: string;
  foodDescription: string;
  foodIconAlt: string;
  clothingTitle: string;
  clothingDescription1: string;
  clothingDescription2: string;
  clothingImageAlt: string;
}

// Named export - Server Component
export function TraditionsSection({ 
  title,
  subtitle,
  calendarTitle,
  calendarDescription,
  calendarIconAlt,
  foodTitle,
  foodDescription,
  foodIconAlt,
  clothingTitle,
  clothingDescription1,
  clothingDescription2,
  clothingImageAlt
}: TraditionsSectionProps) {
  
  return (
    // Added scroll-mt-16 for sticky nav
    <section id="traditions" className="mb-16 pt-8 scroll-mt-16">
      {/* Section Header */}
      <div className="border-l-4 border-accent-gold pl-4 mb-8">
        <h2 className="font-serif-kr text-3xl font-semibold text-warm-gray">{title}</h2>
        <p className="text-gray-600">{subtitle}</p>
      </div>
      
      {/* Grid for Calendar and Food */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-primary-red rounded-full flex items-center justify-center text-white shrink-0">
              <Image src={calendarIcon} alt={calendarIconAlt} width={24} height={24} unoptimized />
            </div>
            <h3 className="font-serif-kr text-xl font-medium ml-4">{calendarTitle}</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">{calendarDescription}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-primary-red rounded-full flex items-center justify-center text-white shrink-0">
              <Image src={foodIcon} alt={foodIconAlt} width={24} height={24} unoptimized />
            </div>
            <h3 className="font-serif-kr text-xl font-medium ml-4">{foodTitle}</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">{foodDescription}</p>
        </div>
      </div>
      
      {/* Clothing Section */}
      <div className="bg-primary-blue/10 p-6 rounded-lg">
        <h3 className="font-serif-kr text-xl font-medium mb-4 text-primary-blue">{clothingTitle}</h3>
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="md:w-2/3">
            <p className="text-gray-700 leading-relaxed mb-4">{clothingDescription1}</p>
            <p className="text-gray-700 leading-relaxed">{clothingDescription2}</p>
          </div>
          <div className="md:w-1/3 w-full">
            <Image 
              src={traditionalClothing} 
              alt={clothingImageAlt}
              width={300} // Example dimension
              height={200} // Example dimension
              className="w-full h-auto object-cover rounded-lg shadow-sm"
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
}
