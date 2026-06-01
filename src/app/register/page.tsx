'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api-client';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'analyst',
    department: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      await api.auth.register(registerData);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1F3A93 0%, #2563EB 50%, #3B82F6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Register Card */}
      <div style={{ width: '100%', maxWidth: '500px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', overflow: 'hidden' }}>
        {/* Header Section */}
        <div style={{ background: 'linear-gradient(135deg, #1F3A93 0%, #2563EB 100%)', color: 'white', padding: '40px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>🚀 Create Account</div>
          <div style={{ fontSize: '14px', opacity: 0.9 }}>Join Argus Safety Training Platform</div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '32px 24px' }}>
          {error && (
            <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: '8px', color: '#DC2626', fontSize: '13px', fontWeight: '500' }}>
              ❌ {error}
            </div>
          )}

          {/* Full Name */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#111827', marginBottom: '6px' }}>
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{ width: '100%', padding: '10px', fontSize: '13px', border: '1px solid #E5E7EB', borderRadius: '8px', outline: 'none', boxSizing: 'border-box' }}
              onFocus={(e) => e.target.style.borderColor = '#2563EB'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
              required
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#111827', marginBottom: '6px' }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ width: '100%', padding: '10px', fontSize: '13px', border: '1px solid #E5E7EB', borderRadius: '8px', outline: 'none', boxSizing: 'border-box' }}
              onFocus={(e) => e.target.style.borderColor = '#2563EB'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
              required
            />
          </div>

          {/* Department */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#111827', marginBottom: '6px' }}>
              Department
            </label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              style={{ width: '100%', padding: '10px', fontSize: '13px', border: '1px solid #E5E7EB', borderRadius: '8px', outline: 'none', boxSizing: 'border-box' }}
              onFocus={(e) => e.target.style.borderColor = '#2563EB'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
              required
            />
          </div>

          {/* Role */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#111827', marginBottom: '6px' }}>
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={{ width: '100%', padding: '10px', fontSize: '13px', border: '1px solid #E5E7EB', borderRadius: '8px', outline: 'none', boxSizing: 'border-box', cursor: 'pointer', backgroundColor: 'white' }}
            >
              <option value="analyst">Safety Analyst</option>
              <option value="safety_officer">Safety Officer</option>
              <option value="supervisor">Supervisor</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          {/* Password */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#111827', marginBottom: '6px' }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{ width: '100%', padding: '10px', fontSize: '13px', border: '1px solid #E5E7EB', borderRadius: '8px', outline: 'none', boxSizing: 'border-box' }}
              onFocus={(e) => e.target.style.borderColor = '#2563EB'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
              required
            />
          </div>

          {/* Confirm Password */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#111827', marginBottom: '6px' }}>
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{ width: '100%', padding: '10px', fontSize: '13px', border: '1px solid #E5E7EB', borderRadius: '8px', outline: 'none', boxSizing: 'border-box' }}
              onFocus={(e) => e.target.style.borderColor = '#2563EB'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
              required
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '12px', fontSize: '14px', fontWeight: '700', background: loading ? '#9CA3AF' : 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)', color: 'white', border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 6px rgba(37, 99, 235, 0.3)' }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.boxShadow = '0 8px 12px rgba(37, 99, 235, 0.4)')}
            onMouseLeave={(e) => !loading && (e.currentTarget.style.boxShadow = '0 4px 6px rgba(37, 99, 235, 0.3)')}
          >
            {loading ? '⏳ Creating Account...' : '✨ Create Account'}
          </button>
        </form>

        {/* Footer */}
        <div style={{ borderTop: '1px solid #E5E7EB', padding: '20px 24px', backgroundColor: '#F9FAFB', textAlign: 'center' }}>
          <div style={{ fontSize: '13px', color: '#6B7280' }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: '#2563EB', fontWeight: '600', textDecoration: 'none', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}>
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
