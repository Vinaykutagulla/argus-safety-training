'use client';

import { useState } from 'react';
import ArgusLayout from '@/components/ArgusLayout';
import { Button } from '@/components/Button';
import IconPlus from '@/components/icons/Plus';

// Sample data - loaded by default, not dependent on database
const SAMPLE_STATS = {
  newCases: 5,
  openCases: 12,
  reviewCases: 3,
  lockedCases: 8,
  closedCases: 45,
  totalMTD: 73,
  overdueReports: 1,
  seriousCases: 8,
};

const SAMPLE_ACTION_ITEMS = [
  { caseId: 'ARG-001', action: 'Medical Review', dueDate: '20-JAN-2024', priority: 'HIGH', status: '🔴 CRITICAL' },
  { caseId: 'ARG-002', action: 'QC Review', dueDate: '22-JAN-2024', priority: 'MEDIUM', status: '🟡 URGENT' },
  { caseId: 'ARG-004', action: 'Submit Report', dueDate: '25-JAN-2024', priority: 'HIGH', status: '🔴 CRITICAL' },
];

const SAMPLE_REPORTS = [
  { caseId: 'ARG-001', reportType: '7-day (CDSCO)', daysLeft: 0, authority: 'CDSCO', status: 'OVERDUE ⚠️' },
  { caseId: 'ARG-003', reportType: '15-day (EMA)', daysLeft: 2, authority: 'EMA', status: 'DUE SOON 🟡' },
  { caseId: 'ARG-007', reportType: '7-day (FDA)', daysLeft: 5, authority: 'FDA', status: 'ON TRACK 🟢' },
];

