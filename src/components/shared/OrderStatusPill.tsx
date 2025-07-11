import React from 'react';
import { Order } from '../../types';

interface OrderStatusPillProps {
  status: Order['status'];
  className?: string;
}

export const OrderStatusPill: React.FC<OrderStatusPillProps> = ({ status, className = '' }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'shopping':
        return 'bg-yellow-100 text-yellow-800';
      case 'delivering':
        return 'bg-orange-100 text-orange-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'new':
        return 'New';
      case 'shopping':
        return 'Shopping';
      case 'delivering':
        return 'Delivering';
      case 'delivered':
        return 'Delivered';
      default:
        return status;
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles()} ${className}`}>
      {getStatusText()}
    </span>
  );
};