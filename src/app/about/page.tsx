'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { CheckCircle, Target, Eye } from 'lucide-react';

export default function AboutUsPage() {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    content: false,
    vision: false,
    mission: false
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);

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
          } else if (entry.target === contentRef.current) {
            setIsVisible(prev => ({ ...prev, content: true }));
          } else if (entry.target === visionRef.current) {
            setIsVisible(prev => ({ ...prev, vision: true }));
          } else if (entry.target === missionRef.current) {
            setIsVisible(prev => ({ ...prev, mission: true }));
          }
        }
      });
    }, observerOptions);

    if (heroRef.current) observer.observe(heroRef.current);
    if (contentRef.current) observer.observe(contentRef.current);
    if (visionRef.current) observer.observe(visionRef.current);
    if (missionRef.current) observer.observe(missionRef.current);

    return () => observer.disconnect();
  }, []);

  const aboutData = {
    title: 'About Candour International',
    subtitle: 'Your Trusted Global Partner in MRO Solutions',
    main_content: `Candour International is a globally trusted partner specializing in MRO (Maintenance, Repair, and Operations) solutions, strategic procurement, and the supply of high-quality equipment and consumables across key industries. With established offices in the United Kingdom, India, United Arab Emirates, Oman, and Saudi Arabia, we deliver seamless, end-to-end supply chain solutions that bridge continents and connect markets.

Our commitment to operational excellence and transparent practices sets us apart in an ever-evolving global landscape. At Candour International, we blend local expertise with a global network to provide timely, reliable, and cost-effective sourcing strategies tailored to the specific needs of our clients.

From industrial-grade equipment to critical spare parts and consumables, we ensure quality, continuity, and compliance—driving performance and productivity for organizations worldwide.

Candour International: Powering progress through precision, partnership, and purpose.`,
    vision: 'To become the leading partner for MRO (Maintenance, Repair, and Operations) spares and solutions across industrial and commercial sectors in Saudi Arabia—recognized for our commitment to quality, innovation, and responsiveness to our clients\' evolving operational needs.',
    mission: 'Our mission is to deliver high-quality, reliable MRO products and tailored solutions that meet the specific challenges of our clients. We are committed to exceptional customer service, technical support, and long-term partnerships that ensure operational efficiency and total customer satisfaction.',
    image_url: '/about.png'
  };

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-12 sm:w-16 h-1 bg-orange-500 mx-auto mb-4 sm:mb-6"></div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 leading-tight">
              {aboutData.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-orange-600 font-semibold leading-relaxed">
              {aboutData.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div 
        ref={contentRef}
        className={`py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-28 bg-gray-50 transition-all duration-1000 delay-200 ${
          isVisible.content 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 2xl:gap-20 items-center">
            {/* Image Side */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <Image
                  src={aboutData.image_url || '/about.png'}
                  alt="About Candour International"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-2xl w-full h-auto max-w-lg mx-auto lg:max-w-none"
                  priority
                />
                <div className="absolute inset-0 bg-orange-500/10 rounded-lg"></div>
              </div>
            </div>

            {/* Content Side */}
            <div className="order-1 lg:order-2">
              <div className="prose prose-lg max-w-none">
                <div className="space-y-4 sm:space-y-5 md:space-y-6 text-gray-700 leading-relaxed">
                  {aboutData.main_content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vision & Mission Section */}
      <div className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16">
            {/* Vision */}
            <div 
              ref={visionRef}
              className={`transition-all duration-1000 delay-300 ${
                isVisible.vision 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-8'
              }`}
            >
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg h-full">
                <div className="flex items-center mb-3 sm:mb-4 md:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-orange-500 rounded-full flex items-center justify-center mr-2 sm:mr-3 md:mr-4 flex-shrink-0">
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Our Vision</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
                  {aboutData.vision}
                </p>
              </div>
            </div>

            {/* Mission */}
            <div 
              ref={missionRef}
              className={`transition-all duration-1000 delay-500 ${
                isVisible.mission 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-8'
              }`}
            >
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg h-full">
                <div className="flex items-center mb-3 sm:mb-4 md:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gray-800 rounded-full flex items-center justify-center mr-2 sm:mr-3 md:mr-4 flex-shrink-0">
                    <Target className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Our Mission</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
                  {aboutData.mission}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
              Our Core Values
            </h2>
            <div className="w-12 sm:w-16 h-1 bg-orange-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                title: 'Quality Excellence',
                description: 'We maintain the highest standards in all our products and services, ensuring reliability and performance.',
                icon: CheckCircle
              },
              {
                title: 'Global Reach',
                description: 'With offices across multiple continents, we provide local expertise with global capabilities.',
                icon: Target
              },
              {
                title: 'Customer Focus',
                description: 'Our clients\' success is our priority, driving us to deliver tailored solutions and exceptional service.',
                icon: Eye
              }
            ].map((value, index) => (
              <div 
                key={index}
                className={`text-center p-3 sm:p-4 md:p-6 bg-white rounded-xl shadow-lg transition-all duration-700 delay-${index * 200} ${
                  isVisible.content 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4">
                  <value.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                  {value.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
