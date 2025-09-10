'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Wrench, Cog, Zap, Shield, Globe, CheckCircle, ArrowRight, Settings, ToolCase } from 'lucide-react';

export default function ToolsPage() {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    intro: false,
    categories: false,
    features: false,
    tools: false,
    consumables: false
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const consumablesRef = useRef<HTMLDivElement>(null);

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
          } else if (entry.target === categoriesRef.current) {
            setIsVisible(prev => ({ ...prev, categories: true }));
          } else if (entry.target === featuresRef.current) {
            setIsVisible(prev => ({ ...prev, features: true }));
          } else if (entry.target === toolsRef.current) {
            setIsVisible(prev => ({ ...prev, tools: true }));
          } else if (entry.target === consumablesRef.current) {
            setIsVisible(prev => ({ ...prev, consumables: true }));
          }
        }
      });
    }, observerOptions);

    const refs = [heroRef, introRef, categoriesRef, featuresRef, toolsRef, consumablesRef];
    refs.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const toolCategories = [
    {
      name: 'Power Tools',
      description: 'Professional-grade power tools for industrial applications',
      icon: Zap,
      items: [
        'Cordless Drills & Impact Drivers',
        'Angle Grinders & Polishers',
        'Circular & Reciprocating Saws',
        'Cut-off & Demolition Tools',
        'Heat Guns & Blowers',
        'Electric Screwdrivers',
        'Rotary Hammers & Chisels'
      ]
    },
    {
      name: 'Hand Tools',
      description: 'Essential hand tools for precision work',
      icon: Wrench,
      items: [
        'Wrenches & Socket Sets',
        'Screwdrivers & Nut Drivers',
        'Pliers, Cutters & Crimping Tools',
        'Hammers, Mallets & Punch Sets',
        'Measuring Tapes, Spirit Levels & Squares',
        'Files, Chisels & Hand Saws',
        'Tool Kits & Storage Solutions'
      ]
    },
    {
      name: 'Safety & PPE',
      description: 'Personal protective equipment for workplace safety',
      icon: Shield,
      items: [
        'Safety Helmets & Hard Hats',
        'Eye Protection: Goggles & Safety Glasses',
        'Hearing Protection: Earplugs & Earmuffs',
        'Protective Gloves (Electrical, Chemical, Cut-Resistant)',
        'Safety Shoes & Gumboots',
        'Reflective Jackets & Workwear',
        'Respirators, Face Shields & Masks',
        'Fall Arrest Systems & Harnesses'
      ]
    },
    {
      name: 'Lifting & Rigging Equipment',
      description: 'Heavy-duty lifting and rigging solutions',
      icon: Settings,
      items: [
        'Manual Chain Blocks & Lever Hoists',
        'Electric Hoists & Winches',
        'Slings (Webbing, Chain, Wire Rope)',
        'Shackles, Hooks & Load Binders',
        'Beam Clamps, Trolleys & Eyebolts',
        'Load Indicators & Weighing Systems'
      ]
    },
    {
      name: 'Testing & Measuring Instruments',
      description: 'Precision measurement and testing equipment',
      icon: Cog,
      items: [
        'Digital Multimeters & Clamp Meters',
        'Pressure Gauges & Calibrators',
        'Thermometers & Temperature Sensors',
        'Ultrasonic Thickness Gauges',
        'Gas Leak Detectors',
        'Vibration Analyzers',
        'Meggers & Insulation Testers'
      ]
    },
    {
      name: 'Workshop & Site Equipment',
      description: 'Complete workshop and site setup solutions',
      icon: ToolCase,
      items: [
        'Workbenches, Vices & Clamps',
        'Tool Cabinets & Storage Racks',
        'Portable Lighting & Work Lamps',
        'Soldering Stations & Heat Guns',
        'Air Tools & Accessories',
        'Extension Cords, Power Strips & Reels',
        'Maintenance Kits & Tool Trolleys'
      ]
    }
  ];

  const consumableCategories = [
    {
      name: 'Cutting & Grinding',
      items: [
        'Cutting Discs & Grinding Wheels',
        'Abrasive Papers & Sanding Belts',
        'Diamond Blades & Core Bits',
        'Wire Brushes & Scouring Pads'
      ]
    },
    {
      name: 'Welding Supplies',
      items: [
        'Welding Rods, Electrodes & Wire',
        'Welding Gases & Fluxes',
        'Welding Helmets & Accessories',
        'Welding Clamps & Magnets'
      ]
    },
    {
      name: 'Adhesives & Sealants',
      items: [
        'Adhesives, Sealants & Epoxies',
        'Tapes: Insulation, Duct, PTFE',
        'Thread Lockers & Sealants',
        'Bonding Agents & Primers'
      ]
    },
    {
      name: 'Lubricants & Oils',
      items: [
        'Greases, Lubricants & Oils',
        'Hydraulic Fluids',
        'Cutting Fluids & Coolants',
        'Penetrating Oils & Cleaners'
      ]
    },
    {
      name: 'Cleaning & Maintenance',
      items: [
        'Cleaning Agents & Degreasers',
        'Industrial Paints, Markers & Coatings',
        'Rust Inhibitors & Corrosion Protection',
        'Disinfectants & Sanitizers'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div 
        ref={heroRef}
        className={`relative overflow-hidden pt-20 sm:pt-24 md:pt-32 lg:pt-40 xl:pt-44 pb-8 sm:pb-10 md:pb-12 lg:pb-16 transition-all duration-1000 ${
          isVisible.hero 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-800/90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="w-12 sm:w-16 h-1 bg-white mx-auto mb-4 sm:mb-6"></div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight">
              Tools Division
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-blue-100 font-semibold mb-4 sm:mb-6 md:mb-8 leading-relaxed">
              Industrial Equipment, Tools & Consumables
            </p>
            <p className="text-sm sm:text-base md:text-lg max-w-4xl mx-auto leading-relaxed">
              At Candour International, we are redefining how businesses procure and use industrial equipment, tools, and consumables. As a global representative of leading OEMs from Europe, the USA, and Asia, we go far beyond simple distribution.
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
                src="/Tools.jpg"
                alt="Tools Division"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl w-full h-auto"
                priority
              />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                Smart, Integrated Solutions
              </h2>
              <div className="space-y-4 sm:space-y-6 text-gray-700 leading-relaxed">
                <p className="text-base sm:text-lg">
                  We deliver smart, integrated solutions that enhance productivity and drive operational efficiency. We partner with world-renowned manufacturers to offer next-generation, tech-enabled equipment and tools.
                </p>
                <p className="text-base sm:text-lg">
                  Many of our tools are IoT-integrated, allowing for smarter monitoring, predictive maintenance, and improved performance tracking. This advanced technology not only ensures reliability but also empowers our clients to make data-driven decisions that reduce downtime and increase ROI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div 
        ref={featuresRef}
        className={`py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-white transition-all duration-1000 delay-300 ${
          isVisible.features 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Key Differentiators
            </h2>
            <div className="w-16 h-1 bg-blue-500 mx-auto"></div>
            <p className="text-base sm:text-lg text-gray-600 mt-4 sm:mt-6 max-w-3xl mx-auto">
              What sets Candour International apart is our solution-driven approach
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                title: 'Global Representation',
                description: 'Exclusive and strategic partnerships with leading OEMs from Europe, the USA, China, South Korea, Japan, and India',
                icon: Globe
              },
              {
                title: 'Cutting-Edge Technology',
                description: 'Supply of smart, IoT-enabled tools and equipment designed for Industry 4.0 environments',
                icon: Zap
              },
              {
                title: 'Operational Optimization',
                description: 'We help clients optimize usage, improve process efficiency, and reduce total cost of ownership',
                icon: Settings
              },
              {
                title: 'R&D-Backed Customization',
                description: 'Access to OEM engineering and R&D support to design tailor-made solutions for complex industrial needs',
                icon: Cog
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-gray-50 p-3 sm:p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-blue-500 rounded-full flex items-center justify-center mb-2 sm:mb-3 md:mb-4">
                  <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tools Categories Section */}
      <div 
        ref={toolsRef}
        className={`py-16 sm:py-20 lg:py-24 bg-gray-50 transition-all duration-1000 delay-400 ${
          isVisible.tools 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Industrial Tools & Consumables
            </h2>
            <div className="w-16 h-1 bg-blue-500 mx-auto"></div>
            <p className="text-lg text-gray-600 mt-6 max-w-3xl mx-auto">
              Explore our comprehensive range of industrial tools and consumables, curated to meet the diverse needs of industrial operations, maintenance teams, and project sites.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {toolCategories.map((category, index) => (
              <div 
                key={index}
                className="bg-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                    <category.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                    {category.name}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                  {category.description}
                </p>
                <ul className="space-y-1 sm:space-y-2">
                  {category.items.slice(0, 5).map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-xs sm:text-sm text-gray-600">
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                  {category.items.length > 5 && (
                    <li className="text-xs sm:text-sm text-blue-600 font-medium">
                      +{category.items.length - 5} more items
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Consumables Section */}
      <div 
        ref={consumablesRef}
        className={`py-16 sm:py-20 lg:py-24 bg-white transition-all duration-1000 delay-500 ${
          isVisible.consumables 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Consumables & Supplies
            </h2>
            <div className="w-16 h-1 bg-blue-500 mx-auto"></div>
            <p className="text-lg text-gray-600 mt-6 max-w-3xl mx-auto">
              Essential consumables and supplies to keep your operations running smoothly
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {consumableCategories.map((category, index) => (
              <div 
                key={index}
                className="bg-gray-50 p-4 sm:p-6 rounded-xl shadow-lg"
              >
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {category.name}
                </h3>
                <ul className="space-y-1 sm:space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-xs sm:text-sm text-gray-600">
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full Lifecycle Support Section */}
      <div className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
              Full Lifecycle Support
            </h2>
            <div className="w-12 sm:w-16 h-1 bg-white mx-auto mb-6 sm:mb-8"></div>
            <p className="text-sm sm:text-base md:text-lg max-w-4xl mx-auto leading-relaxed mb-6 sm:mb-8">
              From initial selection and integration to training and post-sales service, we&apos;re with you every step of the way. At Candour International, it&apos;s not just about supplying tools—it&apos;s about empowering performance, maximizing uptime, and helping our customers achieve sustainable cost savings through innovation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <ToolCase className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">Initial Selection</h3>
                <p className="text-blue-100 text-sm sm:text-base">Expert guidance in tool selection</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Settings className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">Integration & Training</h3>
                <p className="text-blue-100 text-sm sm:text-base">Seamless setup and user training</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">Post-Sales Service</h3>
                <p className="text-blue-100 text-sm sm:text-base">Ongoing support and maintenance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
