'use client';

// Removed unused imports
import Image from 'next/image';
import CustomButton from './CustomButton';
import { useState, useEffect, useRef } from 'react';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState({
    preHeading: false,
    mainHeading: false,
    description: false,
    cta: false
  });

  const preHeadingRef = useRef<HTMLDivElement>(null);
  const mainHeadingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === preHeadingRef.current) {
            setIsVisible(prev => ({ ...prev, preHeading: true }));
          } else if (entry.target === mainHeadingRef.current) {
            setIsVisible(prev => ({ ...prev, mainHeading: true }));
          } else if (entry.target === descriptionRef.current) {
            setIsVisible(prev => ({ ...prev, description: true }));
          } else if (entry.target === ctaRef.current) {
            setIsVisible(prev => ({ ...prev, cta: true }));
          }
        }
      });
    }, observerOptions);

    if (preHeadingRef.current) observer.observe(preHeadingRef.current);
    if (mainHeadingRef.current) observer.observe(mainHeadingRef.current);
    if (descriptionRef.current) observer.observe(descriptionRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative overflow-hidden py-10 sm:py-16 lg:py-20">
      {/* Banner Background with Mixed Orange and Black Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/content/banner.jpg"
          alt="Construction Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-black/40 to-orange-600/25"></div>
      </div>

      {/* Sharp Circle Background - Responsive sizing */}
      <div className="absolute inset-0 flex items-center justify-center z-5">
        <div className="w-64 h-64 sm:w-96 sm:h-96 lg:w-[600px] lg:h-[600px] xl:w-[800px] xl:h-[800px] bg-orange-500/30 rounded-full transform -translate-x-8 sm:-translate-x-12 lg:-translate-x-20"></div>
      </div>

      {/* Main Content - Text Overlay */}
      <div className="relative z-10 flex items-center justify-center lg:justify-end px-4 sm:px-6 lg:px-8 xl:pr-20 py-10 sm:py-16 lg:py-20">
        <div className="text-center lg:text-left max-w-xs sm:max-w-lg lg:max-w-2xl px-2 sm:px-4 lg:px-8">
          {/* Orange Line and Pre-heading in same line */}
          <div 
            ref={preHeadingRef}
            className={`flex items-center justify-center lg:justify-start mb-3 sm:mb-4 transition-all duration-800 ${
              isVisible.preHeading 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="w-8 sm:w-12 lg:w-16 h-1 bg-orange-500 mr-2 sm:mr-3 lg:mr-4"></div>
            <p className="text-orange-300 text-xs sm:text-sm font-semibold uppercase tracking-wider">
              WELCOME TO CANDOUR
            </p>
          </div>
          
          {/* Main Heading */}
          <h1 
            ref={mainHeadingRef}
            className={`text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3 sm:mb-4 transition-all duration-1000 delay-200 ${
              isVisible.mainHeading 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-8 scale-95'
            }`}
          >
            Leading provider of engineering solutions and MRO equipment across Saudi Arabia.
          </h1>
          
          {/* Description */}
          <div 
            ref={descriptionRef}
            className={`text-orange-100 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6 space-y-2 sm:space-y-3 transition-all duration-1200 delay-400 ${
              isVisible.description 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-6'
            }`}
          >
            <p>
              Headquartered in the Kingdom, we specialize in delivering tailored, cost-effective supply chain and logistics solutions that meet the evolving demands of industrial operations—both locally and globally.
            </p>
            <p className="font-semibold text-orange-200">
              We are committed to optimizing our clients&apos; supply chains by:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2 sm:ml-4 text-sm sm:text-base">
              <li>Building strong, reliable supplier relationships</li>
              <li>Streamlining procurement and logistics processes</li>
              <li>Maintaining a secure and efficient global sourcing network</li>
            </ul>
          </div>
          
          {/* CTA Button */}
          <div 
            ref={ctaRef}
            className={`flex items-center justify-center lg:justify-start transition-all duration-1000 delay-600 ${
              isVisible.cta 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-8 scale-95'
            }`}
          >
            <CustomButton text="Get A Quote" />
          </div>
        </div>
      </div>

    </div>
  );
}
