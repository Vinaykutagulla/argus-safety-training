'use client';

import React from 'react';

interface ArgusInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export default function ArgusInput({
  invalid = false,
  className,
  ...props
}: ArgusInputProps) {
  const baseClass =
    'border border-argus-border rounded-sm px-3 py-2 text-sm font-sans h-10 transition focus:outline-none focus:border-argus-light focus:ring-1 focus:ring-argus-light';
  const invalidClass = invalid ? 'border-red-600 bg-red-50' : '';

  return (
    <input
      className={`${baseClass} ${invalidClass} ${className || ''}`}
      {...props}
    />
  );
}
