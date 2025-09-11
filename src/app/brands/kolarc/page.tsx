'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Shield, Globe, CheckCircle, ArrowRight, Settings, Cog, BarChart3, Wrench as WeldingIcon } from 'lucide-react';

export default function KolArcWeldingPage() {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    intro: false,
    products: false,
    cloud: false,
    benefits: false
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);
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

    const sections = [heroRef, introRef, productsRef, cloudRef, benefitsRef];
    sections.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  const productCategories = [
    {
      name: 'Welding Machines & Equipment',
      icon: WeldingIcon,
      items: [
        'MIG/MAG Welding Machines: Reliable, high-performance machines for semi-automatic welding',
        'TIG Welding Machines: Precision-controlled systems for thin material welding and high-quality finishes',
        'Stick Welding Machines: Heavy-duty machines for versatile welding applications in harsh environments',
        'Plasma Cutting Machines: Advanced systems designed for precise cutting of metals with minimal heat input'
      ]
    },
    {
      name: 'Safety Equipment & Accessories',
      icon: Shield,
      items: [
        'Welding Helmets & Face Shields: Protecting welders with high-quality visibility and comfort',
        'Protective Gloves & Jackets: Heat and spark-resistant gloves and jackets for added safety',
        'Welding Accessories: Clamp holders, earth cables, and wire feeders designed for smooth operations'
      ]
    }
  ];

  const cloudFeatures = [
    {
      title: 'Real-Time Monitoring',
      description: 'Track the status and performance of your welding equipment and processes remotely, ensuring optimal efficiency.',
      icon: BarChart3
    },
    {
      title: 'Data Analytics & Reporting',
      description: 'Gain actionable insights from welding parameters, welding output, and equipment health.',
      icon: BarChart3
    },
    {
      title: 'Remote Troubleshooting & Support',
      description: 'Technical issues can be diagnosed and resolved remotely, reducing response time and minimizing operational delays.',
      icon: Settings
    },
    {
      title: 'Inventory Management',
      description: 'Keep track of welding consumables and equipment usage, ensuring you never run out of essential materials.',
      icon: Cog
    },
    {
      title: 'Compliance & Quality Assurance',
      description: 'Ensure that all welding processes comply with industry standards, reducing the risk of defects.',
      icon: CheckCircle
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
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-800/90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="w-12 sm:w-16 h-1 bg-white mx-auto mb-4 sm:mb-6"></div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight">
              KolArc Welding
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-blue-100 font-semibold mb-4 sm:mb-6 md:mb-8 leading-relaxed">
              Pioneering Excellence in Arc Welding Technology
            </p>
            <p className="text-sm sm:text-base md:text-lg max-w-4xl mx-auto leading-relaxed">
              A renowned global leader in arc welding solutions, known for producing high-quality welding consumables and equipment designed for industrial applications.
            </p>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div 
        ref={introRef}
        data-section="intro"
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
                src="/industrial.png"
                alt="KolArc Welding"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl w-full h-auto"
                priority
              />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                Global Leader in Welding Solutions
              </h2>
              <div className="space-y-4 sm:space-y-6 text-gray-700 leading-relaxed">
                <p className="text-base sm:text-lg">
                  KolArc is a renowned global leader in arc welding solutions, known for producing high-quality welding consumables and equipment designed for industrial applications. As a part of its global expansion, KolArc Turkey has emerged as a key player, delivering innovative welding products that ensure precision, performance, and durability across various industries.
                </p>
                <p className="text-base sm:text-lg">
                  With a focus on providing reliable and cost-effective welding solutions, KolArc Turkey offers a full range of high-performance welding rods, wires, and electrodes, supported by advanced equipment. Whether for construction, shipbuilding, heavy machinery, or maintenance operations, KolArc products meet the highest standards of welding technology.
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
        className={`py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-white transition-all duration-1000 delay-300 ${
          isVisible.products 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Product Range
            </h2>
            <div className="w-16 h-1 bg-blue-500 mx-auto"></div>
            <p className="text-base sm:text-lg text-gray-600 mt-4 sm:mt-6 max-w-3xl mx-auto">
              Comprehensive welding solutions for every industrial application
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {productCategories.map((category, index) => (
              <div 
                key={index}
                className="bg-gray-50 p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="mb-4">
                  <Image
                    src={index === 0 ? "/images/content/Tools.jpg" : "/images/content/Project.jpg"}
                    alt={category.name}
                    width={400}
                    height={250}
                    className="w-full h-40 sm:h-48 object-cover rounded-lg mb-3"
                  />
                </div>
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                    <category.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                    {category.name}
                  </h3>
                </div>
                <ul className="space-y-2 sm:space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start text-xs sm:text-sm text-gray-600">
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* KolArc Cloud Section */}
      <div 
        ref={cloudRef}
        data-section="cloud"
        className={`py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-gray-50 transition-all duration-1000 delay-400 ${
          isVisible.cloud 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              KolArc Cloud Software
            </h2>
            <div className="w-16 h-1 bg-blue-500 mx-auto"></div>
            <p className="text-lg sm:text-xl text-blue-600 font-semibold mt-4 sm:mt-6">
              Revolutionizing Welding Operations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-center">
            <div>
              <Image
                src="/images/services/MRO.png"
                alt="KolArc Cloud Software"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl w-full h-auto"
              />
            </div>
            <div>
              <div className="space-y-4 sm:space-y-6 text-gray-700 leading-relaxed">
                <p className="text-base sm:text-lg">
                  In addition to our cutting-edge welding products, KolArc Turkey is proud to offer KolArc Cloud Software, an innovative solution designed to streamline welding operations, enhance productivity, and provide real-time tracking and analysis.
                </p>
                <div className="bg-blue-50 p-4 sm:p-6 rounded-lg">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Key Benefits</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start text-sm sm:text-base text-gray-700">
                      <CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      Improves your quality assurance
                    </li>
                    <li className="flex items-start text-sm sm:text-base text-gray-700">
                      <CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      Your productivity increases
                    </li>
                    <li className="flex items-start text-sm sm:text-base text-gray-700">
                      <CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      Centralized control and management
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 sm:mt-16">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
              Key Features of KolArc Cloud Software
            </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {cloudFeatures.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-3 sm:p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-blue-500 rounded-full flex items-center justify-center mb-2 sm:mb-3 md:mb-4">
                  <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                </div>
                <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                  {feature.title}
                </h4>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
            </div>
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
              Why Choose KolArc Turkey?
            </h2>
            <div className="w-16 h-1 bg-blue-500 mx-auto"></div>
            <p className="text-base sm:text-lg text-gray-600 mt-4 sm:mt-6 max-w-3xl mx-auto">
              Trusted partnership with Candour International for superior welding solutions in Saudi Arabia
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-gray-50 p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center mb-3 sm:mb-4">
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
