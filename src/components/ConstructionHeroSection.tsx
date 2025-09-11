'use client';

import Image from 'next/image';
import { Home } from 'lucide-react';
import CustomButton from './CustomButton';
import { useState, useEffect, useRef } from 'react';

export default function ConstructionHeroSection() {
    const [isVisible, setIsVisible] = useState({
        images: false,
        welcome: false,
        title: false,
        description: false,
        stats: false,
        cta: false
    });

    const imagesRef = useRef<HTMLDivElement>(null);
    const welcomeRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (entry.target === imagesRef.current) {
                        setIsVisible(prev => ({ ...prev, images: true }));
                    } else if (entry.target === welcomeRef.current) {
                        setIsVisible(prev => ({ ...prev, welcome: true }));
                    } else if (entry.target === titleRef.current) {
                        setIsVisible(prev => ({ ...prev, title: true }));
                    } else if (entry.target === descriptionRef.current) {
                        setIsVisible(prev => ({ ...prev, description: true }));
                    } else if (entry.target === statsRef.current) {
                        setIsVisible(prev => ({ ...prev, stats: true }));
                    } else if (entry.target === ctaRef.current) {
                        setIsVisible(prev => ({ ...prev, cta: true }));
                    }
                }
            });
        }, observerOptions);

        if (imagesRef.current) observer.observe(imagesRef.current);
        if (welcomeRef.current) observer.observe(welcomeRef.current);
        if (titleRef.current) observer.observe(titleRef.current);
        if (descriptionRef.current) observer.observe(descriptionRef.current);
        if (statsRef.current) observer.observe(statsRef.current);
        if (ctaRef.current) observer.observe(ctaRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div className="py-8 sm:py-12 lg:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">

                    {/* Left Side - Visual Collage */}
                    <div 
                        ref={imagesRef}
                        className={`relative h-48 sm:h-64 md:h-80 lg:h-96 mb-6 lg:mb-0 transition-all duration-1000 ${
                            isVisible.images 
                                ? 'opacity-100 translate-x-0 scale-100' 
                                : 'opacity-0 -translate-x-8 scale-95'
                        }`}
                    >
                        {/* First Image - 50% width, positioned left and moved up */}
                        <div className="absolute left-0 -top-3 sm:-top-4 lg:-top-6 w-1/2 h-48 sm:h-64 md:h-80 lg:h-96 z-10">
                            <Image
                                src="/images/services/MRO.png"
                                alt="Industrial MRO Equipment"
                                fill
                                className="object-cover shadow-lg"
                            />
                            <div className="absolute inset-0 bg-black/20"></div>
                        </div>
                        
                        {/* Second Image - 50% width, positioned right with overlap and moved down */}
                        <div className="absolute right-0 top-3 sm:top-4 lg:top-6 w-1/2 h-48 sm:h-64 md:h-80 lg:h-96 z-20 -ml-4 sm:-ml-6 lg:-ml-8">
                            <Image
                                src="/images/content/Tools.jpg"
                                alt="Industrial Tools and Consumables"
                                fill
                                className="object-cover shadow-lg"
                            />
                            <div className="absolute inset-0 bg-black/20"></div>
                        </div>
                    </div>

                    {/* Right Side - Text Content */}
                    <div className="relative">
                        {/* Background Building Image */}
                        <div className="absolute -bottom-8 -right-8 w-64 h-80 sm:w-80 sm:h-96 lg:w-96 lg:h-[500px] opacity-10 z-0">
                            <Image
                                src="/images/services/MRO.png"
                                alt="Background Building"
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="relative z-10">
                            {/* Welcome Message */}
                            <div 
                                ref={welcomeRef}
                                className={`flex items-center mb-3 sm:mb-4 transition-all duration-800 ${
                                    isVisible.welcome 
                                        ? 'opacity-100 translate-x-0' 
                                        : 'opacity-0 -translate-x-6'
                                }`}
                            >
                                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                                    <Home className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                </div>
                                <p className="text-orange-500 font-semibold text-xs sm:text-sm uppercase tracking-wider">
                                    Welcome To Candour
                                </p>
                            </div>

                            {/* Main Title */}
                            <h1 
                                ref={titleRef}
                                className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-black leading-tight mb-3 sm:mb-4 transition-all duration-1000 delay-200 ${
                                    isVisible.title 
                                        ? 'opacity-100 translate-y-0 scale-100' 
                                        : 'opacity-0 translate-y-8 scale-95'
                                }`}
                            >
                                Leading Industrial MRO Solutions
                            </h1>

                            {/* Description - Shortened */}
                            <div 
                                ref={descriptionRef}
                                className={`text-black text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 transition-all duration-1200 delay-400 ${
                                    isVisible.description 
                                        ? 'opacity-100 translate-y-0' 
                                        : 'opacity-0 translate-y-6'
                                }`}
                            >
                                <p className="mb-3">
                                    At CANDOUR, we deliver reliable industrial MRO spares, equipment, and consumables with lasting partnerships across Saudi Arabia.
                                </p>
                                <p>
                                    We exceed expectations through genuine OEM parts, global sourcing, and cutting-edge technology solutions.
                                </p>
                            </div>

                            {/* Experience and MRO Sections - Side by Side */}
                            <div 
                                ref={statsRef}
                                className={`flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-6 sm:mb-8 transition-all duration-1000 delay-600 ${
                                    isVisible.stats 
                                        ? 'opacity-100 translate-y-0 scale-100' 
                                        : 'opacity-0 translate-y-8 scale-95'
                                }`}
                            >
                                {/* Left Side - Experience Section */}
                                <div className="text-center sm:text-left flex-1">
                                    <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-1">25+</div>
                                    <div className="text-lg sm:text-xl font-bold text-black">Years of Excellence</div>
                                </div>

                                {/* Orange Vertical Divider */}
                                <div className="hidden sm:block w-1 h-16 bg-orange-500"></div>

                                {/* Right Side - MRO & Industrial Solutions Section */}
                                <div className="flex items-center gap-3 flex-1">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Home className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-base sm:text-lg font-semibold text-black mb-1">
                                            MRO Solutions
                                        </h3>
                                        <p className="text-black text-xs sm:text-sm">
                                            Your trusted industrial partner
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <div 
                                ref={ctaRef}
                                className={`flex justify-center sm:justify-start transition-all duration-1000 delay-800 ${
                                    isVisible.cta 
                                        ? 'opacity-100 translate-y-0 scale-100' 
                                        : 'opacity-0 translate-y-8 scale-95'
                                }`}
                            >
                                <CustomButton text="Get A Quote" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
