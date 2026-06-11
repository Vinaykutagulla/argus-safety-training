'use client';

import { useState } from 'react';
import ArgusLayout from '@/components/ArgusLayout';

// Safety Database Key Metrics
const SAMPLE_STATS = {
  totalCases: 73,
  complianceRate: 96,
  seriousEvents: 8,
  overdueReports: 1,
  onTrack: 65,
  escalated: 2,
};

const PRIORITY_ITEMS = [
  { caseId: 'ARG-001', action: 'Medical Review - Serious SAE', dueDate: '20-JUN-2026', priority: 'CRITICAL', authority: 'CDSCO' },
  { caseId: 'ARG-004', action: '7-Day Report Submission', dueDate: '22-JUN-2026', priority: 'HIGH', authority: 'FDA' },
  { caseId: 'ARG-003', action: 'Case Review & Coding', dueDate: '25-JUN-2026', priority: 'HIGH', authority: 'EMA' },
];

export default function DashboardPage() {
  const [stats] = useState(SAMPLE_STATS);


  return (
    <ArgusLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          
          {/* PAGE HEADER */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Firstpharmajob Safety Database
            </h1>
            <p className="text-slate-600 font-medium">
              Pharmacovigilance Management & Regulatory Compliance
            </p>
          </div>

          {/* KPI CARDS - CLEAN GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {/* Card 1: Total Cases */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Total Cases</span>
                <span className="text-2xl">📋</span>
              </div>
              <p className="text-3xl font-bold text-slate-900 mb-2">{stats.totalCases}</p>
              <p className="text-xs text-slate-500">Month to Date</p>
            </div>

            {/* Card 2: Compliance Rate */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Compliance Rate</span>
                <span className="text-2xl">✅</span>
              </div>
              <p className="text-3xl font-bold text-emerald-600 mb-2">{stats.complianceRate}%</p>
              <p className="text-xs text-slate-500">SLA Adherence</p>
            </div>

            {/* Card 3: Serious Events */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Serious Events</span>
                <span className="text-2xl">⚠️</span>
              </div>
              <p className="text-3xl font-bold text-amber-600 mb-2">{stats.seriousEvents}</p>
              <p className="text-xs text-slate-500">Expedited Reports Required</p>
            </div>

            {/* Card 4: Overdue Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Overdue</span>
                <span className="text-2xl">🔴</span>
              </div>
              <p className="text-3xl font-bold text-red-600 mb-2">{stats.overdueReports}</p>
              <p className="text-xs text-slate-500">Requires Attention</p>
            </div>
          </div>

          {/* MAIN CONTENT GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            
            {/* LEFT: Priority Actions (2 cols) */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-900 px-6 py-4 border-b border-slate-800">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  ⚡ Priority Actions
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-6 py-3 text-left font-semibold text-slate-700">Case ID</th>
                      <th className="px-6 py-3 text-left font-semibold text-slate-700">Action</th>
                      <th className="px-6 py-3 text-left font-semibold text-slate-700">Authority</th>
                      <th className="px-6 py-3 text-left font-semibold text-slate-700">Due Date</th>
                      <th className="px-6 py-3 text-center font-semibold text-slate-700">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {PRIORITY_ITEMS.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <a href={`/dashboard/cases/${item.caseId}`} className="font-semibold text-blue-600 hover:text-blue-700">
                            {item.caseId}
                          </a>
                        </td>
                        <td className="px-6 py-4 text-slate-700">{item.action}</td>
                        <td className="px-6 py-4 text-slate-700">{item.authority}</td>
                        <td className="px-6 py-4 font-medium text-slate-900">{item.dueDate}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.priority === 'CRITICAL' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {item.priority}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* RIGHT: Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-6">Metrics Summary</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-slate-200">
                  <span className="text-slate-600">On Track</span>
                  <span className="text-2xl font-bold text-emerald-600">{stats.onTrack}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-200">
                  <span className="text-slate-600">Escalated</span>
                  <span className="text-2xl font-bold text-amber-600">{stats.escalated}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-slate-600">Compliance</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600" style={{width: `${stats.complianceRate}%`}}></div>
                    </div>
                    <span className="text-sm font-bold text-slate-900">{stats.complianceRate}%</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <h3 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wide">Quick Actions</h3>
                <div className="space-y-2">
                  <a href="/dashboard/cases/new" className="block w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-center text-sm">
                    + New Case
                  </a>
                  <a href="/dashboard/cases" className="block w-full px-4 py-2 bg-slate-600 text-white font-medium rounded-lg hover:bg-slate-700 transition-colors text-center text-sm">
                    🔍 Search Cases
                  </a>
                  <a href="/dashboard/reports/expedited" className="block w-full px-4 py-2 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors text-center text-sm">
                    📊 Reports
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER INFO */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center text-sm text-blue-900">
            <p>💡 <strong>Pro Tip:</strong> All cases are automatically synced with MongoDB. Use the case search to filter and manage your safety database efficiently.</p>
          </div>

        </div>
      </div>
    </ArgusLayout>
  );
}

