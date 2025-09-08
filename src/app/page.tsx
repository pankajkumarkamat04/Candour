import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ConstructionHeroSection from '@/components/ConstructionHeroSection';
import ServicesPricingSection from '@/components/ServicesPricingSection';

export default function Home() {
  return (
    <div className="relative">
      <HeroSection />
      <ServicesSection />
      <ConstructionHeroSection />
      <ServicesPricingSection />
    </div>
  );
}
