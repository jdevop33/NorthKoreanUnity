// app/layout.tsx - Restore I18nProvider

import { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Nanum_Gothic, Nanum_Myeongjo } from 'next/font/google';
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { baseMetadata } from './metadata';
import { I18nProvider } from "@/components/I18nProvider"; // Restore provider import

// Import global styles
import '@/app/globals.css'; 

// Configure fonts
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

export const metadata: Metadata = baseMetadata;

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html 
      lang="en" 
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
        <Toaster />
        {/* Umami Analytics - Privacy-respecting, cookie-free */}
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="e42c2739-f5a9-4dbf-8325-2e5b80eeee19"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
