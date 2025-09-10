'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export default function OurOfficesSection() {
  const [isVisible, setIsVisible] = useState({
    header: false,
    map: false
  });

  const headerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

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
          } else if (entry.target === mapRef.current) {
            setIsVisible(prev => ({ ...prev, map: true }));
          }
        }
      });
    }, observerOptions);

    if (headerRef.current) observer.observe(headerRef.current);
    if (mapRef.current) observer.observe(mapRef.current);

    return () => observer.disconnect();
  }, []);

  const offices = [
    {
      id: 1,
      city: 'Riyadh',
      country: 'Saudi Arabia',
      address: 'Prince Naif Bin Abdulaziz Street, Building No 3294, Postal Code 35514',
      phone: '+966 54 375 1793',
      email: 'info@candourinternational.co',
      coordinates: { x: 58, y: 35 },
      isMain: true
    },
    {
      id: 2,
      city: 'Mumbai',
      country: 'India',
      address: 'Industrial Hub, Mumbai',
      phone: '+91 22 1234 5678',
      email: 'india@candourinternational.co',
      coordinates: { x: 68, y: 43 },
      isMain: false
    },
    {
      id: 3,
      city: 'Dubai',
      country: 'UAE',
      address: 'Business Bay, Dubai',
      phone: '+971 4 123 4567',
      email: 'uae@candourinternational.co',
      coordinates: { x: 61, y: 41 },
      isMain: false
    },
    {
      id: 4,
      city: 'Muscat',
      country: 'Oman',
      address: 'Industrial Area, Muscat',
      phone: '+968 2 123 4567',
      email: 'oman@candourinternational.co',
      coordinates: { x: 62, y: 45 },
      isMain: false
    },
    {
      id: 5,
      city: 'London',
      country: 'UK',
      address: 'Financial District, London',
      phone: '+44 20 7123 4567',
      email: 'uk@candourinternational.co',
      coordinates: { x: 45, y: 23 },
      isMain: false
    }
  ];

  return (
    <div className="bg-gray-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-12 lg:mb-16 transition-all duration-1000 ${
            isVisible.header 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-8 scale-95'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            Global FootPrint
          </h2>
        </div>

        {/* Map with Office Location Pins */}
        <div 
          ref={mapRef}
          className={`relative w-full h-96 lg:h-[600px] transition-all duration-1200 delay-300 ${
            isVisible.map 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-12 scale-95'
          }`}
        >
          {/* World Map Image */}
          <Image
            src="/map.jpg"
            alt="World Map with Office Locations"
            fill
            className="object-contain"
          />

          {/* Office Location Pins */}
          {offices.map((office) => (
            <div
              key={office.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                office.isMain ? 'z-20' : 'z-10'
              }`}
              style={{
                left: `${office.coordinates.x}%`,
                top: `${office.coordinates.y}%`
              }}
            >
              <div className={`relative group cursor-pointer ${
                office.isMain ? 'animate-pulse' : ''
              }`}>
                {/* Pin Marker */}
                <div className={`w-8 h-8 rounded-full border-3 border-white shadow-xl ${
                  office.isMain 
                    ? 'bg-orange-500' 
                    : 'bg-blue-500'
                }`}></div>
                
                {/* Pulse Effect for Main Office */}
                {office.isMain && (
                  <div className="absolute inset-0 w-8 h-8 rounded-full bg-orange-500 animate-ping opacity-30"></div>
                )}
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                  <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
                    <div className="font-semibold">{office.city}</div>
                    <div className="text-xs text-gray-300">{office.country}</div>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
