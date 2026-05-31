'use client';

import React, { useState } from 'react';

interface ArgusDateFieldProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
}

export default function ArgusDateField({
  value,
  onChange,
  placeholder = 'DD-MMM-YYYY',
  disabled,
  invalid = false,
}: ArgusDateFieldProps) {
  const formatDate = (date: Date | string | undefined): string => {
    if (!date) return '';

    const d = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(d.getTime())) return '';

    const months = [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC',
    ];

    const day = String(d.getDate()).padStart(2, '0');
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const parseDate = (input: string): string => {
    // Try to parse DD-MMM-YYYY format
    const match = input.match(/^(\d{1,2})-([A-Za-z]{3})-(\d{4})$/);
    if (!match) return input;

    const [, day, month, year] = match;
    const months = {
      JAN: 0,
      FEB: 1,
      MAR: 2,
      APR: 3,
      MAY: 4,
      JUN: 5,
      JUL: 6,
      AUG: 7,
      SEP: 8,
      OCT: 9,
      NOV: 10,
      DEC: 11,
    };

    const monthIndex = months[month.toUpperCase() as keyof typeof months];
    if (monthIndex === undefined) return input;

    const date = new Date(parseInt(year), monthIndex, parseInt(day));
    return date.toISOString().split('T')[0];
  };

  return (
    <input
      type="date"
      value={value ? value.split('T')[0] : ''}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className={`border border-argus-border px-1 py-0.5 text-11 font-sans h-5 focus:outline-none focus:border-argus-light w-32 ${invalid ? 'border-red-600 bg-red-50' : ''}`}
    />
  );
}
