'use client';

import Image from 'next/image';
import { Factory, Zap, Fuel, HardHat, Settings, Wrench, Cog, Shield, Award, Globe } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function IndustriesWeServeSection() {
  const [isVisible, setIsVisible] = useState({
    header: false,
    industries: false
  });

  const headerRef = useRef<HTMLDivElement>(null);
  const industriesRef = useRef<HTMLDivElement>(null);

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
          } else if (entry.target === industriesRef.current) {
            setIsVisible(prev => ({ ...prev, industries: true }));
          }
        }
      });
    }, observerOptions);

    if (headerRef.current) observer.observe(headerRef.current);
    if (industriesRef.current) observer.observe(industriesRef.current);

    return () => observer.disconnect();
  }, []);

  const industries = [
    {
      id: 1,
      name: "Coal Mine",
      image: "/banner.jpg", // Using existing image as placeholder
      icon: <HardHat className="w-8 h-8" />,
      description: "Complete MRO solutions for upstream, midstream, and downstream operations",
      bgColor: "bg-gray-600"
    },
    {
      id: 2,
      name: "Steel",
      image: "/banner.jpg",
      icon: <Factory className="w-8 h-8" />,
      description: "Specialized equipment and materials for chemical processing plants",
      bgColor: "bg-red-500"
    },
    {
      id: 3,
      name: "Oil",
      image: "/banner.jpg",
      icon: <Fuel className="w-8 h-8" />,
      description: "Critical spares and maintenance solutions for power plants",
      bgColor: "bg-blue-500"
    },
    {
      id: 4,
      name: "Gas",
      image: "/banner.jpg",
      icon: <Zap className="w-8 h-8" />,
      description: "Heavy-duty equipment and safety systems for mining operations",
      bgColor: "bg-cyan-500"
    },
    {
      id: 5,
      name: "Power Station",
      image: "/banner.jpg",
      icon: <Settings className="w-8 h-8" />,
      description: "Industrial machinery and automation solutions",
      bgColor: "bg-yellow-500"
    },
    {
      id: 6,
      name: "Chemistry",
      image: "/banner.jpg",
      icon: <Cog className="w-8 h-8" />,
      description: "Tools, equipment, and materials for construction projects",
      bgColor: "bg-purple-500"
    },
    {
      id: 7,
      name: "Lab",
      image: "/banner.jpg",
      icon: <Shield className="w-8 h-8" />,
      description: "Specialized equipment for marine and offshore operations",
      bgColor: "bg-green-500"
    },
    {
      id: 8,
      name: "Biogas",
      image: "/banner.jpg",
      icon: <Globe className="w-8 h-8" />,
      description: "Pumps, valves, and treatment equipment for water facilities",
      bgColor: "bg-teal-500"
    },
    {
      id: 9,
      name: "Municipal",
      image: "/banner.jpg",
      icon: <Wrench className="w-8 h-8" />,
      description: "Hygienic equipment and processing solutions",
      bgColor: "bg-orange-500"
    },
    {
      id: 10,
      name: "Food & Beverage",
      image: "/banner.jpg",
      icon: <Award className="w-8 h-8" />,
      description: "Precision equipment and compliance solutions",
      bgColor: "bg-pink-500"
    }
  ];

  return (
    <div className="relative bg-gradient-to-br from-gray-50 via-white to-orange-50 py-16 lg:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-orange-500/20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(251,146,60,0.1),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(251,146,60,0.1),transparent_50%)]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div 
          ref={headerRef}
          className={`text-center mb-12 lg:mb-16 transition-all duration-1000 ${
            isVisible.header 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-8 scale-95'
          }`}
        >
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <Factory className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-300 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <h1 className="text-black text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-6">
            Industries We Serve
          </h1>
          
          <p className="text-gray-600 text-xl max-w-4xl mx-auto leading-relaxed font-medium">
            We provide comprehensive MRO and procurement solutions across diverse industries, 
            ensuring reliable supply chains and operational excellence for our global clients.
          </p>
        </div>

        {/* Industries Grid */}
        <div 
          ref={industriesRef}
          className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 transition-all duration-1200 delay-300 ${
            isVisible.industries 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          {industries.map((industry, index) => (
            <div 
              key={industry.id} 
              className={`group relative bg-white shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden transform hover:-translate-y-2 hover:scale-105 ${
                isVisible.industries 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-8 scale-95'
              }`}
              style={{ 
                transitionDelay: isVisible.industries ? `${index * 100}ms` : '0ms'
              }}
            >
              {/* Image */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={industry.image}
                  alt={industry.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/20 transition-all duration-500"></div>
                
                {/* Icon Overlay */}
                <div className={`absolute top-4 right-4 ${industry.bgColor} backdrop-blur-md p-3 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500 transform group-hover:scale-110 shadow-lg text-white`}>
                  {industry.icon}
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Content */}
              <div className="p-6 bg-gradient-to-b from-white to-gray-50">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-500 text-center">
                  {industry.name}
                </h3>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-500 transition-all duration-500 pointer-events-none"></div>
              
              {/* Shine Effect */}
              <div className="absolute inset-0 -top-10 left-0 w-full h-10 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
