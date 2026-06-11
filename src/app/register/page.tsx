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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Registration Card */}
      <div style={{ width: '100%', maxWidth: '420px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', overflow: 'hidden' }}>
        {/* Header Section */}
        <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: 'white', padding: '40px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>💊 Firstpharmajob</div>
          <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>Safety Database</div>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>Create Your Account</div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} style={{ padding: '32px 24px' }}>
          {/* Error Message */}
          {error && (
            <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: '8px', color: '#DC2626', fontSize: '13px', fontWeight: '500' }}>
              ❌ {error}
            </div>
          )}

          {/* Full Name Field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{ width: '100%', padding: '12px', fontSize: '14px', border: '1px solid #E5E7EB', borderRadius: '8px', outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box' }}
              onFocus={(e) => e.target.style.borderColor = '#1e293b'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
              placeholder="Enter your full name"
              required
            />
          </div>

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
              placeholder="your.email@company.com"
              required
            />
          </div>

          {/* Department Field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
              Department
            </label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              style={{ width: '100%', padding: '12px', fontSize: '14px', border: '1px solid #E5E7EB', borderRadius: '8px', outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box' }}
              onFocus={(e) => e.target.style.borderColor = '#1e293b'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
              placeholder="e.g., Pharmacovigilance"
            />
          </div>

          {/* Role Field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={{ width: '100%', padding: '12px', fontSize: '14px', border: '1px solid #E5E7EB', borderRadius: '8px', outline: 'none', cursor: 'pointer', boxSizing: 'border-box', backgroundColor: 'white' }}
            >
              <option value="analyst">Analyst</option>
              <option value="safety_officer">Safety Officer</option>
              <option value="supervisor">Supervisor</option>
              <option value="admin">Admin</option>
            </select>
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
              onFocus={(e) => e.target.style.borderColor = '#1e293b'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
              placeholder="Create a strong password"
              required
            />
          </div>

          {/* Confirm Password Field */}
          <div style={{ marginBottom: '28px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{ width: '100%', padding: '12px', fontSize: '14px', border: '1px solid #E5E7EB', borderRadius: '8px', outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box' }}
              onFocus={(e) => e.target.style.borderColor = '#1e293b'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
              placeholder="Re-enter your password"
              required
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '12px', fontSize: '14px', fontWeight: '700', background: loading ? '#9CA3AF' : 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', color: 'white', border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 6px rgba(15, 23, 42, 0.3)' }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.boxShadow = '0 8px 12px rgba(15, 23, 42, 0.4)')}
            onMouseLeave={(e) => !loading && (e.currentTarget.style.boxShadow = '0 4px 6px rgba(15, 23, 42, 0.3)')}
          >
            {loading ? '⏳ Creating Account...' : '✓ Create Account'}
          </button>
        </form>

        {/* Link to Login */}
        <div style={{ borderTop: '1px solid #E5E7EB', padding: '16px 24px', backgroundColor: '#F3F4F6', textAlign: 'center' }}>
          <p style={{ fontSize: '13px', color: '#6B7280' }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: '#1e293b', fontWeight: '600', textDecoration: 'none', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
