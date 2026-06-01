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
      {/* Premium Navigation Bar */}
      <nav className="bg-gradient-to-r from-argus-navy via-blue-900 to-argus-navy text-white shadow-xl border-b-4 border-argus-light">
        <div className="flex items-center h-16 px-6">
          {/* Logo Section */}
          <div className="flex items-center gap-3 pr-8 border-r border-blue-700">
            <div className="bg-gradient-to-br from-argus-light to-blue-600 p-2.5 rounded-lg shadow-lg">
              <span className="text-white font-bold text-18">⚕️</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-16 tracking-wider">ARGUS Safety</span>
              <span className="text-11 opacity-75">Pharmacovigilance</span>
            </div>
          </div>

          {/* Main Menu */}
          <div className="flex items-center gap-1 flex-1 px-6">
            {/* File Menu */}
            <div className="relative group">
              <button
                onMouseEnter={() => setFileMenuOpen(true)}
                onMouseLeave={() => setFileMenuOpen(false)}
                className="hover:bg-blue-700 px-4 py-2 text-12 font-semibold transition-all rounded-lg hover:shadow-lg"
              >
                📁 File
              </button>
              {fileMenuOpen && (
                <div
                  onMouseEnter={() => setFileMenuOpen(true)}
                  onMouseLeave={() => setFileMenuOpen(false)}
                  className="absolute top-full left-0 bg-white text-argus-navy border-2 border-argus-light shadow-xl z-50 mt-2 rounded-lg overflow-hidden"
                >
                  <Link href="/dashboard/cases/new" className="block px-4 py-2.5 text-12 hover:bg-blue-100 transition-colors border-b border-gray-200 font-medium">
                    ➕ New Case
                  </Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2.5 text-12 hover:bg-red-50 transition-colors text-red-600 font-medium">
                    🚪 Exit
                  </button>
                </div>
              )}
            </div>

            {/* Case Menu */}
            <div className="relative">
              <button
                onMouseEnter={() => setCaseMenuOpen(true)}
                onMouseLeave={() => setCaseMenuOpen(false)}
                className="hover:bg-blue-700 px-4 py-2 text-12 font-semibold transition-all rounded-lg hover:shadow-lg"
              >
                📋 Case
              </button>
              {caseMenuOpen && (
                <div
                  onMouseEnter={() => setCaseMenuOpen(true)}
                  onMouseLeave={() => setCaseMenuOpen(false)}
                  className="absolute top-full left-0 bg-white text-argus-navy border-2 border-argus-light shadow-xl z-50 mt-2 rounded-lg overflow-hidden"
                >
                  <Link href="/dashboard/cases/new" className="block px-4 py-2.5 text-12 hover:bg-blue-100 transition-colors border-b border-gray-200 font-medium">
                    ➕ Create Case
                  </Link>
                  <Link href="/dashboard/cases" className="block px-4 py-2.5 text-12 hover:bg-blue-100 transition-colors font-medium">
                    🔍 Search & Open
                  </Link>
                </div>
              )}
            </div>

            <Link href="/dashboard" className="hover:bg-blue-700 px-4 py-2 text-12 font-semibold transition-all rounded-lg hover:shadow-lg">
              📊 Dashboard
            </Link>

            <Link href="/dashboard/reports/expedited" className="hover:bg-blue-700 px-4 py-2 text-12 font-semibold transition-all rounded-lg hover:shadow-lg">
              📄 Reports
            </Link>

            <Link href="/dashboard/workflow" className="hover:bg-blue-700 px-4 py-2 text-12 font-semibold transition-all rounded-lg hover:shadow-lg">
              ⚙️ Workflow
            </Link>

            <Link href="/dashboard/meddra" className="hover:bg-blue-700 px-4 py-2 text-12 font-semibold transition-all rounded-lg hover:shadow-lg">
              💊 MedDRA
            </Link>
          </div>

          {/* Right side - User Menu & Status */}
          <div className="flex items-center gap-4 border-l border-blue-700 pl-6">
            <div className="text-right text-10 opacity-80">
              <div>👤 Admin</div>
              <div className="text-green-300 font-semibold">● Online</div>
            </div>
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="bg-blue-700 hover:bg-blue-600 px-3 py-2 text-11 font-bold rounded-lg transition-all hover:shadow-lg flex items-center gap-2"
              >
                ⚙️ Menu
              </button>
              {userMenuOpen && (
                <div className="absolute top-full right-0 bg-white text-argus-navy border-2 border-argus-light shadow-xl z-50 mt-2 min-w-48 rounded-lg overflow-hidden">
                  <div className="px-4 py-2.5 text-11 border-b-2 border-blue-200 bg-blue-50 font-bold text-argus-blue">
                    admin@argus.com
                  </div>
                  <Link href="/dashboard" className="block px-4 py-2.5 text-11 hover:bg-blue-100 transition-colors border-b border-gray-200 font-medium">
                    👤 My Profile
                  </Link>
                  <Link href="/dashboard/admin/users" className="block px-4 py-2.5 text-11 hover:bg-blue-100 transition-colors border-b border-gray-200 font-medium">
                    👨‍💼 User Admin
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2.5 text-11 hover:bg-red-50 transition-colors text-red-600 font-bold"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions Bar */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-800 border-t border-blue-600 h-12 flex items-center px-6 gap-8 text-11 font-semibold">
          <Link href="/dashboard/cases/new" className="hover:text-argus-light transition-colors flex items-center gap-2 hover:scale-110 transform">
            ➕ New Case
          </Link>
          <Link href="/dashboard/cases" className="hover:text-argus-light transition-colors flex items-center gap-2 hover:scale-110 transform">
            🔍 Search
          </Link>
          <Link href="/dashboard" className="hover:text-argus-light transition-colors flex items-center gap-2 hover:scale-110 transform">
            📊 Worklist
          </Link>
          <Link href="/dashboard/reports/expedited" className="hover:text-argus-light transition-colors flex items-center gap-2 hover:scale-110 transform">
            ⏰ Reports Due
          </Link>
          <div className="ml-auto text-blue-200 text-10">
            Last Login: Today 09:15 AM
          </div>
        </div>
      </nav>
    </>
  );
}
