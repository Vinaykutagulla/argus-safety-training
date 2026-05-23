'use client';

import React, { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'info' | 'success' | 'danger' | 'warning' | 'gray';
}

export function Badge({ children, variant = 'info' }: BadgeProps) {
  const variantStyles = {
    info: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
    warning: 'bg-orange-100 text-orange-800',
    gray: 'bg-gray-100 text-gray-800',
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${variantStyles[variant]}`}>
      {children}
    </span>
  );
}
