'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function getAuthToken() {
  if (typeof window === 'undefined') return null;

  const localToken = window.localStorage.getItem('auth-token');
  if (localToken) return localToken;

  const cookieToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('auth-token='));

  return cookieToken ? cookieToken.split('=')[1] : null;
}

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const token = getAuthToken();

    if (token) {
      router.replace('/dashboard');
    } else {
      router.replace('/login');
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Redirecting...</p>
    </div>
  );
}
