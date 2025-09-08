'use client';

import { ChevronRight } from 'lucide-react';

interface CustomButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

export default function CustomButton({ text, onClick, className = '' }: CustomButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center overflow-hidden transition-all duration-300 hover:scale-105 group ${className}`}
    >
      {/* Orange Text Section */}
      <div className="bg-orange-500 text-black font-bold px-8 py-4 flex items-center justify-center relative group-hover:bg-black group-hover:text-white transition-all duration-300">
        <span className="relative z-10 uppercase">{text}</span>
        {/* Sliding Background */}
        <div className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></div>
        {/* Sliding Text */}
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out">
          <span className="uppercase">{text}</span>
        </div>
      </div>
      
      {/* Black Arrow Section */}
      <div className="bg-black text-white w-14 h-14 flex items-center justify-center relative group-hover:bg-orange-500 group-hover:text-black transition-all duration-300">
        <ChevronRight className="w-6 h-6 relative z-10 transition-all duration-300" />
        {/* Sliding Background */}
        <div className="absolute inset-0 bg-orange-500 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></div>
      </div>
    </button>
  );
}
