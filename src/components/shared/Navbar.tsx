import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Package, Settings, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  if (!user) return null;

  const getNavLinks = () => {
    switch (user.role) {
      case 'customer':
        return [
          { to: '/', label: 'Catalog', icon: Package },
          { to: '/cart', label: 'Cart', icon: ShoppingCart, badge: itemCount > 0 ? itemCount : undefined },
        ];
      case 'driver':
        return [
          { to: '/driver', label: 'Orders', icon: Package },
        ];
      case 'admin':
        return [
          { to: '/admin', label: 'Dashboard', icon: Settings },
        ];
      default:
        return [];
    }
  };

  const navLinks = getNavLinks();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center">
            <Link to="/" className="text-lg sm:text-xl font-bold text-ocean-teal-600">
              Island Cart
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-ocean-teal-500 text-white shadow-sm'
                      : 'text-gray-600 hover:text-ocean-teal-600 hover:bg-ocean-teal-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="bg-coral-500 text-white text-xs rounded-full px-2 py-0.5 ml-1 min-w-[18px] text-center">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
            
            <div className="flex items-center space-x-2 pl-4 border-l border-gray-200">
              <div className="hidden lg:flex items-center space-x-2">
                <div className="w-8 h-8 bg-ocean-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-ocean-teal-700">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <span className="text-sm text-gray-700 font-medium">{user.name}</span>
              </div>
              <button
                onClick={logout}
                className="p-2 text-gray-400 hover:text-coral-500 transition-colors rounded-lg hover:bg-gray-50"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Cart badge for mobile */}
            {user.role === 'customer' && (
              <Link
                to="/cart"
                className="relative p-2 text-gray-600 hover:text-ocean-teal-600 transition-colors rounded-lg hover:bg-ocean-teal-50"
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-coral-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center font-medium">
                    {itemCount}
                  </span>
                )}
              </Link>
            )}
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-ocean-teal-500 text-white'
                        : 'text-gray-600 hover:text-ocean-teal-600 hover:bg-ocean-teal-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="bg-coral-500 text-white text-xs rounded-full px-2 py-0.5 ml-auto min-w-[18px] text-center font-medium">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
              
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex items-center justify-between px-3 py-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-ocean-teal-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-ocean-teal-700">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{user.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-sm text-gray-600 hover:text-coral-500 transition-colors p-2 rounded-lg hover:bg-gray-50"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};