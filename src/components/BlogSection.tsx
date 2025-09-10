'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';

export default function BlogSection() {
  const [isVisible, setIsVisible] = useState({
    heading: false,
    posts: false
  });

  const headingRef = useRef<HTMLDivElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === headingRef.current) {
            setIsVisible(prev => ({ ...prev, heading: true }));
          } else if (entry.target === postsRef.current) {
            setIsVisible(prev => ({ ...prev, posts: true }));
          }
        }
      });
    }, observerOptions);

    if (headingRef.current) observer.observe(headingRef.current);
    if (postsRef.current) observer.observe(postsRef.current);

    return () => observer.disconnect();
  }, []);

  const blogPosts = [
    {
      id: 1,
      slug: 'future-industrial-maintenance-smart-mro-solutions',
      title: 'The Future of Industrial Maintenance: Smart MRO Solutions',
      excerpt: 'Explore how smart maintenance solutions are revolutionizing industrial operations and reducing downtime.',
      author: 'John Smith',
      date: '2024-01-15',
      readTime: '5 min read',
      category: 'Technology',
      image: '/banner.jpg'
    },
    {
      id: 2,
      slug: 'sustainable-manufacturing-green-tools-better-tomorrow',
      title: 'Sustainable Manufacturing: Green Tools for a Better Tomorrow',
      excerpt: 'Discover how eco-friendly tools and sustainable practices are shaping the future of manufacturing.',
      author: 'Sarah Johnson',
      date: '2024-01-10',
      readTime: '4 min read',
      category: 'Sustainability',
      image: '/Tools.jpg'
    },
    {
      id: 3,
      slug: 'welding-technology-advancements-precision-efficiency',
      title: 'Welding Technology Advancements: Precision and Efficiency',
      excerpt: 'Learn about the latest innovations in welding technology that are improving precision and efficiency.',
      author: 'Mike Chen',
      date: '2024-01-05',
      readTime: '6 min read',
      category: 'Technology',
      image: '/Project.jpg'
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div 
          ref={headingRef}
          className={`text-center mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 ${
            isVisible.heading 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Latest Insights
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-orange-500 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest trends, insights, and innovations in industrial solutions and MRO best practices.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div 
          ref={postsRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12 transition-all duration-1000 delay-200 ${
            isVisible.posts 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          {blogPosts.map((post, index) => (
            <article 
              key={post.id}
              className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden ${
                isVisible.posts 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={250}
                  className="w-full h-48 sm:h-56 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 leading-tight line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base mb-4 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center">
          <Link 
            href="/blog"
            className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View All Articles
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
