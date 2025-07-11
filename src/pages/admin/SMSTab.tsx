import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { SMSMessage } from '../../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const mockSMSMessages: SMSMessage[] = [
  {
    id: '1',
    orderId: '1',
    message: 'Your order #1 is now being prepared. ETA: 30 minutes.',
    timestamp: new Date().toISOString(),
    status: 'delivered'
  },
  {
    id: '2',
    orderId: '1',
    message: 'Your order #1 is out for delivery. ETA: 15 minutes.',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    status: 'delivered'
  },
  {
    id: '3',
    orderId: '2',
    message: 'Your order #2 has been placed successfully.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: 'sent'
  },
  {
    id: '4',
    orderId: '1',
    message: 'Thank you for your order! We will notify you when it\'s ready.',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    status: 'failed'
  }
];

export const SMSTab: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [messages] = useState<SMSMessage[]>(mockSMSMessages);
  const messagesPerPage = 10;

  const totalPages = Math.ceil(messages.length / messagesPerPage);
  const startIndex = (currentPage - 1) * messagesPerPage;
  const endIndex = startIndex + messagesPerPage;
  const currentMessages = messages.slice(startIndex, endIndex);

  const getStatusColor = (status: SMSMessage['status']) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">SMS Message Log</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Order ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Message</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Sent</th>
              </tr>
            </thead>
            <tbody>
              {currentMessages.map(message => (
                <tr key={message.id} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium text-gray-900">#{message.orderId}</td>
                  <td className="py-3 px-4 text-gray-600 max-w-md">
                    <div className="truncate">{message.message}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}>
                      {message.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {formatDistanceToNow(new Date(message.timestamp))} ago
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-500">
              Showing {startIndex + 1} to {Math.min(endIndex, messages.length)} of {messages.length} messages
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};