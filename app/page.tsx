// app/page.tsx - Updated to pass translations to Server Components

import { Header } from "@/components/layout/Header";
import { NavigationBar } from "@/components/layout/NavigationBar";
import { Footer } from "@/components/layout/Footer";

import { IntroductionSection } from "@/components/sections/IntroductionSection";
import { CulturalHeritageSection } from "@/components/sections/CulturalHeritageSection";
import { ArchitectureSection } from "@/components/sections/ArchitectureSection";
import { TraditionsSection } from "@/components/sections/TraditionsSection";
import { ModernAchievementsSection } from "@/components/sections/ModernAchievementsSection";
import { CulturalPreservationSection } from "@/components/sections/CulturalPreservationSection";
import { UnificationSection } from "@/components/sections/UnificationSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Suspense } from "react";

import translations from "@/locales/en.json";

// Enable Partial Prerendering (PPR) for optimal performance
export const experimental_ppr = true;

// Root Page Component - Server Component
export default function HomePage() {
  // Extract necessary translations
  const archTranslations = translations.architecture;
  const tradTranslations = translations.traditions;
  const unifTranslations = translations.unification;

  return (
    <>
      <Header />
      <NavigationBar /> 
      
      <main>
        {/* Sections within main content container */}
        <div className="max-w-6xl mx-auto px-4 py-12 space-y-16 md:space-y-24">
          <IntroductionSection />
          <CulturalHeritageSection /> 
          <ArchitectureSection 
            title={archTranslations.title}
            subtitle={archTranslations.subtitle}
            description={archTranslations.description}
            modernTitle={archTranslations.modern.title}
            modernDescription={archTranslations.modern.description}
            modernImageAlt={archTranslations.modern.imageAlt}
            traditionalImageAlt={archTranslations.traditional.imageAlt}
            monumentImageAlt={archTranslations.monument.imageAlt}
          />
          <TraditionsSection 
            title={tradTranslations.title}
            subtitle={tradTranslations.subtitle}
            calendarTitle={tradTranslations.calendar.title}
            calendarDescription={tradTranslations.calendar.description}
            calendarIconAlt={tradTranslations.calendar.icon} 
            foodTitle={tradTranslations.food.title}
            foodDescription={tradTranslations.food.description}
            foodIconAlt={tradTranslations.food.icon} 
            clothingTitle={tradTranslations.clothing.title}
            clothingDescription1={tradTranslations.clothing.description1}
            clothingDescription2={tradTranslations.clothing.description2}
            clothingImageAlt={tradTranslations.clothing.image} 
          />
          <ModernAchievementsSection />
          <CulturalPreservationSection />
        </div>
        
        {/* Full width or custom container sections */}
        {/* Note: UnificationSection is now outside the max-w-6xl container */}
        {/* If it needs the container, move it back inside the div above */}
        <UnificationSection 
          title={unifTranslations.title}
          description={unifTranslations.description}
          koreanPeninsulaAlt={unifTranslations.koreanPeninsula}
          pointCulturalExchange={unifTranslations.points.culturalExchange}
          pointPeaceSpirit={unifTranslations.points.peaceSpirit}
          pointCulturalPreservation={unifTranslations.points.culturalPreservation}
          pointEconomicCooperation={unifTranslations.points.economicCooperation}
        /> 
        <Suspense fallback={
          <div className="p-8 bg-content-bg-off min-h-[400px] flex items-center justify-center">
            <div className="animate-pulse w-full max-w-5xl h-64 bg-gray-200 rounded-lg"></div>
          </div>
        }>
          <ContactSection />
        </Suspense>
      </main>
      
      <Footer />
    </>
  );
}
