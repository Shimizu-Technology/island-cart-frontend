import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { OrderItemRow } from '../../components/customer/OrderItemRow';
import { PrimaryButton } from '../../components/shared/PrimaryButton';

export const CartPage: React.FC = () => {
  const { items, total, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Discover amazing products and add them to your cart</p>
            <Link to="/">
              <button className="bg-ocean-teal-500 text-white px-8 py-3 rounded-2xl font-medium hover:bg-ocean-teal-600 transition-colors">
                Start Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">{itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        <div className="space-y-4 mb-8">
          {items.map(item => (
            <OrderItemRow key={item.id} item={item} />
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 sticky bottom-4">
          <div className="flex items-center justify-between text-xl font-bold text-gray-900 mb-6">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          <Link to="/">
            <button className="w-full mb-3 bg-gray-100 text-gray-700 py-3 rounded-2xl font-medium hover:bg-gray-200 transition-colors">
              Continue Shopping
            </button>
          </Link>
          
          <Link to="/checkout">
            <button className="w-full bg-ocean-teal-500 text-white py-3 rounded-2xl font-medium hover:bg-ocean-teal-600 transition-colors">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};