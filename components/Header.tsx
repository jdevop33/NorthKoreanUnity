// app/components/Header.tsx - Refactored for Next.js App Router

import Image from 'next/image';
import { cn } from '@/lib/utils'; // Assuming cn utility exists

// Named export
export function Header() {
  // TODO: Replace placeholder src with a locally hosted image in /public
  // TODO: Provide actual width/height of the source image
  const headerImageSrc = "https://images.unsplash.com/photo-1548115184-bc6544d06a58?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"; 
  // Removed unused variables:
  // const imageWidth = 1920; // Placeholder width
  // const imageHeight = 1080; // Placeholder height for aspect ratio

  return (
    <header className="relative h-[500px] md:h-[600px] text-white overflow-hidden">
      {/* Background Image using next/image */}
      <Image 
        src={headerImageSrc}
        alt="Korean Traditional Architecture"
        fill // Use fill to cover the container
        style={{ objectFit: 'cover' }} // Use style for object-fit with fill
        priority // Prioritize loading this LCP image
        quality={80}
        // Providing placeholder dimensions helps Next.js reserve space
        // but `fill` is often preferred for background-like images.
        // width={imageWidth} 
        // height={imageHeight}
        // sizes="(max-width: 768px) 100vw, 100vw" // Example sizes prop
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 z-10"></div>
      
      {/* Text Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center items-center p-6 text-center">
        <h1 className={cn(
          "font-serif-kr font-bold text-3xl md:text-5xl lg:text-6xl mb-6 tracking-tight",
          "text-shadow-md" // Apply text shadow for better readability
        )}>
          <span className="text-accent-gold">조선</span> 문화유산
        </h1>
        <p className={cn(
          "text-lg md:text-xl max-w-2xl font-light leading-relaxed",
          "text-shadow-sm" // Apply text shadow
        )}>
          전통과 현대가 어우러진 조선의 문화와 예술을 탐험해보세요
        </p>
      </div>
    </header>
  );
}
