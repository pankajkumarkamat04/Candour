'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';

export default function BlogPage() {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    featured: false,
    posts: false
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);

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
          } else if (entry.target === featuredRef.current) {
            setIsVisible(prev => ({ ...prev, featured: true }));
          } else if (entry.target === postsRef.current) {
            setIsVisible(prev => ({ ...prev, posts: true }));
          }
        }
      });
    }, observerOptions);

    if (heroRef.current) observer.observe(heroRef.current);
    if (featuredRef.current) observer.observe(featuredRef.current);
    if (postsRef.current) observer.observe(postsRef.current);

    return () => observer.disconnect();
  }, []);

  const blogPosts = [
    {
      id: 1,
      slug: 'future-industrial-maintenance-smart-mro-solutions',
      title: 'The Future of Industrial Maintenance: Smart MRO Solutions',
      excerpt: 'Explore how smart maintenance solutions are revolutionizing industrial operations and reducing downtime.',
      content: 'In today\'s rapidly evolving industrial landscape, smart maintenance solutions are becoming the cornerstone of operational excellence. Companies are increasingly adopting predictive maintenance technologies, IoT sensors, and AI-driven analytics to optimize their maintenance, repair, and operations (MRO) processes. This transformation not only reduces unexpected downtime but also significantly lowers operational costs while improving overall equipment effectiveness.',
      author: 'John Smith',
      date: '2024-01-15',
      readTime: '5 min read',
      category: 'Technology',
      image: '/banner.jpg',
      featured: true
    },
    {
      id: 2,
      slug: 'sustainable-manufacturing-green-tools-better-tomorrow',
      title: 'Sustainable Manufacturing: Green Tools for a Better Tomorrow',
      excerpt: 'Discover how eco-friendly tools and sustainable practices are shaping the future of manufacturing.',
      content: 'Sustainability in manufacturing is no longer a choice but a necessity. As environmental concerns continue to grow, manufacturers are turning to green tools and sustainable practices to reduce their carbon footprint. From energy-efficient power tools to recyclable materials, the industry is embracing innovative solutions that balance productivity with environmental responsibility.',
      author: 'Sarah Johnson',
      date: '2024-01-10',
      readTime: '4 min read',
      category: 'Sustainability',
      image: '/Tools.jpg',
      featured: false
    },
    {
      id: 3,
      slug: 'welding-technology-advancements-precision-efficiency',
      title: 'Welding Technology Advancements: Precision and Efficiency',
      excerpt: 'Learn about the latest innovations in welding technology that are improving precision and efficiency.',
      content: 'Welding technology has seen remarkable advancements in recent years, with new techniques and equipment that offer unprecedented precision and efficiency. From automated welding systems to advanced consumables, these innovations are enabling manufacturers to achieve higher quality welds while reducing material waste and production time.',
      author: 'Mike Chen',
      date: '2024-01-05',
      readTime: '6 min read',
      category: 'Technology',
      image: '/Project.jpg',
      featured: false
    },
    {
      id: 4,
      slug: 'supply-chain-optimization-mro-industry',
      title: 'Supply Chain Optimization in the MRO Industry',
      excerpt: 'Understanding how to optimize supply chains for better MRO operations and cost efficiency.',
      content: 'Supply chain optimization is critical for MRO operations, especially in today\'s globalized economy. Companies are leveraging advanced analytics, real-time tracking, and strategic partnerships to ensure timely delivery of critical spare parts and consumables. This approach not only reduces inventory costs but also minimizes production disruptions.',
      author: 'Emily Davis',
      date: '2024-01-01',
      readTime: '7 min read',
      category: 'Operations',
      image: '/MRO.png',
      featured: false
    },
    {
      id: 5,
      slug: 'safety-first-best-practices-industrial-tool-usage',
      title: 'Safety First: Best Practices in Industrial Tool Usage',
      excerpt: 'Essential safety guidelines and best practices for using industrial tools and equipment.',
      content: 'Safety is paramount in industrial environments, and proper tool usage is a critical component of workplace safety. This comprehensive guide covers essential safety protocols, proper tool maintenance, and training requirements that help prevent accidents and ensure worker protection in industrial settings.',
      author: 'David Wilson',
      date: '2023-12-28',
      readTime: '5 min read',
      category: 'Safety',
      image: '/industrial.png',
      featured: false
    },
    {
      id: 6,
      slug: 'digital-transformation-industrial-procurement',
      title: 'Digital Transformation in Industrial Procurement',
      excerpt: 'How digital technologies are revolutionizing the way companies procure industrial supplies.',
      content: 'Digital transformation is reshaping industrial procurement, making it more efficient, transparent, and cost-effective. From e-procurement platforms to AI-powered supplier selection, companies are leveraging technology to streamline their purchasing processes and make more informed decisions about their industrial supplies.',
      author: 'Lisa Anderson',
      date: '2023-12-25',
      readTime: '6 min read',
      category: 'Digital',
      image: '/banner.jpg',
      featured: false
    }
  ];

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

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
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 to-orange-800/90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="w-12 sm:w-16 h-1 bg-white mx-auto mb-4 sm:mb-6"></div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight">
              Our Blog
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-orange-100 font-semibold mb-4 sm:mb-6 md:mb-8 leading-relaxed">
              Insights, Trends & Industry Updates
            </p>
            <p className="text-sm sm:text-base md:text-lg max-w-4xl mx-auto leading-relaxed">
              Stay informed with the latest developments in industrial solutions, MRO best practices, and technological innovations.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Post Section */}
      {featuredPost && (
        <div 
          ref={featuredRef}
          className={`py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-28 bg-gray-50 transition-all duration-1000 delay-200 ${
            isVisible.featured 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                Featured Article
              </h2>
              <div className="w-12 sm:w-16 h-1 bg-orange-500 mx-auto"></div>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    width={600}
                    height={400}
                    className="w-full h-64 sm:h-80 lg:h-full object-cover"
                    priority
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                      {featuredPost.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 sm:p-8 md:p-10 lg:p-12">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed">
                    {featuredPost.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                     <Link 
                       href={`/blog/${featuredPost.slug}`}
                       className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300 flex items-center"
                     >
                       Read More
                       <ArrowRight className="w-4 h-4 ml-2" />
                     </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

       {/* Blog Posts Grid */}
       <div 
         id="blog-posts"
         ref={postsRef}
         className={`py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-28 bg-white transition-all duration-1000 delay-400 ${
           isVisible.posts 
             ? 'opacity-100 translate-y-0' 
             : 'opacity-0 translate-y-8'
         }`}
       >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
              Latest Articles
            </h2>
            <div className="w-12 sm:w-16 h-1 bg-orange-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {regularPosts.map((post, index) => (
              <article 
                key={post.id}
                className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden ${
                  isVisible.posts 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
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
        </div>
      </div>
    </div>
  );
}
