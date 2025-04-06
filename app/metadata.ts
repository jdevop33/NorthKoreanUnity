import { Metadata } from 'next'

// Base metadata object for the entire site
export const baseMetadata: Metadata = {
  metadataBase: new URL('https://northkoreanunity.org'),
  title: {
    template: '%s | North Korean Unity',
    default: 'North Korean Unity - Cultural Heritage & Traditions',
  },
  description: 'Explore the rich cultural heritage, traditions, and modern achievements of North Korea through an educational and peace-promoting lens.',
  keywords: ['North Korea', 'Korean culture', 'cultural heritage', 'traditions', 'unification', 'peace'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'North Korean Unity',
    images: [
      {
        url: '/assets/pyongyang_cityscape.svg',
        width: 1200,
        height: 630,
        alt: 'North Korean Unity - Cultural Exploration',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/assets/pyongyang_cityscape.svg'],
  }
}

// Generate metadata for specific routes
export function generateMetadata({ 
  title, 
  description,
  path 
}: { 
  title: string; 
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    openGraph: {
      ...baseMetadata.openGraph,
      title,
      description,
      url: path,
    },
    twitter: {
      ...baseMetadata.twitter,
      title,
      description,
    },
    alternates: {
      canonical: path,
      languages: {
        'en': `/en${path}`,
        'ko': `/ko${path}`,
        'ru': `/ru${path}`,
        'zh': `/zh${path}`,
      }
    }
  }
}