import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ConstructionHeroSection from '@/components/ConstructionHeroSection';
import ConstructionCompanyHero from '@/components/ConstructionCompanyHero';
import QualityServicesSection from '@/components/QualityServicesSection';
import IndustriesWeServeSection from '@/components/IndustriesWeServeSection';
import ConstructionHeroSection2 from '@/components/ConstructionHeroSection2';
import QuoteRequestSection from '@/components/QuoteRequestSection';
import LogoSection from '@/components/LogoSection';
import OurOfficesSection from '@/components/OurOfficesSection';
import ServicesPricingSection from '@/components/ServicesPricingSection';
import BlogSection from '@/components/BlogSection';

export default function Home() {
  return (
    <div className="relative">
      <HeroSection />
      <ServicesSection />
      <ConstructionHeroSection />
      <ServicesPricingSection />
      <ConstructionCompanyHero />
      <QualityServicesSection />
      <IndustriesWeServeSection />
      <ConstructionHeroSection2 />
      <QuoteRequestSection />
      <LogoSection />
      <BlogSection />
      <OurOfficesSection />
    </div>
  );
}
