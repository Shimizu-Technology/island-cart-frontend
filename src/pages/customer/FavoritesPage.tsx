import React, { useState } from 'react';
import { Heart, Search, Grid, List } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import { ItemCard } from '../../components/customer/ItemCard';
import { ProductModal } from '../../components/shared/ProductModal';
import { Item } from '../../types';
import { Link } from 'react-router-dom';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredFavorites = favorites.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  if (favorites.length === 0) {
    return (
      <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="bg-white shadow-sm border-b border-gray-200 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 mb-8">
            <div className="flex items-center justify-between py-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">My Favorites</h1>
                <p className="text-gray-600 mt-1">Items you've saved for later</p>
              </div>
            </div>
          </div>

          {/* Empty State */}
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-12 w-12 text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No favorites yet</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Start browsing products and tap the heart icon to save your favorite items here.
            </p>
            <Link to="/catalog">
              <button className="bg-gradient-to-r from-ocean-teal-500 to-ocean-teal-600 text-white px-8 py-3 rounded-2xl font-medium hover:from-ocean-teal-600 hover:to-ocean-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                Browse Products
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white shadow-sm border-b border-gray-200 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">My Favorites</h1>
              <p className="text-gray-600 mt-1">Items you've saved for later</p>
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
              placeholder="Search your favorites..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ocean-teal-500 focus:border-transparent transition-all text-base placeholder-gray-500 shadow-sm hover:shadow-md"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {filteredFavorites.length === favorites.length 
              ? `${favorites.length} favorite${favorites.length !== 1 ? 's' : ''}`
              : `${filteredFavorites.length} of ${favorites.length} favorites`
            }
          </h2>
        </div>

        {/* Favorites Grid/List */}
        {filteredFavorites.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' 
              : 'grid-cols-1 max-w-3xl mx-auto'
          }`}>
            {filteredFavorites.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                viewMode={viewMode}
                onItemClick={handleItemClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No favorites found</h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search terms or browse more products to find items you love.
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="text-ocean-teal-600 hover:text-ocean-teal-700 font-medium"
            >
              Clear search
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