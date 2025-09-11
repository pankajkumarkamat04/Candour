'use client';

import Image from 'next/image';
import { Target } from 'lucide-react';
import CustomButton from './CustomButton';

const services = [
    {
        id: 1,
        title: "Customized Solutions",
        number: "01",
        description: "We thoroughly assess your procurement processes and MRO requirements to deliver customized solutions aligned with your specific objectives.",
        image: "/images/services/MRO.png"
    },
    {
        id: 2,
        title: "Global Supplier Reach",
        number: "02",
        description: "Our strategic partnerships with a diverse supplier network across the globe, ensuring consistent quality and service through regular evaluations and feedback.",
        image: "/images/content/Tools.jpg"
    },
    {
        id: 3,
        title: "Seamless Integration",
        number: "03",
        description: "By leveraging advanced procurement technologies and seamless system with ERP's, we enhance the efficiency of your procurement operations.",
        image: "/images/content/Project.jpg"
    }
];

export default function ServicesPricingSection() {
    return (
        <div className="py-8 sm:py-12 lg:py-16 bg-gray-50 relative overflow-hidden md:-mb-25">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/content/banner.jpg"
                    alt="Construction Background"
                    fill
                    className="object-cover opacity-20"
                />
            </div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-8 sm:mb-12">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-orange-500 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <Target className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-black">
                        Our Approach
                    </h2>
                </div>

                {/* Services Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {services.map((service) => (
                        <div key={service.id} className="bg-white shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            {/* Service Image */}
                            <div className="relative h-40 sm:h-48 lg:h-56">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover"
                                />
                                {/* Number Overlay */}
                                <div className="absolute top-4 left-4 bg-orange-500 text-white font-bold text-lg sm:text-xl lg:text-2xl w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center">
                                    {service.number}
                                </div>
                            </div>
                            
                            {/* Service Content */}
                            <div className="p-4 sm:p-6 lg:p-8">
                                {/* Title */}
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black mb-3 sm:mb-4 lg:mb-6">
                                    {service.title}
                                </h3>
                                
                                {/* Description */}
                                <p className="text-xs sm:text-sm lg:text-base text-gray-700 mb-4 sm:mb-6 lg:mb-8 leading-relaxed">
                                    {service.description}
                                </p>
                                
                                {/* CTA Button */}
                                <div className="w-full">
                                    <CustomButton text="Learn More" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
