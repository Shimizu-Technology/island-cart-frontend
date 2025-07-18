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
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
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
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full h-[90vh] lg:h-[65vh] overflow-hidden animate-fade-in-up relative">
        {/* Close Button - Positioned to avoid overlap */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>

        {/* Main Content - Improved Layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-[2fr_3fr] h-full">
          {/* Left Column - Simplified Product Image */}
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-6 px-6 lg:p-8 overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>

            {/* Main Image Container - Simplified */}
            <div className="relative z-10 w-full max-w-[280px] lg:max-w-sm">
              <div className="relative group">
                {/* Main Image */}
                <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden transform group-hover:scale-105 transition-all duration-300">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-44 lg:h-72 object-cover"
                  />
                  
                  {/* Stock Status Indicator */}
                  <div className="absolute top-3 left-3">
                    <div className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                      item.inStock 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.inStock ? 'In Stock' : 'Out of Stock'}
                    </div>
                  </div>
                  
                  {/* Category Tag */}
                  <div className="absolute top-3 right-3">
                    <div className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-medium text-gray-700">
                      {item.category}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Product Info & Details */}
          <div className="flex flex-col h-full min-h-0 bg-white">
                        {/* Product Header */}
            <div className="flex-shrink-0 px-5 py-5 lg:p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-4 lg:mb-4">
                <div className="flex-1 pr-4 lg:pr-4">
                  <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">{item.name}</h1>
                  <p className="text-gray-600 text-sm lg:text-base mb-1">{item.brand} • {item.origin}</p>
                  <p className="text-gray-500 text-sm">{item.weight}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-ocean-teal-600 to-cyan-600 bg-clip-text text-transparent">
                    ${item.price.toFixed(2)}
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-2.5 rounded-xl transition-all duration-200 ${
                    isLiked 
                      ? 'text-white bg-gradient-to-r from-red-400 to-pink-500' 
                      : 'text-gray-400 bg-gray-100 hover:bg-gray-200 hover:text-red-500'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                </button>
                
                <div className="flex-1">
                  {quantity > 0 ? (
                    <div className="flex items-center justify-between bg-gradient-to-r from-ocean-teal-50 to-cyan-50 rounded-xl px-4 py-3">
                      <button
                        onClick={() => handleUpdateQuantity(quantity - 1)}
                        className="p-1.5 rounded-lg bg-white hover:bg-ocean-teal-100 transition-colors shadow-sm"
                      >
                        <Minus className="h-4 w-4 text-ocean-teal-600" />
                      </button>
                      <span className="font-bold text-ocean-teal-700 text-sm lg:text-base">
                        {quantity} in cart
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(quantity + 1)}
                        className="p-1.5 rounded-lg bg-white hover:bg-ocean-teal-100 transition-colors shadow-sm"
                      >
                        <Plus className="h-4 w-4 text-ocean-teal-600" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleAddItem}
                      disabled={!item.inStock || isAdding}
                      className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                        !item.inStock
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : isAdding
                          ? 'bg-gradient-to-r from-ocean-teal-400 to-cyan-400 text-white scale-105'
                          : 'bg-gradient-to-r from-ocean-teal-500 to-cyan-500 text-white hover:from-ocean-teal-600 hover:to-cyan-600'
                      }`}
                    >
                      {isAdding ? 'Adding...' : 'Add to Cart'}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex-shrink-0 px-5 lg:px-6 pt-4 lg:pt-4">
              <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
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
                      className={`flex-1 flex items-center justify-center space-x-1 lg:space-x-2 py-2.5 px-2 lg:px-3 rounded-lg font-medium transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-white text-ocean-teal-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-xs lg:text-sm">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 min-h-0 px-5 lg:p-6 pt-4 pb-5 lg:pt-4 overflow-y-auto scrollbar-hide">
              {activeTab === 'overview' && (
                <div className="space-y-4 lg:space-y-5">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>

                  {item.benefits && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Health Benefits</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {item.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-center space-x-2 p-2.5 bg-green-50 rounded-lg">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            <span className="text-green-800 text-sm font-medium">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {item.storageInstructions && (
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-1">
                          <Shield className="h-4 w-4 text-blue-600" />
                          <h4 className="font-semibold text-blue-900">Storage</h4>
                        </div>
                        <p className="text-blue-800 text-sm">{item.storageInstructions}</p>
                      </div>
                    )}

                    {item.shelfLife && (
                      <div className="p-3 bg-amber-50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-1">
                          <Clock className="h-4 w-4 text-amber-600" />
                          <h4 className="font-semibold text-amber-900">Shelf Life</h4>
                        </div>
                        <p className="text-amber-800 text-sm">{item.shelfLife}</p>
                      </div>
                    )}

                    {item.origin && (
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-1">
                          <MapPin className="h-4 w-4 text-purple-600" />
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
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-5">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Nutrition Facts</h3>
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
                <div className="space-y-4 lg:space-y-5">
                  {/* Product Details Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-1">
                          <Package className="h-4 w-4 text-blue-600" />
                          <h4 className="font-semibold text-blue-900">Brand</h4>
                        </div>
                        <p className="text-blue-800 font-medium">{item.brand}</p>
                      </div>

                      <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-1">
                          <Package className="h-4 w-4 text-green-600" />
                          <h4 className="font-semibold text-green-900">Weight</h4>
                        </div>
                        <p className="text-green-800 font-medium">{item.weight}</p>
                      </div>

                      <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-1">
                          <Package className="h-4 w-4 text-purple-600" />
                          <h4 className="font-semibold text-purple-900">Category</h4>
                        </div>
                        <p className="text-purple-800 font-medium">{item.category}</p>
                      </div>

                      {item.origin && (
                        <div className="p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg">
                          <div className="flex items-center space-x-2 mb-1">
                            <MapPin className="h-4 w-4 text-orange-600" />
                            <h4 className="font-semibold text-orange-900">Origin</h4>
                          </div>
                          <p className="text-orange-800 font-medium">{item.origin}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Storage & Care Section */}
                  {(item.storageInstructions || item.shelfLife) && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Storage & Care</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {item.storageInstructions && (
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <div className="flex items-center space-x-2 mb-1">
                              <Shield className="h-4 w-4 text-blue-600" />
                              <h4 className="font-semibold text-blue-900">Storage</h4>
                            </div>
                            <p className="text-blue-800 text-sm">{item.storageInstructions}</p>
                          </div>
                        )}

                        {item.shelfLife && (
                          <div className="p-3 bg-amber-50 rounded-lg">
                            <div className="flex items-center space-x-2 mb-1">
                              <Clock className="h-4 w-4 text-amber-600" />
                              <h4 className="font-semibold text-amber-900">Shelf Life</h4>
                            </div>
                            <p className="text-amber-800 text-sm">{item.shelfLife}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Ingredients Section */}
                  {item.ingredients && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Ingredients</h3>
                      <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Leaf className="h-4 w-4 text-gray-600" />
                          <span className="font-medium text-gray-700">Full Ingredients List</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                          {item.ingredients.join(', ')}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Allergen Information */}
                  {item.allergens && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Allergen Information</h3>
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
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

                  {/* Certifications */}
                  {item.certifications && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Certifications</h3>
                      <div className="flex flex-wrap gap-2">
                        {item.certifications.map((cert, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center space-x-1 px-3 py-1.5 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-full text-sm font-medium border border-green-200"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 