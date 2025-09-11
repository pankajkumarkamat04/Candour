'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

export default function WhatsAppButton({ 
  phoneNumber, 
  message = "Hi! I'm interested in your services. Can you help me?" 
}: WhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [settings, setSettings] = useState<{ [key: string]: unknown } | null>(null);

  useEffect(() => {
    // Fetch settings to get WhatsApp number
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        const data = await response.json();
        if (data.success) {
          setSettings(data.settings);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();

    // Show button after a delay for better UX
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Use phoneNumber prop or fallback to settings
  const whatsappNumber = phoneNumber || settings?.whatsapp_number || settings?.contact_phone;
  
  if (!whatsappNumber || !isVisible) {
    return null;
  }

  // Clean phone number (remove spaces, dashes, parentheses)
  const cleanNumber = String(whatsappNumber || '').replace(/[\s\-\(\)]/g, '');
  
  // Create WhatsApp URL
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

  const handleClick = () => {
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleClick}
        className="group relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 animate-pulse"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <Image
          src="/images/icons/whatsapp.png"
          alt="WhatsApp"
          width={32}
          height={32}
          className="w-8 h-8"
        />
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Chat with us on WhatsApp
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>
        
        {/* Pulse animation ring */}
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
      </button>
    </div>
  );
}
