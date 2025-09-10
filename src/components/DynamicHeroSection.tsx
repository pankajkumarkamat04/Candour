'use client';

import Image from 'next/image';
import CustomButton from './CustomButton';
import { useState, useEffect, useRef } from 'react';

interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  image_url: string;
  background_image: string;
}

export default function DynamicHeroSection() {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);
  
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
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      const response = await fetch('/api/sections/hero');
      if (response.ok) {
        const data = await response.json();
        setHeroData(data);
      }
    } catch (error) {
      console.error('Error fetching hero data:', error);
    } finally {
      setLoading(false);
    }
  };

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

    const refs = [preHeadingRef, mainHeadingRef, descriptionRef, ctaRef];
    refs.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      refs.forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  if (loading) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!heroData) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Welcome to Candour International</h1>
          <p className="mt-4 text-gray-600">Your Trusted Partner in Industrial Solutions</p>
        </div>
      </div>
    );
  }

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: heroData.background_image ? `url(${heroData.background_image})` : 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Pre-heading */}
          <div
            ref={preHeadingRef}
            className={`transform transition-all duration-1000 ease-out ${
              isVisible.preHeading 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-8 opacity-0'
            }`}
          >
            <p className="text-orange-400 text-lg sm:text-xl font-semibold mb-4 tracking-wide uppercase">
              {heroData.subtitle || 'Your Trusted Partner'}
            </p>
          </div>

          {/* Main heading */}
          <h1
            ref={mainHeadingRef}
            className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight transform transition-all duration-1000 ease-out delay-300 ${
              isVisible.mainHeading 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-8 opacity-0'
            }`}
          >
            {heroData.title || 'Welcome to Candour International'}
          </h1>

          {/* Description */}
          <div
            ref={descriptionRef}
            className={`max-w-3xl mx-auto mb-8 transform transition-all duration-1000 ease-out delay-500 ${
              isVisible.description 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-8 opacity-0'
            }`}
          >
            <p className="text-lg sm:text-xl text-gray-200 leading-relaxed">
              {heroData.description || 'We provide comprehensive industrial services and solutions to help your business thrive in today\'s competitive market.'}
            </p>
          </div>

          {/* CTA Button */}
          <div
            ref={ctaRef}
            className={`transform transition-all duration-1000 ease-out delay-700 ${
              isVisible.cta 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-8 opacity-0'
            }`}
          >
            <CustomButton 
              text="Get Started Today" 
              onClick={() => {
                const quoteSection = document.getElementById('quote-section');
                if (quoteSection) {
                  quoteSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
