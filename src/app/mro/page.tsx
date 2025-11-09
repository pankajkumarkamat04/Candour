'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Wrench, Cog, Zap, Shield, Globe, CheckCircle, ArrowRight } from 'lucide-react';

export default function MROPage() {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    intro: false,
    methodology: false,
    categories: false,
    equipment: false,
    project: false,
    piping: false
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const methodologyRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const equipmentRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);
  const pipingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === heroRef.current) {
            setIsVisible(prev => ({ ...prev, hero: true }));
          } else if (entry.target === introRef.current) {
            setIsVisible(prev => ({ ...prev, intro: true }));
          } else if (entry.target === methodologyRef.current) {
            setIsVisible(prev => ({ ...prev, methodology: true }));
          } else if (entry.target === categoriesRef.current) {
            setIsVisible(prev => ({ ...prev, categories: true }));
          } else if (entry.target === equipmentRef.current) {
            setIsVisible(prev => ({ ...prev, equipment: true }));
          } else if (entry.target === projectRef.current) {
            setIsVisible(prev => ({ ...prev, project: true }));
          } else if (entry.target === pipingRef.current) {
            setIsVisible(prev => ({ ...prev, piping: true }));
          }
        }
      });
    }, observerOptions);

    const refs = [heroRef, introRef, methodologyRef, categoriesRef, equipmentRef, projectRef, pipingRef];
    refs.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const mroCategories = [
    {
      name: 'Mechanical Spares',
      description: 'Essential mechanical components for industrial equipment',
      icon: Cog,
      items: [
        'Bearings (ball, roller, thrust)',
        'Gaskets & Seals',
        'Couplings & Bushings',
        'Chains, Belts & Pulleys',
        'Springs & Fasteners',
        'Gearboxes & Transmissions',
        'Shafts & Mechanical Seals',
        'Pipe Fittings & Flanges',
        'Expansion Joints',
        'Valves (gate, globe, ball, butterfly)'
      ]
    },
    {
      name: 'Electrical Spares',
      description: 'Electrical components and power distribution equipment',
      icon: Zap,
      items: [
        'Cables & Cable Accessories',
        'Circuit Breakers & Fuses',
        'Relays, Contactors & Starters',
        'Switchgears & Panels',
        'Motors (AC/DC)',
        'Drives & Variable Frequency Drives (VFDs)',
        'Lighting Systems & Fixtures',
        'Transformers & Capacitors',
        'Power Supply Units',
        'Terminal Blocks & Connectors'
      ]
    },
    {
      name: 'Instrumentation Spares',
      description: 'Measurement and control instrumentation components',
      icon: Shield,
      items: [
        'Pressure & Temperature Gauges',
        'Transmitters (Pressure, Flow, Temperature, Level)',
        'Control Valves & Positioners',
        'Flow Meters (Magnetic, Ultrasonic, Turbine)',
        'Indicators & Recorders',
        'PLCs, DCS Modules & Controllers',
        'Sensors & Detectors',
        'Level Switches & Probes',
        'Analyzers (Gas, Liquid)',
        'Calibration Tools & Kits'
      ]
    },
    {
      name: 'Rotating Equipment Spares',
      description: 'Components for pumps, compressors, and rotating machinery',
      icon: Wrench,
      items: [
        'Pumps (Centrifugal, Gear, Screw, Diaphragm)',
        'Compressors (Reciprocating, Screw, Centrifugal)',
        'Blowers & Fans',
        'Mechanical Seals',
        'Pump Impellers, Casings & Wear Rings',
        'Compressor Valves, Pistons, Bearings',
        'Turbine Spares (Blades, Nozzles, Casings)',
        'Engine Parts (Diesel & Gas Engines)'
      ]
    },
    {
      name: 'Stationary Equipment Spares',
      description: 'Components for pressure vessels, heat exchangers, and stationary equipment',
      icon: Globe,
      items: [
        'Pressure Vessels',
        'Heat Exchangers & Tubes',
        'Boilers & Accessories',
        'Columns & Reactors',
        'Tanks & Silos',
        'Filters & Strainers',
        'Insulation Materials',
        'Refractory Bricks & Castables',
        'Structural Steel & Supports',
        'Ladders, Platforms & Safety Rails'
      ]
    },
    {
      name: 'Utilities & General Plant Maintenance',
      description: 'General maintenance supplies and utilities equipment',
      icon: CheckCircle,
      items: [
        'HVAC Components (Chillers, AHUs, Ducting)',
        'Air Dryers & Compressors',
        'Water Treatment Equipment',
        'Lubricants & Greases',
        'Hoses & Hose Reels',
        'Workshop Tools & Kits',
        'Welding Machines & Accessories',
        'Safety Equipment (PPE, Fire Protection, Signage)',
        'Cleaning & Janitorial Supplies',
        'Industrial Paints & Coatings'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div 
        ref={heroRef}
        className={`relative overflow-hidden pt-20 sm:pt-24 md:pt-28 lg:pt-32 xl:pt-36 pb-8 sm:pb-10 md:pb-12 lg:pb-16 transition-all duration-1000 ${
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
              MRO Division
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-orange-100 font-semibold mb-4 sm:mb-6 md:mb-8 leading-relaxed">
              Maintenance, Repair, and Operations Solutions
            </p>
            <p className="text-sm sm:text-base md:text-lg max-w-4xl mx-auto leading-relaxed">
              At Candour International, our MRO division plays a vital role in ensuring the uninterrupted performance of our clients&apos; industrial operations. We specialize in the sourcing and timely supply of essential spares, tools, consumables, and equipment required for daily Operations & Maintenance (O&M) activities across diverse sectors.
            </p>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div 
        ref={introRef}
        className={`py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-gray-50 transition-all duration-1000 delay-200 ${
          isVisible.intro 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-center">
            <div>
              <Image
                src="/images/services/mro1.jpg"
                alt="MRO Division"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl w-full h-auto"
                priority
              />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                Global Sourcing Excellence
              </h2>
              <div className="space-y-4 sm:space-y-6 text-gray-700 leading-relaxed">
                <p className="text-base sm:text-lg">
                  Our strength lies in our global sourcing capabilities, allowing us to procure high-quality materials from trusted suppliers in Europe, the USA, China, South Korea, Japan, and India. Whether it&apos;s hard-to-find spares or high-demand consumables, we deliver with precision, quality assurance, and speed.
                </p>
                <p className="text-base sm:text-lg">
                  By combining technical expertise, a vast global network, and an agile procurement process, Candour International serves as a trusted partner for all your MRO requirements—delivering cost-effective, reliable, and uninterrupted support for critical operations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sourcing Methodology Section */}
      <div 
        ref={methodologyRef}
        className={`py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-white transition-all duration-1000 delay-300 ${
          isVisible.methodology 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Sourcing & Procurement Methodology
            </h2>
            <div className="w-16 h-1 bg-orange-500 mx-auto"></div>
            <p className="text-base sm:text-lg text-gray-600 mt-4 sm:mt-6 max-w-3xl mx-auto">
              We follow a structured and transparent sourcing model that adds value at every step
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: 'Requirement Analysis',
                description: 'Detailed technical and commercial assessment of client needs',
                icon: CheckCircle
              },
              {
                title: 'Global Vendor Mapping',
                description: 'Identifying and engaging with qualified suppliers from our international network',
                icon: Globe
              },
              {
                title: 'Upfront Supplier Payments & Risk Mitigation',
                description: 'We manage financial transactions, including advance payments where needed, reducing delays and risks for our clients',
                icon: Shield
              },
              {
                title: 'End-to-End Supply Chain Management',
                description: 'From order placement to logistics, customs clearance, and final delivery—our team ensures a seamless supply process',
                icon: Cog
              },
              {
                title: 'Procurement Support',
                description: 'We handle everything from RFQs, vendor negotiations, and quality checks to documentation and after-sales support',
                icon: Wrench
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-gray-50 p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MRO Categories Section */}
      <div 
        ref={categoriesRef}
        className={`py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-gray-50 transition-all duration-1000 delay-400 ${
          isVisible.categories 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              MRO Categories – Industrial Spares
            </h2>
            <div className="w-16 h-1 bg-orange-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {mroCategories.map((category, index) => (
              <div 
                key={index}
                className="bg-white p-3 sm:p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-center mb-2 sm:mb-3 md:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-orange-500 rounded-full flex items-center justify-center mr-2 sm:mr-3 md:mr-4 flex-shrink-0">
                    <category.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                    {category.name}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-2 sm:mb-3 md:mb-4">
                  {category.description}
                </p>
                <ul className="space-y-1 sm:space-y-2">
                  {category.items.slice(0, 5).map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-xs sm:text-sm text-gray-600">
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                  {category.items.length > 5 && (
                    <li className="text-xs sm:text-sm text-orange-600 font-medium">
                      +{category.items.length - 5} more items
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Onsite Support Section */}
      <div className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-r from-orange-600 to-orange-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
              Onsite & Localized Support
            </h2>
            <div className="w-12 sm:w-16 h-1 bg-white mx-auto mb-6 sm:mb-8"></div>
            <p className="text-sm sm:text-base md:text-lg max-w-4xl mx-auto leading-relaxed mb-6 sm:mb-8">
              To enhance responsiveness and efficiency, Candour International also provides onsite procurement and material coordination support at client facilities. Our regional teams in the UK, India, UAE, Oman, and Saudi Arabia ensure hands-on assistance and rapid resolution of any supply-related issues.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Globe className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">Global Presence</h3>
                <p className="text-orange-100 text-sm sm:text-base">Offices across 5 countries</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Shield className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">Local Expertise</h3>
                <p className="text-orange-100 text-sm sm:text-base">Regional teams for hands-on support</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Zap className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">Rapid Response</h3>
                <p className="text-orange-100 text-sm sm:text-base">Quick resolution of supply issues</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
