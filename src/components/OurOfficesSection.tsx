'use client';

import Image from 'next/image';
import { MapPin, Globe, Building2, Phone, Mail } from 'lucide-react';

export default function OurOfficesSection() {
  const offices = [
    {
      id: 1,
      city: 'Jubail',
      country: 'USA',
      address: '123 Industrial Zone, Jubail, USA',
      phone: '+1 (555) 123-4567',
      email: 'usa@candour-intl.com',
      coordinates: { x: 20, y: 30 },
      isMain: true
    },
    {
      id: 2,
      city: 'Dubai',
      country: 'UAE',
      address: '789 Trade Center, Dubai 12345',
      phone: '+971 4 123 4567',
      email: 'uae@candour-intl.com',
      coordinates: { x: 61, y: 41 },
      isMain: false
    },
    {
      id: 3,
      city: 'Muscat',
      country: 'Oman',
      address: '321 Business Bay, Muscat 112',
      phone: '+968 2 123 4567',
      email: 'oman@candour-intl.com',
      coordinates: { x: 62, y: 45 },
      isMain: false
    },
    {
      id: 4,
      city: 'London',
      country: 'UK',
      address: '123 Business District, London EC1A 4HD',
      phone: '+44 20 7123 4567',
      email: 'uk@candour-intl.com',
      coordinates: { x: 45, y: 23 },
      isMain: false
    },
    {
      id: 5,
      city: 'Calicut',
      country: 'India',
      address: '456 Industrial Area, Calicut 673001',
      phone: '+91 495 123 4567',
      email: 'india@candour-intl.com',
      coordinates: { x: 68, y: 43 },
      isMain: false
    }
  ];

  return (
    <div className="bg-gray-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            Global FootPrint
          </h2>
        </div>

        {/* Map with Office Location Pins */}
        <div className="relative w-full h-96 lg:h-[600px]">
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
