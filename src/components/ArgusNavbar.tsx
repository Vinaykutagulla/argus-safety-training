'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ArgusNavbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    window.location.href = '/login';
  };

  const worklistMenu = [
    { label: 'My Worklist', href: '/dashboard' },
    { label: 'Open', href: '/dashboard/cases' },
    { label: 'New', href: '/dashboard/cases/new' },
    { label: 'Action Items', href: '/dashboard' },
    { label: 'Coding Action Items', href: '/dashboard' },
    { label: 'Conflicts', href: '/dashboard' },
    { label: 'Reports', href: '/dashboard/reports/expedited' },
    { label: 'Bulk Transmit', href: '/dashboard/reports/periodic' },
    { label: 'Bulk Print', href: '/dashboard' },
    { label: 'Bulk ICSR Transmit', href: '/dashboard' },
    { label: 'Local Listing', href: '/dashboard' },
    { label: 'Coding Status', href: '/dashboard' },
    { label: 'Letters', href: '/dashboard' },
    { label: 'Intake', href: '/dashboard' },
  ];

  const caseActionsMenu = [
    { label: 'Open', href: '/dashboard/cases' },
    { label: 'New Case', href: '/dashboard/cases/new' },
    { label: 'New Case from Image', href: '/dashboard' },
  ];

  const reportsMenu = [
    { label: 'Compliance', href: '/dashboard/reports/periodic' },
    { label: 'Aggregate Reports', href: '/dashboard/reports/periodic' },
    { label: 'Periodic Reports', href: '/dashboard/reports/periodic' },
    { label: 'Exit Reporting', href: '/dashboard' },
    { label: 'ICSR Pending', href: '/dashboard/reports/expedited' },
    { label: 'Processed ICSR', href: '/dashboard/reports/expedited' },
  ];

  const localAffiliateMenu = [
    { label: 'Worklist', href: '/dashboard' },
    { label: 'Incoming Review', href: '/dashboard/reports/expedited' },
    { label: 'Report Submission', href: '/dashboard/reports/periodic' },
  ];

  const utilitiesMenu = [
    { label: 'Change Password', href: '/dashboard/admin/users' },
    { label: 'MedDRA Browser', href: '/dashboard/meddra' },
    { label: 'User Login List', href: '/dashboard/admin/users' },
    { label: 'Logs', href: '/dashboard/admin/users' },
    { label: 'ICSR', href: '/dashboard/reports/expedited' },
    { label: 'Reconciliation', href: '/dashboard' },
    { label: 'Case Lockfile', href: '/dashboard' },
    { label: 'Batch Reports', href: '/dashboard/reports/periodic' },
    { label: 'End of Study', href: '/dashboard' },
    { label: 'Clear Cache', href: '/dashboard' },
    { label: 'Advanced Condition Library', href: '/dashboard' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[color:var(--argus-classic-top)] border-b border-argus-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-sm bg-white flex items-center justify-center border border-argus-border text-sm font-bold">OR</div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Oracle Health Sciences</div>
            <div className="text-xs uppercase tracking-[0.3em] text-slate-500">Argus Safety</div>
            <div className="text-sm font-semibold text-argus-navy">Safety Management Console</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-700">
          <div className="rounded-sm bg-white px-3 py-1 border border-argus-border text-argus-navy">Database: ARGUSDB</div>
          <span>Welcome, <strong>Admin</strong></span>
          <span className="text-slate-400">|</span>
          <span>Last sync: just now</span>
          <span className="text-slate-400">|</span>
          <Link href="/dashboard" className="px-2 py-1 rounded-sm bg-white border border-argus-border text-argus-navy hover:bg-[color:var(--argus-classic-tab)]">
            Home
          </Link>
          <Link href="/dashboard#help" className="px-2 py-1 rounded-sm bg-white border border-argus-border text-argus-navy hover:bg-[color:var(--argus-classic-tab)]">
            Help
          </Link>
          <button onClick={handleLogout} className="px-2 py-1 rounded-sm bg-white border border-argus-border text-argus-navy hover:bg-[color:var(--argus-classic-tab)]">
            Logout
          </button>
        </div>
      </div>

      <div className="bg-[color:var(--argus-classic-bar)] border-t border-argus-border">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.2em]">
            <Link href="/dashboard/cases" className="px-3 py-2 bg-[color:var(--argus-classic-tab)] border border-argus-border font-semibold">
              Active Cases
            </Link>

            <div className="relative">
              <button
                onClick={() => setOpenMenu(openMenu === 'worklist' ? null : 'worklist')}
                className="px-3 py-2 bg-[color:var(--argus-classic-tab)] border border-argus-border font-semibold transition-colors duration-150 hover:bg-[color:var(--argus-classic-top)]"
                aria-expanded={openMenu === 'worklist'}
              >
                Worklist ▾
              </button>
              {openMenu === 'worklist' && (
                <div className="absolute left-0 top-full z-50 mt-1 w-[22rem] overflow-hidden rounded-sm border border-argus-border bg-white shadow-xl ring-1 ring-black/5">
                  <div className="bg-[color:var(--argus-classic-top)] px-3 py-2 text-xs uppercase tracking-[0.2em] text-slate-700">
                    Worklist
                  </div>
                  <div className="grid grid-cols-2 gap-px bg-argus-border">
                    {worklistMenu.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block bg-white px-3 py-2 text-sm text-argus-text-primary hover:bg-[color:var(--argus-classic-tab)]"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setOpenMenu(openMenu === 'case-actions' ? null : 'case-actions')}
                className="px-3 py-2 bg-[color:var(--argus-classic-tab)] border border-argus-border font-semibold transition-colors duration-150 hover:bg-[color:var(--argus-classic-top)]"
                aria-expanded={openMenu === 'case-actions'}
              >
                Case Actions ▾
              </button>
              {openMenu === 'case-actions' && (
                <div className="absolute left-0 top-full z-50 mt-1 w-56 overflow-hidden rounded-sm border border-argus-border bg-white shadow-xl ring-1 ring-black/5">
                  <div className="bg-[color:var(--argus-classic-top)] px-3 py-2 text-xs uppercase tracking-[0.2em] text-slate-700">
                    Case Actions
                  </div>
                  {caseActionsMenu.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-3 py-2 text-sm text-argus-text-primary hover:bg-[color:var(--argus-classic-tab)]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setOpenMenu(openMenu === 'reports' ? null : 'reports')}
                className="px-3 py-2 bg-[color:var(--argus-classic-tab)] border border-argus-border font-semibold transition-colors duration-150 hover:bg-[color:var(--argus-classic-top)]"
                aria-expanded={openMenu === 'reports'}
              >
                Reports ▾
              </button>
              {openMenu === 'reports' && (
                <div className="absolute left-0 top-full z-50 mt-1 w-64 overflow-hidden rounded-sm border border-argus-border bg-white shadow-xl ring-1 ring-black/5">
                  <div className="bg-[color:var(--argus-classic-top)] px-3 py-2 text-xs uppercase tracking-[0.2em] text-slate-700">
                    Reports
                  </div>
                  {reportsMenu.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-3 py-2 text-sm text-argus-text-primary hover:bg-[color:var(--argus-classic-tab)]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setOpenMenu(openMenu === 'local-affiliate' ? null : 'local-affiliate')}
                className="px-3 py-2 bg-[color:var(--argus-classic-tab)] border border-argus-border font-semibold transition-colors duration-150 hover:bg-[color:var(--argus-classic-top)]"
                aria-expanded={openMenu === 'local-affiliate'}
              >
                Local Affiliate ▾
              </button>
              {openMenu === 'local-affiliate' && (
                <div className="absolute left-0 top-full z-50 mt-1 w-56 overflow-hidden rounded-sm border border-argus-border bg-white shadow-xl ring-1 ring-black/5">
                  <div className="bg-[color:var(--argus-classic-top)] px-3 py-2 text-xs uppercase tracking-[0.2em] text-slate-700">
                    Local Affiliate
                  </div>
                  {localAffiliateMenu.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-3 py-2 text-sm text-argus-text-primary hover:bg-[color:var(--argus-classic-tab)]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setOpenMenu(openMenu === 'utilities' ? null : 'utilities')}
                className="px-3 py-2 bg-[color:var(--argus-classic-tab)] border border-argus-border font-semibold transition-colors duration-150 hover:bg-[color:var(--argus-classic-top)]"
                aria-expanded={openMenu === 'utilities'}
              >
                Utilities ▾
              </button>
              {openMenu === 'utilities' && (
                <div className="absolute left-0 top-full z-50 mt-1 w-[24rem] overflow-hidden rounded-sm border border-argus-border bg-white shadow-xl ring-1 ring-black/5">
                  <div className="bg-[color:var(--argus-classic-top)] px-3 py-2 text-xs uppercase tracking-[0.2em] text-slate-700">
                    Utilities
                  </div>
                  <div className="grid grid-cols-2 gap-px bg-argus-border">
                    {utilitiesMenu.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block bg-white px-3 py-2 text-sm text-argus-text-primary hover:bg-[color:var(--argus-classic-tab)]"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/dashboard" className="px-3 py-2 bg-[color:var(--argus-classic-tab)] border border-argus-border font-semibold">
              Dashboards
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
