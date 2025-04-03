import Header from "@/components/Header";
import NavigationBar from "@/components/NavigationBar";
import IntroductionSection from "@/components/IntroductionSection";
import CulturalHeritageSection from "@/components/CulturalHeritageSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import TraditionsSection from "@/components/TraditionsSection";
import ModernAchievementsSection from "@/components/ModernAchievementsSection";
import PromptTemplatesSection from "@/components/PromptTemplatesSection";
import UnificationSection from "@/components/UnificationSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="font-sans-kr text-warm-gray bg-light-cream">
      <Header />
      <NavigationBar />
      
      <main className="max-w-6xl mx-auto px-4 py-12">
        <IntroductionSection />
        <CulturalHeritageSection />
        <ArchitectureSection />
        <TraditionsSection />
        <ModernAchievementsSection />
        <PromptTemplatesSection />
        <UnificationSection />
      </main>
      
      <Footer />
    </div>
  );
}
