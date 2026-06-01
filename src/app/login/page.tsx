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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1F3A93 0%, #2563EB 50%, #3B82F6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Login Card */}
      <div style={{ width: '100%', maxWidth: '420px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', overflow: 'hidden' }}>
        {/* Header Section */}
        <div style={{ background: 'linear-gradient(135deg, #1F3A93 0%, #2563EB 100%)', color: 'white', padding: '40px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>🏥 Argus Safety</div>
          <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>Pharmacovigilance Training</div>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>Professional Safety Management System</div>
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
              onFocus={(e) => e.target.style.borderColor = '#2563EB'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
              required
            />
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{ width: '100%', padding: '12px', fontSize: '14px', border: '1px solid #E5E7EB', borderRadius: '8px', outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box' }}
              onFocus={(e) => e.target.style.borderColor = '#2563EB'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
              required
            />
          </div>

          {/* Enterprise Selector */}
          <div style={{ marginBottom: '28px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
              Organization
            </label>
            <select
              value={enterprise}
              onChange={(e) => setEnterprise(e.target.value)}
              style={{ width: '100%', padding: '12px', fontSize: '14px', border: '1px solid #E5E7EB', borderRadius: '8px', outline: 'none', cursor: 'pointer', boxSizing: 'border-box', backgroundColor: 'white' }}
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
            style={{ width: '100%', padding: '12px', fontSize: '14px', fontWeight: '700', background: loading ? '#9CA3AF' : 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)', color: 'white', border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 6px rgba(37, 99, 235, 0.3)' }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.boxShadow = '0 8px 12px rgba(37, 99, 235, 0.4)')}
            onMouseLeave={(e) => !loading && (e.currentTarget.style.boxShadow = '0 4px 6px rgba(37, 99, 235, 0.3)')}
          >
            {loading ? '⏳ SIGNING IN...' : '🔓 SIGN IN'}
          </button>
        </form>

        {/* Demo Credentials Section */}
        <div style={{ borderTop: '1px solid #E5E7EB', padding: '20px 24px', backgroundColor: '#F9FAFB' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>📋 Demo Credentials:</div>
          <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px', fontFamily: 'monospace' }}>
            📧 <span style={{ color: '#111827', fontWeight: '600' }}>admin@argus.com</span>
          </div>
          <div style={{ fontSize: '12px', color: '#6B7280', fontFamily: 'monospace' }}>
            🔐 <span style={{ color: '#111827', fontWeight: '600' }}>password123</span>
          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop: '1px solid #E5E7EB', padding: '16px 24px', backgroundColor: '#F3F4F6', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: '#6B7280' }}>
            © 2024 Argus Safety Training. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
