'use client';

import { Home, Factory, Lightbulb, Target, Cog, Globe, Clock, DollarSign, Shield, Award } from 'lucide-react';
import CustomButton from './CustomButton';
import { useState, useEffect, useRef } from 'react';

export default function QualityServicesSection() {
  const [isVisible, setIsVisible] = useState({
    header: false,
    description: false,
    services: false,
    cta: false
  });

  const headerRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === headerRef.current) {
            setIsVisible(prev => ({ ...prev, header: true }));
          } else if (entry.target === descriptionRef.current) {
            setIsVisible(prev => ({ ...prev, description: true }));
          } else if (entry.target === servicesRef.current) {
            setIsVisible(prev => ({ ...prev, services: true }));
          } else if (entry.target === ctaRef.current) {
            setIsVisible(prev => ({ ...prev, cta: true }));
          }
        }
      });
    }, observerOptions);

    if (headerRef.current) observer.observe(headerRef.current);
    if (descriptionRef.current) observer.observe(descriptionRef.current);
    if (servicesRef.current) observer.observe(servicesRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovative Solutions",
      description: "We stay ahead of industry trends, offering intelligent, forward-thinking approaches to procurement and supply chain management.",
      isHighlighted: false
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Strategic Sourcing Expertise",
      description: "Our strategic sourcing methodologies are designed to optimize cost, ensure reliability, and support long-term operational goals.",
      isHighlighted: false
    },
    {
      icon: <Cog className="w-8 h-8" />,
      title: "Material & Technical Expertise",
      description: "Our in-depth knowledge of industrial materials, equipment, and consumables ensures we deliver the right solution—every time.",
      isHighlighted: false
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Vast Supplier Network",
      description: "We have established a strong, vetted global supplier base, enabling quick access to high-quality materials at competitive rates.",
      isHighlighted: false
    },
    {
      icon: <Factory className="w-8 h-8" />,
      title: "Global Partnerships & Representations",
      description: "With active international collaborations and local representations in key markets, we offer seamless cross-border service and support.",
      isHighlighted: false
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Timely Deliveries",
      description: "Our robust logistics capabilities ensure consistent, on-time delivery to keep your operations running smoothly.",
      isHighlighted: false
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Cost Efficiency & Competitive Pricing",
      description: "We offer value-driven pricing models without compromising on quality, making us a cost-effective procurement partner.",
      isHighlighted: false
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Uncompromised Quality",
      description: "Every product and service we deliver is backed by strict quality control standards and global compliance practices.",
      isHighlighted: false
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Trusted International Brand",
      description: "Serving a diverse international customer base, Candour International is synonymous with reliability, integrity, and performance.",
      isHighlighted: false
    }
  ];

  return (
    <div className="relative bg-white py-12 sm:py-16 lg:py-24 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-48 h-72 sm:w-64 sm:h-96 lg:w-80 lg:h-[500px] opacity-10">
        <div className="w-full h-full bg-gray-300 transform rotate-12 scale-150">
          {/* Building silhouette */}
          <div className="w-full h-full relative">
            <div className="absolute bottom-0 left-0 w-full h-3/4 bg-gray-400"></div>
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gray-500"></div>
            <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 bg-gray-600"></div>
          </div>
        </div>
      </div>

      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-48 h-72 sm:w-64 sm:h-96 lg:w-80 lg:h-[500px] opacity-10">
        <div className="w-full h-full bg-gray-300 transform -rotate-12 scale-150">
          {/* Refinery and Petrochemical Reactors */}
          <div className="w-full h-full relative flex items-center justify-center">
            <div className="flex flex-col space-y-4">
              {/* Main Reactor */}
              <div className="w-16 h-20 bg-gray-400 rounded-t-full relative">
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-500 rounded-full"></div>
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-gray-500"></div>
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-1 h-6 bg-gray-500"></div>
              </div>
              
              {/* Secondary Reactors */}
              <div className="flex space-x-2">
                <div className="w-8 h-12 bg-gray-500 rounded-t-full relative">
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-gray-600"></div>
                </div>
                <div className="w-8 h-12 bg-gray-500 rounded-t-full relative">
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-gray-600"></div>
                </div>
              </div>
              
              {/* Piping */}
              <div className="flex space-x-1">
                <div className="w-4 h-1 bg-gray-600"></div>
                <div className="w-4 h-1 bg-gray-600"></div>
                <div className="w-4 h-1 bg-gray-600"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div 
          ref={headerRef}
          className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-1000 ${
            isVisible.header 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-8 scale-95'
          }`}
        >
          <div className="flex flex-col items-center justify-center mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
              <Home className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
          
          <h1 className="text-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight px-4">
            Why Choose Us
          </h1>
        </div>

        {/* Company Description */}
        <div 
          ref={descriptionRef}
          className={`text-center mb-8 sm:mb-12 lg:mb-16 max-w-4xl mx-auto px-4 transition-all duration-1200 delay-200 ${
            isVisible.description 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            At Candour International, we go beyond procurement—we build partnerships that power progress. With over 15 years of experience and a solid presence across the UK, India, UAE, Oman, and Saudi Arabia, we are recognized as a premier engineering procurement brand with a global reputation for excellence.
          </p>
        </div>

        {/* Services Grid */}
        <div 
          ref={servicesRef}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12 lg:mb-16 transition-all duration-1200 delay-400 ${
            isVisible.services 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`bg-white p-6 sm:p-8 lg:p-10 xl:p-12 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer hover:scale-105 min-h-[220px] sm:min-h-[250px] lg:min-h-[280px] xl:min-h-[300px] ${
                isVisible.services 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-8 scale-95'
              }`}
              style={{ 
                transitionDelay: isVisible.services ? `${index * 100}ms` : '0ms'
              }}
            >
              <div className="flex flex-col items-center text-center h-full">
                <div className="mb-4 sm:mb-6 text-black group-hover:text-orange-500 transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-black group-hover:text-orange-500 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed group-hover:text-gray-800 transition-colors duration-300 flex-grow">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Orange Dots Separator */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
          </div>
        </div>

        {/* Call to Action Button */}
        <div 
          ref={ctaRef}
          className={`flex justify-center px-4 transition-all duration-1000 delay-600 ${
            isVisible.cta 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-8 scale-95'
          }`}
        >
          <CustomButton text="More About Us" />
        </div>
      </div>
    </div>
  );
}
