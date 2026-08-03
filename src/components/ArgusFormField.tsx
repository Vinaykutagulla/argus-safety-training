'use client';

import React from 'react';

interface ArgusFormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  help?: string;
  children: React.ReactNode;
  htmlFor?: string;
  width?: 'full' | 'half' | 'third';
}

export default function ArgusFormField({
  label,
  required = false,
  error,
  help,
  children,
  htmlFor,
  width = 'half',
}: ArgusFormFieldProps) {
  const widthClass = {
    full: 'w-full',
    half: 'w-1/2',
    third: 'w-1/3',
  }[width];

  return (
    <div className={`${widthClass} form-row flex items-start py-0.5`}>
      {/* Right-aligned label (compact) */}
      <label
        htmlFor={htmlFor}
        className="text-xs font-semibold text-argus-text-label pt-0.5 label-right flex-shrink-0"
      >
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>

      {/* Input container */}
      <div className="flex-1">
        {children}
        {error && <div className="text-xs text-red-600 mt-0.5">{error}</div>}
        {help && !error && <div className="text-xs text-argus-text-muted mt-0.5">{help}</div>}
      </div>
    </div>
  );
}
