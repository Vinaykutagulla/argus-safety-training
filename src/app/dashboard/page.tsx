'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ArgusLayout from '@/components/ArgusLayout';
import SectionHeader from '@/components/SectionHeader';
import ArgusInput from '@/components/ArgusInput';

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
  const [stats, setStats] = useState(SAMPLE_STATS);
  const [actionItems, setActionItems] = useState(SAMPLE_ACTION_ITEMS);
  const [reportsDueSoon, setReportsDueSoon] = useState(SAMPLE_REPORTS);
  const [searchCaseId, setSearchCaseId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOpenCase = () => {
    if (searchCaseId.trim()) {
      window.location.href = `/dashboard/cases/${searchCaseId}`;
    }
  };

  const handleNewCase = () => {
    window.location.href = '/dashboard/cases/new';
  };

  if (loading) {
    return (
      <ArgusLayout>
        <div className="text-center py-12">
          <div className="text-14 font-bold text-argus-navy mb-2">Loading Dashboard...</div>
          <div className="text-12 text-argus-text-muted">Please wait while we load your workspace</div>
        </div>
      </ArgusLayout>
    );
  }

  return (
    <ArgusLayout>
      <div className="bg-argus-bg p-4 space-y-4 text-11 font-sans">
        {/* HEADER with Refresh Button */}
        <div className="flex justify-between items-center mb-2 px-2">
          <div className="text-14 font-bold text-argus-navy uppercase tracking-wide">
            📊 Personal Argus Status Dashboard
          </div>
          <button className="px-3 py-1.5 bg-gradient-to-r from-argus-blue to-argus-light text-white hover:shadow-lg text-10 font-bold border-2 border-argus-navy rounded transition-all">
            🔄 Refresh Data
          </button>
        </div>

        {/* KEY METRICS - 4 COLUMN CARDS */}
        <div className="grid grid-cols-4 gap-3 mb-2">
          {/* Card 1: Total Cases */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-argus-blue rounded p-3">
            <div className="text-10 text-argus-text-muted font-bold uppercase">Total Cases (MTD)</div>
            <div className="text-24 font-bold text-argus-blue mt-1">{stats.totalMTD}</div>
            <div className="text-9 text-argus-text-muted mt-1">Month to Date</div>
          </div>

          {/* Card 2: Serious Cases */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-600 rounded p-3">
            <div className="text-10 text-red-700 font-bold uppercase">Serious Cases</div>
            <div className="text-24 font-bold text-red-600 mt-1">{stats.seriousCases}</div>
            <div className="text-9 text-red-600 mt-1">Requiring Expedited Reporting</div>
          </div>

          {/* Card 3: Reports Due */}
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-600 rounded p-3">
            <div className="text-10 text-yellow-700 font-bold uppercase">Reports Due Soon</div>
            <div className="text-24 font-bold text-yellow-600 mt-1">{reportsDueSoon.length}</div>
            <div className="text-9 text-yellow-700 mt-1">Next 7 Days</div>
          </div>

          {/* Card 4: Overdue */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-red-700 rounded p-3">
            <div className="text-10 text-red-700 font-bold uppercase">🔴 Overdue</div>
            <div className="text-24 font-bold text-red-700 mt-1">{stats.overdueReports}</div>
            <div className="text-9 text-red-600 mt-1">Immediate Action</div>
          </div>
        </div>

        {/* MAIN CONTENT - 2 ROW LAYOUT */}
        <div className="grid grid-cols-2 gap-4">
          {/* LEFT: Worklist + Action Items */}
          <div className="space-y-4">
            {/* My Worklist */}
            <div className="border-2 border-argus-blue bg-white rounded shadow">
              <SectionHeader title="📋 MY WORKLIST" />
              <div className="p-4 space-y-2">
                <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                  <span className="text-10 font-bold">New Cases</span>
                  <span className="text-16 font-bold text-argus-orange">{stats.newCases}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                  <span className="text-10 font-bold">Open Cases</span>
                  <span className="text-16 font-bold text-argus-blue">{stats.openCases}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                  <span className="text-10 font-bold">Under Review</span>
                  <span className="text-16 font-bold text-argus-light">{stats.reviewCases}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                  <span className="text-10 font-bold">Locked</span>
                  <span className="text-16 font-bold text-purple-600">{stats.lockedCases}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                  <span className="text-10 font-bold">Closed</span>
                  <span className="text-16 font-bold text-green-600">{stats.closedCases}</span>
                </div>
              </div>
            </div>

            {/* My Action Items */}
            <div className="border-2 border-argus-orange bg-white rounded shadow">
              <SectionHeader title="⚡ MY ACTION ITEMS (HIGH PRIORITY)" />
              <div className="overflow-x-auto">
                <table className="w-full text-10">
                  <thead>
                    <tr className="bg-gradient-to-r from-argus-orange to-yellow-600 text-white">
                      <th className="px-3 py-2 text-left font-bold">Case ID</th>
                      <th className="px-3 py-2 text-left font-bold">Action</th>
                      <th className="px-3 py-2 text-left font-bold">Due Date</th>
                      <th className="px-3 py-2 text-left font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {actionItems.map((item, idx) => (
                      <tr key={idx} className={idx % 2 === 1 ? 'bg-yellow-50' : 'bg-white'}>
                        <td className="px-3 py-2">
                          <a href={`/dashboard/cases/${item.caseId}`} className="text-argus-blue font-bold hover:underline">
                            {item.caseId}
                          </a>
                        </td>
                        <td className="px-3 py-2 font-semibold">{item.action}</td>
                        <td className="px-3 py-2 font-bold text-red-600">{item.dueDate}</td>
                        <td className="px-3 py-2 font-bold">{item.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* RIGHT: Reports Due + Quick Launch */}
          <div className="space-y-4">
            {/* Expedited Reports Due Soon */}
            <div className="border-2 border-red-600 bg-white rounded shadow">
              <SectionHeader title="⏰ EXPEDITED REPORTS DUE SOON" />
              <div className="p-3">
                {reportsDueSoon.map((item, idx) => (
                  <div key={idx} className="p-2 mb-1 rounded border-l-4 border-red-600 bg-red-50 flex justify-between items-center">
                    <div className="flex-1">
                      <a href={`/dashboard/cases/${item.caseId}`} className="text-argus-blue font-bold hover:underline text-11">
                        {item.caseId}
                      </a>
                      <div className="text-9 text-argus-text-muted">{item.reportType}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-11">{item.status}</div>
                      <div className="text-10 text-red-600 font-bold">{item.daysLeft} days left</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="border-2 border-argus-border bg-white rounded shadow p-4">
              <div className="text-11 font-bold text-argus-navy mb-3 uppercase">🚀 Quick Actions</div>
              <div className="space-y-2">
                <a
                  href="/dashboard/cases/new"
                  className="block px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-10 rounded hover:shadow-lg transition-all text-center"
                >
                  + Create New Case
                </a>
                <a
                  href="/dashboard/cases"
                  className="block px-4 py-2 bg-gradient-to-r from-argus-blue to-argus-light text-white font-bold text-10 rounded hover:shadow-lg transition-all text-center"
                >
                  🔍 Search Cases
                </a>
                <a
                  href="/dashboard/reports/expedited"
                  className="block px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-10 rounded hover:shadow-lg transition-all text-center"
                >
                  📊 Expedited Reports
                </a>
                <a
                  href="/dashboard/meddra"
                  className="block px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold text-10 rounded hover:shadow-lg transition-all text-center"
                >
                  💊 MedDRA Coding
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER INFO */}
        <div className="border-2 border-argus-border bg-blue-50 rounded p-3 mt-4">
          <div className="text-10 text-argus-text-muted">
            <span className="font-bold">Last Updated:</span> {new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })} 
            <span className="ml-4"><span className="font-bold">Training Mode:</span> Available in case entry - Enable 🎓 toggle</span>
            <span className="ml-4"><span className="font-bold">Data Source:</span> Sample data (Demo Mode)</span>
          </div>
        </div>
      </div>
    </ArgusLayout>
  );
}
              </span>
              <span>→</span>
              <span className="px-2 py-1 bg-status-review text-argus-navy border border-argus-border">
                [Med Review: 4]
              </span>
              <span>→</span>
              <span className="px-2 py-1 bg-status-new text-argus-navy border border-argus-border">
                [QC: 2]
              </span>
              <span>→</span>
              <span className="px-2 py-1 bg-status-locked text-argus-navy border border-argus-border">
                [Lock: 1]
              </span>
            </div>
          </div>
        </div>
      </div>
    </ArgusLayout>
  );
}
                  <th className="text-left py-2 px-2 font-medium">Status</th>
                  <th className="text-left py-2 px-2 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentCases.map((caseItem) => (
                  <tr key={caseItem._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2 px-2">{caseItem.caseId}</td>
                    <td className="py-2 px-2">{caseItem.drug?.tradeName}</td>
                    <td className="py-2 px-2">{caseItem.reaction?.meddraPreferredTerm}</td>
                    <td className="py-2 px-2">
                      <Badge variant={getStatusColor(caseItem.status) as any}>
                        {caseItem.status}
                      </Badge>
                    </td>
                    <td className="py-2 px-2">
                      <Link href={`/dashboard/cases/${caseItem._id}`} className="text-blue-600 hover:underline">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Quick Links */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/dashboard/cases/new" className="bg-blue-50 hover:bg-blue-100 p-4 rounded border border-blue-200 transition">
            <p className="font-medium text-blue-900">Create New Case</p>
            <p className="text-sm text-blue-700 mt-1">Start case intake</p>
          </Link>
          <Link href="/dashboard/cases" className="bg-green-50 hover:bg-green-100 p-4 rounded border border-green-200 transition">
            <p className="font-medium text-green-900">Search Cases</p>
            <p className="text-sm text-green-700 mt-1">Find existing cases</p>
          </Link>
          <Link href="/dashboard/reports/expedited" className="bg-red-50 hover:bg-red-100 p-4 rounded border border-red-200 transition">
            <p className="font-medium text-red-900">Expedited Reports</p>
            <p className="text-sm text-red-700 mt-1">View urgent reports</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
