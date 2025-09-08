import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ConstructionHeroSection from '@/components/ConstructionHeroSection';

export default function Home() {
  return (
    <div className="relative">
      <HeroSection />
      <ServicesSection />
      <ConstructionHeroSection />
    </div>
  );
}
