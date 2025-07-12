import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShoppingCart, Clock, Star, TrendingUp, Package, ArrowRight } from 'lucide-react';
import { mockItems } from '../../data/mockData';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { ProductModal } from '../../components/shared/ProductModal';
import { Item } from '../../types';

export const CustomerHome: React.FC = () => {
  const { itemCount } = useCart();
  const { user } = useAuth();
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    { name: 'Fruits', icon: '🍎', color: 'from-red-400 to-pink-500', items: mockItems.filter(item => item.category === 'Fruits').length },
    { name: 'Vegetables', icon: '🥬', color: 'from-green-400 to-emerald-500', items: mockItems.filter(item => item.category === 'Vegetables').length },
    { name: 'Dairy', icon: '🥛', color: 'from-blue-400 to-cyan-500', items: mockItems.filter(item => item.category === 'Dairy').length },
    { name: 'Bakery', icon: '🍞', color: 'from-amber-400 to-orange-500', items: mockItems.filter(item => item.category === 'Bakery').length },
    { name: 'Meat', icon: '🥩', color: 'from-red-500 to-red-600', items: mockItems.filter(item => item.category === 'Meat').length },
    { name: 'Beverages', icon: '🥤', color: 'from-purple-400 to-purple-500', items: mockItems.filter(item => item.category === 'Beverages').length },
  ];

  const featuredProducts = mockItems.slice(0, 4);

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-ocean-teal-500 via-ocean-teal-600 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full translate-y-48 -translate-x-48 blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-white/80 mr-2" />
              <span className="text-white/80 font-medium">Welcome back, {user?.name.split(' ')[0]}!</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Fresh Groceries
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-normal text-white/90 mt-2">
                Delivered to Your Door
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Discover premium quality groceries from local farms and trusted suppliers. 
              Fresh ingredients for your perfect meals.
            </p>
            
            {/* Quick Actions */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Link
                to="/catalog"
                className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-2xl font-medium hover:bg-white/30 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
              >
                <Package className="h-5 w-5" />
                <span>Browse All Products</span>
              </Link>
              
              {itemCount > 0 && (
                <Link
                  to="/cart"
                  className="bg-white text-ocean-teal-600 px-6 py-3 rounded-2xl font-medium hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>View Cart ({itemCount})</span>
                </Link>
              )}
            </div>
            
            {/* Featured Stats */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">{mockItems.length}+</div>
                <div className="text-sm text-white/70">Fresh Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">24h</div>
                <div className="text-sm text-white/70">Fast Delivery</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">100%</div>
                <div className="text-sm text-white/70">Fresh Guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Shop by Category</h2>
          <p className="text-gray-600">Browse our fresh selection organized by category</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/catalog?category=${category.name}`}
              className="group"
            >
              <div className={`bg-gradient-to-br ${category.color} p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
                <div className="text-center">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="text-white font-bold text-lg mb-1">{category.name}</h3>
                  <p className="text-white/80 text-sm">{category.items} items</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
            <p className="text-gray-600">Handpicked fresh items just for you</p>
          </div>
          <Link
            to="/catalog"
            className="flex items-center space-x-2 text-ocean-teal-600 hover:text-ocean-teal-700 font-medium transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer"
              onClick={() => handleItemClick(product)}
            >
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-sm mb-1 hover:text-ocean-teal-600 transition-colors">{product.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-ocean-teal-600">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions Footer */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">Same-day delivery available on all orders</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-100 to-cyan-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-600 text-sm">Handpicked fresh products from trusted suppliers</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Best Prices</h3>
              <p className="text-gray-600 text-sm">Competitive pricing with regular discounts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Modal */}
      {selectedItem && (
        <ProductModal
          item={selectedItem}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}; 