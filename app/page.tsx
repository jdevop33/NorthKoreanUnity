// app/page.tsx - Simplified for build troubleshooting

import { Header } from "@/components/layout/Header";
import { NavigationBar } from "@/components/layout/NavigationBar";
import { Footer } from "@/components/layout/Footer";

// Comment out section imports
// import { IntroductionSection } from "@/components/sections/IntroductionSection";
// import { CulturalHeritageSection } from "@/components/sections/CulturalHeritageSection";
// import { ArchitectureSection } from "@/components/sections/ArchitectureSection";
// import { TraditionsSection } from "@/components/sections/TraditionsSection";
// import { ModernAchievementsSection } from "@/components/sections/ModernAchievementsSection";
// import { CulturalPreservationSection } from "@/components/sections/CulturalPreservationSection";
// import { UnificationSection } from "@/components/sections/UnificationSection";
// import { ContactSection } from "@/components/sections/ContactSection";
// import { Suspense } from "react";

// Comment out direct translation imports if sections using them are removed
// import translations from "@/locales/en.json";

// PPR flag (can remain)
// export const experimental_ppr = true;

// Simplified Root Page Component
export default function HomePage() {

  // Comment out translation extraction if sections using them are removed
  // const archTranslations = translations.architecture;
  // const tradTranslations = translations.traditions;
  // const unifTranslations = translations.unification;

  return (
    <>
      <Header />
      <NavigationBar /> 
      
      <main>
        {/* Sections within main content container - All commented out */}
        <div className="max-w-6xl mx-auto px-4 py-12 space-y-16 md:space-y-24">
          <h2 className="text-center text-2xl">Page Content Removed for Build Test</h2> 
          {/* <IntroductionSection /> */}
          {/* <CulturalHeritageSection /> */}
          {/* <ArchitectureSection 
            title={archTranslations.title}
            subtitle={archTranslations.subtitle}
            description={archTranslations.description}
            modernTitle={archTranslations.modern.title}
            modernDescription={archTranslations.modern.description}
            modernImageAlt={archTranslations.modern.imageAlt}
            traditionalImageAlt={archTranslations.traditional.imageAlt}
            monumentImageAlt={archTranslations.monument.imageAlt}
          /> */}
          {/* <TraditionsSection 
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
          /> */}
          {/* <ModernAchievementsSection /> */}
          {/* <CulturalPreservationSection /> */}
        </div>
        
        {/* Full width or custom container sections - All commented out */}
        {/* <UnificationSection 
          title={unifTranslations.title}
          description={unifTranslations.description}
          koreanPeninsulaAlt={unifTranslations.koreanPeninsula}
          pointCulturalExchange={unifTranslations.points.culturalExchange}
          pointPeaceSpirit={unifTranslations.points.peaceSpirit}
          pointCulturalPreservation={unifTranslations.points.culturalPreservation}
          pointEconomicCooperation={unifTranslations.points.economicCooperation}
        /> */}
        {/* <Suspense fallback={
          <div className="p-8 bg-content-bg-off min-h-[400px] flex items-center justify-center">
            <div className="animate-pulse w-full max-w-5xl h-64 bg-gray-200 rounded-lg"></div>
          </div>
        }>
          <ContactSection />
        </Suspense> */}
      </main>
      
      <Footer />
    </>
  );
}
