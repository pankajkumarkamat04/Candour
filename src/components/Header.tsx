'use client';

// Removed unused imports
import Image from 'next/image';

export default function Header() {
  return (
    <header className="w-10/12 mx-auto bg-black/30 backdrop-blur-sm border-b-4 border-orange-500 rounded-b-3xl absolute top-0 left-1/2 transform -translate-x-1/2 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-28">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={200}
              height={50}
              className="w-60"
            />
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-10">
            <a href="#" className="text-white font-bold text-lg transition-all duration-300 ease-in-out relative group py-2 px-3">
              <span className="relative z-10">Home</span>
              {/* Top Line */}
              <div className="absolute top-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300 ease-in-out"></div>
              {/* Bottom Line */}
              <div className="absolute bottom-0 right-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300 ease-in-out"></div>
            </a>
            <a href="#" className="text-white font-bold text-lg transition-all duration-300 ease-in-out relative group py-2 px-3">
              <span className="relative z-10">About</span>
              {/* Top Line */}
              <div className="absolute top-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300 ease-in-out"></div>
              {/* Bottom Line */}
              <div className="absolute bottom-0 right-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300 ease-in-out"></div>
            </a>
            <a href="#" className="text-white font-bold text-lg transition-all duration-300 ease-in-out relative group py-2 px-3">
              <span className="relative z-10">Services</span>
              {/* Top Line */}
              <div className="absolute top-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300 ease-in-out"></div>
              {/* Bottom Line */}
              <div className="absolute bottom-0 right-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300 ease-in-out"></div>
            </a>
            <a href="#" className="text-white font-bold text-lg transition-all duration-300 ease-in-out relative group py-2 px-3">
              <span className="relative z-10">Project</span>
              {/* Top Line */}
              <div className="absolute top-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300 ease-in-out"></div>
              {/* Bottom Line */}
              <div className="absolute bottom-0 right-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300 ease-in-out"></div>
            </a>
            <a href="#" className="text-white font-bold text-lg transition-all duration-300 ease-in-out relative group py-2 px-3">
              <span className="relative z-10">Blog</span>
              {/* Top Line */}
              <div className="absolute top-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300 ease-in-out"></div>
              {/* Bottom Line */}
              <div className="absolute bottom-0 right-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300 ease-in-out"></div>
            </a>
            <a href="#" className="text-white font-bold text-lg transition-all duration-300 ease-in-out relative group py-2 px-3">
              <span className="relative z-10">Contact</span>
              {/* Top Line */}
              <div className="absolute top-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300 ease-in-out"></div>
              {/* Bottom Line */}
              <div className="absolute bottom-0 right-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300 ease-in-out"></div>
            </a>
          </nav>

          {/* Right side button */}
          <div className="flex items-center">
            {/* CTA Button */}
            <button className="bg-orange-500 hover:bg-white text-white hover:text-orange-500 font-bold px-10 py-4 rounded-lg text-xl transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25 relative overflow-hidden group border-2 border-transparent hover:border-orange-500">
              <span className="relative z-10">GET A QUOTE</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"></div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
