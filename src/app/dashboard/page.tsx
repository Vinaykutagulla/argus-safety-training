'use client';

import { useState } from 'react';
import ArgusLayout from '@/components/ArgusLayout';
import { Button } from '@/components/Button';
import IconPlus from '@/components/icons/Plus';

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
          <section className="rounded-sm border border-argus-border bg-[color:var(--argus-classic-top)] p-4 text-argus-navy shadow-sm sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">Personal Argus Status</p>
                <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Welcome to Argus Safety</h1>
                <p className="mt-3 max-w-2xl text-sm text-slate-700 sm:text-base">
                  Your personal operational dashboard for case review, report tracking, and workflow follow-up.
                </p>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/90 px-4 py-3 shadow-sm">
                <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Today</p>
                <p className="mt-1 text-lg font-semibold">2 cases assigned</p>
              </div>
            </div>
          </section>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl border border-argus-border bg-argus-bg-panel p-6 shadow-sm">
              <div className="bg-[color:var(--argus-classic-tab)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em]">Total Cases</div>
              <div className="p-3">
                <p className="text-3xl font-bold text-argus-blue">{stats.totalMTD}</p>
                <p className="text-sm text-slate-600">Month to date</p>
              </div>
            </div>
            <div className="rounded-xl border border-argus-border bg-argus-bg-panel p-6 shadow-sm">
              <div className="bg-[color:var(--argus-classic-tab)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em]">Serious Cases</div>
              <div className="p-3">
                <p className="text-3xl font-bold text-red-600">{stats.seriousCases}</p>
                <p className="text-sm text-slate-600">Expedited reports</p>
              </div>
            </div>
            <div className="rounded-xl border border-argus-border bg-argus-bg-panel p-6 shadow-sm">
              <div className="bg-[color:var(--argus-classic-tab)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em]">Reports Due</div>
              <div className="p-3">
                <p className="text-3xl font-bold text-amber-600">{reportsDueSoon.length}</p>
                <p className="text-sm text-slate-600">Next 7 days</p>
              </div>
            </div>
            <div className="rounded-xl border border-argus-border bg-argus-bg-panel p-6 shadow-sm">
              <div className="bg-[color:var(--argus-classic-tab)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em]">Overdue</div>
              <div className="p-3">
                <p className="text-3xl font-bold text-orange-600">{stats.overdueReports}</p>
                <p className="text-sm text-slate-600">Immediate action</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              <section className="overflow-hidden rounded-xl border border-argus-border bg-argus-bg-panel shadow-sm">
                <div className="px-6 py-4 bg-[color:var(--argus-classic-bar)]">
                  <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900">Case Quick Launch</h2>
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-700">Search case by number</p>
                      <p className="text-xs text-slate-500">Launch your investigation fast.</p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <input
                        type="text"
                        value={searchCaseId}
                        onChange={(e) => setSearchCaseId(e.target.value)}
                        placeholder="Enter case ID"
                        className="w-full max-w-md rounded-sm border border-argus-border bg-white px-3 py-2 text-sm text-argus-text-primary focus:border-argus-blue focus:outline-none"
                      />
                      <button className="rounded-sm bg-[color:var(--argus-classic-tab)] px-4 py-2 text-sm font-semibold text-argus-navy border border-argus-border hover:bg-[color:var(--argus-classic-top)]">
                        Search
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-sm bg-[color:var(--argus-classic-top)] p-4">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-slate-600">Assigned Cases</p>
                      <p className="mt-2 text-3xl font-bold text-argus-blue">2</p>
                    </div>
                    <div className="rounded-sm bg-[color:var(--argus-classic-top)] p-4">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-slate-600">Contact Logs</p>
                      <p className="mt-2 text-3xl font-bold text-argus-blue">2</p>
                    </div>
                    <div className="rounded-sm bg-[color:var(--argus-classic-top)] p-4">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-slate-600">Action Items</p>
                      <p className="mt-2 text-3xl font-bold text-argus-blue">0</p>
                    </div>
                    <div className="rounded-sm bg-[color:var(--argus-classic-top)] p-4">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-slate-600">Overdue</p>
                      <p className="mt-2 text-3xl font-bold text-orange-600">1</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="overflow-hidden rounded-xl border border-argus-border bg-argus-bg-panel shadow-sm">
                <div className="px-6 py-4 bg-[color:var(--argus-classic-bar)]">
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900">Cases Assigned</h3>
                </div>
                <div className="overflow-x-auto p-6">
                  <table className="min-w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-argus-border bg-[color:var(--argus-classic-top)] text-left uppercase tracking-[0.15em] text-slate-700">
                        <th className="px-4 py-3">Country / Case Number</th>
                        <th className="px-4 py-3">Report Type</th>
                        <th className="px-4 py-3">Product</th>
                        <th className="px-4 py-3">Workflow Status</th>
                        <th className="px-4 py-3">Event</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-argus-border hover:bg-argus-bg-row-alt">
                        <td className="px-4 py-3 text-argus-blue font-semibold"><a href="/dashboard/cases/ARG-001" className="hover:underline">(GB) ARG-001</a></td>
                        <td className="px-4 py-3">Sponsored Trial</td>
                        <td className="px-4 py-3">ABC</td>
                        <td className="px-4 py-3">Book-in</td>
                        <td className="px-4 py-3">XYZ</td>
                      </tr>
                      <tr className="hover:bg-argus-bg-row-alt">
                        <td className="px-4 py-3 text-argus-blue font-semibold"><a href="/dashboard/cases/ARG-002" className="hover:underline">(US) ARG-002</a></td>
                        <td className="px-4 py-3">Spontaneous</td>
                        <td className="px-4 py-3">ALPROSTADIL</td>
                        <td className="px-4 py-3">Book-in</td>
                        <td className="px-4 py-3">Pyrexia</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            <aside className="space-y-6">
              <section className="overflow-hidden rounded-xl border border-argus-border bg-argus-bg-panel shadow-sm">
                <div className="px-6 py-4 bg-[color:var(--argus-classic-bar)]">
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900">Contact Log Entries</h3>
                </div>
                <div className="overflow-x-auto p-6">
                  <table className="min-w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-argus-border bg-[color:var(--argus-classic-top)] text-left uppercase tracking-[0.15em] text-slate-700">
                        <th className="px-4 py-3">Country / Case Number</th>
                        <th className="px-4 py-3">Contact Date</th>
                        <th className="px-4 py-3">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-argus-border hover:bg-argus-bg-row-alt">
                        <td className="px-4 py-3 text-argus-blue font-semibold"><a href="/dashboard/cases/ARG-001" className="hover:underline">(US) ARG-001</a></td>
                        <td className="px-4 py-3">25-NOV-2019</td>
                        <td className="px-4 py-3">NON-HCP Letter</td>
                      </tr>
                      <tr className="hover:bg-argus-bg-row-alt">
                        <td className="px-4 py-3 text-argus-blue font-semibold"><a href="/dashboard/cases/ARG-002" className="hover:underline">(US) ARG-002</a></td>
                        <td className="px-4 py-3">30-NOV-2019</td>
                        <td className="px-4 py-3">Health Care Professional Letter</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="overflow-hidden rounded-xl border border-argus-border bg-argus-bg-panel shadow-sm">
                <div className="px-6 py-4 bg-[color:var(--argus-classic-bar)]">
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900">Action Item Entries</h3>
                </div>
                <div className="p-6 text-sm text-slate-600">
                  <p className="font-semibold">No action items currently assigned.</p>
                  <p className="mt-2">Use the Case Actions menu to open a new case, assign follow-ups, or review overdue tasks.</p>
                </div>
              </section>

              <section className="overflow-hidden rounded-xl border border-argus-border bg-argus-bg-panel shadow-sm">
                <div className="px-6 py-4 bg-[color:var(--argus-classic-bar)]">
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900">Quick Actions</h3>
                </div>
                <div className="p-6 space-y-3">
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
              </section>
            </aside>
          </div>
        </div>
      </div>
    </ArgusLayout>
  );
}
