import PublicNavbar from "../components/layout/PublicNavbar";
import HeroSection from "../components/landing/HeroSection";
import StatsSection from "../components/landing/StatsSection";
import Features from "../components/landing/Features";
import TenantManagement from "../components/landing/TenantManagement";
import TargetAudience from "../components/landing/TargetAudience";
import PartnerResource from "../components/landing/PartnerResource";
import MarketplacePreview from "../components/landing/MarketplacePreview";
import SEOContentAndFAQs from "../components/landing/SEOContentAndFAQs";
import PricingSection from "../components/landing/PricingSection";
import DemoBooking from "../components/landing/DemoBooking";
import { PublicFooter } from "../components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="bg-white min-h-screen selection:bg-emerald-100 selection:text-emerald-900 scroll-smooth font-sans">
      <PublicNavbar />
      
      <main>
        <HeroSection />
        <StatsSection />
        <Features />
        
        {/* New Marketplace Section */}
        <MarketplacePreview />

        <TenantManagement />
        <PartnerResource />
        <TargetAudience />
        <SEOContentAndFAQs />
        
        {/* Pricing placed strictly before DemoBooking */}
        <PricingSection />
        <DemoBooking />
      </main>

      <PublicFooter />
    </div>
  );
}
