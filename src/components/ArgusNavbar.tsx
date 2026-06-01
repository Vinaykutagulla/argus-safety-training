'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ArgusNavbar() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    window.location.href = '/login';
  };

  return (
    <>
      {/* Premium Modern Navbar - Updated */}
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between h-20 px-8">
          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-16">A</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-16 text-gray-900">Argus</span>
              <span className="text-10 text-gray-500 -mt-0.5">Safety Training</span>
            </div>
          </div>

          {/* Center: Main Navigation */}
          <div className="flex items-center gap-8">
            <Link
              href="/dashboard"
              className="text-13 font-semibold text-gray-700 hover:text-blue-600 transition-colors px-3 py-2"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/cases"
              className="text-13 font-semibold text-gray-700 hover:text-blue-600 transition-colors px-3 py-2"
            >
              Cases
            </Link>
            <Link
              href="/dashboard/reports/expedited"
              className="text-13 font-semibold text-gray-700 hover:text-blue-600 transition-colors px-3 py-2"
            >
              Reports
            </Link>
            <Link
              href="/dashboard/workflow"
              className="text-13 font-semibold text-gray-700 hover:text-blue-600 transition-colors px-3 py-2"
            >
              Workflow
            </Link>
            <Link
              href="/dashboard/meddra"
              className="text-13 font-semibold text-gray-700 hover:text-blue-600 transition-colors px-3 py-2"
            >
              MedDRA
            </Link>
          </div>

          {/* Right: Action Buttons + User Menu */}
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/cases/new"
              className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-12 rounded-lg hover:shadow-lg transition-all hover:from-blue-700 hover:to-blue-800"
            >
              + New Case
            </Link>

            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-11 font-bold">
                  A
                </div>
                <span className="text-13 font-semibold text-gray-700">Admin</span>
                <span className="text-gray-400">▼</span>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                    <div className="text-12 font-semibold text-gray-900">admin@argus.com</div>
                    <div className="text-11 text-gray-500 mt-1">Administrator</div>
                  </div>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-3 text-12 font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    My Dashboard
                  </Link>
                  <Link
                    href="/dashboard/admin/users"
                    className="block px-4 py-3 text-12 font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-t border-gray-100"
                  >
                    User Management
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-3 text-12 font-medium text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-blue-50 border-t border-gray-100 h-10 flex items-center px-8 text-11 gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-700 font-medium">Online</span>
          </div>
          <div className="text-gray-600">Last sync: just now</div>
          <div className="ml-auto text-gray-600">Training Mode: Enabled</div>
        </div>
      </nav>
    </>
  );
}
