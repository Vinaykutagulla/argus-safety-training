'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ArgusNavbar() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    window.location.href = '/login';
  };

  const worklistMenu = [
    { label: 'All Cases', href: '/dashboard/cases' },
    { label: 'My Worklist', href: '/dashboard' },
    { label: 'Assigned to Me', href: '/dashboard/cases?filter=assigned' },
  ];

  const utilitiesMenu = [
    { label: 'Expedited Reports', href: '/dashboard/reports/expedited' },
    { label: 'Periodic Reports', href: '/dashboard/reports/periodic' },
    { label: 'Reports Archive', href: '/dashboard/reports' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[color:var(--argus-classic-top)] border-b border-argus-border">
      {/* Top thin header with brand and user */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-sm text-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white flex items-center justify-center border border-argus-border text-sm font-bold">OR</div>
          <div className="text-sm font-semibold">Argus Safety</div>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div>Welcome, <strong>Admin</strong></div>
          <div className="text-gray-600">|</div>
          <div>Last sync: just now</div>
          <div className="text-gray-600">|</div>
          <button onClick={handleLogout} className="px-2 py-0.5 bg-transparent border border-transparent hover:underline">Logout</button>
        </div>
      </div>

      {/* Tabs row with optional dropdowns */}
      <div className="bg-[color:var(--argus-classic-bar)]">
        <div className="max-w-7xl mx-auto px-3">
          <div className="flex gap-2 py-1 text-sm items-center">
            <Link href="/dashboard" className="px-3 py-1 bg-[color:var(--argus-classic-tab)] border border-argus-border text-xs">Active Cases</Link>

            <div
              className="relative"
              onMouseEnter={() => setOpenMenu('worklist')}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button
                onClick={() => setOpenMenu(openMenu === 'worklist' ? null : 'worklist')}
                className="px-3 py-1 bg-[color:var(--argus-classic-tab)] border border-argus-border text-xs"
              >
                Worklist ▾
              </button>

              {openMenu === 'worklist' && (
                <div className="absolute left-0 mt-1 w-48 bg-white border border-argus-border shadow-sm z-40">
                  {worklistMenu.map((m) => (
                    <Link key={m.href} href={m.href} className="block px-3 py-2 text-sm hover:bg-[color:var(--argus-classic-tab)]">{m.label}</Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/dashboard/cases/new" className="px-3 py-1 bg-[color:var(--argus-classic-tab)] border border-argus-border text-xs">Case Actions</Link>

            <div
              className="relative"
              onMouseEnter={() => setOpenMenu('utilities')}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button
                onClick={() => setOpenMenu(openMenu === 'utilities' ? null : 'utilities')}
                className="px-3 py-1 bg-[color:var(--argus-classic-tab)] border border-argus-border text-xs"
              >
                Utilities ▾
              </button>

              {openMenu === 'utilities' && (
                <div className="absolute left-0 mt-1 w-56 bg-white border border-argus-border shadow-sm z-40">
                  {utilitiesMenu.map((m) => (
                    <Link key={m.href} href={m.href} className="block px-3 py-2 text-sm hover:bg-[color:var(--argus-classic-tab)]">{m.label}</Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/dashboard/workflow" className="px-3 py-1 bg-[color:var(--argus-classic-tab)] border border-argus-border text-xs">Dashboards</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
