'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import BlogEditor from '@/components/BlogEditor';
import ImageUpload from '@/components/ImageUpload';

const blogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  excerpt: z.string().optional(),
  featured_image: z.string().url().optional().or(z.literal('')),
  status: z.enum(['draft', 'published']),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
});

type BlogForm = z.infer<typeof blogSchema>;

interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string;
  status: 'draft' | 'published';
  meta_title: string;
  meta_description: string;
}

export default function EditBlogPage({ params }: { params: { id: string } }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [blog, setBlog] = useState<Blog | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogForm>({
    resolver: zodResolver(blogSchema),
  });

  const featuredImage = watch('featured_image');

  const fetchBlog = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/blogs/${params.id}`);
      const data = await response.json();

      if (data.success) {
        setBlog(data.blog);
        setContent(data.blog.content);
        reset({
          title: data.blog.title,
          slug: data.blog.slug,
          excerpt: data.blog.excerpt || '',
          featured_image: data.blog.featured_image || '',
          status: data.blog.status,
          meta_title: data.blog.meta_title || '',
          meta_description: data.blog.meta_description || '',
        });
      } else {
        toast.error('Blog not found');
        router.push('/admin/blogs');
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      toast.error('An error occurred while loading the blog');
      router.push('/admin/blogs');
    } finally {
      setLoading(false);
    }
  }, [params.id, router, reset]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  const onSubmit = async (data: BlogForm) => {
    if (!content.trim()) {
      toast.error('Blog content is required');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`/api/admin/blogs/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          content,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Blog post updated successfully!');
        router.push('/admin/blogs');
      } else {
        toast.error(result.error || 'Failed to update blog post');
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      toast.error('An error occurred while updating the blog post');
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

  if (!blog) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Blog not found</h1>
        <p className="mt-2 text-gray-600">The blog post you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Edit Blog Post</h1>
        <p className="mt-2 text-gray-600">Update your blog post content and settings</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">Basic Information</h3>
            
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title *
                </label>
                <input
                  {...register('title')}
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                  placeholder="Enter blog post title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                  Slug *
                </label>
                <input
                  {...register('slug')}
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                  placeholder="blog-post-slug"
                />
                {errors.slug && (
                  <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  URL-friendly version of the title. Only lowercase letters, numbers, and hyphens are allowed.
                </p>
              </div>

              <div>
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
                  Excerpt
                </label>
                <textarea
                  {...register('excerpt')}
                  rows={3}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                  placeholder="Brief description of the blog post"
                />
              </div>

              <div>
                <ImageUpload
                  value={featuredImage}
                  onChange={(url) => setValue('featured_image', url)}
                  type="blog"
                  label="Featured Image"
                  description="Upload a featured image for your blog post (recommended: 1200x630px)"
                  previewClassName="h-40"
                />
                {errors.featured_image && (
                  <p className="mt-1 text-sm text-red-600">{errors.featured_image.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  {...register('status')}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">Content</h3>
            <BlogEditor content={content} onChange={setContent} />
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">SEO Settings</h3>
            
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="meta_title" className="block text-sm font-medium text-gray-700">
                  Meta Title
                </label>
                <input
                  {...register('meta_title')}
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                  placeholder="SEO title for search engines"
                />
              </div>

              <div>
                <label htmlFor="meta_description" className="block text-sm font-medium text-gray-700">
                  Meta Description
                </label>
                <textarea
                  {...register('meta_description')}
                  rows={3}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                  placeholder="SEO description for search engines"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.push('/admin/blogs')}
            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Update Blog Post'}
          </button>
        </div>
      </form>
    </div>
  );
}
