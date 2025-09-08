'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigationLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Services', href: '#' },
    { name: 'Project', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Contact', href: '#' }
  ];

  return (
    <header className="w-10/12 mx-auto bg-black/30 backdrop-blur-sm border-b-4 border-orange-500 rounded-b-3xl absolute top-0 left-1/2 transform -translate-x-1/2 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 lg:h-28">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={200}
              height={50}
              className="w-32 sm:w-40 lg:w-60"
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-10">
            {navigationLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="text-white font-bold text-sm xl:text-lg transition-all duration-300 ease-in-out relative group py-2 px-2 xl:px-3"
              >
                <span className="relative z-10">{link.name}</span>
                {/* Top Line */}
                <div className="absolute top-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300 ease-in-out"></div>
                {/* Bottom Line */}
                <div className="absolute bottom-0 right-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300 ease-in-out"></div>
              </a>
            ))}
          </nav>

          {/* Right side - CTA Button and Mobile Menu */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* CTA Button */}
            <button className="bg-orange-500 hover:bg-white text-white hover:text-orange-500 font-bold px-3 sm:px-6 lg:px-10 py-2 sm:py-3 lg:py-4 rounded-lg text-sm sm:text-lg lg:text-xl transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25 relative overflow-hidden group border-2 border-transparent hover:border-orange-500">
              <span className="relative z-10 hidden sm:inline">GET A QUOTE</span>
              <span className="relative z-10 sm:hidden">QUOTE</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"></div>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden text-white hover:text-orange-500 transition-colors duration-300 p-2"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100 pb-4' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <nav className="flex flex-col space-y-2 pt-4 border-t border-white/20">
            {navigationLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white font-bold text-lg py-3 px-4 hover:bg-orange-500/20 hover:text-orange-500 transition-all duration-300 ease-in-out rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
