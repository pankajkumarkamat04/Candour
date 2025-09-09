'use client';

import Image from 'next/image';

export default function LogoSection() {
  const logos = [
    { id: 1, src: '/logo1.jpg', alt: 'Partner Logo 1' },
    { id: 2, src: '/logo2.png', alt: 'Partner Logo 2' },
    { id: 3, src: '/logo3.jpg', alt: 'Partner Logo 3' },
    { id: 4, src: '/logo4.png', alt: 'Partner Logo 4' },
    { id: 5, src: '/logo5.jpg', alt: 'Partner Logo 5' },
    { id: 6, src: '/logo6.jpg', alt: 'Partner Logo 6' },
    { id: 7, src: '/logo7.png', alt: 'Partner Logo 7' },
    { id: 8, src: '/logo8.jpg', alt: 'Partner Logo 8' }
  ];

  return (
    <div className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          
          {/* Left Side - Content (1/3) */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                Trusted by Industry Leaders
              </h2>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                We're proud to partner with leading companies across various industries, delivering reliable MRO solutions and procurement services.
              </p>
              <p className="text-gray-500 text-sm sm:text-base">
                Join hundreds of satisfied customers who trust Candour International for their industrial procurement needs.
              </p>
            </div>
          </div>

          {/* Right Side - Logo Grid (2/3) */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
              {logos.map((logo) => (
                <div
                  key={logo.id}
                  className="group relative bg-white p-4 sm:p-6 lg:p-8 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="relative w-full h-16 sm:h-20 lg:h-24">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
