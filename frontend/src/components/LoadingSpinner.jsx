import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ 
  size = 'medium',
  color = 'primary',
  fullPage = false,
  className = '',
  overlay = false
}) => {
  // Size mapping
  const sizeClasses = {
    small: 'w-6 h-6 border-3',
    medium: 'w-10 h-10 border-4',
    large: 'w-16 h-16 border-4',
    xlarge: 'w-20 h-20 border-4'
  };

  // Color mapping
  const colorClasses = {
    primary: 'border-t-blue-500',
    secondary: 'border-t-purple-500',
    success: 'border-t-green-500',
    danger: 'border-t-red-500',
    warning: 'border-t-yellow-500',
    light: 'border-t-gray-200',
    dark: 'border-t-gray-800'
  };

  return (
    <div className={`loading-spinner-container 
      ${fullPage ? 'fixed inset-0' : ''} 
      ${overlay ? 'bg-black bg-opacity-30' : ''}
      ${className}`}
    >
      <div className={`spinner 
        ${sizeClasses[size]} 
        ${colorClasses[color]}
        border-transparent rounded-full animate-spin`}
      />
    </div>
  );
};

export default LoadingSpinner;