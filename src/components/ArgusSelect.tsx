'use client';

import React from 'react';

interface ArgusSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Array<{ value: string; label: string }>;
  invalid?: boolean;
  placeholder?: string;
}

export default function ArgusSelect({
  options,
  invalid = false,
  placeholder = 'Select...',
  className,
  ...props
}: ArgusSelectProps) {
  const baseClass =
    'border border-argus-border rounded-sm px-3 py-2 text-sm font-sans h-10 transition focus:outline-none focus:border-argus-light focus:ring-1 focus:ring-argus-light bg-white';
  const invalidClass = invalid ? 'border-red-600 bg-red-50' : '';

  return (
    <select
      className={`${baseClass} ${invalidClass} ${className || ''}`}
      {...props}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
