import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PrimaryButton } from '../components/shared/PrimaryButton';

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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome to Island Cart
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to your account
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-2xl shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-ocean-teal-500 focus:border-ocean-teal-500"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-ocean-teal-500 focus:border-ocean-teal-500"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {error && (
            <div className="text-coral-600 text-sm text-center">{error}</div>
          )}

          <div>
            <PrimaryButton
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </PrimaryButton>
          </div>
        </form>

        <div className="mt-8 p-4 bg-blue-50 rounded-2xl">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Demo Accounts:</h3>
          <div className="text-xs text-blue-800 space-y-1">
            <p><strong>Customer:</strong> customer@test.com</p>
            <p><strong>Driver:</strong> driver@test.com</p>
            <p><strong>Admin:</strong> admin@test.com</p>
            <p><strong>Password:</strong> password</p>
          </div>
        </div>
      </div>
    </div>
  );
};