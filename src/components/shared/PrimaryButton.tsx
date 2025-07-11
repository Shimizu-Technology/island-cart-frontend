import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface PrimaryButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  className?: string;
  type?: 'button' | 'submit';
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  onClick,
  children,
  disabled = false,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  className = '',
  type = 'button'
}) => {
  const baseStyles = 'font-medium rounded-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2';
  
  const variantStyles = {
    primary: 'bg-ocean-teal-600 text-white hover:bg-ocean-teal-700 focus:ring-ocean-teal-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    danger: 'bg-coral-500 text-white hover:bg-coral-600 focus:ring-coral-500'
  };

  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </button>
  );
};