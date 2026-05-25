'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    // Check localStorage for auth token
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth-token') : null;
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return <>{children}</>;
}
