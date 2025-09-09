'use client';

import Image from 'next/image';
import CustomButton from './CustomButton';
import { useState, useEffect, useRef } from 'react';

export default function ConstructionHeroSection2() {
  const [isVisible, setIsVisible] = useState({
    preHeading: false,
    firstHeading: false,
    secondHeading: false,
    button: false
  });

  const preHeadingRef = useRef<HTMLHeadingElement>(null);
  const firstHeadingRef = useRef<HTMLHeadingElement>(null);
  const secondHeadingRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

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
          } else if (entry.target === firstHeadingRef.current) {
            setIsVisible(prev => ({ ...prev, firstHeading: true }));
          } else if (entry.target === secondHeadingRef.current) {
            setIsVisible(prev => ({ ...prev, secondHeading: true }));
          } else if (entry.target === buttonRef.current) {
            setIsVisible(prev => ({ ...prev, button: true }));
          }
        }
      });
    }, observerOptions);

    if (preHeadingRef.current) observer.observe(preHeadingRef.current);
    if (firstHeadingRef.current) observer.observe(firstHeadingRef.current);
    if (secondHeadingRef.current) observer.observe(secondHeadingRef.current);
    if (buttonRef.current) observer.observe(buttonRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative bg-black overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/banner.jpg"
          alt="Construction site background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 py-16 lg:py-24 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-white space-y-8">
            {/* Pre-heading */}
            <div 
              ref={preHeadingRef}
              className={`space-y-2 transition-all duration-800 ${
                isVisible.preHeading 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-6'
              }`}
            >
              <h2 className="text-orange-400 text-lg sm:text-xl font-semibold uppercase tracking-wider">
                Empowering Industrial Sourcing and Supply Chain Excellence
              </h2>
            </div>
            
            {/* Main Headings */}
            <div>
              <h1 
                ref={firstHeadingRef}
                className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight transition-all duration-1000 delay-200 ${
                  isVisible.firstHeading 
                    ? 'opacity-100 translate-x-0 scale-100' 
                    : 'opacity-0 -translate-x-12 scale-95'
                }`}
              >
                Building Your Vision.
              </h1>
              <h1 
                ref={secondHeadingRef}
                className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-orange-400 -mt-2 transition-all duration-1000 delay-400 ${
                  isVisible.secondHeading 
                    ? 'opacity-100 translate-x-0 scale-100' 
                    : 'opacity-0 translate-x-12 scale-95'
                }`}
              >
                Creating Real-World Results.
              </h1>
            </div>

            {/* Button */}
            <div 
              ref={buttonRef}
              className={`pt-8 transition-all duration-1000 delay-600 ${
                isVisible.button 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-8 scale-95'
              }`}
            >
              <CustomButton text="More About Us" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
