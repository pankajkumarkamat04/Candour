'use client';

import { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import ImageUpload from '@/components/ImageUpload';

const settingsSchema = z.object({
  site_name: z.string().min(1, 'Site name is required'),
  site_description: z.string().optional(),
  logo_url: z.string().url().optional().or(z.literal('')),
  favicon_url: z.string().url().optional().or(z.literal('')),
  contact_email: z.string().email().optional().or(z.literal('')),
  contact_phone: z.string().optional(),
  whatsapp_number: z.string().optional(),
  contact_address: z.string().optional(),
  social_facebook: z.string().url().optional().or(z.literal('')),
  social_twitter: z.string().url().optional().or(z.literal('')),
  social_linkedin: z.string().url().optional().or(z.literal('')),
  social_instagram: z.string().url().optional().or(z.literal('')),
});

type SettingsForm = z.infer<typeof settingsSchema>;

interface Settings {
  id?: number;
  site_name: string;
  site_description?: string;
  logo_url?: string;
  favicon_url?: string;
  contact_email?: string;
  contact_phone?: string;
  whatsapp_number?: string;
  contact_address?: string;
  social_facebook?: string;
  social_twitter?: string;
  social_linkedin?: string;
  social_instagram?: string;
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<Settings | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SettingsForm>({
    resolver: zodResolver(settingsSchema),
  });

  const logoUrl = watch('logo_url');
  const faviconUrl = watch('favicon_url');

  const fetchSettings = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/settings');
      const data = await response.json();

      if (data.success) {
        setSettings(data.settings);
        reset(data.settings);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  }, [reset]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const onSubmit = async (data: SettingsForm) => {
    setSaving(true);
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Settings updated successfully!');
        setSettings({ ...settings, ...data });
      } else {
        toast.error(result.error || 'Failed to update settings');
      }
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('An error occurred while updating settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
        <p className="mt-2 text-gray-600">Manage your website settings and branding</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">General Settings</h3>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="site_name" className="block text-sm font-medium text-gray-700">
                  Site Name *
                </label>
                <input
                  {...register('site_name')}
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                  placeholder="Your Site Name"
                />
                {errors.site_name && (
                  <p className="mt-1 text-sm text-red-600">{errors.site_name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="contact_email" className="block text-sm font-medium text-gray-700">
                  Contact Email
                </label>
                <input
                  {...register('contact_email')}
                  type="email"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                  placeholder="contact@example.com"
                />
                {errors.contact_email && (
                  <p className="mt-1 text-sm text-red-600">{errors.contact_email.message}</p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="site_description" className="block text-sm font-medium text-gray-700">
                Site Description
              </label>
              <textarea
                {...register('site_description')}
                rows={3}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                placeholder="Brief description of your website"
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">Branding</h3>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <ImageUpload
                  value={logoUrl}
                  onChange={(url) => setValue('logo_url', url)}
                  type="logo"
                  label="Logo"
                  description="Upload your site logo (recommended: 200x50px, PNG/SVG)"
                  previewClassName="h-32"
                />
                {errors.logo_url && (
                  <p className="mt-1 text-sm text-red-600">{errors.logo_url.message}</p>
                )}
              </div>

              <div>
                <ImageUpload
                  value={faviconUrl}
                  onChange={(url) => setValue('favicon_url', url)}
                  type="favicon"
                  label="Favicon"
                  description="Upload your site favicon (recommended: 32x32px, ICO/PNG)"
                  previewClassName="h-32"
                />
                {errors.favicon_url && (
                  <p className="mt-1 text-sm text-red-600">{errors.favicon_url.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">Contact Information</h3>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="contact_phone" className="block text-sm font-medium text-gray-700">
                  Contact Phone
                </label>
                <input
                  {...register('contact_phone')}
                  type="tel"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                  placeholder="+1-555-0123"
                />
              </div>

              <div>
                <label htmlFor="whatsapp_number" className="block text-sm font-medium text-gray-700">
                  WhatsApp Number
                </label>
                <input
                  {...register('whatsapp_number')}
                  type="tel"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                  placeholder="+1234567890"
                />
                <p className="mt-1 text-xs text-gray-500">Include country code (e.g., +1234567890)</p>
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="contact_address" className="block text-sm font-medium text-gray-700">
                Contact Address
              </label>
              <textarea
                {...register('contact_address')}
                rows={3}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                placeholder="123 Main St, City, State 12345"
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">Social Media</h3>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="social_facebook" className="block text-sm font-medium text-gray-700">
                  Facebook URL
                </label>
                <input
                  {...register('social_facebook')}
                  type="url"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                  placeholder="https://facebook.com/yourpage"
                />
                {errors.social_facebook && (
                  <p className="mt-1 text-sm text-red-600">{errors.social_facebook.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="social_twitter" className="block text-sm font-medium text-gray-700">
                  Twitter URL
                </label>
                <input
                  {...register('social_twitter')}
                  type="url"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                  placeholder="https://twitter.com/yourhandle"
                />
                {errors.social_twitter && (
                  <p className="mt-1 text-sm text-red-600">{errors.social_twitter.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="social_linkedin" className="block text-sm font-medium text-gray-700">
                  LinkedIn URL
                </label>
                <input
                  {...register('social_linkedin')}
                  type="url"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                  placeholder="https://linkedin.com/company/yourcompany"
                />
                {errors.social_linkedin && (
                  <p className="mt-1 text-sm text-red-600">{errors.social_linkedin.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="social_instagram" className="block text-sm font-medium text-gray-700">
                  Instagram URL
                </label>
                <input
                  {...register('social_instagram')}
                  type="url"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                  placeholder="https://instagram.com/yourhandle"
                />
                {errors.social_instagram && (
                  <p className="mt-1 text-sm text-red-600">{errors.social_instagram.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
