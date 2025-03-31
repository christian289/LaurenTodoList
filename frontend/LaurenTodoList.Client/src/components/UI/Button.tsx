'use client';

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'error';
  disabled?: boolean;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string;
}

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'contained',
  color = 'primary',
  disabled = false,
  fullWidth = false,
  startIcon,
  endIcon,
  className = '',
}: ButtonProps) {
  // 스타일 매핑 (Material Design 스타일)
  const variantStyles = {
    contained: {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-md',
      secondary: 'bg-purple-600 hover:bg-purple-700 text-white shadow-md',
      error: 'bg-red-600 hover:bg-red-700 text-white shadow-md',
    },
    outlined: {
      primary: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
      secondary: 'border border-purple-600 text-purple-600 hover:bg-purple-50',
      error: 'border border-red-600 text-red-600 hover:bg-red-50',
    },
    text: {
      primary: 'text-blue-600 hover:bg-blue-50',
      secondary: 'text-purple-600 hover:bg-purple-50',
      error: 'text-red-600 hover:bg-red-50',
    },
  };

  const baseStyle = 'font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const sizeStyle = 'py-2 px-4';
  const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  const widthStyle = fullWidth ? 'w-full' : '';
  
  // 현재 variant와 color에 따른 스타일 가져오기
  const currentStyle = variantStyles[variant][color];
  
  // 포커스 링 색상
  const focusRingColors = {
    primary: 'focus:ring-blue-500',
    secondary: 'focus:ring-purple-500',
    error: 'focus:ring-red-500',
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyle} 
        ${sizeStyle} 
        ${currentStyle} 
        ${disabledStyle} 
        ${widthStyle} 
        ${focusRingColors[color]}
        flex items-center justify-center gap-2
        ${className}
      `}
    >
      {startIcon && <span className="inline-flex">{startIcon}</span>}
      {children}
      {endIcon && <span className="inline-flex">{endIcon}</span>}
    </button>
  );
}