'use client';

import { useState, useEffect } from 'react';
import { Building2, Wrench, HardHat } from 'lucide-react';
import Image from 'next/image';

const services = [
    {
        id: 1,
        title: "MRO Division",
        icon: Building2,
        image: "/MRO.png",
        description: "Comprehensive maintenance, repair, and operations solutions for industrial equipment"
    },
    {
        id: 2,
        title: "Tools Consumables Division",
        icon: Wrench,
        image: "/Tools.jpg",
        description: "High-quality tools and consumables for all industrial applications"
    },
    {
        id: 3,
        title: "Projects Division",
        icon: HardHat,
        image: "/Project.jpg",
        description: "End-to-end project management and execution for complex industrial projects"
    }
];

export default function ServicesSection() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                        <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-black mb-6">
                        Specializing in Industrial MRO Spares and Consumables <br></br>Delivering Quality Products at Competitive Prices with the Fastest Delivery
                    </h3>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className='group cursor-pointer'>
                            <div 
                                className='w-full h-100 bg-cover bg-center bg-no-repeat transition-transform duration-300 ease-in-out group-hover:scale-105 overflow-hidden'
                                style={{ backgroundImage: `url(${service.image})` }}
                            ></div>
                            <div className='mx-10 p-3 group-hover:mx-0 bg-white -mt-12 relative z-10 transition-all duration-300 ease-in-out' >
                                <div className='flex justify-center align-center pb-2'><Building2 className='w-10 h-10 text-black' /></div>
                                <h3 className='text-black text-center text-lg font-bold'>{service.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
