'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

interface QuoteRequest {
  id: number;
  full_name: string;
  company: string;
  email: string;
  phone: string;
  project_type: string;
  description: string;
  status: 'new' | 'contacted' | 'quoted' | 'closed';
  created_at: string;
}

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await fetch('/api/admin/quotes');
      const data = await response.json();

      if (data.success) {
        setQuotes(data.quotes);
      } else {
        toast.error('Failed to load quote requests');
      }
    } catch (error) {
      console.error('Error fetching quotes:', error);
      toast.error('Failed to load quote requests');
    } finally {
      setLoading(false);
    }
  };

  const updateQuoteStatus = async (id: number, status: string) => {
    try {
      const response = await fetch(`/api/admin/quotes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Quote status updated successfully');
        fetchQuotes();
      } else {
        toast.error('Failed to update quote status');
      }
    } catch (error) {
      console.error('Error updating quote:', error);
      toast.error('Failed to update quote status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'quoted': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
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
        <h1 className="text-2xl font-bold text-gray-900">Quote Requests</h1>
        <p className="mt-2 text-gray-600">Manage customer quote requests</p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {quotes.map((quote) => (
            <li key={quote.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-medium text-gray-900">
                        {quote.full_name}
                      </h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(quote.status)}`}>
                        {quote.status}
                      </span>
                    </div>
                    <div className="mt-1">
                      <p className="text-sm text-gray-500">
                        {quote.company} • {quote.email} • {quote.phone}
                      </p>
                      <p className="text-sm text-gray-500">
                        {quote.project_type} • {new Date(quote.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    {quote.description && (
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                        {quote.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedQuote(quote)}
                      className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                    >
                      View Details
                    </button>
                    <select
                      value={quote.status}
                      onChange={(e) => updateQuoteStatus(quote.id, e.target.value)}
                      className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="quoted">Quoted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Quote Details Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Quote Request Details</h3>
                <button
                  onClick={() => setSelectedQuote(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">Contact Information</h4>
                  <div className="mt-2 space-y-1">
                    <p><span className="font-medium">Name:</span> {selectedQuote.full_name}</p>
                    <p><span className="font-medium">Company:</span> {selectedQuote.company}</p>
                    <p><span className="font-medium">Email:</span> <a href={`mailto:${selectedQuote.email}`} className="text-blue-600 hover:text-blue-800">{selectedQuote.email}</a></p>
                    <p><span className="font-medium">Phone:</span> <a href={`tel:${selectedQuote.phone}`} className="text-blue-600 hover:text-blue-800">{selectedQuote.phone}</a></p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">Project Details</h4>
                  <div className="mt-2 space-y-1">
                    <p><span className="font-medium">Type:</span> {selectedQuote.project_type || 'Not specified'}</p>
                    <p><span className="font-medium">Status:</span> <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedQuote.status)}`}>{selectedQuote.status}</span></p>
                    <p><span className="font-medium">Submitted:</span> {new Date(selectedQuote.created_at).toLocaleString()}</p>
                  </div>
                </div>
                
                {selectedQuote.description && (
                  <div>
                    <h4 className="font-medium text-gray-900">Description</h4>
                    <p className="mt-2 text-gray-600 whitespace-pre-wrap">{selectedQuote.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
