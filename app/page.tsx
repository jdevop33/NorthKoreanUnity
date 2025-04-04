// app/page.tsx - Updated to pass translations to Server Components

import { Header } from "@/components/Header";
import { NavigationBar } from "@/components/NavigationBar";
import { IntroductionSection } from "@/components/IntroductionSection";
import { CulturalHeritageSection } from "@/components/CulturalHeritageSection";
import { ArchitectureSection } from "@/components/ArchitectureSection";
import { TraditionsSection } from "@/components/TraditionsSection";
import { ModernAchievementsSection } from "@/components/ModernAchievementsSection";
import { CulturalPreservationSection } from "@/components/CulturalPreservationSection";
import { UnificationSection } from "@/components/UnificationSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

import translations from "@/locales/en.json";

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
        <ContactSection />
      </main>
      
      <Footer />
    </>
  );
}
