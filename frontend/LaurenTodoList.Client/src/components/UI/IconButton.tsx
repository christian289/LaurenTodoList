'use client';

import React from 'react';

interface IconButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  color?: 'default' | 'primary' | 'secondary' | 'error';
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  ariaLabel: string;
}

export default function IconButton({
  onClick,
  children,
  color = 'default',
  disabled = false,
  size = 'medium',
  className = '',
  ariaLabel,
}: IconButtonProps) {
  const colorStyles = {
    default: 'text-gray-500 hover:bg-gray-100',
    primary: 'text-blue-600 hover:bg-blue-50',
    secondary: 'text-purple-600 hover:bg-purple-50',
    error: 'text-red-600 hover:bg-red-50',
  };
  
  const sizeStyles = {
    small: 'p-1',
    medium: 'p-2',
    large: 'p-3',
  };
  
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`
        rounded-full 
        ${colorStyles[color]} 
        ${sizeStyles[size]} 
        focus:outline-none 
        focus:ring-2 
        focus:ring-offset-2 
        transition-colors 
        duration-200
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {children}
    </button>
  );
}