// app/page.tsx - Extremely simplified for build troubleshooting

import { Header } from "@/components/layout/Header";
// import { NavigationBar } from "@/components/layout/NavigationBar"; // Temporarily remove
// import { Footer } from "@/components/layout/Footer"; // Temporarily remove

// Simplified Root Page Component
export default function HomePage() {

  return (
    <>
      <Header />
      {/* <NavigationBar /> */} {/* Temporarily remove */}
      
      <main>
        <div className="max-w-6xl mx-auto px-4 py-12 space-y-16 md:space-y-24">
          <h2 className="text-center text-2xl">Page Content Removed for Build Test</h2> 
        </div>
      </main>
      
      {/* <Footer /> */} {/* Temporarily remove */}
    </>
  );
}
