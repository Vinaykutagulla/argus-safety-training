'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api-client';

export function Navigation() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    api.auth.getCurrentUser().catch(() => router.push('/login'));
  }, [router]);

  const handleLogout = async () => {
    try {
      await api.auth.logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/dashboard" className="font-bold text-xl">
            Argus Safety
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link href="/dashboard" className="hover:text-blue-200 transition">
              Dashboard
            </Link>
            <Link href="/dashboard/cases" className="hover:text-blue-200 transition">
              Cases
            </Link>
            <Link href="/dashboard/reports/expedited" className="hover:text-blue-200 transition">
              Reports
            </Link>
            <Link href="/dashboard/meddra" className="hover:text-blue-200 transition">
              MedDRA
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="hover:text-blue-200"
            >
              👤 Menu
            </button>
            {isOpen && (
              <div className="absolute right-4 top-16 bg-white text-gray-900 rounded shadow-lg overflow-hidden z-50">
                <Link
                  href="/dashboard/admin/users"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden pb-4 space-y-2">
          <Link href="/dashboard" className="block hover:text-blue-200">
            Dashboard
          </Link>
          <Link href="/dashboard/cases" className="block hover:text-blue-200">
            Cases
          </Link>
          <Link href="/dashboard/reports/expedited" className="block hover:text-blue-200">
            Reports
          </Link>
          <Link href="/dashboard/meddra" className="block hover:text-blue-200">
            MedDRA
          </Link>
        </div>
      </div>
    </nav>
  );
}
