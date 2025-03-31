'use client';

import React from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  id?: string;
  color?: 'primary' | 'secondary' | 'error';
  disabled?: boolean;
  className?: string;
}

export default function Checkbox({
  checked,
  onChange,
  label,
  id,
  color = 'primary',
  disabled = false,
  className = '',
}: CheckboxProps) {
  const colorStyles = {
    primary: 'text-blue-600 focus:ring-blue-500',
    secondary: 'text-purple-600 focus:ring-purple-500',
    error: 'text-red-600 focus:ring-red-500',
  };

  return (
    <div className={`flex items-center ${className}`}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className={`
          h-5 w-5 rounded
          focus:ring-2 focus:ring-offset-2
          ${colorStyles[color]}
          ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
        `}
      />
      {label && (
        <label
          htmlFor={id}
          className={`ml-2 block text-sm ${disabled ? 'text-gray-400' : 'text-gray-700'}`}
        >
          {label}
        </label>
      )}
    </div>
  );
}