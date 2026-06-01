'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ArgusNavbar() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    window.location.href = '/login';
  };

  return (
    <>
      {/* Modern Clean Navbar with Inline Styles */}
      <nav style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px', paddingLeft: '32px', paddingRight: '32px' }}>
          {/* Left: Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '16px' }}>A</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#111827' }}>Argus</span>
              <span style={{ fontSize: '10px', color: '#6B7280', marginTop: '-2px' }}>Safety Training</span>
            </div>
          </div>

          {/* Center: Main Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <Link href="/dashboard" style={{ fontSize: '13px', fontWeight: '600', color: '#374151', textDecoration: 'none', padding: '8px 12px', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#2563EB'} onMouseLeave={(e) => e.target.style.color = '#374151'}>
              Dashboard
            </Link>
            <Link href="/dashboard/cases" style={{ fontSize: '13px', fontWeight: '600', color: '#374151', textDecoration: 'none', padding: '8px 12px', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#2563EB'} onMouseLeave={(e) => e.target.style.color = '#374151'}>
              Cases
            </Link>
            <Link href="/dashboard/reports/expedited" style={{ fontSize: '13px', fontWeight: '600', color: '#374151', textDecoration: 'none', padding: '8px 12px', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#2563EB'} onMouseLeave={(e) => e.target.style.color = '#374151'}>
              Reports
            </Link>
            <Link href="/dashboard/workflow" style={{ fontSize: '13px', fontWeight: '600', color: '#374151', textDecoration: 'none', padding: '8px 12px', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#2563EB'} onMouseLeave={(e) => e.target.style.color = '#374151'}>
              Workflow
            </Link>
            <Link href="/dashboard/meddra" style={{ fontSize: '13px', fontWeight: '600', color: '#374151', textDecoration: 'none', padding: '8px 12px', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#2563EB'} onMouseLeave={(e) => e.target.style.color = '#374151'}>
              MedDRA
            </Link>
          </div>

          {/* Right: Action Buttons + User Menu */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/dashboard/cases/new" style={{ padding: '10px 16px', background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)', color: 'white', fontWeight: '600', fontSize: '12px', borderRadius: '8px', textDecoration: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', transition: 'all 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)'} onMouseLeave={(e) => e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'}>
              + New Case
            </Link>

            <div style={{ position: 'relative' }}>
              <button onClick={() => setUserMenuOpen(!userMenuOpen)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', backgroundColor: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#F3F4F6'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
                <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '11px', fontWeight: 'bold' }}>A</div>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Admin</span>
                <span style={{ color: '#9CA3AF' }}>▼</span>
              </button>

              {userMenuOpen && (
                <div style={{ position: 'absolute', right: 0, marginTop: '8px', width: '224px', backgroundColor: 'white', border: '1px solid #E5E7EB', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', zIndex: 50, overflow: 'hidden' }}>
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid #F3F4F6', backgroundColor: '#F9FAFB' }}>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#111827' }}>admin@argus.com</div>
                    <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '4px' }}>Administrator</div>
                  </div>
                  <Link href="/dashboard" style={{ display: 'block', padding: '12px 16px', fontSize: '12px', fontWeight: '500', color: '#374151', textDecoration: 'none', transition: 'all 0.2s', borderBottom: '1px solid #F3F4F6' }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#EFF6FF'; e.target.style.color = '#2563EB'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#374151'; }}>
                    My Dashboard
                  </Link>
                  <Link href="/dashboard/admin/users" style={{ display: 'block', padding: '12px 16px', fontSize: '12px', fontWeight: '500', color: '#374151', textDecoration: 'none', transition: 'all 0.2s', borderBottom: '1px solid #F3F4F6' }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#EFF6FF'; e.target.style.color = '#2563EB'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#374151'; }}>
                    User Management
                  </Link>
                  <button onClick={handleLogout} style={{ width: '100%', textAlign: 'left', padding: '12px 16px', fontSize: '12px', fontWeight: '500', color: '#DC2626', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', transition: 'all 0.2s', borderTop: '1px solid #F3F4F6' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#FEF2F2'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div style={{ backgroundColor: '#EFF6FF', borderTop: '1px solid #F3F4F6', height: '40px', display: 'flex', alignItems: 'center', paddingLeft: '32px', paddingRight: '32px', fontSize: '11px', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', backgroundColor: '#10B981', borderRadius: '50%' }}></div>
            <span style={{ color: '#374151', fontWeight: '500' }}>Online</span>
          </div>
          <div style={{ color: '#6B7280' }}>Last sync: just now</div>
          <div style={{ marginLeft: 'auto', color: '#6B7280' }}>Training Mode: Enabled</div>
        </div>
      </nav>
    </>
  );
}
