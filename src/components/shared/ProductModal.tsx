import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Heart, Award, MapPin, Package, Clock, Shield, Leaf } from 'lucide-react';
import { Item } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductModalProps {
  item: Item;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ item, isOpen, onClose }) => {
  const { addItem, items, updateQuantity } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'nutrition' | 'ingredients'>('overview');

  const cartItem = items.find(cartItem => cartItem.item.id === item.id);
  const quantity = cartItem?.quantity || 0;

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save current body overflow state
      const originalOverflow = document.body.style.overflow;
      
      // Lock body scroll
      document.body.style.overflow = 'hidden';
      
      // Cleanup function to restore scroll when modal closes
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAddItem = async () => {
    setIsAdding(true);
    addItem(item);
    setTimeout(() => setIsAdding(false), 400);
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full h-[90vh] sm:h-[95vh] overflow-hidden animate-fade-in-up">
        {/* Header with Close Button */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Main Content - Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Left Column - Product Image & Actions */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 relative flex flex-col">
            {/* Product Image */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
              <div className="relative max-w-md w-full">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 lg:h-64 object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>

            {/* Product Info & Actions */}
            <div className="p-6 lg:p-8 bg-white/95 backdrop-blur-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{item.name}</h1>
                  <p className="text-gray-600 text-sm lg:text-base">{item.brand} • {item.origin}</p>
                  <p className="text-gray-500 text-sm">{item.weight}</p>
                </div>
                <div className="text-right ml-4">
                  <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-ocean-teal-600 to-cyan-600 bg-clip-text text-transparent">
                    ${item.price.toFixed(2)}
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-3 rounded-2xl transition-all duration-200 ${
                    isLiked 
                      ? 'text-white bg-gradient-to-r from-red-400 to-pink-500 shadow-lg' 
                      : 'text-gray-400 bg-gray-100 hover:bg-gray-200 hover:text-red-500'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
                
                <div className="flex-1">
                  {quantity > 0 ? (
                    <div className="flex items-center justify-between bg-gradient-to-r from-ocean-teal-50 to-cyan-50 rounded-2xl px-4 py-3">
                      <button
                        onClick={() => handleUpdateQuantity(quantity - 1)}
                        className="p-2 rounded-xl bg-white hover:bg-ocean-teal-100 transition-colors shadow-sm"
                      >
                        <Minus className="h-4 w-4 text-ocean-teal-600" />
                      </button>
                      <span className="font-bold text-ocean-teal-700 text-lg">
                        {quantity} in cart
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(quantity + 1)}
                        className="p-2 rounded-xl bg-white hover:bg-ocean-teal-100 transition-colors shadow-sm"
                      >
                        <Plus className="h-4 w-4 text-ocean-teal-600" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleAddItem}
                      disabled={!item.inStock || isAdding}
                      className={`w-full py-3 px-6 rounded-2xl font-semibold transition-all duration-300 shadow-lg ${
                        !item.inStock
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : isAdding
                          ? 'bg-gradient-to-r from-ocean-teal-400 to-cyan-400 text-white scale-105'
                          : 'bg-gradient-to-r from-ocean-teal-500 to-cyan-500 text-white hover:from-ocean-teal-600 hover:to-cyan-600 hover:shadow-xl'
                      }`}
                    >
                      {isAdding ? 'Adding...' : 'Add to Cart'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="flex flex-col h-full min-h-0">
            {/* Tabs */}
            <div className="flex-shrink-0 p-6 lg:p-8 pb-0">
              <div className="flex space-x-1 bg-gray-100 rounded-2xl p-1">
                {[
                  { id: 'overview', label: 'Overview', icon: Package },
                  { id: 'nutrition', label: 'Nutrition', icon: Award },
                  { id: 'ingredients', label: 'Details', icon: Leaf }
                ].map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex-1 flex items-center justify-center space-x-2 py-3 px-2 lg:px-4 rounded-xl font-medium transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-white text-ocean-teal-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm lg:text-base">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 min-h-0 p-6 lg:p-8 pt-6 overflow-y-auto scrollbar-hide">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>

                  {item.benefits && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Health Benefits</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {item.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-center space-x-2 p-3 bg-green-50 rounded-xl">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-green-800 text-sm font-medium">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                    {item.storageInstructions && (
                      <div className="p-4 bg-blue-50 rounded-xl">
                        <div className="flex items-center space-x-2 mb-2">
                          <Shield className="h-5 w-5 text-blue-600" />
                          <h4 className="font-semibold text-blue-900">Storage</h4>
                        </div>
                        <p className="text-blue-800 text-sm">{item.storageInstructions}</p>
                      </div>
                    )}

                    {item.shelfLife && (
                      <div className="p-4 bg-amber-50 rounded-xl">
                        <div className="flex items-center space-x-2 mb-2">
                          <Clock className="h-5 w-5 text-amber-600" />
                          <h4 className="font-semibold text-amber-900">Shelf Life</h4>
                        </div>
                        <p className="text-amber-800 text-sm">{item.shelfLife}</p>
                      </div>
                    )}

                    {item.origin && (
                      <div className="p-4 bg-purple-50 rounded-xl">
                        <div className="flex items-center space-x-2 mb-2">
                          <MapPin className="h-5 w-5 text-purple-600" />
                          <h4 className="font-semibold text-purple-900">Origin</h4>
                        </div>
                        <p className="text-purple-800 text-sm">{item.origin}</p>
                      </div>
                    )}
                  </div>

                  {item.certifications && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Certifications</h3>
                      <div className="flex flex-wrap gap-2">
                        {item.certifications.map((cert, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-full text-sm font-medium"
                          >
                            <Award className="h-3 w-3" />
                            <span>{cert}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'nutrition' && item.nutritionFacts && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Nutrition Facts</h3>
                    <div className="text-sm text-gray-600 mb-2">Serving Size: {item.nutritionFacts.servingSize}</div>
                    <div className="border-b-2 border-gray-800 mb-2"></div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Calories</span>
                        <span>{item.nutritionFacts.calories}</span>
                      </div>
                      <div className="border-b border-gray-300 my-2"></div>
                      
                      {[
                        ['Total Fat', item.nutritionFacts.totalFat],
                        ['Saturated Fat', item.nutritionFacts.saturatedFat],
                        ['Trans Fat', item.nutritionFacts.transFat],
                        ['Cholesterol', item.nutritionFacts.cholesterol],
                        ['Sodium', item.nutritionFacts.sodium],
                        ['Total Carbohydrates', item.nutritionFacts.totalCarbohydrates],
                        ['Dietary Fiber', item.nutritionFacts.dietaryFiber],
                        ['Sugars', item.nutritionFacts.sugars],
                        ['Protein', item.nutritionFacts.protein]
                      ].map(([label, value]) => (
                        <div key={label} className="flex justify-between py-1">
                          <span className="text-gray-700">{label}</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                      
                      {(item.nutritionFacts.vitaminC || item.nutritionFacts.calcium || item.nutritionFacts.iron) && (
                        <>
                          <div className="border-b border-gray-300 my-2"></div>
                          {item.nutritionFacts.vitaminC && (
                            <div className="flex justify-between py-1">
                              <span className="text-gray-700">Vitamin C</span>
                              <span className="font-medium">{item.nutritionFacts.vitaminC}</span>
                            </div>
                          )}
                          {item.nutritionFacts.calcium && (
                            <div className="flex justify-between py-1">
                              <span className="text-gray-700">Calcium</span>
                              <span className="font-medium">{item.nutritionFacts.calcium}</span>
                            </div>
                          )}
                          {item.nutritionFacts.iron && (
                            <div className="flex justify-between py-1">
                              <span className="text-gray-700">Iron</span>
                              <span className="font-medium">{item.nutritionFacts.iron}</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'ingredients' && (
                <div className="space-y-6">
                  {item.ingredients && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Ingredients</h3>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-gray-700 leading-relaxed">
                          {item.ingredients.join(', ')}
                        </p>
                      </div>
                    </div>
                  )}

                  {item.allergens && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Allergen Information</h3>
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                        <div className="flex items-start space-x-2">
                          <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-white text-xs font-bold">!</span>
                          </div>
                          <div>
                            <p className="text-red-800 font-medium mb-1">Contains:</p>
                            <p className="text-red-700">{item.allergens.join(', ')}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <h4 className="font-semibold text-gray-900 mb-2">Product Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Brand:</span>
                          <span className="font-medium">{item.brand}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Weight:</span>
                          <span className="font-medium">{item.weight}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Category:</span>
                          <span className="font-medium">{item.category}</span>
                        </div>
                      </div>
                    </div>

                    {(item.storageInstructions || item.shelfLife) && (
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <h4 className="font-semibold text-gray-900 mb-2">Storage & Care</h4>
                        <div className="space-y-2 text-sm">
                          {item.storageInstructions && (
                            <div>
                              <span className="text-gray-600 block">Storage:</span>
                              <span className="text-gray-800">{item.storageInstructions}</span>
                            </div>
                          )}
                          {item.shelfLife && (
                            <div>
                              <span className="text-gray-600 block">Shelf Life:</span>
                              <span className="text-gray-800">{item.shelfLife}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 