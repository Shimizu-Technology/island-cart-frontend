import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PrimaryButton } from '../components/shared/PrimaryButton';
import { Navbar } from '../components/shared/Navbar';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user, login } = useAuth();

  if (user) {
    const dashboardRoutes = {
      customer: '/',
      driver: '/driver',
      admin: '/admin'
    };
    return <Navigate to={dashboardRoutes[user.role]} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-ocean-teal-400 via-ocean-teal-500 to-ocean-teal-600 flex items-center justify-center pt-14 sm:pt-16 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <img 
              src="/logo.png" 
              alt="Guahan Grocer" 
              className="h-16 w-auto drop-shadow-lg"
            />
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">
            Welcome to{' '}
            <span className="text-white">Guahan</span>{' '}
            <span style={{ color: '#E67E52' }}>Grocer</span>
          </h2>
          <p className="text-ocean-teal-100 text-lg">
            Fresh groceries delivered to your door
          </p>
        </div>
        
        {/* Login Form */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-4 py-3 border border-gray-200 rounded-2xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ocean-teal-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-3 border border-gray-200 rounded-2xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ocean-teal-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-3">
                <p className="text-red-700 text-sm text-center font-medium">{error}</p>
              </div>
            )}

            <div>
              <PrimaryButton
                type="submit"
                disabled={isLoading}
                className="w-full py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </PrimaryButton>
            </div>
          </form>
        </div>

        {/* Demo Accounts */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
            🧪 Demo Accounts
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3">
              <p className="font-semibold text-blue-800 text-sm">Customer</p>
              <p className="text-xs text-blue-600 mt-1">customer@test.com</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3">
              <p className="font-semibold text-green-800 text-sm">Driver</p>
              <p className="text-xs text-green-600 mt-1">driver@test.com</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3">
              <p className="font-semibold text-purple-800 text-sm">Admin</p>
              <p className="text-xs text-purple-600 mt-1">admin@test.com</p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Password:</span> password
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};