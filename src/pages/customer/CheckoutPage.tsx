import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { OrderItemRow } from '../../components/customer/OrderItemRow';
import { PrimaryButton } from '../../components/shared/PrimaryButton';

export const CheckoutPage: React.FC = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('GU');
  const [zipCode, setZipCode] = useState('');
  const [apartmentUnit, setApartmentUnit] = useState('');
  const [deliveryWindow, setDeliveryWindow] = useState('ASAP');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    try {
      // Mock payment processing and order creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const orderId = Math.random().toString(36).substr(2, 9);
      clearCart();
      navigate(`/orders/${orderId}`);
    } catch (error) {
      console.error('Checkout failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const isAddressComplete = streetAddress && city && state && zipCode;

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
        <p className="text-gray-600">Review your order and delivery details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Delivery Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-teal-500 focus:border-ocean-teal-500"
                  placeholder="123 Main Street"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Apartment, Suite, etc. (Optional)
                </label>
                <input
                  type="text"
                  value={apartmentUnit}
                  onChange={(e) => setApartmentUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-teal-500 focus:border-ocean-teal-500"
                  placeholder="Apt 2B, Suite 100, etc."
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-teal-500 focus:border-ocean-teal-500"
                    placeholder="Tamuning"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State *
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-teal-500 focus:border-ocean-teal-500"
                    required
                  >
                    <option value="GU">Guam</option>
                    <option value="MP">Northern Mariana Islands</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-teal-500 focus:border-ocean-teal-500"
                    placeholder="96913"
                    pattern="[0-9]{5}"
                    maxLength={5}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Window
                </label>
                <select
                  value={deliveryWindow}
                  onChange={(e) => setDeliveryWindow(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-teal-500 focus:border-ocean-teal-500"
                >
                  <option value="ASAP">ASAP</option>
                  <option value="Today 5-7 PM">Today 5-7 PM</option>
                  <option value="Tomorrow 10-12 PM">Tomorrow 10-12 PM</option>
                  <option value="Tomorrow 2-4 PM">Tomorrow 2-4 PM</option>
                  <option value="Tomorrow 5-7 PM">Tomorrow 5-7 PM</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Substitution Preferences</h2>
            <div className="space-y-4">
              {items.map(item => (
                <OrderItemRow key={item.id} item={item} showSubstitution={true} />
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
          
          <div className="space-y-3 mb-6">
            {items.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.item.name} x{item.quantity}</span>
                <span>${(item.item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Delivery Fee</span>
              <span>$2.99</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900">
              <span>Total</span>
              <span>${(total + 2.99).toFixed(2)}</span>
            </div>
          </div>
          
          <div className="mt-6">
            <PrimaryButton
              onClick={handleCheckout}
              disabled={!isAddressComplete || isProcessing}
              className="w-full"
            >
              {isProcessing ? 'Processing...' : 'Pay & Place Order'}
            </PrimaryButton>
            
            {!isAddressComplete && (
              <p className="text-sm text-gray-500 mt-2 text-center">
                Please fill in all required address fields
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};