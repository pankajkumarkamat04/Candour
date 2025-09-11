'use client';

import { useEffect } from 'react';
import { useSettings } from '@/contexts/SettingsContext';

export default function DynamicMetadata() {
  const { settings } = useSettings();

  useEffect(() => {
    // Update page title
    if (settings.site_name) {
      document.title = `${settings.site_name} - Leading Industrial MRO Solutions`;
    }

    // Update meta description
    if (settings.site_description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', settings.site_description);
      }
    }

    // Update favicon
    if (settings.favicon_url) {
      const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
      if (favicon) {
        favicon.href = settings.favicon_url;
      }
      
      const appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]') as HTMLLinkElement;
      if (appleTouchIcon) {
        appleTouchIcon.href = settings.favicon_url;
      }
    }
  }, [settings]);

  return null;
}
