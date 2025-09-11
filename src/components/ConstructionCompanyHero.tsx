'use client';

import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

type TabKey = 'Industry Expertise' | 'Product Range' | 'Responsive Service' | 'Tailored Solutions' | 'Quality Commitment';

export default function ConstructionCompanyHero() {
  const [activeTab, setActiveTab] = useState<TabKey>('Industry Expertise');
  const [isVisible, setIsVisible] = useState({
    mainHeading: false,
    tabContent: false,
    statistics: false
  });

  const mainHeadingRef = useRef<HTMLHeadingElement>(null);
  const tabContentRef = useRef<HTMLDivElement>(null);
  const statisticsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === mainHeadingRef.current) {
            setIsVisible(prev => ({ ...prev, mainHeading: true }));
          } else if (entry.target === tabContentRef.current) {
            setIsVisible(prev => ({ ...prev, tabContent: true }));
          } else if (entry.target === statisticsRef.current) {
            setIsVisible(prev => ({ ...prev, statistics: true }));
          }
        }
      });
    }, observerOptions);

    if (mainHeadingRef.current) observer.observe(mainHeadingRef.current);
    if (tabContentRef.current) observer.observe(tabContentRef.current);
    if (statisticsRef.current) observer.observe(statisticsRef.current);

    return () => observer.disconnect();
  }, []);

  const tabContent: Record<TabKey, { title: string; description: string }> = {
    'Industry Expertise': {
      title: 'Industry Expertise',
      description: 'With deep knowledge of industrial and commercial sectors, we understand the demands of complex operations and offer solutions that work in the real world.'
    },
    'Product Range': {
      title: 'Comprehensive Product Range',
      description: 'From welding machines and consumables to critical MRO spares, we offer a one-stop source for high-quality, vetted products from globally recognized brands.'
    },
    'Responsive Service': {
      title: 'Responsive Service',
      description: 'We pride ourselves on fast response times, technical support, and proactive customer care that keeps your operations running smoothly.'
    },
    'Tailored Solutions': {
      title: 'Tailored Solutions',
      description: 'We don\'t just sell—we solve problems. Our team works closely with you to recommend products and services that match your specific application and budget.'
    },
    'Quality Commitment': {
      title: 'Commitment to Quality',
      description: 'Every product we supply is chosen for durability and performance, ensuring you get reliable results with every purchase.'
    }
  };

  return (
    <div className="relative bg-black overflow-hidden">
      {/* Diagonal Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-800/20 to-transparent transform rotate-12 scale-150"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-gray-700/10 to-transparent transform -rotate-12 scale-150"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Top Section - Company Branding and Title */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="flex flex-col items-center justify-center mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded"></div>
            </div>
            <h2 className="text-white text-sm sm:text-lg font-semibold uppercase tracking-wider">
              Industries We Serve
            </h2>
          </div>
          
          <h1 
            ref={mainHeadingRef}
            className={`text-white text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold leading-tight px-4 transition-all duration-1000 ${
              isVisible.mainHeading 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-8 scale-95'
            }`}
          >
            Why Candour?
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          
          {/* Left Side - Main Image with Address Button */}
          <div className="relative">
            {/* Main Construction Workers Image */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] lg:aspect-[5/4]">
              <Image
                src="/images/content/banner.jpg"
                alt="Construction workers discussing blueprints"
                fill
                className="object-cover shadow-2xl"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
            
            {/* Address Button - Right Bottom of Image */}
            <div className="absolute -right-2 sm:-right-4 -bottom-2 sm:-bottom-4 z-20">
              <div className="flex items-center overflow-hidden transition-all duration-300 hover:scale-105 group">
                {/* Orange Text Section */}
                <div className="bg-orange-500 text-black font-bold px-3 sm:px-6 py-2 sm:py-4 flex items-center justify-center relative group-hover:bg-black group-hover:text-white transition-all duration-300">
                  <div className="flex items-center space-x-1 sm:space-x-2 relative z-10">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                    <div className="text-xs font-bold">
                      <div className="hidden sm:block">9915 56th Ave. NW</div>
                      <div className="hidden sm:block">Edmonton, AB T6E 5L7</div>
                      <div className="sm:hidden">Edmonton, AB</div>
                    </div>
                  </div>
                  {/* Sliding Background */}
                  <div className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></div>
                  {/* Sliding Text */}
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                      <div className="text-xs font-bold">
                        <div className="hidden sm:block">9915 56th Ave. NW</div>
                        <div className="hidden sm:block">Edmonton, AB T6E 5L7</div>
                        <div className="sm:hidden">Edmonton, AB</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Black Arrow Section */}
                <div className="bg-black text-white w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center relative group-hover:bg-orange-500 group-hover:text-black transition-all duration-300">
                  <MapPin className="w-3 h-3 sm:w-5 sm:h-5 relative z-10 transition-all duration-300" />
                  {/* Sliding Background */}
                  <div className="absolute inset-0 bg-orange-500 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Service Categories and Content */}
          <div className="space-y-6 sm:space-y-8">

            {/* Benefits Tabs */}
            <div 
              ref={tabContentRef}
              className={`space-y-4 sm:space-y-6 mb-6 sm:mb-8 transition-all duration-1200 delay-200 ${
                isVisible.tabContent 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-8'
              }`}
            >
              {/* Tab Navigation */}
              <div className="flex flex-wrap gap-2 sm:gap-4 border-b border-gray-700">
                {Object.keys(tabContent).map((tabKey) => (
                  <button 
                    key={tabKey}
                    onClick={() => setActiveTab(tabKey as TabKey)}
                    className="relative group pb-3"
                  >
                    <div className={`text-sm sm:text-lg font-semibold cursor-pointer transition-colors duration-300 ${
                      activeTab === tabKey 
                        ? 'text-orange-500' 
                        : 'text-white hover:text-orange-400'
                    }`}>
                      {tabKey}
                    </div>
                    <div className={`absolute bottom-0 left-0 w-full h-1 bg-orange-500 transition-transform duration-300 ${
                      activeTab === tabKey 
                        ? 'transform scale-x-100' 
                        : 'transform scale-x-0 group-hover:scale-x-100'
                    }`}></div>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="min-h-[150px] sm:min-h-[200px]">
                <div className="text-white">
                  <h4 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{tabContent[activeTab].title}</h4>
                  <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                    {tabContent[activeTab].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div 
              ref={statisticsRef}
              className={`flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-8 transition-all duration-1000 delay-500 ${
                isVisible.statistics 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-12 scale-90'
              }`}
            >
              <div className="text-center">
                <div className="text-orange-500 text-4xl sm:text-5xl lg:text-6xl font-bold">100%</div>
                <div className="text-white text-sm sm:text-base lg:text-lg font-semibold">Customer Satisfaction</div>
              </div>
              
              {/* Orange Vertical Line - Hidden on mobile, visible on larger screens */}
              <div className="hidden sm:block w-1 h-16 lg:h-20 bg-orange-500"></div>
              
              {/* Orange Horizontal Line - Visible on mobile, hidden on larger screens */}
              <div className="sm:hidden w-16 h-1 bg-orange-500"></div>
              
              <div className="text-center">
                <div className="text-orange-500 text-4xl sm:text-5xl lg:text-6xl font-bold">1000+</div>
                <div className="text-white text-sm sm:text-base lg:text-lg font-semibold">Active OEM Network</div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Building Graphic Overlay - Bottom Left */}
      <div className="absolute bottom-0 left-0 w-64 aspect-square sm:w-80 md:w-96 lg:w-[500px] lg:aspect-[5/6] opacity-20 z-5">
        <div className="w-full h-full bg-white transform rotate-12 scale-150">
          {/* Building silhouette - simplified representation */}
          <div className="w-full h-full relative">
            <div className="absolute bottom-0 left-0 w-full h-3/4 bg-white"></div>
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gray-200"></div>
            <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 bg-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
