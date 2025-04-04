// components/ArchitectureSection.tsx - Refactored for Server Component Potential

import Image from 'next/image';

import modernArchitecture from '@/assets/modern_architecture.svg'; // Use updated alias
import traditionalPalace from '@/assets/traditional_palace.svg';
import pyongyangMonument from '@/assets/pyongyang_monument.svg';
import { cn } from '@/lib/utils'; // Assuming cn utility exists

// Define props interface for translations
interface ArchitectureSectionProps {
  title: string;
  subtitle: string;
  description: string;
  modernTitle: string;
  modernDescription: string;
  modernImageAlt: string;
  traditionalImageAlt: string;
  monumentImageAlt: string;
}

// Named export - This can now be a Server Component
export function ArchitectureSection({ 
  title,
  subtitle,
  description,
  modernTitle,
  modernDescription,
  modernImageAlt,
  traditionalImageAlt,
  monumentImageAlt
}: ArchitectureSectionProps) {
  
  return (
    // Added scroll-mt-16 for sticky nav
    <section id="architecture" className="mb-16 pt-8 bg-white p-8 rounded-lg shadow-md scroll-mt-16">
      {/* Section Header */} 
      <div className="border-l-4 border-primary-red pl-4 mb-8">
        <h2 className="font-serif-kr text-3xl font-semibold text-warm-gray">{title}</h2>
        <p className="text-gray-600">{subtitle}</p>
      </div>
      
      {/* Description Text */}
      <div className="mb-8">
        <p className="mb-4 leading-relaxed text-text-primary">{description}</p>
      </div>
      
      {/* Hero Image with Gradient Overlay */}
      <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
        <Image 
          src={modernArchitecture} 
          alt={modernImageAlt}
          fill // Use fill to cover container
          style={{ objectFit: 'cover' }} 
          quality={75}
          // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Fixed gradient typo */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-end z-10">
          <div className="p-6 text-white max-w-md">
            <h3 className="font-serif-kr text-2xl font-medium mb-2 text-shadow-sm">{modernTitle}</h3>
            <p className="text-sm text-shadow-sm">{modernDescription}</p>
          </div>
        </div>
      </div>
      
      {/* Grid Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg overflow-hidden shadow-sm">
          <Image 
            src={traditionalPalace} 
            alt={traditionalImageAlt}
            width={600} // Example dimension
            height={400} // Example dimension
            className="w-full h-auto md:h-64 object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="rounded-lg overflow-hidden shadow-sm">
          <Image 
            src={pyongyangMonument} 
            alt={monumentImageAlt}
            width={600} // Example dimension
            height={400} // Example dimension
            className="w-full h-auto md:h-64 object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </section>
  );
}
