// Use 'use client' if I18nProvider has client-side logic, 
// otherwise keep Layout as Server Component if possible.
// Since I18nProvider handles client-side effects (localStorage, detection), it must be a client component.
// Consequently, the RootLayout consuming it *might* need to be client, 
// OR wrap only {children} with the Provider if Metadata export is crucial.
// Let's try wrapping just children first.

import { Metadata } from 'next';
import { Inter, Nanum_Gothic, Nanum_Myeongjo } from 'next/font/google'; 
import { cn } from "@/lib/utils"; 
import { Toaster } from "@/components/ui/toaster";
import { baseMetadata } from './metadata';
import { I18nProvider } from "@/components/I18nProvider"; // Import the provider

// Import global styles
import '@/app/globals.css'; 

// Configure fonts with proper optimization
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true
});

const nanumGothic = Nanum_Gothic({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-sans-kr',
  display: 'swap',
  preload: true
});

const nanumMyeongjo = Nanum_Myeongjo({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-serif-kr',
  display: 'swap',
  preload: true
});

// Use our prepared metadata
export const metadata: Metadata = baseMetadata;

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html 
      lang="en" // Set initial lang, i18n provider will update client-side if needed
      className={cn(
        "antialiased", 
        inter.variable, 
        nanumGothic.variable, 
        nanumMyeongjo.variable
      )}
      suppressHydrationWarning
    >
      <body>
        {/* Wrap children with the I18nProvider */}
        <I18nProvider>
          {children}
        </I18nProvider>
        <Toaster /> {/* Add Toaster component here */}
      </body>
    </html>
  );
}
