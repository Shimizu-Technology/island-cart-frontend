import React, { useState } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import { mockItems } from '../../data/mockData';
import { ItemCard } from '../../components/customer/ItemCard';

export const CatalogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['All', ...new Set(mockItems.map(item => item.category))];
  
  const filteredItems = mockItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

  return (
    <div className="bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Fresh Groceries</h1>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                {viewMode === 'grid' ? <List className="h-5 w-5" /> : <Grid className="h-5 w-5" />}
              </button>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ocean-teal-500 focus:bg-white transition-all text-base"
            />
          </div>

          {/* Category Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors flex-shrink-0 ${
                  selectedCategory === category
                    ? 'bg-ocean-teal-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category !== 'All' && (
                  <span className="text-sm">{getCategoryIcon(category)}</span>
                )}
                <span className="text-sm font-medium whitespace-nowrap">{category}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {filteredItems.length > 0 ? (
          <div className={`grid gap-4 ${
            viewMode === 'grid' 
              ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' 
              : 'grid-cols-1 max-w-2xl mx-auto'
          }`}>
            {filteredItems.map(item => (
              <ItemCard key={item.id} item={item} viewMode={viewMode} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Results Count */}
      {filteredItems.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
          <p className="text-sm text-gray-500 text-center">
            Showing {filteredItems.length} of {mockItems.length} products
          </p>
        </div>
      )}
    </div>
  );
};