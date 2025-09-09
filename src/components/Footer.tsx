'use client';

import { MapPin, Phone, Mail, Globe, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-orange-500 mb-4">Candour International</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Leading industrial MRO solutions and procurement services with a global presence across multiple continents.
              </p>
            </div>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors duration-300 text-sm">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors duration-300 text-sm">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors duration-300 text-sm">Services</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors duration-300 text-sm">Industries</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors duration-300 text-sm">Contact</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors duration-300 text-sm">Get Quote</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors duration-300 text-sm">MRO Supplies</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors duration-300 text-sm">Industrial Equipment</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors duration-300 text-sm">Procurement Services</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors duration-300 text-sm">Supply Chain Management</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors duration-300 text-sm">Technical Support</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors duration-300 text-sm">Quality Assurance</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">Head Office</p>
                  <p className="text-gray-300 text-sm">123 Industrial Zone</p>
                  <p className="text-gray-300 text-sm">Jubail, USA</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <p className="text-gray-300 text-sm">+1 (555) 123-4567</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <p className="text-gray-300 text-sm">info@candour-intl.com</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <p className="text-gray-300 text-sm">www.candour-intl.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 Candour International. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-300 text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-300 text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-300 text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
