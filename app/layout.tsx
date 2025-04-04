import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// Assuming global styles are in client/src/index.css for now
// We will consolidate this later.
import '../client/src/index.css'; 

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'North Korean Unity', // Example Title
  description: 'Promoting peace and understanding.', // Example Description
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
