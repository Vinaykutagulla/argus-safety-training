'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api-client';

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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Login Card */}
      <div style={{ width: '100%', maxWidth: '420px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', overflow: 'hidden' }}>
        {/* Header Section */}
        <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: 'white', padding: '40px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>💊 Firstpharmajob</div>
          <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>Safety Database</div>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>Pharmacovigilance Management System</div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ padding: '32px 24px' }}>
          {/* Error Message */}
          {error && (
            <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: '8px', color: '#DC2626', fontSize: '13px', fontWeight: '500' }}>
              ❌ {error}
            </div>
          )}

          {/* Email Field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ width: '100%', padding: '12px', fontSize: '14px', border: '1px solid #E5E7EB', borderRadius: '8px', outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box' }}
              onFocus={(e) => e.target.style.borderColor = '#1e293b'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
              placeholder="admin@firstpharmajob.com"
              required
            />
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '28px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{ width: '100%', padding: '12px', fontSize: '14px', border: '1px solid #E5E7EB', borderRadius: '8px', outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box' }}
              onFocus={(e) => e.target.style.borderColor = '#1e293b'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '12px', fontSize: '14px', fontWeight: '700', background: loading ? '#9CA3AF' : 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', color: 'white', border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 6px rgba(15, 23, 42, 0.3)' }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.boxShadow = '0 8px 12px rgba(15, 23, 42, 0.4)')}
            onMouseLeave={(e) => !loading && (e.currentTarget.style.boxShadow = '0 4px 6px rgba(15, 23, 42, 0.3)')}
          >
            {loading ? '⏳ SIGNING IN...' : '🔓 SIGN IN'}
          </button>
        </form>

        {/* Footer */}
        <div style={{ borderTop: '1px solid #E5E7EB', padding: '16px 24px', backgroundColor: '#F3F4F6', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: '#6B7280' }}>
            © 2026 Firstpharmajob Safety Database. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
