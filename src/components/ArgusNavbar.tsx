'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ArgusNavbar() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [fileMenuOpen, setFileMenuOpen] = useState(false);
  const [caseMenuOpen, setCaseMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    window.location.href = '/login';
  };

  return (
    <>
      {/* Main Navigation Bar */}
      <div className="bg-argus-navy text-argus-text-header h-8 flex items-center px-4 text-11 font-sans shadow-lg border-b-2 border-argus-border-dark">
        {/* Logo */}
        <div className="flex items-center gap-2 pr-6 border-r border-argus-border-dark">
          <span className="font-bold text-12">Argus</span>
          <span className="text-10 opacity-75">Safety 8.4</span>
        </div>

        {/* Menu Items */}
        <div className="flex items-center gap-4 flex-1 px-4">
          {/* File Menu */}
          <div className="relative group">
            <button
              onMouseEnter={() => setFileMenuOpen(true)}
              onMouseLeave={() => setFileMenuOpen(false)}
              className="hover:bg-argus-blue px-2 py-1 text-11 transition-colors"
            >
              File ▼
            </button>
            {fileMenuOpen && (
              <div
                onMouseEnter={() => setFileMenuOpen(true)}
                onMouseLeave={() => setFileMenuOpen(false)}
                className="absolute top-full left-0 bg-white text-argus-text-primary border border-argus-border shadow-md z-50 mt-0"
              >
                <Link href="/dashboard/cases/new" className="block px-3 py-1 text-11 hover:bg-argus-bg-tab-inactive">
                  New Case
                </Link>
                <div className="border-t border-argus-border"></div>
                <button onClick={handleLogout} className="block w-full text-left px-3 py-1 text-11 hover:bg-argus-bg-tab-inactive text-red-600">
                  Exit
                </button>
              </div>
            )}
          </div>

          {/* Case Menu */}
          <div className="relative">
            <button
              onMouseEnter={() => setCaseMenuOpen(true)}
              onMouseLeave={() => setCaseMenuOpen(false)}
              className="hover:bg-argus-blue px-2 py-1 text-11 transition-colors"
            >
              Case ▼
            </button>
            {caseMenuOpen && (
              <div
                onMouseEnter={() => setCaseMenuOpen(true)}
                onMouseLeave={() => setCaseMenuOpen(false)}
                className="absolute top-full left-0 bg-white text-argus-text-primary border border-argus-border shadow-md z-50 mt-0"
              >
                <Link href="/dashboard/cases/new" className="block px-3 py-1 text-11 hover:bg-argus-bg-tab-inactive">
                  New Case
                </Link>
                <Link href="/dashboard/cases" className="block px-3 py-1 text-11 hover:bg-argus-bg-tab-inactive">
                  Search / Open Cases
                </Link>
              </div>
            )}
          </div>

          <Link href="/dashboard" className="hover:bg-argus-blue px-2 py-1 text-11 transition-colors">
            Dashboards
          </Link>

          <Link href="/dashboard/reports/expedited" className="hover:bg-argus-blue px-2 py-1 text-11 transition-colors">
            Reports
          </Link>

          <Link href="/dashboard/workflow" className="hover:bg-argus-blue px-2 py-1 text-11 transition-colors">
            Worklist
          </Link>

          <Link href="/dashboard/meddra" className="hover:bg-argus-blue px-2 py-1 text-11 transition-colors">
            Utilities
          </Link>
        </div>

        {/* Right side - User Menu */}
        <div className="flex items-center gap-4 border-l border-argus-border-dark pl-4">
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="hover:bg-argus-blue px-2 py-1 text-11 transition-colors flex items-center gap-1"
            >
              👤 Admin ▼
            </button>
            {userMenuOpen && (
              <div className="absolute top-full right-0 bg-white text-argus-text-primary border border-argus-border shadow-md z-50 mt-0 min-w-40">
                <div className="px-3 py-1 text-11 border-b border-argus-border text-argus-text-muted">
                  admin@argus.com
                </div>
                <Link href="/dashboard" className="block px-3 py-1 text-11 hover:bg-argus-bg-tab-inactive">
                  My Profile
                </Link>
                <Link href="/dashboard/admin/users" className="block px-3 py-1 text-11 hover:bg-argus-bg-tab-inactive">
                  User Administration
                </Link>
                <div className="border-t border-argus-border"></div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-1 text-11 hover:bg-argus-bg-tab-inactive text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Launch Toolbar */}
      <div className="bg-argus-bg-tab-inactive border-b border-argus-border h-7 flex items-center px-4 gap-6 text-11">
        <Link href="/dashboard/cases/new" className="hover:text-argus-blue transition-colors flex items-center gap-1">
          📋 New Case
        </Link>
        <Link href="/dashboard/cases" className="hover:text-argus-blue transition-colors flex items-center gap-1">
          🔍 Search Cases
        </Link>
        <Link href="/dashboard" className="hover:text-argus-blue transition-colors flex items-center gap-1">
          📊 My Worklist
        </Link>
        <Link href="/dashboard/reports/expedited" className="hover:text-argus-blue transition-colors flex items-center gap-1">
          ⚡ Reports Due
        </Link>
        <div className="ml-auto text-argus-text-muted text-10">
          Last Login: Today 09:15 AM
        </div>
      </div>
    </>
  );
}
