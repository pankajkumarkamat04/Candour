'use client';

// Removed unused imports
import Image from 'next/image';
import CustomButton from './CustomButton';

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden py-10 sm:py-16 lg:py-20">
      {/* Banner Background with Mixed Orange and Black Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/banner.jpg"
          alt="Construction Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-black/40 to-orange-600/25"></div>
      </div>

      {/* Industrial Icon on Left - Hidden on mobile, visible on larger screens */}
      <div className="hidden sm:block absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-20">
        <Image
          src="/Industrial.png"
          alt="Industrial Icon"
          width={1000}
          height={1000}
          className="w-32 sm:w-48 lg:w-64 xl:w-full"
        />
      </div>

      {/* Sharp Circle Background - Responsive sizing */}
      <div className="absolute inset-0 flex items-center justify-center z-5">
        <div className="w-64 h-64 sm:w-96 sm:h-96 lg:w-[600px] lg:h-[600px] xl:w-[800px] xl:h-[800px] bg-orange-500/30 rounded-full transform -translate-x-8 sm:-translate-x-12 lg:-translate-x-20"></div>
      </div>

      {/* Main Content - Text Overlay */}
      <div className="relative z-10 flex items-center justify-center lg:justify-end px-4 sm:px-6 lg:px-8 xl:pr-20 py-10 sm:py-16 lg:py-20">
        <div className="text-center lg:text-left max-w-xs sm:max-w-lg lg:max-w-2xl px-2 sm:px-4 lg:px-8">
          {/* Orange Line and Pre-heading in same line */}
          <div className="flex items-center justify-center lg:justify-start mb-3 sm:mb-4">
            <div className="w-8 sm:w-12 lg:w-16 h-1 bg-orange-500 mr-2 sm:mr-3 lg:mr-4"></div>
            <p className="text-orange-300 text-xs sm:text-sm font-semibold uppercase tracking-wider">
              WELCOME TO CANDOUR
            </p>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3 sm:mb-4">
            Leading provider of engineering solutions and MRO equipment across Saudi Arabia.
          </h1>
          
          {/* Description */}
          <div className="text-orange-100 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6 space-y-2 sm:space-y-3">
            <p>
              Headquartered in the Kingdom, we specialize in delivering tailored, cost-effective supply chain and logistics solutions that meet the evolving demands of industrial operations—both locally and globally.
            </p>
            <p className="font-semibold text-orange-200">
              We are committed to optimizing our clients' supply chains by:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2 sm:ml-4 text-sm sm:text-base">
              <li>Building strong, reliable supplier relationships</li>
              <li>Streamlining procurement and logistics processes</li>
              <li>Maintaining a secure and efficient global sourcing network</li>
            </ul>
          </div>
          
          {/* CTA Button */}
          <div className="flex items-center justify-center lg:justify-start">
            <CustomButton text="Get A Quote" />
          </div>
        </div>
      </div>

    </div>
  );
}
