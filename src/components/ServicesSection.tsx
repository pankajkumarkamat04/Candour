'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Building2, Wrench, HardHat } from 'lucide-react';

const services = [
    {
        id: 1,
        title: "MRO Division",
        icon: Building2,
        image: "/images/services/MRO.png",
        description: "Comprehensive maintenance, repair, and operations solutions for industrial equipment",
        href: "/mro"
    },
    {
        id: 2,
        title: "Tools Consumables Division",
        icon: Wrench,
        image: "/images/content/Tools.jpg",
        description: "High-quality tools and consumables for all industrial applications",
        href: "/tools"
    },
    {
        id: 3,
        title: "Projects Division",
        icon: HardHat,
        image: "/images/content/Project.jpg",
        description: "End-to-end project management and execution for complex industrial projects",
        href: "/projects"
    }
];

export default function ServicesSection() {
    const [isVisible, setIsVisible] = useState({
        header: false,
        services: false
    });

    const headerRef = useRef<HTMLDivElement>(null);
    const servicesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (entry.target === headerRef.current) {
                        setIsVisible(prev => ({ ...prev, header: true }));
                    } else if (entry.target === servicesRef.current) {
                        setIsVisible(prev => ({ ...prev, services: true }));
                    }
                }
            });
        }, observerOptions);

        if (headerRef.current) observer.observe(headerRef.current);
        if (servicesRef.current) observer.observe(servicesRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div className="py-10 sm:py-16 lg:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div 
                    ref={headerRef}
                    className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-1000 ${
                        isVisible.header 
                            ? 'opacity-100 translate-y-0 scale-100' 
                            : 'opacity-0 translate-y-8 scale-95'
                    }`}
                >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                        <Building2 className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4 sm:mb-6 px-2">
                        Specializing in Industrial MRO Spares and Consumables <br className="hidden sm:block"></br>Delivering Quality Products at Competitive Prices with the Fastest Delivery
                    </h3>
                </div>

                {/* Services Grid */}
                <div 
                    ref={servicesRef}
                    className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 transition-all duration-1200 delay-300 ${
                        isVisible.services 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-12'
                    }`}
                >
                    {services.map((service, index) => {
                        const IconComponent = service.icon;
                        return (
                            <Link
                                key={service.id}
                                href={service.href}
                                className={`group block transition-all duration-500 ${
                                    isVisible.services 
                                        ? 'opacity-100 translate-y-0 scale-100' 
                                        : 'opacity-0 translate-y-8 scale-95'
                                }`}
                                style={{ 
                                    transitionDelay: isVisible.services ? `${index * 200}ms` : '0ms'
                                }}
                                aria-label={`Learn more about ${service.title}`}
                            >
                                <div 
                                    className='w-full h-48 sm:h-56 lg:h-64 xl:h-100 bg-cover bg-center bg-no-repeat transition-transform duration-300 ease-in-out group-hover:scale-105 overflow-hidden rounded-lg'
                                    style={{ backgroundImage: `url(${service.image})` }}
                                ></div>
                                <div className='mx-4 sm:mx-6 lg:mx-10 p-2 sm:p-3 group-hover:mx-0 bg-white -mt-8 sm:-mt-10 lg:-mt-12 relative z-10 transition-all duration-300 ease-in-out rounded-lg shadow group-hover:shadow-lg' >
                                    <div className='flex justify-center align-center pb-1 sm:pb-2'>
                                        <IconComponent className='w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-black' />
                                    </div>
                                    <h3 className='text-black text-center text-base sm:text-lg font-bold'>{service.title}</h3>
                                </div>
                            </Link>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}
