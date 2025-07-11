import React, { useState } from 'react';
import { useOrders, claimOrder, updateOrderStatus } from '../../hooks/useOrders';
import { OrderStatusPill } from '../../components/shared/OrderStatusPill';
import { PrimaryButton } from '../../components/shared/PrimaryButton';
import { Package, MapPin, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Order } from '../../types';

export const DriverDashboard: React.FC = () => {
  const { orders, isLoading, mutate } = useOrders();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loadingActions, setLoadingActions] = useState<Record<string, boolean>>({});

  // Filter orders for driver view
  const availableOrders = orders.filter(order => order.status === 'new');
  const myOrders = orders.filter(order => order.driverId === user?.id);

  const setActionLoading = (orderId: string, loading: boolean) => {
    setLoadingActions(prev => ({ ...prev, [orderId]: loading }));
  };

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 px-4 py-2 rounded-lg z-50 text-white ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 3000);
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  const handleClaimOrder = async (orderId: string) => {
    if (!user?.id) return;
    
    setActionLoading(orderId, true);
    try {
      await claimOrder(orderId, user.id);
      await mutate(); // Refresh the orders list
      showToast('Order claimed successfully!');
    } catch (error) {
      showToast('Failed to claim order', 'error');
      console.error('Error claiming order:', error);
    } finally {
      setActionLoading(orderId, false);
    }
  };

  const handleStartShopping = async (orderId: string) => {
    setActionLoading(orderId, true);
    try {
      await updateOrderStatus(orderId, 'shopping');
      await mutate();
      navigate(`/driver/orders/${orderId}/shopping`);
    } catch (error) {
      showToast('Failed to start shopping', 'error');
      console.error('Error starting shopping:', error);
    } finally {
      setActionLoading(orderId, false);
    }
  };

  const handleStartDelivery = async (orderId: string) => {
    setActionLoading(orderId, true);
    try {
      const eta = 15 * 60; // 15 minutes in seconds
      await updateOrderStatus(orderId, 'delivering', eta);
      await mutate();
      showToast(`Started delivery! ETA: ${Math.floor(eta / 60)} minutes`);
    } catch (error) {
      showToast('Failed to start delivery', 'error');
      console.error('Error starting delivery:', error);
    } finally {
      setActionLoading(orderId, false);
    }
  };

  const handleMarkDelivered = async (orderId: string) => {
    setActionLoading(orderId, true);
    try {
      await updateOrderStatus(orderId, 'delivered');
      await mutate();
      showToast('Order marked as delivered!');
    } catch (error) {
      showToast('Failed to mark as delivered', 'error');
      console.error('Error marking as delivered:', error);
    } finally {
      setActionLoading(orderId, false);
    }
  };

  const renderOrderCard = (order: Order, isAvailable: boolean = false) => {
    const isLoading = loadingActions[order.id];
    
    return (
      <div key={order.id} className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-gray-900">Order #{order.id}</h2>
            <OrderStatusPill status={order.status} />
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-ocean-teal-600">${order.total.toFixed(2)}</p>
            <p className="text-sm text-gray-500">{order.items.length} items</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="text-sm">{order.address}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="h-4 w-4 mr-2" />
              <span className="text-sm">{order.deliveryWindow}</span>
            </div>
            {order.eta && (
              <div className="flex items-center text-ocean-teal-600">
                <Clock className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">ETA: {Math.floor(order.eta / 60)} minutes</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-gray-900">Items:</h3>
            <div className="flex flex-wrap gap-2">
              {order.items.slice(0, 3).map(item => (
                <span key={item.id} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                  {item.quantity}x {item.item.name}
                </span>
              ))}
              {order.items.length > 3 && (
                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                  +{order.items.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {isAvailable && (
            <>
              <PrimaryButton 
                onClick={() => handleClaimOrder(order.id)} 
                size="sm"
                disabled={isLoading}
              >
                {isLoading ? 'Claiming...' : 'Claim Order'}
              </PrimaryButton>
              <PrimaryButton 
                onClick={() => handleStartShopping(order.id)} 
                size="sm"
                disabled={isLoading}
              >
                {isLoading ? 'Starting...' : 'Start Shopping'}
              </PrimaryButton>
            </>
          )}
          
          {order.status === 'shopping' && order.driverId === user?.id && (
            <>
              <Link to={`/driver/orders/${order.id}/shopping`}>
                <PrimaryButton size="sm" variant="secondary">
                  Continue Shopping
                </PrimaryButton>
              </Link>
              <PrimaryButton 
                onClick={() => handleStartDelivery(order.id)} 
                size="sm"
                disabled={isLoading}
              >
                {isLoading ? 'Starting...' : 'Start Delivery'}
              </PrimaryButton>
            </>
          )}
          
          {order.status === 'delivering' && order.driverId === user?.id && (
            <>
              <PrimaryButton 
                onClick={() => handleMarkDelivered(order.id)} 
                size="sm"
                disabled={isLoading}
              >
                {isLoading ? 'Marking...' : 'Mark Delivered'}
              </PrimaryButton>
              <a
                href={`https://www.google.com/maps/dir/?api=1&origin=13.4443,144.7937&destination=${encodeURIComponent(order.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-ocean-teal-700 bg-ocean-teal-100 rounded-lg hover:bg-ocean-teal-200 transition-colors"
              >
                <MapPin className="h-4 w-4 mr-1" />
                Navigate
              </a>
            </>
          )}
          
          <Link to={`/driver/orders/${order.id}`}>
            <PrimaryButton variant="secondary" size="sm">
              View Details
            </PrimaryButton>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Driver Dashboard</h1>
        <p className="text-gray-600">Manage your delivery orders</p>
      </div>

      <div className="space-y-8">
        {/* Available Orders Section */}
        {availableOrders.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Orders</h2>
            <div className="space-y-6">
              {availableOrders.map(order => renderOrderCard(order, true))}
            </div>
          </div>
        )}

        {/* My Orders Section */}
        {myOrders.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">My Orders</h2>
            <div className="space-y-6">
              {myOrders.map(order => renderOrderCard(order, false))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {availableOrders.length === 0 && myOrders.length === 0 && (
          <div className="text-center py-16">
            <Package className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders available</h2>
            <p className="text-gray-500">Check back later for new delivery opportunities!</p>
          </div>
        )}
      </div>
    </div>
  );
};