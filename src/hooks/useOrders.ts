import useSWR from 'swr';
import { Order } from '../types';
import { mockOrders } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

// Global state to simulate real-time updates
let globalOrders = [...mockOrders];

const fetcher = (url: string, token?: string) => {
  // Mock API calls - in real app, these would be actual HTTP requests
  if (url.includes('/api/orders')) {
    if (url.includes('status=new')) {
      return Promise.resolve(globalOrders.filter(order => order.status === 'new'));
    }
    if (url.includes('/api/orders/')) {
      const orderId = url.split('/').pop();
      return Promise.resolve(globalOrders.find(order => order.id === orderId));
    }
    return Promise.resolve(globalOrders);
  }
  return Promise.resolve([]);
};

// Mock API functions for driver actions
export const claimOrder = async (orderId: string, driverId: string): Promise<Order> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  
  const orderIndex = globalOrders.findIndex(order => order.id === orderId);
  if (orderIndex !== -1) {
    globalOrders[orderIndex] = {
      ...globalOrders[orderIndex],
      driverId,
      status: 'shopping'
    };
    return globalOrders[orderIndex];
  }
  throw new Error('Order not found');
};

export const updateOrderStatus = async (orderId: string, status: Order['status'], eta?: number): Promise<Order> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  
  const orderIndex = globalOrders.findIndex(order => order.id === orderId);
  if (orderIndex !== -1) {
    globalOrders[orderIndex] = {
      ...globalOrders[orderIndex],
      status,
      ...(eta && { eta })
    };
    return globalOrders[orderIndex];
  }
  throw new Error('Order not found');
};

export const useOrders = (filter?: string) => {
  const { token } = useAuth();
  const url = filter ? `/api/orders?${filter}` : '/api/orders';
  const { data, error, mutate } = useSWR<Order[]>(url, (url) => fetcher(url, token || undefined), {
    refreshInterval: 15000, // Poll every 15 seconds
    revalidateOnFocus: true,
  });

  return {
    orders: data || [],
    isLoading: !error && !data,
    error,
    mutate
  };
};

export const useOrder = (orderId: string) => {
  const { token } = useAuth();
  const { data, error, mutate } = useSWR<Order>(
    orderId ? `/api/orders/${orderId}` : null,
    (url) => fetcher(url, token || undefined),
    {
      refreshInterval: 15000,
      revalidateOnFocus: true,
    }
  );

  return {
    order: data,
    isLoading: !error && !data,
    error,
    mutate
  };
};