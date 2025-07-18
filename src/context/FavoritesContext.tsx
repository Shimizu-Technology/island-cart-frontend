import React, { createContext, useContext, useEffect, useState } from 'react';
import { Item } from '../types';
import { mockItems } from '../data/mockData';

interface FavoritesContextType {
  favorites: Item[];
  addToFavorites: (item: Item) => void;
  removeFromFavorites: (itemId: string) => void;
  isFavorite: (itemId: string) => boolean;
  toggleFavorite: (item: Item) => void;
  favoritesCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Item[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
      }
    } else {
      // Initialize with some mock favorites for demo purposes
      const initialFavorites = mockItems.slice(0, 3); // First 3 items as favorites
      setFavorites(initialFavorites);
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (item: Item) => {
    setFavorites(prevFavorites => {
      const alreadyExists = prevFavorites.some(fav => fav.id === item.id);
      if (alreadyExists) {
        return prevFavorites;
      }
      return [...prevFavorites, item];
    });
  };

  const removeFromFavorites = (itemId: string) => {
    setFavorites(prevFavorites => prevFavorites.filter(fav => fav.id !== itemId));
  };

  const isFavorite = (itemId: string) => {
    return favorites.some(fav => fav.id === itemId);
  };

  const toggleFavorite = (item: Item) => {
    if (isFavorite(item.id)) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item);
    }
  };

  const favoritesCount = favorites.length;

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      toggleFavorite,
      favoritesCount
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}; 