import React, { useState } from 'react';
import { Plus, Minus, Heart } from 'lucide-react';
import { Item } from '../../types';
import { useCart } from '../../context/CartContext';

interface ItemCardProps {
  item: Item;
  viewMode?: 'grid' | 'list';
  onItemClick?: (item: Item) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, viewMode = 'grid', onItemClick }) => {
  const { addItem, items, updateQuantity } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const cartItem = items.find(cartItem => cartItem.item.id === item.id);
  const quantity = cartItem?.quantity || 0;

  const handleAddItem = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal from opening
    setIsAdding(true);
    addItem(item);
    // Small delay for visual feedback
    setTimeout(() => setIsAdding(false), 400);
  };

  const handleUpdateQuantity = (newQuantity: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal from opening
    updateQuantity(item.id, newQuantity);
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal from opening
    setIsLiked(!isLiked);
  };

  const handleItemClick = () => {
    if (onItemClick) {
      onItemClick(item);
    }
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div 
              className="w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden cursor-pointer"
              onClick={handleItemClick}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            {!item.inStock && (
              <div className="absolute inset-0 bg-black bg-opacity-60 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-white text-xs font-semibold bg-red-500 px-2 py-1 rounded-full">Out of Stock</span>
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 
                  className="font-bold text-gray-900 text-lg mb-1 cursor-pointer hover:text-ocean-teal-600 transition-colors"
                  onClick={handleItemClick}
                >
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">{item.description}</p>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl font-bold bg-gradient-to-r from-ocean-teal-600 to-cyan-600 bg-clip-text text-transparent">
                    ${item.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
                    {item.category}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleLikeClick}
                  className={`p-3 rounded-2xl transition-all duration-200 ${
                    isLiked 
                      ? 'text-white bg-gradient-to-r from-red-400 to-pink-500 shadow-lg scale-105' 
                      : 'text-gray-400 bg-gray-50 hover:bg-gray-100 hover:text-red-500 hover:scale-105'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
                
                {quantity > 0 ? (
                  <div className="flex items-center space-x-2 bg-gradient-to-r from-ocean-teal-50 to-cyan-50 rounded-2xl px-4 py-3 shadow-sm">
                    <button
                      onClick={(e) => handleUpdateQuantity(quantity - 1, e)}
                      className="p-2 rounded-xl bg-white hover:bg-ocean-teal-100 transition-colors shadow-sm"
                    >
                      <Minus className="h-4 w-4 text-ocean-teal-600" />
                    </button>
                    <span className="font-bold text-ocean-teal-700 min-w-[24px] text-center text-lg">
                      {quantity}
                    </span>
                    <button
                      onClick={(e) => handleUpdateQuantity(quantity + 1, e)}
                      className="p-2 rounded-xl bg-white hover:bg-ocean-teal-100 transition-colors shadow-sm"
                    >
                      <Plus className="h-4 w-4 text-ocean-teal-600" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleAddItem}
                    disabled={!item.inStock || isAdding}
                    className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 shadow-lg ${
                      !item.inStock
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : isAdding
                        ? 'bg-gradient-to-r from-ocean-teal-400 to-cyan-400 text-white scale-110 shadow-xl'
                        : 'bg-gradient-to-r from-ocean-teal-500 to-cyan-500 text-white hover:from-ocean-teal-600 hover:to-cyan-600 hover:scale-110 hover:shadow-xl'
                    }`}
                  >
                    <Plus className="h-6 w-6" />
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
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2">
      <div className="relative">
        <div 
          className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden cursor-pointer"
          onClick={handleItemClick}
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        {/* Like Button */}
        <button
          onClick={handleLikeClick}
          className={`absolute top-4 right-4 p-2.5 rounded-2xl backdrop-blur-sm transition-all duration-300 ${
            isLiked 
              ? 'bg-gradient-to-r from-red-400 to-pink-500 text-white shadow-lg scale-110' 
              : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-500 hover:scale-110 shadow-sm'
          }`}
        >
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
        </button>

        {/* Out of Stock Overlay */}
        {!item.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center backdrop-blur-sm">
            <span className="bg-white text-gray-900 px-4 py-2 rounded-2xl text-sm font-bold shadow-lg">
              Out of Stock
            </span>
          </div>
        )}

        {/* Add Button - Floating */}
        <div className="absolute bottom-4 right-4">
          {quantity > 0 ? (
            <div className="flex items-center space-x-2 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg px-3 py-2">
              <button
                onClick={(e) => handleUpdateQuantity(quantity - 1, e)}
                className="p-1.5 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <Minus className="h-4 w-4 text-ocean-teal-600" />
              </button>
              <span className="font-bold text-ocean-teal-700 min-w-[20px] text-center">
                {quantity}
              </span>
              <button
                onClick={(e) => handleUpdateQuantity(quantity + 1, e)}
                className="p-1.5 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <Plus className="h-4 w-4 text-ocean-teal-600" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddItem}
              disabled={!item.inStock || isAdding}
              className={`flex items-center justify-center w-12 h-12 rounded-2xl shadow-xl transition-all duration-300 ${
                !item.inStock
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : isAdding
                  ? 'bg-gradient-to-r from-ocean-teal-400 to-cyan-400 text-white scale-125 shadow-2xl'
                  : 'bg-gradient-to-r from-ocean-teal-500 to-cyan-500 text-white hover:from-ocean-teal-600 hover:to-cyan-600 hover:scale-110 hover:shadow-2xl'
              }`}
            >
              <Plus className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>
      
      <div className="p-5">
        <h3 
          className="font-bold text-gray-900 text-base mb-2 line-clamp-2 leading-tight cursor-pointer hover:text-ocean-teal-600 transition-colors"
          onClick={handleItemClick}
        >
          {item.name}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold bg-gradient-to-r from-ocean-teal-600 to-cyan-600 bg-clip-text text-transparent">
            ${item.price.toFixed(2)}
          </span>
          <span className="text-xs text-gray-500 bg-gradient-to-r from-gray-50 to-gray-100 px-3 py-1.5 rounded-2xl font-medium">
            {item.category}
          </span>
        </div>
      </div>
    </div>
  );
};