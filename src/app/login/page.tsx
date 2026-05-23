'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api-client';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Card } from '@/components/Card';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await api.auth.login(formData);
      // Store token in localStorage for API requests
      if (result.token) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth-token', result.token);
        }
        // Redirect after a small delay to allow storage
        setTimeout(() => {
          router.push('/dashboard');
        }, 100);
      } else {
        setError('Login failed: No token received');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Argus Safety</h1>
          <p className="text-gray-600 mt-2">Pharmacovigilance Training Platform</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Sign In'}
          </Button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-600 font-medium hover:underline">
            Register here
          </Link>
        </p>

        <div className="mt-6 pt-6 border-t border-gray-300">
          <p className="text-xs text-gray-500 text-center">Demo Credentials:</p>
          <p className="text-xs text-gray-500 text-center">admin@argus.com / password123</p>
        </div>
      </Card>
    </div>
  );
}
