'use client';

import Image from 'next/image';
import CustomButton from './CustomButton';

export default function ConstructionHeroSection2() {
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
            <div className="space-y-2">
              <h2 className="text-orange-400 text-lg sm:text-xl font-semibold uppercase tracking-wider">
                Empowering Industrial Sourcing and Supply Chain Excellence
              </h2>
            </div>
            
            {/* Main Headings */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                Building Your Vision.
              </h1>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-orange-400 -mt-2">
                Creating Real-World Results.
              </h1>
            </div>

            {/* Button */}
            <div className="pt-8">
              <CustomButton text="More About Us" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
