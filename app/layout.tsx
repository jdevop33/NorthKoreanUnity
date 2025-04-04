import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Using Inter as an example, can be changed
import { cn } from "@/lib/utils"; // Assuming Shadcn's utils are in lib

// Import global styles - Make sure this path is correct relative to app/layout.tsx
import '../client/src/index.css'; 

// If using specific fonts from Google like Nanum Gothic/Myeongjo, import them here
// import { Nanum_Gothic, Nanum_Myeongjo } from 'next/font/google';

/* Example Google Font usage:
const nanumGothic = Nanum_Gothic({
  subsets: ['latin'], // Adjust subsets as needed
  weight: ['400', '700', '800'],
  variable: '--font-sans-kr' // CSS variable for Tailwind theme
});
const nanumMyeongjo = Nanum_Myeongjo({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-serif-kr' // CSS variable for Tailwind theme
});
*/

// Default font example
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans' // Example CSS variable for default sans font
});

export const metadata: Metadata = {
  title: 'North Korean Unity', 
  description: 'Promoting peace and understanding.', 
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    // Apply font variables to html tag for Tailwind integration
    // Use cn utility to merge potential font classes
    <html lang="en" className={cn(
      "antialiased", // Basic antialiasing 
      inter.variable // Add default font variable 
      // nanumGothic.variable, // Add Korean font variables if used
      // nanumMyeongjo.variable
    )} suppressHydrationWarning> {/* Recommended for Next.js + theme switching */}
      {/* Body tag gets base background/text colors from index.css */}
      <body>
        {children}
      </body>
    </html>
  );
}
