'use client';

import React from 'react';

interface TextFieldProps {
  id: string;
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  fullWidth?: boolean;
  type?: string;
  className?: string;
  variant?: 'outlined' | 'filled';
}

export default function TextField({
  id,
  label,
  value,
  onChange,
  placeholder = '',
  multiline = false,
  rows = 1,
  error = false,
  helperText,
  required = false,
  fullWidth = false,
  type = 'text',
  className = '',
  variant = 'outlined',
}: TextFieldProps) {
  const baseInputStyles = `
    block w-full px-3 py-2 
    focus:outline-none focus:ring-2 focus:ring-blue-500 
    transition-all duration-200
  `;
  
  const variantStyles = {
    outlined: `
      border rounded-md
      ${error ? 'border-red-500' : 'border-gray-300'}
      focus:border-blue-500
    `,
    filled: `
      border-0 border-b-2 bg-gray-100 rounded-t-md
      ${error ? 'border-red-500' : 'border-gray-300'}
      focus:border-blue-500 focus:bg-gray-50
    `,
  };
  
  const InputElement = multiline 
    ? (props: any) => <textarea {...props} rows={rows} /> 
    : (props: any) => <input {...props} type={type} />;
  
  return (
    <div className={`mb-4 ${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label 
          htmlFor={id} 
          className={`block text-sm font-medium mb-1 ${error ? 'text-red-500' : 'text-gray-700'}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <InputElement
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`${baseInputStyles} ${variantStyles[variant]}`}
      />
      
      {helperText && (
        <p className={`mt-1 text-xs ${error ? 'text-red-500' : 'text-gray-500'}`}>
          {helperText}
        </p>
      )}
    </div>
  );
}