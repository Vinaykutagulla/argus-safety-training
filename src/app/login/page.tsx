'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api-client';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: 'admin@argus.com', password: 'password123' });
  const [enterprise, setEnterprise] = useState('default');
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
      if (result.token) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth-token', result.token);
        }
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
    <div className="min-h-screen bg-gradient-to-b from-argus-navy to-argus-blue flex items-center justify-center px-4 font-sans">
      {/* Login Card - Oracle Argus Style */}
      <div className="w-full max-w-md bg-white border-2 border-argus-border shadow-2xl" style={{ boxShadow: '0 4px 12px rgba(26, 58, 92, 0.3)' }}>
        {/* Header Section */}
        <div className="bg-argus-navy text-argus-text-header px-6 py-8 text-center">
          <div className="text-14 font-bold mb-2">ARGUS SAFETY</div>
          <div className="text-11 opacity-90 mb-4">Release 8.4</div>
          <div className="text-10 opacity-75">Pharmacovigilance Management System</div>
          <div className="text-10 opacity-75 mt-1">Powered by Oracle</div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="px-6 py-6">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-300 text-red-700 text-11">
              ❌ {error}
            </div>
          )}

          {/* Username Field */}
          <div className="mb-4">
            <label className="block text-11 font-bold text-argus-text-label mb-1">
              Username:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-2 py-2 text-11 border border-argus-border focus:border-argus-light focus:outline-none bg-white"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-11 font-bold text-argus-text-label mb-1">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-2 py-2 text-11 border border-argus-border focus:border-argus-light focus:outline-none bg-white"
              required
            />
          </div>

          {/* Enterprise Selector */}
          <div className="mb-6">
            <label className="block text-11 font-bold text-argus-text-label mb-1">
              Enterprise:
            </label>
            <select
              value={enterprise}
              onChange={(e) => setEnterprise(e.target.value)}
              className="w-full px-2 py-2 text-11 border border-argus-border focus:border-argus-light focus:outline-none bg-white cursor-pointer"
            >
              <option value="default">Default Enterprise</option>
              <option value="pharma-us">Pharma US Division</option>
              <option value="pharma-eu">Pharma EU Division</option>
              <option value="clinical">Clinical Research</option>
            </select>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 text-11 font-bold bg-argus-blue hover:bg-argus-light text-white border border-argus-border-dark transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'SIGNING IN...' : 'SIGN IN'}
          </button>
        </form>

        {/* Demo Credentials Section */}
        <div className="border-t border-argus-border px-6 py-4 bg-argus-bg">
          <div className="text-11 font-bold text-argus-text-label mb-2">⚠️ Demo Credentials:</div>
          <div className="text-10 font-mono text-argus-text-muted mb-1">
            Email: <span className="text-argus-text-primary font-bold">admin@argus.com</span>
          </div>
          <div className="text-10 font-mono text-argus-text-muted">
            Password: <span className="text-argus-text-primary font-bold">password123</span>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-argus-border px-6 py-3 bg-argus-bg-tab-inactive text-center">
          <div className="text-10 text-argus-text-muted">
            © 2024 Oracle Corporation. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
