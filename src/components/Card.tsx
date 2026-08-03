'use client';

import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div
      className={`bg-argus-bg-panel rounded-lg border border-argus-border p-6 ${onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: string;
  color?: 'blue' | 'red' | 'green' | 'orange';
}

export function MetricCard({ label, value, icon, color = 'blue' }: MetricCardProps) {
  const colorStyles = {
    blue: 'border-l-blue-600 bg-blue-50',
    red: 'border-l-red-600 bg-red-50',
    green: 'border-l-green-600 bg-green-50',
    orange: 'border-l-orange-500 bg-orange-50',
  };

  return (
    <Card className={`border-l-4 ${colorStyles[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        {icon && <span className="text-4xl">{icon}</span>}
      </div>
    </Card>
  );
}
