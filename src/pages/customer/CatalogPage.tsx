import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Grid, List, TrendingUp } from 'lucide-react';
import { mockItems } from '../../data/mockData';
import { ItemCard } from '../../components/customer/ItemCard';
import { ProductModal } from '../../components/shared/ProductModal';
import { Item } from '../../types';

export const CatalogPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ['All', ...new Set(mockItems.map(item => item.category))];
  
  // Handle category from URL params
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl && categories.includes(categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  const filteredItems = mockItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'Fruits': '🍎',
      'Vegetables': '🥬',
      'Dairy': '🥛',
      'Meat': '🥩',
      'Bakery': '🍞',
      'Beverages': '🥤'
    };
    return icons[category] || '📦';
  };

  const getCategoryGradient = (category: string, isSelected: boolean) => {
    const gradients: Record<string, string> = {
      'All': isSelected ? 'bg-gradient-to-r from-ocean-teal-500 to-ocean-teal-600' : 'bg-gradient-to-r from-gray-100 to-gray-200',
      'Fruits': isSelected ? 'bg-gradient-to-r from-red-400 to-pink-500' : 'bg-gradient-to-r from-red-50 to-pink-50',
      'Vegetables': isSelected ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-green-50 to-emerald-50',
      'Dairy': isSelected ? 'bg-gradient-to-r from-blue-400 to-cyan-500' : 'bg-gradient-to-r from-blue-50 to-cyan-50',
      'Meat': isSelected ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-red-50 to-red-100',
      'Bakery': isSelected ? 'bg-gradient-to-r from-amber-400 to-orange-500' : 'bg-gradient-to-r from-amber-50 to-orange-50',
      'Beverages': isSelected ? 'bg-gradient-to-r from-purple-400 to-purple-500' : 'bg-gradient-to-r from-purple-50 to-purple-100'
    };
    return gradients[category] || (isSelected ? 'bg-gradient-to-r from-ocean-teal-500 to-ocean-teal-600' : 'bg-gradient-to-r from-gray-100 to-gray-200');
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="bg-white shadow-sm sticky top-16 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Browse Products</h1>
              <p className="text-gray-600 mt-1">Discover fresh groceries and quality products</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors shadow-sm"
                title={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
              >
                {viewMode === 'grid' ? <List className="h-5 w-5" /> : <Grid className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for fresh products, brands, or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ocean-teal-500 focus:border-transparent transition-all text-base placeholder-gray-500 shadow-sm hover:shadow-md"
            />
          </div>

          {/* Category Pills */}
          <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(category => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-2xl transition-all duration-200 flex-shrink-0 shadow-sm hover:shadow-md transform hover:scale-105 ${
                    getCategoryGradient(category, isSelected)
                  } ${
                    isSelected 
                      ? 'text-white font-semibold shadow-lg' 
                      : 'text-gray-700 hover:text-gray-900 border border-gray-200'
                  }`}
                >
                  {category !== 'All' && (
                    <span className="text-sm">{getCategoryIcon(category)}</span>
                  )}
                  <span className="text-sm font-medium whitespace-nowrap">{category}</span>
                  {category === 'All' && (
                    <TrendingUp className={`h-4 w-4 ${isSelected ? 'text-white' : 'text-gray-500'}`} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        {filteredItems.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory === 'All' ? 'All Products' : selectedCategory}
                </h2>
                <p className="text-gray-600 mt-1">
                  {filteredItems.length} {filteredItems.length === 1 ? 'product' : 'products'} found
                  {searchTerm && ` for "${searchTerm}"`}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {filteredItems.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' 
              : 'grid-cols-1 max-w-3xl mx-auto'
          }`}>
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ItemCard item={item} viewMode={viewMode} onItemClick={handleItemClick} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              We couldn't find any products matching your search. Try adjusting your search terms or browse different categories.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="bg-gradient-to-r from-ocean-teal-500 to-ocean-teal-600 text-white px-6 py-3 rounded-2xl font-medium hover:from-ocean-teal-600 hover:to-ocean-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Browse All Products
            </button>
          </div>
        )}
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