"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import ArgusInput from '@/components/ArgusInput';
import ArgusSelect from '@/components/ArgusSelect';
import IconCheck from '@/components/icons/Check';

function getAuthToken() {
  if (typeof window === 'undefined') return null;

  const localToken = window.localStorage.getItem('auth-token');
  if (localToken) return localToken;

  const cookieToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('auth-token='));

  return cookieToken ? cookieToken.split('=')[1] : null;
}

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
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      const result = await response.json();

      if (response.ok && result.token) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth-token', result.token);
          document.cookie = `auth-token=${result.token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
        }

        const token = getAuthToken();
        if (token) {
          router.replace('/dashboard');
        } else {
          window.location.assign('/dashboard');
        }
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[color:var(--argus-classic-top)] py-8 px-4 flex items-center justify-center">
      <div className="mx-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-argus-border bg-white shadow-[0_18px_80px_-40px_rgba(0,0,0,0.25)] sm:flex-row">
        <div className="relative w-full bg-[color:var(--argus-classic-login-panel)] p-8 sm:w-2/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.45),_transparent_45%)]" />
          <div className="relative flex h-full flex-col justify-between text-white">
            <div>
              <p className="text-xs uppercase tracking-[0.45em] text-white/80">Argus Safety</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">Argus PV Console</h2>
            </div>

            <div className="mt-8 space-y-4">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white/20 text-xl font-bold text-white">
                OR
              </div>
              <p className="text-sm leading-6 text-white/90">
                A compact, professional interface for PV training and case management.
              </p>
            </div>

            <div className="space-y-1 text-sm text-white/80">
              <div className="font-semibold">Includes</div>
              <div>- Case entry & review</div>
              <div>- Regulatory deadlines</div>
              <div>- Shortcut access</div>
            </div>
          </div>
        </div>

        <div className="w-full bg-[color:var(--argus-classic-login-bg)] p-8 sm:w-3/5">
          <div className="max-w-xl">
            <div className="mb-6">
              <p className="text-xs uppercase tracking-[0.35em] text-argus-navy/75">Sign In</p>
              <h1 className="mt-3 text-3xl font-semibold text-argus-navy">Welcome back</h1>
              <p className="mt-2 text-sm text-slate-600">Use your Argus credentials to access the safety dashboard.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.25em] text-argus-navy/80">Username</label>
                  <ArgusInput
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@argus.com"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.25em] text-argus-navy/80">Password</label>
                  <ArgusInput
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.25em] text-argus-navy/80">Database</label>
                  <ArgusSelect
                    options={[
                      { value: 'ARGUSDB', label: 'ARGUSDB' },
                      { value: 'PRSTDB60', label: 'PRSTDB60' },
                    ]}
                    className="w-full"
                  />
                </div>
                <div className="flex items-end justify-between gap-2">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-sm border border-argus-border bg-white px-3 py-2 text-xs font-semibold text-argus-navy transition hover:bg-[color:var(--argus-classic-tab)]"
                  >
                    日本語
                  </button>
                  <Button type="submit" variant="primary" size="sm" icon={<IconCheck />} disabled={loading} className="w-full sm:w-auto">
                    {loading ? 'Signing in…' : 'Sign in'}
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-8 rounded-2xl bg-white/80 p-4 text-sm text-slate-600 shadow-sm">
              <p className="font-semibold text-slate-800">Quick tip</p>
              <p className="mt-2">Try <span className="font-medium">admin@argus.com</span> / <span className="font-medium">demo123</span>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
