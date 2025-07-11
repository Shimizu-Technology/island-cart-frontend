import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem } from '../../types';
import { useCart } from '../../context/CartContext';

interface OrderItemRowProps {
  item: CartItem;
  showSubstitution?: boolean;
}

export const OrderItemRow: React.FC<OrderItemRowProps> = ({ item, showSubstitution = false }) => {
  const { updateQuantity, removeItem, updateSubstitution } = useCart();

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
          <img
            src={item.item.image}
            alt={item.item.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{item.item.name}</h3>
          <p className="text-sm text-gray-500">${item.item.price.toFixed(2)} each</p>
          
          {showSubstitution && (
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">If unavailable:</label>
              <select
                value={item.substitution}
                onChange={(e) => updateSubstitution(item.item.id, e.target.value as 'none' | 'similar' | 'refund')}
                className="text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-ocean-teal-500 focus:border-ocean-teal-500"
              >
                <option value="similar">Similar item</option>
                <option value="none">No substitution</option>
                <option value="refund">Refund</option>
              </select>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-gray-50 rounded-full px-3 py-2">
            <button
              onClick={() => updateQuantity(item.item.id, item.quantity - 1)}
              className="p-1 rounded-full hover:bg-gray-200 transition-colors"
            >
              <Minus className="h-4 w-4 text-gray-600" />
            </button>
            <span className="w-8 text-center font-semibold text-gray-900">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.item.id, item.quantity + 1)}
              className="p-1 rounded-full hover:bg-gray-200 transition-colors"
            >
              <Plus className="h-4 w-4 text-gray-600" />
            </button>
          </div>
          
          <div className="text-right">
            <p className="font-semibold text-gray-900 text-lg">
              ${(item.item.price * item.quantity).toFixed(2)}
            </p>
            <button
              onClick={() => removeItem(item.item.id)}
              className="text-coral-500 hover:text-coral-600 transition-colors mt-1 p-1 rounded-full hover:bg-coral-50"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};