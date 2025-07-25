import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ProtectedRoute } from './components/shared/ProtectedRoute';
import { Navbar } from './components/shared/Navbar';
import { LoginPage } from './pages/LoginPage';
import { CustomerHome } from './pages/customer/CustomerHome';
import { CatalogPage } from './pages/customer/CatalogPage';
import { FavoritesPage } from './pages/customer/FavoritesPage';
import { CartPage } from './pages/customer/CartPage';
import { CheckoutPage } from './pages/customer/CheckoutPage';
import { OrderTrackingPage } from './pages/customer/OrderTrackingPage';
import { DriverDashboard } from './pages/driver/DriverDashboard';
import { OrderDetailsPage } from './pages/driver/OrderDetailsPage';
import { OrderShoppingPage } from './pages/driver/OrderShoppingPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <main className="pt-16">
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  
                  {/* Customer Routes */}
                  <Route path="/" element={
                    <ProtectedRoute role="customer">
                      <CustomerHome />
                    </ProtectedRoute>
                  } />
                  <Route path="/catalog" element={
                    <ProtectedRoute role="customer">
                      <CatalogPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/favorites" element={
                    <ProtectedRoute role="customer">
                      <FavoritesPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/cart" element={
                    <ProtectedRoute role="customer">
                      <CartPage />
                    </ProtectedRoute>
                  } />
                <Route path="/checkout" element={
                  <ProtectedRoute role="customer">
                    <CheckoutPage />
                  </ProtectedRoute>
                } />
                <Route path="/orders/:orderId" element={
                  <ProtectedRoute role="customer">
                    <OrderTrackingPage />
                  </ProtectedRoute>
                } />
                
                {/* Driver Routes */}
                <Route path="/driver" element={
                  <ProtectedRoute role="driver">
                    <DriverDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/driver/orders/:orderId" element={
                  <ProtectedRoute role="driver">
                    <OrderDetailsPage />
                  </ProtectedRoute>
                } />
                <Route path="/driver/orders/:orderId/shopping" element={
                  <ProtectedRoute role="driver">
                    <OrderShoppingPage />
                  </ProtectedRoute>
                } />
                
                {/* Admin Routes */}
                <Route path="/admin" element={
                  <ProtectedRoute role="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                
                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </Router>
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;