export default function DashboardPage() {
  const [stats] = useState(SAMPLE_STATS);
  const [actionItems] = useState(SAMPLE_ACTION_ITEMS);
  const [reportsDueSoon] = useState(SAMPLE_REPORTS);
  const [searchCaseId, setSearchCaseId] = useState('');

  return (
    <ArgusLayout>
      <div className="min-h-screen bg-argus-bg p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="rounded-sm border border-argus-border bg-[color:var(--argus-classic-top)] p-4 text-argus-navy shadow-sm sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/80">Safety operations center</p>
                <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Argus Dashboard</h1>
                <p className="mt-3 max-w-2xl text-sm text-white/90 sm:text-base">
                  Monitor active cases, critical follow-ups, and report deadlines in one clear view.
                </p>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3">
                <p className="text-[11px] uppercase tracking-[0.3em] text-slate-300">Priority focus</p>
                <p className="mt-1 text-lg font-semibold">3 urgent items</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl border border-argus-border bg-argus-bg-panel p-6 shadow-sm transition hover:shadow-md">
              <div className="bg-[color:var(--argus-classic-tab)] px-3 py-2 text-xs font-semibold">TOTAL CASES</div>
              <div className="p-3">
                <p className="text-3xl font-bold text-argus-blue">{stats.totalMTD}</p>
                <p className="text-sm text-gray-600">Month to date</p>
              </div>
            </div>

            <div className="rounded-xl border border-argus-border bg-argus-bg-panel p-6 shadow-sm transition hover:shadow-md">
              <div className="bg-[color:var(--argus-classic-tab)] px-3 py-2 text-xs font-semibold">SERIOUS CASES</div>
              <div className="p-3">
                <p className="text-3xl font-bold text-red-600">{stats.seriousCases}</p>
                <p className="text-sm text-gray-600">Expedited reports</p>
              </div>
            </div>

            <div className="rounded-xl border border-argus-border bg-argus-bg-panel p-6 shadow-sm transition hover:shadow-md">
              <div className="bg-[color:var(--argus-classic-tab)] px-3 py-2 text-xs font-semibold">REPORTS DUE</div>
              <div className="p-3">
                <p className="text-3xl font-bold text-amber-600">{reportsDueSoon.length}</p>
                <p className="text-sm text-gray-600">Next 7 days</p>
              </div>
            </div>

            <div className="rounded-xl border border-argus-border bg-argus-bg-panel p-6 shadow-sm transition hover:shadow-md">
              <div className="bg-[color:var(--argus-classic-tab)] px-3 py-2 text-xs font-semibold">OVERDUE</div>
              <div className="p-3">
                <p className="text-3xl font-bold text-orange-600">{stats.overdueReports}</p>
                <p className="text-sm text-gray-600">Immediate action</p>
              </div>
            </div>
          </div>

          {/* TWO-COLUMN LAYOUT */}
          <div className="grid grid-cols-3 gap-6">
            
            {/* LEFT COLUMN - WIDER (2 cols) */}
            <div className="col-span-2 space-y-6">
              
              {/* MY WORKLIST */}
              <div className="overflow-hidden rounded-xl border border-argus-border bg-argus-bg-panel shadow-sm">
                <div className="px-6 py-4 bg-gradient-to-r from-argus-blue to-argus-light">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-white">📋 My Worklist</h2>
                </div>
                <div className="p-6">
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                    <div className="rounded-xl bg-blue-50 p-4 text-center">
                      <p className="text-[11px] font-semibold text-slate-600">New Cases</p>
                      <p className="mt-2 text-2xl font-bold text-argus-blue">{stats.newCases}</p>
                    </div>
                    <div className="rounded-xl bg-cyan-50 p-4 text-center">
                      <p className="text-[11px] font-semibold text-slate-600">Open Cases</p>
                      <p className="mt-2 text-2xl font-bold text-cyan-600">{stats.openCases}</p>
                    </div>
                    <div className="rounded-xl bg-indigo-50 p-4 text-center">
                      <p className="text-[11px] font-semibold text-slate-600">Under Review</p>
                      <p className="mt-2 text-2xl font-bold text-indigo-600">{stats.reviewCases}</p>
                    </div>
                    <div className="rounded-xl bg-purple-50 p-4 text-center">
                      <p className="text-[11px] font-semibold text-slate-600">Locked</p>
                      <p className="mt-2 text-2xl font-bold text-purple-600">{stats.lockedCases}</p>
                    </div>
                    <div className="rounded-xl bg-green-50 p-4 text-center">
                      <p className="text-[11px] font-semibold text-slate-600">Closed</p>
                      <p className="mt-2 text-2xl font-bold text-green-600">{stats.closedCases}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-argus-border bg-argus-bg-panel shadow-sm">
                <div className="px-6 py-4 bg-gradient-to-r from-orange-600 to-orange-500">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-white">⚡ High Priority Actions</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                              <tr className="border-b border-orange-100 bg-orange-50">
                              <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-[0.2em] text-slate-700">Case ID</th>
                              <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-[0.2em] text-slate-700">Action Required</th>
                              <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-[0.2em] text-slate-700">Due Date</th>
                              <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-[0.2em] text-slate-700">Status</th>
                              <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.2em] text-slate-700">Action</th>
                            </tr>
                    </thead>
                    <tbody className="divide-y divide-orange-100">
                      {actionItems.map((item, idx) => (
                        <tr key={idx} className="transition hover:bg-orange-50">
                          <td className="px-6 py-4">
                            <a href={`/dashboard/cases/${item.caseId}`} className="font-bold text-argus-blue hover:text-argus-light">
                              {item.caseId}
                            </a>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-slate-700">{item.action}</td>
                          <td className="px-6 py-4 text-sm font-bold text-red-600">{item.dueDate}</td>
                          <td className="px-6 py-4 text-sm font-bold text-slate-700">{item.status}</td>
                          <td className="px-4 py-4">
                            <a href={`/dashboard/cases/${item.caseId}`} className="inline-flex">
                              <button className="inline-flex items-center px-2 py-1 text-xs bg-white border rounded-sm hover:bg-[color:var(--argus-classic-tab)]">
                                <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Open
                              </button>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - NARROW (1 col) */}
            <div className="space-y-6">
              
              {/* EXPEDITED REPORTS */}
              <div className="overflow-hidden rounded-xl border border-argus-border bg-argus-bg-panel shadow-sm">
                <div className="px-6 py-4 bg-gradient-to-r from-red-600 to-red-500">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-white">⏰ Expedited Reports</h2>
                </div>
                <div className="space-y-3 p-5">
                  {reportsDueSoon.map((item, idx) => (
                    <div key={idx} className="rounded-xl border border-red-100 bg-red-50 p-4 transition hover:bg-red-100">
                      <a href={`/dashboard/cases/${item.caseId}`} className="font-bold text-argus-blue hover:text-argus-light">
                        {item.caseId}
                      </a>
                      <p className="mt-1 text-sm text-red-700">{item.reportType}</p>
                      <div className="mt-3 flex items-center justify-between text-sm">
                        <span className="font-semibold text-slate-700">{item.status}</span>
                        <span className="font-bold text-red-600">{item.daysLeft} days left</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-argus-border bg-argus-bg-panel p-6 shadow-sm">
                <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-slate-800">🚀 Quick Actions</h2>
                <div className="mt-5 space-y-3">
                  <Button
                    variant="primary"
                    size="sm"
                    icon={<IconPlus />}
                    className="w-full justify-center"
                    onClick={() => window.location.assign('/dashboard/cases/new')}
                  >
                    New Case
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full justify-center"
                    onClick={() => window.location.assign('/dashboard/cases')}
                  >
                    Search Cases
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="w-full justify-center"
                    onClick={() => window.location.assign('/dashboard/reports/expedited')}
                  >
                    Reports
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full justify-center"
                    onClick={() => window.location.assign('/dashboard/meddra')}
                  >
                    MedDRA
                  </Button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </ArgusLayout>
  );
}
