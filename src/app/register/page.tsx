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
    <div className="min-h-screen bg-gradient-to-b from-argus-navy to-argus-blue flex items-center justify-center px-4 font-sans">
      {/* Registration Card - Argus Style */}
      <div className="w-full max-w-md bg-white border-2 border-argus-border shadow-2xl" style={{ boxShadow: '0 4px 12px rgba(26, 58, 92, 0.3)' }}>
        {/* Header Section */}
        <div className="bg-argus-navy text-argus-text-header px-6 py-8 text-center">
          <div className="text-14 font-bold mb-2">ARGUS SAFETY</div>
          <div className="text-11 opacity-90 mb-4">Release 8.4</div>
          <div className="text-10 opacity-75">Pharmacovigilance Management System</div>
          <div className="text-10 opacity-75 mt-1">User Registration</div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="px-6 py-6">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-300 text-red-700 text-11">
              ❌ {error}
            </div>
          )}

          {/* Full Name Field */}
          <div className="mb-4">
            <label className="block text-11 font-bold text-argus-text-label mb-1">
              Full Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-2 py-2 text-11 border border-argus-border focus:border-argus-light focus:outline-none bg-white"
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-11 font-bold text-argus-text-label mb-1">
              Email Address:
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

          {/* Department Field */}
          <div className="mb-4">
            <label className="block text-11 font-bold text-argus-text-label mb-1">
              Department:
            </label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="e.g., Pharmacovigilance, Medical Affairs"
              className="w-full px-2 py-2 text-11 border border-argus-border focus:border-argus-light focus:outline-none bg-white"
            />
          </div>

          {/* Role Field */}
          <div className="mb-4">
            <label className="block text-11 font-bold text-argus-text-label mb-1">
              Role:
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-2 py-2 text-11 border border-argus-border focus:border-argus-light focus:outline-none bg-white cursor-pointer"
            >
              <option value="analyst">Analyst</option>
              <option value="safety_officer">Safety Officer</option>
              <option value="supervisor">Supervisor</option>
              <option value="admin">Admin</option>
            </select>
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

          {/* Confirm Password Field */}
          <div className="mb-4">
            <label className="block text-11 font-bold text-argus-text-label mb-1">
              Confirm Password:
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-2 py-2 text-11 border border-argus-border focus:border-argus-light focus:outline-none bg-white"
              required
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-3 py-2 bg-gradient-to-r from-argus-blue to-argus-light text-white hover:shadow-lg text-11 font-bold border-2 border-argus-navy rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {loading ? '⏳ Creating Account...' : '✓ Register'}
          </button>
        </form>

        {/* Link to Login */}
        <div className="border-t border-argus-border mt-4 pt-4 text-center">
          <p className="text-11 text-argus-text-muted">
            Already have an account?{' '}
            <Link href="/login" className="text-argus-light font-bold hover:text-argus-blue underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
