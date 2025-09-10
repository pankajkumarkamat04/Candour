'use client';

import { ChevronDown, HardHat } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function QuoteRequestSection() {
  const [isVisible, setIsVisible] = useState({
    form: false,
    content: false
  });

  const formRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === formRef.current) {
            setIsVisible(prev => ({ ...prev, form: true }));
          } else if (entry.target === contentRef.current) {
            setIsVisible(prev => ({ ...prev, content: true }));
          }
        }
      });
    }, observerOptions);

    if (formRef.current) observer.observe(formRef.current);
    if (contentRef.current) observer.observe(contentRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div id="quote-section" className="bg-gray-100 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
          
          {/* Left Side - Simple Quote Form */}
          <div 
            ref={formRef}
            className={`bg-gray-900 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 transition-all duration-1000 ${
              isVisible.form 
                ? 'opacity-100 translate-x-0 scale-100' 
                : 'opacity-0 -translate-x-8 scale-95'
            }`}
          >
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              {/* Form Title */}
              <div className="text-center mb-6 sm:mb-7 md:mb-8">
                <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3">Get Your Quote</h3>
                <p className="text-gray-300 text-sm sm:text-base md:text-lg">Fill out the form below and we&apos;ll get back to you within 24 hours</p>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-white text-xs sm:text-sm font-semibold mb-1 sm:mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-800 text-white px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-700 focus:outline-none focus:border-orange-500"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-white text-xs sm:text-sm font-semibold mb-1 sm:mb-2">
                    Company *
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-800 text-white px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-700 focus:outline-none focus:border-orange-500"
                    placeholder="Enter company name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-white text-xs sm:text-sm font-semibold mb-1 sm:mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    className="w-full bg-gray-800 text-white px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-700 focus:outline-none focus:border-orange-500"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-white text-xs sm:text-sm font-semibold mb-1 sm:mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    className="w-full bg-gray-800 text-white px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-700 focus:outline-none focus:border-orange-500"
                    placeholder="Enter your phone"
                  />
                </div>
              </div>

              {/* Project Details */}
              <div>
                <label className="block text-white text-xs sm:text-sm font-semibold mb-1 sm:mb-2">
                  Project Type
                </label>
                <div className="relative">
                  <select className="w-full bg-gray-800 text-white px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-700 appearance-none focus:outline-none focus:border-orange-500">
                    <option value="">Select project type</option>
                    <option value="MRO Supplies">MRO Supplies</option>
                    <option value="Industrial Equipment">Industrial Equipment</option>
                    <option value="Construction Materials">Construction Materials</option>
                    <option value="Safety Equipment">Safety Equipment</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-white text-xs sm:text-sm font-semibold mb-1 sm:mb-2">
                  Project Description
                </label>
                <textarea
                  rows={3}
                  className="w-full bg-gray-800 text-white px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-700 focus:outline-none focus:border-orange-500 resize-none"
                  placeholder="Describe your project requirements..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-3 sm:pt-4">
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base transition-colors duration-300">
                  Request Quote
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Light Information Section */}
          <div 
            ref={contentRef}
            className={`bg-white p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 relative overflow-hidden transition-all duration-1000 delay-300 ${
              isVisible.content 
                ? 'opacity-100 translate-x-0 scale-100' 
                : 'opacity-0 translate-x-8 scale-95'
            }`}
          >
            {/* Header */}
            <div className="mb-6 sm:mb-7 md:mb-8">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-orange-500 rounded-full mr-2 sm:mr-3"></div>
                <span className="text-orange-500 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                  Need It Fast?
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 sm:mb-5 md:mb-6 animate-pulse-slow">
                Request a Quote Today
              </h2>
              <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                At CANDOUR, we deliver faster quotes, quicker responses, and on-time deliveries—because your operations can&apos;t afford delays.
              </p>
              <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed mt-3 sm:mt-4">
                We thrive on complexity, offering reliable solutions for projects of all scales and environments—on land, over water, or across geographically diverse regions. Backed by long-term guarantees, cutting-edge technologies, and a proven portfolio of successful industrial supply projects, we&apos;re the partner construction and industrial companies count on to perform.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-7 md:mb-8">
              <div className="flex items-center">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full mr-3 sm:mr-4 flex-shrink-0"></div>
                <span className="text-gray-800 font-medium text-sm sm:text-base">Geographical diversity, project complexity</span>
              </div>
              <div className="flex items-center">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full mr-3 sm:mr-4 flex-shrink-0"></div>
                <span className="text-gray-800 font-medium text-sm sm:text-base">Whether building on land or over water</span>
              </div>
              <div className="flex items-center">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full mr-3 sm:mr-4 flex-shrink-0"></div>
                <span className="text-gray-800 font-medium text-sm sm:text-base">Construction companies respond</span>
              </div>
            </div>

            {/* Hard Hat 3D Graphic */}
            <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 opacity-20">
              <div className="w-full h-full bg-gray-300 transform rotate-12 scale-150">
                <div className="w-full h-full relative flex items-center justify-center">
                  <HardHat className="w-12 h-12 sm:w-16 sm:h-16 text-gray-600" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
