'use client';

import React from 'react';

interface InputProps {
  label?: string;
  type?: string;
  name?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
  rows?: number;
  options?: Array<{ value: string; label: string }>;
  multiline?: boolean;
}

export function Input({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  disabled = false,
  className = '',
  rows = 4,
  options,
  multiline = false,
}: InputProps) {
  const baseStyles =
    'w-full px-3 py-2 border rounded bg-white text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed';
  const errorStyles = error ? 'border-red-500' : 'border-gray-300';

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {type === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange as any}
          disabled={disabled}
          className={`${baseStyles} ${errorStyles} ${className}`}
        >
          <option value="">Select an option</option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : multiline ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          className={`${baseStyles} ${errorStyles} ${className}`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`${baseStyles} ${errorStyles} ${className}`}
        />
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
