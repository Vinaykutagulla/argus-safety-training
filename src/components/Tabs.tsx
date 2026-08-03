'use client';

import React from 'react';

interface TabsProps {
  tabs: Array<{ id: string; label: string; content: React.ReactNode }>;
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <div className="w-full">
      <div className="flex border-b border-argus-border tabs-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`rounded-t-sm mr-1 transition-colors ${
              activeTab === tab.id
                ? 'bg-[color:var(--argus-classic-tab)] text-argus-text-primary font-semibold'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span className="px-2 py-1 text-xs">{tab.label}</span>
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}
