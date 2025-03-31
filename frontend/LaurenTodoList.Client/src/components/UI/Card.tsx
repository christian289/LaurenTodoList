'use client';

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  elevation?: 0 | 1 | 2 | 3;
}

export function Card({ children, className = '', elevation = 1 }: CardProps) {
  const elevationStyles = {
    0: 'border border-gray-200',
    1: 'shadow-sm',
    2: 'shadow-md',
    3: 'shadow-lg',
  };
  
  return (
    <div className={`bg-white rounded-lg ${elevationStyles[elevation]} overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

interface CardHeaderProps {
  title: React.ReactNode;
  subheader?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function CardHeader({ title, subheader, action, className = '' }: CardHeaderProps) {
  return (
    <div className={`px-4 pt-4 pb-2 flex justify-between items-start ${className}`}>
      <div>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        {subheader && <p className="text-sm text-gray-500">{subheader}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
