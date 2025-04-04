// app/page.tsx - The root page migrated from client/src/pages/Home.tsx

// Import components using the new path alias
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

// Root Page Component - functions as a Server Component by default
export default function HomePage() {
  return (
    // Removed outer div, layout handled by app/layout.tsx and global styles
    // Applied font class in layout.tsx
    <>
      <Header />
      <NavigationBar />
      
      <main>
        {/* Sections within a container - consider if container needed globally or per section */}
        {/* Keeping max-w-6xl container for now */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <IntroductionSection />
          <CulturalHeritageSection />
          <ArchitectureSection />
          <TraditionsSection />
          <ModernAchievementsSection />
          <CulturalPreservationSection />
        </div>
        
        {/* Sections potentially spanning full width or having own containers */}
        <UnificationSection />
        <ContactSection />
      </main>
      
      <Footer />
    </>
  );
}
