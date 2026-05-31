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
    'border border-argus-border px-1 py-0.5 text-11 font-sans h-5 focus:outline-none focus:border-argus-light';
  const invalidClass = invalid ? 'border-red-600 bg-red-50' : '';

  return (
    <input
      className={`${baseClass} ${invalidClass} ${className || ''}`}
      {...props}
    />
  );
}
