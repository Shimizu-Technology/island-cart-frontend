import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProtectedRoute } from './components/shared/ProtectedRoute';
import { Navbar } from './components/shared/Navbar';
import { LoginPage } from './pages/LoginPage';
import { CatalogPage } from './pages/customer/CatalogPage';
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
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              
              {/* Customer Routes */}
              <Route path="/" element={
                <ProtectedRoute role="customer">
                  <CatalogPage />
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
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;