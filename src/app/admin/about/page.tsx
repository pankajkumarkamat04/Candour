'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';

interface AboutUs {
  id: number;
  title: string;
  subtitle: string;
  main_content: string;
  vision: string;
  mission: string;
  image_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function AboutUsPage() {
  const [aboutData, setAboutData] = useState<AboutUs[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAbout, setEditingAbout] = useState<AboutUs | null>(null);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await fetch('/api/admin/about');
      const data = await response.json();
      setAboutData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching about us data:', error);
      setLoading(false);
    }
  };

  const handleEdit = (about: AboutUs) => {
    setEditingAbout(about);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this about us data?')) {
      try {
        const response = await fetch(`/api/admin/about/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchAboutData();
        }
      } catch (error) {
        console.error('Error deleting about us data:', error);
      }
    }
  };

  const handleSave = async (aboutData: any) => {
    try {
      const url = editingAbout 
        ? `/api/admin/about/${editingAbout.id}`
        : '/api/admin/about';
      const method = editingAbout ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(aboutData),
      });

      if (response.ok) {
        setShowModal(false);
        setEditingAbout(null);
        fetchAboutData();
      }
    } catch (error) {
      console.error('Error saving about us data:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">About Us</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage about us page content
          </p>
        </div>
        <button
          onClick={() => {
            setEditingAbout(null);
            setShowModal(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add About Us Content
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {aboutData.map((about) => (
            <li key={about.id}>
              <div className="px-4 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    {about.image_url ? (
                      <img
                        className="h-10 w-10 rounded-lg object-cover"
                        src={about.image_url}
                        alt={about.title}
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-500">
                          {about.title.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {about.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {about.subtitle}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(about)}
                    className="text-orange-600 hover:text-orange-900"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(about.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {showModal && (
        <AboutUsModal
          about={editingAbout}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setEditingAbout(null);
          }}
        />
      )}
    </div>
  );
}

function AboutUsModal({ 
  about, 
  onSave, 
  onClose 
}: { 
  about: AboutUs | null; 
  onSave: (data: any) => void; 
  onClose: () => void; 
}) {
  const [formData, setFormData] = useState({
    title: about?.title || '',
    subtitle: about?.subtitle || '',
    main_content: about?.main_content || '',
    vision: about?.vision || '',
    mission: about?.mission || '',
    image_url: about?.image_url || '',
    is_active: about?.is_active ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 transition-opacity" 
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div 
          className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {about ? 'Edit About Us' : 'Add About Us Content'}
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-black"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={formData.subtitle}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-black"
                    />
                  </div>
                </div>

                <ImageUpload
                  label="About Us Image"
                  currentImage={formData.image_url}
                  onImageChange={(imageUrl) => setFormData({ ...formData, image_url: imageUrl })}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Main Content
                  </label>
                  <textarea
                    value={formData.main_content}
                    onChange={(e) => setFormData({ ...formData, main_content: e.target.value })}
                    rows={6}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-black"
                    placeholder="Enter the main about us content..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Vision
                  </label>
                  <textarea
                    value={formData.vision}
                    onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-black"
                    placeholder="Enter the company vision..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Mission
                  </label>
                  <textarea
                    value={formData.mission}
                    onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-black"
                    placeholder="Enter the company mission..."
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Active
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                {about ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
