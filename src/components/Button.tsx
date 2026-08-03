'use client';

import React, { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger' | 'warning';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
}

export function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className = '',
  fullWidth = false,
  size = 'md',
  icon,
}: ButtonProps) {
  const baseStyles =
    'rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-1 inline-flex items-center';

  const sizeStyles = size === 'sm' ? 'px-2 py-1 text-sm rounded-sm' : 'px-4 py-2 text-sm';

  const variantStyles = {
    primary: 'bg-gradient-to-r from-argus-blue to-argus-light text-white hover:from-argus-light hover:to-argus-blue focus:ring-argus-blue',
    secondary: 'bg-white text-argus-navy border border-argus-border shadow-sm hover:bg-[color:var(--argus-classic-tab)]',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-400',
    warning: 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-300',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles} ${variantStyles[variant]} ${widthStyle} ${className}`}
    >
      {icon && <span className="mr-2 inline-flex items-center">{icon}</span>}
      {children}
    </button>
  );
}
