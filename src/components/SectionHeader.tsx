'use client';

import React from 'react';

interface SectionHeaderProps {
  title: string;
  actions?: React.ReactNode;
}

export default function SectionHeader({ title, actions }: SectionHeaderProps) {
  return (
    <div className="flex justify-between items-center bg-argus-navy text-argus-text-header px-2 py-1 text-11 font-bold uppercase my-2">
      <span>{title}</span>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}
