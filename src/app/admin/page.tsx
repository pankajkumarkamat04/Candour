'use client';

import { useState, useEffect } from 'react';
import { 
  FileText, 
  Wrench, 
  Building, 
  MapPin, 
  MessageSquare, 
  Users,
  TrendingUp,
  Eye
} from 'lucide-react';

interface DashboardStats {
  sections: number;
  services: number;
  industries: number;
  offices: number;
  brands: number;
  divisions: number;
  blogPosts: number;
  messages: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    sections: 0,
    services: 0,
    industries: 0,
    offices: 0,
    brands: 0,
    divisions: 0,
    blogPosts: 0,
    messages: 0,
  });

  const [recentMessages, setRecentMessages] = useState([]);

  useEffect(() => {
    // Fetch dashboard data
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/dashboard');
      const data = await response.json();
      setStats(data.stats);
      setRecentMessages(data.recentMessages);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const statCards = [
    {
      name: 'Sections',
      value: stats.sections,
      icon: FileText,
      color: 'bg-blue-500',
      href: '/admin/sections'
    },
    {
      name: 'Services',
      value: stats.services,
      icon: Wrench,
      color: 'bg-green-500',
      href: '/admin/services'
    },
    {
      name: 'Industries',
      value: stats.industries,
      icon: Building,
      color: 'bg-purple-500',
      href: '/admin/industries'
    },
    {
      name: 'Offices',
      value: stats.offices,
      icon: MapPin,
      color: 'bg-yellow-500',
      href: '/admin/offices'
    },
    {
      name: 'Brands',
      value: stats.brands,
      icon: Building,
      color: 'bg-red-500',
      href: '/admin/brands'
    },
    {
      name: 'Divisions',
      value: stats.divisions,
      icon: Building,
      color: 'bg-indigo-500',
      href: '/admin/divisions'
    },
    {
      name: 'Blog Posts',
      value: stats.blogPosts,
      icon: FileText,
      color: 'bg-pink-500',
      href: '/admin/blog'
    },
    {
      name: 'Messages',
      value: stats.messages,
      icon: MessageSquare,
      color: 'bg-orange-500',
      href: '/admin/messages'
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your website content and view analytics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <div
            key={card.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => window.location.href = card.href}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className={`rounded-md p-3 ${card.color}`}>
                  <card.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {card.name}
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {card.value}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Messages */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Messages</h3>
          {recentMessages.length > 0 ? (
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {recentMessages.map((message: any) => (
                  <li key={message.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-orange-600">
                            {message.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {message.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {message.email}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {message.subject}
                        </p>
                      </div>
                      <div className="flex-shrink-0 text-sm text-gray-500">
                        {new Date(message.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No recent messages</p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <button className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
              <FileText className="mx-auto h-8 w-8 text-gray-400" />
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Add New Section
              </span>
            </button>
            <button className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
              <Wrench className="mx-auto h-8 w-8 text-gray-400" />
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Add New Service
              </span>
            </button>
            <button className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
              <Eye className="mx-auto h-8 w-8 text-gray-400" />
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Preview Website
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
