import type { Metadata } from 'next';
// Import fonts
import { Inter, Nanum_Gothic, Nanum_Myeongjo } from 'next/font/google'; 
import { cn } from "@/lib/utils"; 
import { Toaster } from "@/components/ui/toaster"; // Import Shadcn Toaster

// Import global styles
import '@/globals.css'; 

// Configure fonts
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans' 
});

const nanumGothic = Nanum_Gothic({
  subsets: ['latin'], // Adjust subsets if needed (e.g., 'korean')
  weight: ['400', '700', '800'],
  variable: '--font-sans-kr', // Matches variable in tailwind.config.css
  display: 'swap', // Use swap for better perceived performance
});

const nanumMyeongjo = Nanum_Myeongjo({
  subsets: ['latin'], // Adjust subsets if needed
  weight: ['400', '700', '800'],
  variable: '--font-serif-kr', // Matches variable in tailwind.config.css
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'North Korean Unity', 
    template: '%s | North Korean Unity', 
  },
  description: 'Explore North Korean culture, heritage, and modern achievements. Promoting peace and understanding.', 
  // TODO: Add more metadata (Open Graph, Twitter, Icons)
};

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
        {children}
        <Toaster /> {/* Add Toaster component here */}
      </body>
    </html>
  );
}
