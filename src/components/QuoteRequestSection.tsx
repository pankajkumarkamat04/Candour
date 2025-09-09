'use client';

import { ChevronDown, HardHat } from 'lucide-react';

export default function QuoteRequestSection() {

  return (
    <div className="bg-gray-100 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Side - Simple Quote Form */}
          <div className="bg-gray-900 p-8 lg:p-12">
            <div className="space-y-6">
              {/* Form Title */}
              <div className="text-center mb-8">
                <h3 className="text-white text-2xl font-bold mb-2">Get Your Quote</h3>
                <p className="text-gray-300">Fill out the form below and we'll get back to you within 24 hours</p>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-800 text-white px-4 py-3 border border-gray-700 focus:outline-none focus:border-orange-500"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Company *
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-800 text-white px-4 py-3 border border-gray-700 focus:outline-none focus:border-orange-500"
                    placeholder="Enter company name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    className="w-full bg-gray-800 text-white px-4 py-3 border border-gray-700 focus:outline-none focus:border-orange-500"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    className="w-full bg-gray-800 text-white px-4 py-3 border border-gray-700 focus:outline-none focus:border-orange-500"
                    placeholder="Enter your phone"
                  />
                </div>
              </div>

              {/* Project Details */}
              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  Project Type
                </label>
                <div className="relative">
                  <select className="w-full bg-gray-800 text-white px-4 py-3 border border-gray-700 appearance-none focus:outline-none focus:border-orange-500">
                    <option value="">Select project type</option>
                    <option value="MRO Supplies">MRO Supplies</option>
                    <option value="Industrial Equipment">Industrial Equipment</option>
                    <option value="Construction Materials">Construction Materials</option>
                    <option value="Safety Equipment">Safety Equipment</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  Project Description
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-gray-800 text-white px-4 py-3 border border-gray-700 focus:outline-none focus:border-orange-500 resize-none"
                  placeholder="Describe your project requirements..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 transition-colors duration-300">
                  Request Quote
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Light Information Section */}
          <div className="bg-white p-8 lg:p-12 relative overflow-hidden">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-4 h-4 bg-orange-500 rounded-full mr-3"></div>
                <span className="text-orange-500 text-sm font-semibold uppercase tracking-wider">
                  Need It Fast?
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-black mb-6">
                Request a Quote Today
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                At CANDOUR, we deliver faster quotes, quicker responses, and on-time deliveries—because your operations can't afford delays.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mt-4">
                We thrive on complexity, offering reliable solutions for projects of all scales and environments—on land, over water, or across geographically diverse regions. Backed by long-term guarantees, cutting-edge technologies, and a proven portfolio of successful industrial supply projects, we're the partner construction and industrial companies count on to perform.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-4 flex-shrink-0"></div>
                <span className="text-gray-800 font-medium">Geographical diversity, project complexity</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-4 flex-shrink-0"></div>
                <span className="text-gray-800 font-medium">Whether building on land or over water</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-4 flex-shrink-0"></div>
                <span className="text-gray-800 font-medium">Construction companies respond</span>
              </div>
            </div>

            {/* Hard Hat 3D Graphic */}
            <div className="absolute bottom-0 left-0 w-32 h-32 lg:w-40 lg:h-40 opacity-20">
              <div className="w-full h-full bg-gray-300 transform rotate-12 scale-150">
                <div className="w-full h-full relative flex items-center justify-center">
                  <HardHat className="w-16 h-16 text-gray-600" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
