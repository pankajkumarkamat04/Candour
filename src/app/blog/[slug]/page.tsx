'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowRight, Clock, ArrowLeft, Share2, BookOpen } from 'lucide-react';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  fullContent: string;
  author: string;
  authorBio: string;
  authorImage: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured: boolean;
  tags: string[];
  relatedPosts: number[];
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    content: false,
    author: false,
    related: false
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);
  const relatedRef = useRef<HTMLDivElement>(null);

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
          } else if (entry.target === contentRef.current) {
            setIsVisible(prev => ({ ...prev, content: true }));
          } else if (entry.target === authorRef.current) {
            setIsVisible(prev => ({ ...prev, author: true }));
          } else if (entry.target === relatedRef.current) {
            setIsVisible(prev => ({ ...prev, related: true }));
          }
        }
      });
    }, observerOptions);

    if (heroRef.current) observer.observe(heroRef.current);
    if (contentRef.current) observer.observe(contentRef.current);
    if (authorRef.current) observer.observe(authorRef.current);
    if (relatedRef.current) observer.observe(relatedRef.current);

    return () => observer.disconnect();
  }, []);

  // Dummy blog posts data
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      slug: 'future-industrial-maintenance-smart-mro-solutions',
      title: 'The Future of Industrial Maintenance: Smart MRO Solutions',
      excerpt: 'Explore how smart maintenance solutions are revolutionizing industrial operations and reducing downtime.',
      content: 'In today\'s rapidly evolving industrial landscape, smart maintenance solutions are becoming the cornerstone of operational excellence.',
      fullContent: `In today&apos;s rapidly evolving industrial landscape, smart maintenance solutions are becoming the cornerstone of operational excellence. Companies are increasingly adopting predictive maintenance technologies, IoT sensors, and AI-driven analytics to optimize their maintenance, repair, and operations (MRO) processes. This transformation not only reduces unexpected downtime but also significantly lowers operational costs while improving overall equipment effectiveness.

## The Rise of Smart Maintenance

The traditional approach to maintenance has been largely reactive – fixing equipment only after it breaks down. However, this method is costly, inefficient, and can lead to significant production losses. Smart maintenance solutions are changing this paradigm by enabling predictive and preventive maintenance strategies.

### Key Technologies Driving Change

**Internet of Things (IoT) Sensors**: These devices continuously monitor equipment performance, collecting real-time data on vibration, temperature, pressure, and other critical parameters. This data provides early warning signs of potential failures.

**Artificial Intelligence and Machine Learning**: AI algorithms analyze vast amounts of sensor data to identify patterns and predict when equipment is likely to fail. This enables maintenance teams to schedule repairs during planned downtime.

**Digital Twins**: Virtual replicas of physical equipment allow engineers to simulate different scenarios and optimize maintenance strategies without affecting actual operations.

## Benefits of Smart MRO Solutions

### 1. Reduced Downtime
By predicting failures before they occur, smart maintenance solutions can reduce unplanned downtime by up to 70%. This translates to significant cost savings and improved productivity.

### 2. Cost Optimization
Predictive maintenance helps optimize spare parts inventory and reduces the need for emergency repairs, which are typically more expensive than planned maintenance.

### 3. Improved Safety
Early detection of equipment issues helps prevent accidents and ensures a safer working environment for maintenance personnel.

### 4. Enhanced Efficiency
Smart maintenance solutions provide insights into equipment performance, enabling continuous optimization of operational processes.

## Implementation Challenges

While the benefits are clear, implementing smart MRO solutions comes with its own set of challenges:

- **Initial Investment**: The upfront cost of sensors, software, and training can be significant.
- **Data Management**: Handling and analyzing large volumes of data requires robust IT infrastructure.
- **Skills Gap**: Maintenance teams need training to work with new technologies and interpret data insights.
- **Integration**: Connecting new systems with existing infrastructure can be complex.

## The Future Outlook

As technology continues to advance, we can expect to see even more sophisticated smart maintenance solutions. The integration of augmented reality (AR) for maintenance guidance, blockchain for supply chain transparency, and advanced robotics for automated maintenance tasks are just a few examples of what&apos;s on the horizon.

The companies that embrace these technologies today will be the ones that thrive in the increasingly competitive industrial landscape of tomorrow.`,
      author: 'John Smith',
      authorBio: 'Senior Industrial Engineer with over 15 years of experience in maintenance optimization and smart manufacturing solutions.',
      authorImage: '/ken.png',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'Technology',
      image: '/banner.jpg',
      featured: true,
      tags: ['MRO', 'IoT', 'Predictive Maintenance', 'Industry 4.0', 'Smart Manufacturing'],
      relatedPosts: [2, 3, 4]
    },
    {
      id: 2,
      slug: 'sustainable-manufacturing-green-tools-better-tomorrow',
      title: 'Sustainable Manufacturing: Green Tools for a Better Tomorrow',
      excerpt: 'Discover how eco-friendly tools and sustainable practices are shaping the future of manufacturing.',
      content: 'Sustainability in manufacturing is no longer a choice but a necessity.',
      fullContent: `Sustainability in manufacturing is no longer a choice but a necessity. As environmental concerns continue to grow, manufacturers are turning to green tools and sustainable practices to reduce their carbon footprint. From energy-efficient power tools to recyclable materials, the industry is embracing innovative solutions that balance productivity with environmental responsibility.

## The Green Manufacturing Revolution

The manufacturing sector has traditionally been one of the largest contributors to environmental pollution. However, a growing awareness of climate change and environmental degradation has led to a fundamental shift in how companies approach production processes.

### Key Areas of Focus

**Energy Efficiency**: Modern manufacturing equipment is designed to consume less energy while maintaining or improving performance. Variable frequency drives, LED lighting, and smart energy management systems are becoming standard in green manufacturing facilities.

**Waste Reduction**: Companies are implementing zero-waste policies and circular economy principles to minimize waste generation and maximize resource utilization.

**Renewable Energy**: Many manufacturers are transitioning to renewable energy sources such as solar and wind power to reduce their carbon footprint.

**Sustainable Materials**: The use of recycled and biodegradable materials is becoming increasingly common in manufacturing processes.

## Green Tools and Technologies

### Energy-Efficient Power Tools
Modern power tools are designed with energy efficiency in mind. Brushless motors, lithium-ion batteries, and smart power management systems reduce energy consumption while improving performance.

### Water-Based and Low-VOC Materials
Traditional manufacturing processes often rely on solvents and chemicals that are harmful to the environment. Green alternatives include water-based paints, low-VOC adhesives, and biodegradable lubricants.

### Digital Manufacturing
Digital technologies such as 3D printing and computer-aided manufacturing reduce material waste and enable more efficient production processes.

## Benefits of Sustainable Manufacturing

### Environmental Benefits
- Reduced carbon emissions
- Lower water consumption
- Decreased waste generation
- Improved air and water quality

### Economic Benefits
- Lower operating costs through energy efficiency
- Reduced waste disposal costs
- Access to green financing and incentives
- Improved brand reputation and customer loyalty

### Social Benefits
- Safer working conditions
- Job creation in green technology sectors
- Community health improvements
- Educational opportunities in sustainability

## Challenges and Solutions

### Initial Investment Costs
While green technologies often require higher upfront investments, the long-term savings in energy costs and waste reduction typically offset these initial expenses.

### Technology Integration
Integrating new sustainable technologies with existing systems can be challenging. However, many companies are finding success through phased implementation and employee training programs.

### Supply Chain Complexity
Ensuring sustainability throughout the entire supply chain requires close collaboration with suppliers and partners. This can be complex but is essential for true sustainability.

## The Road Ahead

The future of manufacturing lies in sustainable practices and green technologies. Companies that invest in these areas today will not only contribute to environmental protection but also gain competitive advantages in an increasingly eco-conscious market.

The transition to sustainable manufacturing is not just an environmental imperative; it&apos;s also a business opportunity that can drive innovation, reduce costs, and create new markets.`,
      author: 'Sarah Johnson',
      authorBio: 'Environmental Engineer specializing in sustainable manufacturing processes and green technology implementation.',
      authorImage: '/ken2.png',
      date: '2024-01-10',
      readTime: '6 min read',
      category: 'Sustainability',
      image: '/Tools.jpg',
      featured: false,
      tags: ['Sustainability', 'Green Manufacturing', 'Environmental', 'Eco-Friendly', 'Circular Economy'],
      relatedPosts: [1, 5, 6]
    },
    {
      id: 3,
      slug: 'welding-technology-advancements-precision-efficiency',
      title: 'Welding Technology Advancements: Precision and Efficiency',
      excerpt: 'Learn about the latest innovations in welding technology that are improving precision and efficiency.',
      content: 'Welding technology has seen remarkable advancements in recent years.',
      fullContent: `Welding technology has seen remarkable advancements in recent years, with new techniques and equipment that offer unprecedented precision and efficiency. From automated welding systems to advanced consumables, these innovations are enabling manufacturers to achieve higher quality welds while reducing material waste and production time.

## The Evolution of Welding Technology

Welding has come a long way from its humble beginnings. Today&apos;s welding technology incorporates advanced materials science, robotics, and digital control systems to deliver results that were unimaginable just a few decades ago.

### Key Technological Advances

**Automated Welding Systems**: Robotic welding systems provide consistent, high-quality welds with minimal human intervention. These systems can work 24/7 and maintain consistent quality standards.

**Advanced Welding Consumables**: New electrode and wire formulations offer improved weld properties, better corrosion resistance, and enhanced mechanical strength.

**Digital Control Systems**: Modern welding equipment features sophisticated control systems that monitor and adjust welding parameters in real-time for optimal results.

**Laser and Plasma Welding**: These advanced techniques offer superior precision and can weld materials that were previously difficult to join.

## Precision Welding Techniques

### Gas Tungsten Arc Welding (GTAW/TIG)
TIG welding offers exceptional precision and is ideal for thin materials and critical applications. Recent advances in power source technology have improved arc stability and control.

### Gas Metal Arc Welding (GMAW/MIG)
MIG welding has become more sophisticated with advanced wire feeding systems and improved shielding gas delivery. Pulsed MIG welding provides better control over heat input and reduces distortion.

### Friction Stir Welding (FSW)
This solid-state welding process produces high-quality welds without melting the base material, making it ideal for aluminum and other heat-sensitive materials.

## Efficiency Improvements

### Reduced Setup Time
Modern welding equipment features quick-change consumables and automated setup procedures that significantly reduce preparation time.

### Improved Deposition Rates
Advanced wire formulations and optimized welding parameters increase deposition rates while maintaining quality standards.

### Better Weld Quality
Consistent, high-quality welds reduce the need for rework and improve overall production efficiency.

### Reduced Material Waste
Precise control over welding parameters minimizes material waste and reduces the need for post-welding machining.

## Industry Applications

### Automotive Manufacturing
The automotive industry has embraced advanced welding technologies to improve vehicle safety and reduce weight. Laser welding and resistance spot welding are commonly used in car body assembly.

### Aerospace Industry
Aerospace applications require the highest quality welds with strict quality control. Advanced TIG welding and friction stir welding are widely used in aircraft manufacturing.

### Construction and Infrastructure
Heavy construction projects benefit from high-deposition welding processes that can quickly join large structural components.

### Shipbuilding
The shipbuilding industry relies on efficient welding processes to construct large vessels. Submerged arc welding and flux-cored arc welding are commonly used.

## Future Trends

### Artificial Intelligence Integration
AI-powered welding systems can automatically adjust parameters based on real-time feedback, ensuring optimal weld quality.

### Augmented Reality (AR) Welding
AR technology provides welders with real-time guidance and quality feedback, improving both speed and accuracy.

### 3D Printing Integration
Additive manufacturing techniques are being combined with traditional welding processes to create complex components.

### Sustainable Welding Practices
The industry is moving toward more sustainable practices, including the use of environmentally friendly consumables and energy-efficient equipment.

## Training and Skills Development

As welding technology advances, the need for skilled welders who can operate and maintain these sophisticated systems becomes increasingly important. Training programs are evolving to include both traditional welding skills and modern technology expertise.

The future of welding lies in the continued integration of digital technologies, automation, and advanced materials science. Companies that invest in these technologies today will be well-positioned to meet the demands of tomorrow&apos;s manufacturing landscape.`,
      author: 'Mike Chen',
      authorBio: 'Welding Engineer with expertise in advanced welding technologies and process optimization.',
      authorImage: '/ken3.png',
      date: '2024-01-05',
      readTime: '10 min read',
      category: 'Technology',
      image: '/Project.jpg',
      featured: false,
      tags: ['Welding', 'Technology', 'Precision', 'Automation', 'Manufacturing'],
      relatedPosts: [1, 2, 4]
    }
  ];

  // Find the current blog post by slug
  const currentPost = blogPosts.find(post => post.slug === params.slug);
  
  // Get related posts
  const relatedPosts = currentPost ? blogPosts.filter(post => 
    currentPost.relatedPosts.includes(post.id) && post.id !== currentPost.id
  ) : [];

  if (!currentPost) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you&apos;re looking for doesn&apos;t exist.</p>
          <Link 
            href="/blog"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 inline-flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

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
              {currentPost.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-orange-100 font-semibold mb-4 sm:mb-6 md:mb-8 leading-relaxed">
              {currentPost.excerpt}
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm sm:text-base text-orange-100">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>{currentPost.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{new Date(currentPost.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{currentPost.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Blog Button */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/blog"
            className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div 
        ref={contentRef}
        className={`py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-28 transition-all duration-1000 delay-200 ${
          isVisible.content 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Article Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                <Image
                  src={currentPost.image}
                  alt={currentPost.title}
                  width={800}
                  height={400}
                  className="w-full h-64 sm:h-80 object-cover"
                  priority
                />
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {currentPost.category}
                    </span>
                    <button className="flex items-center text-gray-500 hover:text-orange-500 transition-colors duration-300">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </button>
                  </div>
                  
                  <div className="prose prose-lg max-w-none">
                    {currentPost.fullContent.split('\n\n').map((paragraph, index) => {
                      if (paragraph.startsWith('## ')) {
                        return (
                          <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                            {paragraph.replace('## ', '')}
                          </h2>
                        );
                      } else if (paragraph.startsWith('### ')) {
                        return (
                          <h3 key={index} className="text-xl font-bold text-gray-900 mt-6 mb-3">
                            {paragraph.replace('### ', '')}
                          </h3>
                        );
                      } else if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                        return (
                          <p key={index} className="text-lg font-semibold text-gray-900 mb-4">
                            {paragraph.replace(/\*\*/g, '')}
                          </p>
                        );
                      } else {
                        return (
                          <p key={index} className="text-gray-700 leading-relaxed mb-4">
                            {paragraph}
                          </p>
                        );
                      }
                    })}
                  </div>

                  {/* Tags */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Tags:</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentPost.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Author Card */}
              <div 
                ref={authorRef}
                className={`bg-white rounded-xl shadow-lg p-6 mb-8 transition-all duration-1000 delay-300 ${
                  isVisible.author 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">About the Author</h3>
                <div className="flex items-center mb-4">
                  <Image
                    src={currentPost.authorImage}
                    alt={currentPost.author}
                    width={60}
                    height={60}
                    className="w-15 h-15 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{currentPost.author}</h4>
                    <p className="text-sm text-gray-600">{currentPost.readTime}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {currentPost.authorBio}
                </p>
              </div>

              {/* Reading Progress */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Reading Progress</h3>
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-2 text-orange-500" />
                  <span className="text-sm text-gray-600">{currentPost.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div 
          ref={relatedRef}
          className={`py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-28 bg-gray-50 transition-all duration-1000 delay-400 ${
            isVisible.related 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Related Articles
              </h2>
              <div className="w-12 sm:w-16 h-1 bg-orange-500 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {relatedPosts.map((post, index) => (
                <article 
                  key={post.id}
                  className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden ${
                    isVisible.related 
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
      )}
    </div>
  );
}
