import React, { useState } from 'react';
import { Plus, Minus, Heart } from 'lucide-react';
import { Item } from '../../types';
import { useCart } from '../../context/CartContext';

interface ItemCardProps {
  item: Item;
  viewMode?: 'grid' | 'list';
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, viewMode = 'grid' }) => {
  const { addItem, items, updateQuantity } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const cartItem = items.find(cartItem => cartItem.item.id === item.id);
  const quantity = cartItem?.quantity || 0;

  const handleAddItem = async () => {
    setIsAdding(true);
    addItem(item);
    // Small delay for visual feedback
    setTimeout(() => setIsAdding(false), 300);
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-200">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            {!item.inStock && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center">
                <span className="text-white text-xs font-medium">Out of Stock</span>
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 text-base">{item.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                <div className="flex items-center mt-2">
                  <span className="text-lg font-bold text-ocean-teal-600">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-2 rounded-full transition-colors ${
                    isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
                
                {quantity > 0 ? (
                  <div className="flex items-center space-x-2 bg-ocean-teal-50 rounded-full px-3 py-2">
                    <button
                      onClick={() => handleUpdateQuantity(quantity - 1)}
                      className="p-1 rounded-full hover:bg-ocean-teal-100 transition-colors"
                    >
                      <Minus className="h-4 w-4 text-ocean-teal-600" />
                    </button>
                    <span className="font-semibold text-ocean-teal-700 min-w-[20px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleUpdateQuantity(quantity + 1)}
                      className="p-1 rounded-full hover:bg-ocean-teal-100 transition-colors"
                    >
                      <Plus className="h-4 w-4 text-ocean-teal-600" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleAddItem}
                    disabled={!item.inStock || isAdding}
                    className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${
                      !item.inStock
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : isAdding
                        ? 'bg-ocean-teal-400 text-white scale-110'
                        : 'bg-ocean-teal-500 text-white hover:bg-ocean-teal-600 hover:scale-105'
                    }`}
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative">
        <div className="aspect-square bg-gray-50 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Like Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
            isLiked 
              ? 'bg-red-500 text-white' 
              : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
          }`}
        >
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
        </button>

        {/* Out of Stock Overlay */}
        {!item.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
              Out of Stock
            </span>
          </div>
        )}

        {/* Add Button - Floating */}
        <div className="absolute bottom-3 right-3">
          {quantity > 0 ? (
            <div className="flex items-center space-x-2 bg-white rounded-full shadow-lg px-3 py-2">
              <button
                onClick={() => handleUpdateQuantity(quantity - 1)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Minus className="h-4 w-4 text-ocean-teal-600" />
              </button>
              <span className="font-semibold text-ocean-teal-700 min-w-[20px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => handleUpdateQuantity(quantity + 1)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Plus className="h-4 w-4 text-ocean-teal-600" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddItem}
              disabled={!item.inStock || isAdding}
              className={`flex items-center justify-center w-10 h-10 rounded-full shadow-lg transition-all duration-200 ${
                !item.inStock
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : isAdding
                  ? 'bg-ocean-teal-400 text-white scale-110'
                  : 'bg-ocean-teal-500 text-white hover:bg-ocean-teal-600 hover:scale-105'
              }`}
            >
              <Plus className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">{item.name}</h3>
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-ocean-teal-600">
            ${item.price.toFixed(2)}
          </span>
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
            {item.category}
          </span>
        </div>
      </div>
    </div>
  );
};