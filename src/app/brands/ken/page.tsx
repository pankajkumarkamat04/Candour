'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Wrench, Zap, Shield, Globe, CheckCircle, ArrowRight, Settings, HardHat, Cog } from 'lucide-react';

export default function KENPowerToolsPage() {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    intro: false,
    partnership: false,
    products: false,
    benefits: false
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const partnershipRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = entry.target.getAttribute('data-section');
          if (section) {
            setIsVisible(prev => ({ ...prev, [section]: true }));
          }
        }
      });
    }, observerOptions);

    const sections = [heroRef, introRef, partnershipRef, productsRef, benefitsRef];
    sections.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  const productCategories = [
    {
      name: 'Drilling Solutions',
      icon: Wrench,
      items: [
        'Electric Hand Drills (6mm–13mm)',
        'Impact Drills & Rotary Hammers',
        'Magnetic Drills & Bench Drills'
      ]
    },
    {
      name: 'Grinding & Cutting Tools',
      icon: Cog,
      items: [
        'Angle Grinders (100mm to 230mm)',
        'Die Grinders & Straight Grinders',
        'Metal Cut-Off Machines',
        'Circular Saws & Marble Cutters'
      ]
    },
    {
      name: 'Polishing & Finishing Tools',
      icon: Settings,
      items: [
        'Orbital Sanders & Polishers',
        'Belt Sanders & Burnishers',
        'Buffers for surface finishing'
      ]
    },
    {
      name: 'Fastening Tools',
      icon: HardHat,
      items: [
        'Impact Wrenches (Electric & Cordless)',
        'Electric Screwdrivers',
        'Torque Drivers & Nut Runners'
      ]
    },
    {
      name: 'Specialty Tools',
      icon: Zap,
      items: [
        'Heat Guns',
        'Air Blowers',
        'Material Mixers (Paint, Mortar, Chemical)'
      ]
    }
  ];

  const benefits = [
    {
      title: 'Industrial-Grade Durability',
      description: 'Engineered for the rigors of Saudi industrial environments.',
      icon: Shield
    },
    {
      title: 'Local Availability',
      description: 'Stocked and serviced by Candour International for quick turnaround.',
      icon: Globe
    },
    {
      title: 'Technical Support',
      description: 'Backed by product training, demo support, and after-sales service.',
      icon: Settings
    },
    {
      title: 'Affordable Reliability',
      description: 'High-quality tools at accessible pricing for contractors and industries.',
      icon: CheckCircle
    },
    {
      title: 'Trusted Partnership',
      description: 'Strengthened by Candour\'s regional expertise and market reach.',
      icon: ArrowRight
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div 
        ref={heroRef}
        data-section="hero"
        className={`relative overflow-hidden pt-20 sm:pt-24 md:pt-32 lg:pt-40 xl:pt-44 pb-8 sm:pb-10 md:pb-12 lg:pb-16 transition-all duration-1000 ${
          isVisible.hero 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 to-orange-800/90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="w-12 sm:w-16 h-1 bg-white mx-auto mb-4 sm:mb-6"></div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight">
              KEN Power Tools
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-orange-100 font-semibold mb-4 sm:mb-6 md:mb-8 leading-relaxed">
              Industrial Strength. Proven Performance.
            </p>
            <p className="text-sm sm:text-base md:text-lg max-w-4xl mx-auto leading-relaxed">
              A globally recognized brand trusted by professionals for its robust engineering, consistent performance, and durability across demanding industrial environments.
            </p>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div 
        ref={introRef}
        data-section="intro"
        className={`py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-28 bg-gray-50 transition-all duration-1000 delay-200 ${
          isVisible.intro 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 2xl:gap-20 items-center">
            <div>
              <Image
                src="/ken.png"
                alt="KEN Power Tools"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl w-full h-auto max-w-lg mx-auto lg:max-w-none"
                priority
              />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 leading-tight">
                Trusted by Professionals Worldwide
              </h2>
              <div className="space-y-3 sm:space-y-4 md:space-y-6 text-gray-700 leading-relaxed">
                <p className="text-sm sm:text-base md:text-lg">
                  KEN Power Tools is a globally recognized brand trusted by professionals for its robust engineering, consistent performance, and durability across demanding industrial environments. Manufactured with precision and backed by years of innovation, KEN tools are ideal for industries ranging from construction and fabrication to maintenance, repair, and operations (MRO).
                </p>
                <p className="text-sm sm:text-base md:text-lg">
                  With a strong presence in Asia, the Middle East, and expanding global markets, KEN delivers a wide range of corded and cordless tools designed to meet international quality standards while staying cost-effective.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partnership Section */}
      <div 
        ref={partnershipRef}
        data-section="partnership"
        className={`py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-white transition-all duration-1000 delay-300 ${
          isVisible.partnership 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              KEN Power Tools & Candour International
            </h2>
            <div className="w-16 h-1 bg-orange-500 mx-auto"></div>
            <p className="text-lg sm:text-xl text-orange-600 font-semibold mt-4 sm:mt-6">
              Powering Saudi Industry
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-center">
            <div>
              <Image
                src="/ken2.png"
                alt="KEN Partnership"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl w-full h-auto"
              />
            </div>
            <div>
              <div className="space-y-4 sm:space-y-6 text-gray-700 leading-relaxed">
                <p className="text-base sm:text-lg">
                  To further strengthen its global footprint, KEN Power Tools has partnered with Candour International as its official distributor and strategic partner in the Kingdom of Saudi Arabia. This collaboration aims to enhance industrial access to high-performance power tools backed by local support, faster deliveries, and technical expertise.
                </p>
                  <p className="text-base sm:text-lg">
                    Candour International, with its deep market knowledge and established presence across the GCC, is leading the charge in bringing KEN&apos;s advanced, affordable tooling solutions to contractors, fabricators, and industrial users across Saudi Arabia.
                  </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Range Section */}
      <div 
        ref={productsRef}
        data-section="products"
        className={`py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-gray-50 transition-all duration-1000 delay-400 ${
          isVisible.products 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Product Range Overview
            </h2>
            <div className="w-16 h-1 bg-orange-500 mx-auto"></div>
            <p className="text-base sm:text-lg text-gray-600 mt-4 sm:mt-6 max-w-3xl mx-auto">
              Comprehensive range of professional power tools for every industrial application
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {productCategories.map((category, index) => (
              <div 
                key={index}
                className="bg-white p-3 sm:p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="mb-3 sm:mb-4">
                  <Image
                    src={`/ken${index + 3}.png`}
                    alt={category.name}
                    width={300}
                    height={200}
                    className="w-full h-24 sm:h-32 md:h-40 object-cover rounded-lg mb-2 sm:mb-3"
                  />
                </div>
                <div className="flex items-center mb-2 sm:mb-3 md:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-orange-500 rounded-full flex items-center justify-center mr-2 sm:mr-3 md:mr-4 flex-shrink-0">
                    <category.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                    {category.name}
                  </h3>
                </div>
                <ul className="space-y-1 sm:space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-xs sm:text-sm text-gray-600">
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div 
        ref={benefitsRef}
        data-section="benefits"
        className={`py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-white transition-all duration-1000 delay-500 ${
          isVisible.benefits 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Choose KEN Power Tools in Saudi Arabia?
            </h2>
            <div className="w-16 h-1 bg-orange-500 mx-auto"></div>
            <p className="text-base sm:text-lg text-gray-600 mt-4 sm:mt-6 max-w-3xl mx-auto">
              KEN Power Tools, now closer to you in Saudi Arabia through Candour International – your partner for productivity, performance, and progress.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-gray-50 p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                  <benefit.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                  {benefit.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
