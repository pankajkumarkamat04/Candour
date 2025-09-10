'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Shield, Globe, CheckCircle, ArrowRight, Settings, Building, Users, Target } from 'lucide-react';

export default function ProjectsPage() {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    intro: false,
    features: false,
    materials: false,
    support: false,
    sustainability: false
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const materialsRef = useRef<HTMLDivElement>(null);
  const supportRef = useRef<HTMLDivElement>(null);
  const sustainabilityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === heroRef.current) {
            setIsVisible(prev => ({ ...prev, hero: true }));
          } else if (entry.target === introRef.current) {
            setIsVisible(prev => ({ ...prev, intro: true }));
          } else if (entry.target === featuresRef.current) {
            setIsVisible(prev => ({ ...prev, features: true }));
          } else if (entry.target === materialsRef.current) {
            setIsVisible(prev => ({ ...prev, materials: true }));
          } else if (entry.target === supportRef.current) {
            setIsVisible(prev => ({ ...prev, support: true }));
          } else if (entry.target === sustainabilityRef.current) {
            setIsVisible(prev => ({ ...prev, sustainability: true }));
          }
        }
      });
    }, observerOptions);

    const refs = [heroRef, introRef, featuresRef, materialsRef, supportRef, sustainabilityRef];
    refs.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const projectFeatures = [
    {
      title: 'Customised Solutions',
      description: 'We know that no two projects are alike. That\'s why our team of experts takes the time to understand the specific requirements of your project, industry, and supply chain challenges.',
      icon: Target,
      items: [
        'Specialised Material Sourcing',
        'Complex Logistics Management',
        'Tailored Procurement Plans'
      ]
    },
    {
      title: 'Seamless Collaboration',
      description: 'Effective communication is the cornerstone of any successful project. We work hand-in-hand with your team to ensure real-time updates, streamline decision-making, and avoid delays.',
      icon: Users,
      items: [
        'Direct Engagement',
        'Real-Time Tracking',
        'Transparent Communication'
      ]
    },
    {
      title: 'Optimised Supply Chain',
      description: 'Our supply chain experts focus on optimising every link, from supplier selection to inventory management. We help you reduce costs, streamline processes, and enhance project outcomes.',
      icon: Settings,
      items: [
        'Supply Chain Efficiency',
        'Waste Reduction',
        'Resource Optimisation'
      ]
    },
    {
      title: 'Risk Control & Emergency Planning',
      description: 'We know that unforeseen challenges are inevitable in project management. That\'s why we take a proactive approach to risk management and emergency preparedness.',
      icon: Shield,
      items: [
        'Proactive Risk Mitigation',
        'Emergency Preparedness',
        'Contingency Planning'
      ]
    }
  ];

  const pipingMaterials = [
    {
      title: 'Pipes – Grades & Types',
      items: [
        'Carbon Steel (ASTM A106 Gr. B, A53 Gr. B, API 5L Gr. B/X42/X52/X60/X65)',
        'Stainless Steel (SS 304, 304L, 316, 316L, 321, 347)',
        'Duplex & Super Duplex (UNS S31803, S32750)',
        'Alloy Steel (ASTM A335 P5, P9, P11, P22, P91)',
        'Copper, Brass & Cu-Ni (70/30, 90/10)',
        'HDPE, PVC, CPVC'
      ]
    },
    {
      title: 'Flanges – Types & Standards',
      items: [
        'Weld Neck Flange (WNRF)',
        'Slip-On Flange (SORF)',
        'Blind Flange',
        'Threaded Flange',
        'Socket Weld Flange',
        'Lap Joint Flange',
        'Spectacle Blind / Spacer'
      ]
    },
    {
      title: 'Valves – Types & Ratings',
      items: [
        'Gate Valves (Rising/Non-Rising Stem)',
        'Globe Valves',
        'Ball Valves (2-way, 3-way, Trunnion Mounted)',
        'Butterfly Valves (Lug, Wafer, Double Offset)',
        'Check Valves (Swing, Wafer, Dual Plate)',
        'Control Valves',
        'Pressure Relief & Safety Valves'
      ]
    },
    {
      title: 'Expansion Joints',
      items: [
        'Metallic Bellows Expansion Joints',
        'Rubber Expansion Joints',
        'Fabric Expansion Joints',
        'Gimbal & Hinged Expansion Joints',
        'Axial, Lateral, Angular Types'
      ]
    },
    {
      title: 'Fasteners',
      items: [
        'Hex Bolts, Heavy Hex Bolts',
        'Stud Bolts (Fully Threaded)',
        'Anchor Bolts & U-Bolts',
        'Cap Screws & Machine Screws',
        'Hex Nuts, Lock Nuts, Dome Nuts',
        'Spring, Flat & Belleville Washers'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div 
        ref={heroRef}
        className={`relative overflow-hidden pt-20 sm:pt-24 md:pt-32 lg:pt-40 xl:pt-44 pb-8 sm:pb-10 md:pb-12 lg:pb-16 transition-all duration-1000 ${
          isVisible.hero 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/90 to-green-800/90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="w-12 sm:w-16 h-1 bg-white mx-auto mb-4 sm:mb-6"></div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight">
              Projects Division
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-green-100 font-semibold mb-4 sm:mb-6 md:mb-8 leading-relaxed">
              Project Supplies & Customized Solutions
            </p>
            <p className="text-sm sm:text-base md:text-lg max-w-4xl mx-auto leading-relaxed">
              At Candour International, we understand that every project is unique, and we believe in offering tailored solutions rather than a one-size-fits-all approach. Whether you&apos;re executing local or global projects, we support your team by providing seamless, customised procurement for your day-to-day needs as well as your critical, large-scale purchases.
            </p>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div 
        ref={introRef}
        className={`py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-gray-50 transition-all duration-1000 delay-200 ${
          isVisible.intro 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-center">
            <div>
              <Image
                src="/Project.jpg"
                alt="Projects Division"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl w-full h-auto"
                priority
              />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                From Pipes to Hardware
              </h2>
              <div className="space-y-4 sm:space-y-6 text-gray-700 leading-relaxed">
                <p className="text-base sm:text-lg">
                  From pipes, valves, and flanges to expansion joints and hardware, we handle it all—ensuring that every part of your project is well-equipped and stays on track.
                </p>
                <p className="text-base sm:text-lg">
                  Our commitment to open and transparent communication fosters trust and ensures everyone is aligned, keeping your project running smoothly and on schedule.
                </p>
                <div className="bg-green-50 p-4 sm:p-6 rounded-lg">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Full-Spectrum Project Support</h3>
                  <p className="text-sm sm:text-base text-gray-700">
                    From local procurement to major item sourcing—we support your projects every step of the way. Whether you need pipes, valves, expansion joints, or any other industrial equipment, Candour International provides both the materials and the strategic support you need to keep your project running smoothly and on budget.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Features Section */}
      <div 
        ref={featuresRef}
        className={`py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-white transition-all duration-1000 delay-300 ${
          isVisible.features 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Project Approach
            </h2>
            <div className="w-16 h-1 bg-green-500 mx-auto"></div>
            <p className="text-base sm:text-lg text-gray-600 mt-4 sm:mt-6 max-w-3xl mx-auto">
              Comprehensive project management and execution for complex industrial projects
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {projectFeatures.map((feature, index) => (
              <div 
                key={index}
                className="bg-gray-50 p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-3 sm:mb-4 md:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-green-500 rounded-full flex items-center justify-center mr-2 sm:mr-3 md:mr-4 flex-shrink-0">
                    <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4 md:mb-6">
                  {feature.description}
                </p>
                <ul className="space-y-1 sm:space-y-2">
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-xs sm:text-sm text-gray-600">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Piping Materials Section */}
      <div 
        ref={materialsRef}
        className={`py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50 transition-all duration-1000 delay-400 ${
          isVisible.materials 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
              Piping Materials & Components
            </h2>
            <div className="w-12 sm:w-16 h-1 bg-green-500 mx-auto"></div>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mt-4 sm:mt-6 max-w-3xl mx-auto">
              Comprehensive range of piping materials and components meeting international standards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {pipingMaterials.map((section, index) => (
              <div 
                key={index}
                className="bg-white p-4 sm:p-6 rounded-xl shadow-lg"
              >
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-1 sm:space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-xs sm:text-sm text-gray-600">
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sustainability Section */}
      <div 
        ref={sustainabilityRef}
        className={`py-16 sm:py-20 lg:py-24 bg-white transition-all duration-1000 delay-500 ${
          isVisible.sustainability 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Sustainability & Ethical Practices
            </h2>
            <div className="w-16 h-1 bg-green-500 mx-auto"></div>
            <p className="text-lg text-gray-600 mt-6 max-w-3xl mx-auto">
              Committed to sustainable practices and ethical sourcing across our supply chain
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Eco-Friendly Solutions</h3>
                    <p className="text-gray-700">
                      We offer green alternatives wherever possible, from recyclable materials to energy-efficient equipment. Our commitment to sustainability helps safeguard the environment while enhancing the reputation and marketability of your project.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Ethical Sourcing</h3>
                    <p className="text-gray-700">
                      We ensure all products and services meet the highest ethical standards, fostering responsible business practices across the supply chain. This commitment to ethics extends to our suppliers and partners.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Image
                src="/mro4.png"
                alt="Sustainability & Ethics"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Trusted Partner Section */}
      <div className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-green-600 to-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Your Trusted Project Partner
            </h2>
            <div className="w-16 h-1 bg-white mx-auto mb-8"></div>
            <p className="text-lg max-w-4xl mx-auto leading-relaxed mb-8">
              Candour International is your trusted partner in overcoming procurement challenges and optimising your supply chain. By delivering customised solutions and offering end-to-end support, we help EPCs and project teams deliver projects on time, within budget, and to the highest standards.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Project Excellence</h3>
                <p className="text-green-100">Delivering projects on time and within budget</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Team Collaboration</h3>
                <p className="text-green-100">Working closely with your project teams</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Quality Standards</h3>
                <p className="text-green-100">Meeting the highest quality requirements</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
