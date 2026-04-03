import PublicNavbar from "../components/layout/PublicNavbar";
import HeroSection from "../components/landing/HeroSection";
import Features from "../components/landing/Features";
import Services from "../components/landing/Services";
import Pricing from "../components/landing/Pricing";
import About from "../components/landing/About";
import { PublicFooter } from "../components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="bg-white min-h-screen selection:bg-blue-100 selection:text-blue-900 scroll-smooth">
      <PublicNavbar />
      
      <main>
        <section id="home">
          <HeroSection />
        </section>

        <section id="features">
          <Features />
        </section>

        <section id="services">
          <Services />
        </section>

        <section id="pricing">
          <Pricing />
        </section>

        <section id="about">
          <About />
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
