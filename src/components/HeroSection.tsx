'use client';

// Removed unused imports
import Image from 'next/image';
import CustomButton from './CustomButton';

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden py-20">
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

      {/* Industrial Icon on Left */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">
        <Image
          src="/Industrial.png"
          alt="Industrial Icon"
          width={1000}
          height={1000}
          className="w-full"
        />
      </div>


      {/* Sharp Circle Background */}
      <div className="absolute inset-0 flex items-center justify-center z-5">
        <div className="w-[800px] h-[800px] bg-orange-500/30 rounded-full transform -translate-x-20"></div>
      </div>

      {/* Main Content - Text Overlay */}
      <div className="relative z-10 flex items-center justify-end pr-20 py-20">
        <div className="text-left max-w-2xl px-8">
          {/* Orange Line and Pre-heading in same line */}
          <div className="flex items-center mb-4">
            <div className="w-16 h-1 bg-orange-500 mr-4"></div>
            <p className="text-orange-300 text-sm font-semibold uppercase tracking-wider">
              WELCOME TO CANDOUR
            </p>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight mb-4">
            Leading provider of engineering solutions and MRO equipment across Saudi Arabia.
          </h1>
          
          {/* Description */}
          <div className="text-orange-100 text-lg leading-relaxed mb-6 space-y-3">
            <p>
              Headquartered in the Kingdom, we specialize in delivering tailored, cost-effective supply chain and logistics solutions that meet the evolving demands of industrial operations—both locally and globally.
            </p>
            <p className="font-semibold text-orange-200">
              We are committed to optimizing our clients' supply chains by:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Building strong, reliable supplier relationships</li>
              <li>Streamlining procurement and logistics processes</li>
              <li>Maintaining a secure and efficient global sourcing network</li>
            </ul>
          </div>
          
          {/* CTA Button */}
          <div className="flex items-center justify-start">
            <CustomButton text="Get A Quote" />
          </div>
        </div>
      </div>

    </div>
  );
}
