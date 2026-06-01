'use client';

import React from 'react';

interface SectionHeaderProps {
  title: string;
  actions?: React.ReactNode;
}

export default function SectionHeader({ title, actions }: SectionHeaderProps) {
  return (
    <div className="flex justify-between items-center bg-gradient-to-r from-argus-navy to-blue-900 text-white px-4 py-3 text-12 font-bold uppercase tracking-wider shadow-md rounded-t-lg">
      <span className="flex items-center gap-2">{title}</span>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}
