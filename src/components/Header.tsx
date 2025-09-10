'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (dropdownName: string) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navigationLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { 
      name: 'Divisions', 
      href: '#',
      hasDropdown: true,
      submenu: [
        { name: 'MRO', href: '/mro' },
        { name: 'Tools', href: '/tools' },
        { name: 'Projects', href: '/projects' }
      ]
    },
    { 
      name: 'Brands', 
      href: '#',
      hasDropdown: true,
      submenu: [
        { name: 'KEN Tools', href: '/brands/ken' },
        { name: 'KolArc Welding', href: '/brands/kolarc' }
      ]
    },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '#' }
  ];

  return (
    <header ref={headerRef} className="w-10/12 mx-auto bg-black/30 backdrop-blur-sm border-b-4 border-orange-500 rounded-b-3xl absolute top-0 left-1/2 transform -translate-x-1/2 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 lg:h-28">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="transition-transform duration-300 hover:scale-105">
              <Image
                src="/logo.png"
                alt="Candour International Logo"
                width={200}
                height={50}
                className="w-32 sm:w-40 lg:w-60"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-10">
            {navigationLinks.map((link) => (
              <div key={link.name} className="relative group">
                <button
                  onClick={() => link.hasDropdown ? toggleDropdown(link.name) : undefined}
                  className="text-white font-bold text-sm lg:text-base xl:text-lg transition-all duration-300 ease-in-out relative py-2 px-2 xl:px-3 flex items-center space-x-1 w-full whitespace-nowrap"
                >
                  {link.hasDropdown ? (
                    <a href={link.href} className="flex items-center space-x-1">
                      <span className="relative z-10">{link.name}</span>
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform duration-300 ${
                          activeDropdown === link.name ? 'rotate-180' : ''
                        }`} 
                      />
                    </a>
                  ) : (
                    <a href={link.href} className="flex items-center">
                      <span className="relative z-10">{link.name}</span>
                    </a>
                  )}
                  {/* Top Line */}
                  <div className="absolute top-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300 ease-in-out"></div>
                  {/* Bottom Line */}
                  <div className="absolute bottom-0 right-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300 ease-in-out"></div>
                </button>
                
                {/* Dropdown Menu */}
                {link.hasDropdown && activeDropdown === link.name && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    {link.submenu?.map((subItem) => (
                      <a
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-4 py-2 text-gray-800 hover:bg-orange-500 hover:text-white transition-colors duration-200"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {subItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side - CTA Button and Mobile Menu */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* CTA Button */}
            <button 
              onClick={() => {
                const quoteSection = document.getElementById('quote-section');
                if (quoteSection) {
                  quoteSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-orange-500 hover:bg-white text-white hover:text-orange-500 font-bold px-3 sm:px-4 lg:px-6 xl:px-8 py-2 sm:py-3 lg:py-4 rounded-lg text-xs sm:text-sm lg:text-base xl:text-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25 relative overflow-hidden group border-2 border-transparent hover:border-orange-500 whitespace-nowrap"
            >
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
              <div key={link.name}>
                <button
                  onClick={() => link.hasDropdown ? toggleDropdown(link.name) : undefined}
                  className="w-full text-left text-white font-bold text-lg py-3 px-4 hover:bg-orange-500/20 hover:text-orange-500 transition-all duration-300 ease-in-out rounded-lg flex items-center justify-between"
                >
                  {link.hasDropdown ? (
                    <div className="flex items-center justify-between w-full">
                      <a 
                        href={link.href}
                        className="flex items-center"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleDropdown(link.name);
                        }}
                      >
                        {link.name}
                      </a>
                      <ChevronDown 
                        size={20} 
                        className={`transition-transform duration-300 ${
                          activeDropdown === link.name ? 'rotate-180' : ''
                        }`} 
                      />
                    </div>
                  ) : (
                    <a
                      href={link.href}
                      className="w-full"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  )}
                </button>
                
                {link.hasDropdown && activeDropdown === link.name && (
                  <div className="ml-4 space-y-1">
                    {link.submenu?.map((subItem) => (
                      <a
                        key={subItem.name}
                        href={subItem.href}
                        className="block text-orange-300 font-medium text-base py-2 px-4 hover:bg-orange-500/20 hover:text-orange-500 transition-all duration-300 ease-in-out rounded-lg"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setActiveDropdown(null);
                        }}
                      >
                        {subItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
