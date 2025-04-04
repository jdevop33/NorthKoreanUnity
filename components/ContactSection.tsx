"use client"; // Required for observer hook, translation, and child form

import { useTranslation } from 'react-i18next';
import { Facebook, Twitter, Instagram } from 'lucide-react'; // Example social icons

import { ContactForm } from "@/components/ContactForm"; // Use named import
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { cn } from '@/lib/utils';

// Named export
export function ContactSection() {
  const { t } = useTranslation();
  // Use observer hook for entry animation
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  // Social links data (example)
  const socialLinks = [
    { href: "#", label: "Facebook", icon: Facebook },
    { href: "#", label: "Twitter", icon: Twitter },
    { href: "#", label: "Instagram", icon: Instagram },
  ];

  return (
    // Added scroll-mt-16, corrected gradient typo, added ref
    <section 
      id="contact" 
      className="py-20 bg-gradient-to-b from-primary-red/90 to-warm-gray-dark scroll-mt-16"
      ref={sectionRef}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-serif-kr font-bold text-white mb-4 text-shadow-md">
            {t('contact.seasonalTitle', 'Four Seasons of')} <span className="text-accent-gold">{t('contact.koreaTitle', 'Korea')}</span>
          </h2>
          {/* Using custom utility - check definition */}
          <div className="backdrop-blur-text inline-block"> 
            <p className="text-white text-lg max-w-3xl mx-auto font-medium">
              {t('contact.headerDescription', 'Experience Korean culture...')}
            </p>
          </div>
        </div>

        {/* Main Content Grid */} 
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Column (Info & Social) */}
          <div 
            className={cn("transition-opacity duration-1000 ease-in", isVisible ? 'opacity-100' : 'opacity-0')}
            style={{ transitionDelay: '0.2s' }}
          >
             {/* Using custom utilities - check definitions */}
            <div className="bg-black/30 p-8 rounded-lg backdrop-blur-xs text-high-contrast space-y-8">
              {/* Communication Values */}
              <div>
                <h3 className="text-2xl font-serif-kr font-bold mb-4 text-accent-gold text-shadow-sm">
                  {t('contact.values.title', 'Communication Values')}
                </h3>
                <p className="mb-6 leading-relaxed">
                  {t('contact.values.description', 'Understanding and sharing Korean culture...')}
                </p>
              </div>
              
              {/* Cultural Exchange */}
              <div>
                <h4 className="text-xl font-serif-kr font-bold mb-3 text-white">
                  {t('contact.values.exchange.title', 'Cultural Exchange')}
                </h4>
                <p>
                  {t('contact.values.exchange.description', 'We welcome all proposals...')}
                </p>
              </div>
              
              {/* Prompt Suggestions */}
              <div>
                <h4 className="text-xl font-serif-kr font-bold mb-3 text-white">
                  {t('contact.values.prompts.title', 'Prompt Suggestions')}
                </h4>
                <p>
                  {t('contact.values.prompts.description', 'Do you have new AI prompt ideas?...')}
                </p>
              </div>
              
              {/* Social Links */}
              <div className="pt-6 border-t border-white/20">
                <div className="flex items-center space-x-4">
                  {socialLinks.map((link) => (
                    <a 
                      key={link.label}
                      href={link.href} 
                      aria-label={link.label}
                      target="_blank" // Assume external links
                      rel="noopener noreferrer"
                      className="text-white hover:text-accent-gold transition-colors bg-white/20 p-2 rounded-full"
                    >
                      <link.icon className="w-6 h-6" /> {/* Use Lucide icon component */}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column (Contact Form) */}
          <div
            className={cn("transition-opacity duration-1000 ease-in", isVisible ? 'opacity-100' : 'opacity-0')}
            style={{ transitionDelay: '0.4s' }}
          >
            {/* ContactForm will be a Client Component */}
            <ContactForm /> 
          </div>
        </div>
      </div>
    </section>
  );
}
