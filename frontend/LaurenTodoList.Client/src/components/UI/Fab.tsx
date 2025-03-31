'use client';

import React from 'react';

interface FabProps {
  onClick: () => void;
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'error';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  ariaLabel: string;
}

export default function Fab({
  onClick,
  children,
  color = 'primary',
  size = 'medium',
  className = '',
  ariaLabel,
}: FabProps) {
  const colorStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-purple-600 hover:bg-purple-700 text-white',
    error: 'bg-red-600 hover:bg-red-700 text-white',
  };
  
  const sizeStyles = {
    small: 'h-10 w-10 text-lg',
    medium: 'h-14 w-14 text-xl',
    large: 'h-16 w-16 text-2xl',
  };
  
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`
        rounded-full
        shadow-lg
        flex items-center justify-center
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        transition-all
        duration-200
        ${colorStyles[color]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}