'use client';

import { useState } from 'react';
import ArgusLayout from '@/components/ArgusLayout';
import SectionHeader from '@/components/SectionHeader';

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
      <div className="bg-gray-50 min-h-screen p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* HEADER */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-28 font-bold text-argus-navy mb-1">Personal Argus Status Dashboard</h1>
              <p className="text-12 text-gray-600">Welcome back. Here's your safety operations overview.</p>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-argus-blue to-argus-light text-white font-bold rounded-lg hover:shadow-lg transition-all transform hover:scale-105">
              🔄 Refresh Data
            </button>
          </div>

          {/* KEY METRICS - 4 CARDS IN CLEAN GRID */}
          <div className="grid grid-cols-4 gap-6">
            {/* Metric 1 */}
            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all border-l-4 border-argus-blue p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-11 text-gray-500 font-semibold uppercase tracking-wide">Total Cases</p>
                  <p className="text-36 font-bold text-argus-blue mt-3">{stats.totalMTD}</p>
                  <p className="text-10 text-gray-400 mt-2">Month to Date</p>
                </div>
              </div>
              <div className="h-1 bg-gradient-to-r from-argus-blue to-transparent rounded"></div>
            </div>

            {/* Metric 2 */}
            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all border-l-4 border-red-500 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-11 text-red-600 font-semibold uppercase tracking-wide">Serious Cases</p>
                  <p className="text-36 font-bold text-red-600 mt-3">{stats.seriousCases}</p>
                  <p className="text-10 text-red-400 mt-2">Expedited Reports</p>
                </div>
              </div>
              <div className="h-1 bg-gradient-to-r from-red-500 to-transparent rounded"></div>
            </div>

            {/* Metric 3 */}
            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all border-l-4 border-yellow-500 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-11 text-yellow-700 font-semibold uppercase tracking-wide">Reports Due</p>
                  <p className="text-36 font-bold text-yellow-600 mt-3">{reportsDueSoon.length}</p>
                  <p className="text-10 text-yellow-500 mt-2">Next 7 Days</p>
                </div>
              </div>
              <div className="h-1 bg-gradient-to-r from-yellow-500 to-transparent rounded"></div>
            </div>

            {/* Metric 4 */}
            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all border-l-4 border-orange-600 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-11 text-orange-700 font-semibold uppercase tracking-wide">Overdue</p>
                  <p className="text-36 font-bold text-orange-600 mt-3">{stats.overdueReports}</p>
                  <p className="text-10 text-orange-500 mt-2">Immediate Action</p>
                </div>
              </div>
              <div className="h-1 bg-gradient-to-r from-orange-600 to-transparent rounded"></div>
            </div>
          </div>

          {/* TWO-COLUMN LAYOUT */}
          <div className="grid grid-cols-3 gap-6">
            
            {/* LEFT COLUMN - WIDER (2 cols) */}
            <div className="col-span-2 space-y-6">
              
              {/* MY WORKLIST */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-argus-blue to-argus-light px-6 py-4">
                  <h2 className="text-13 font-bold text-white uppercase tracking-wider">📋 My Worklist</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-5 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                      <p className="text-11 text-gray-600 font-semibold mb-2">New Cases</p>
                      <p className="text-28 font-bold text-argus-blue">{stats.newCases}</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg">
                      <p className="text-11 text-gray-600 font-semibold mb-2">Open Cases</p>
                      <p className="text-28 font-bold text-cyan-600">{stats.openCases}</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg">
                      <p className="text-11 text-gray-600 font-semibold mb-2">Under Review</p>
                      <p className="text-28 font-bold text-indigo-600">{stats.reviewCases}</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                      <p className="text-11 text-gray-600 font-semibold mb-2">Locked</p>
                      <p className="text-28 font-bold text-purple-600">{stats.lockedCases}</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                      <p className="text-11 text-gray-600 font-semibold mb-2">Closed</p>
                      <p className="text-28 font-bold text-green-600">{stats.closedCases}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* HIGH PRIORITY ACTIONS TABLE */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-orange-600 to-orange-500 px-6 py-4">
                  <h2 className="text-13 font-bold text-white uppercase tracking-wider">⚡ High Priority Actions</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-orange-50 border-b border-orange-200">
                        <th className="px-6 py-3 text-left text-11 font-bold text-gray-700 uppercase tracking-wider">Case ID</th>
                        <th className="px-6 py-3 text-left text-11 font-bold text-gray-700 uppercase tracking-wider">Action Required</th>
                        <th className="px-6 py-3 text-left text-11 font-bold text-gray-700 uppercase tracking-wider">Due Date</th>
                        <th className="px-6 py-3 text-left text-11 font-bold text-gray-700 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-orange-100">
                      {actionItems.map((item, idx) => (
                        <tr key={idx} className="hover:bg-orange-50 transition-colors">
                          <td className="px-6 py-4">
                            <a href={`/dashboard/cases/${item.caseId}`} className="text-argus-blue font-bold hover:text-argus-light">
                              {item.caseId}
                            </a>
                          </td>
                          <td className="px-6 py-4 text-11 font-medium text-gray-700">{item.action}</td>
                          <td className="px-6 py-4 text-11 font-bold text-red-600">{item.dueDate}</td>
                          <td className="px-6 py-4 text-11 font-bold">{item.status}</td>
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
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-red-600 to-red-500 px-6 py-4">
                  <h2 className="text-13 font-bold text-white uppercase tracking-wider">⏰ Expedited Reports</h2>
                </div>
                <div className="p-6 space-y-3">
                  {reportsDueSoon.map((item, idx) => (
                    <div key={idx} className="p-4 border-l-4 border-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                      <a href={`/dashboard/cases/${item.caseId}`} className="block text-argus-blue font-bold hover:text-argus-light text-11 mb-1">
                        {item.caseId}
                      </a>
                      <p className="text-10 text-red-700 font-medium mb-2">{item.reportType}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-10 font-bold text-gray-700">{item.status}</span>
                        <span className="text-10 font-bold text-red-600">{item.daysLeft}d</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* QUICK ACTIONS */}
              <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-argus-blue">
                <h2 className="text-13 font-bold text-argus-navy uppercase tracking-wider mb-6">🚀 Quick Actions</h2>
                <div className="space-y-3">
                  <a href="/dashboard/cases/new" className="block px-4 py-3 bg-green-600 text-white font-bold text-11 rounded-lg hover:bg-green-700 transition-all text-center">
                    + New Case
                  </a>
                  <a href="/dashboard/cases" className="block px-4 py-3 bg-argus-blue text-white font-bold text-11 rounded-lg hover:bg-argus-light transition-all text-center">
                    🔍 Search Cases
                  </a>
                  <a href="/dashboard/reports/expedited" className="block px-4 py-3 bg-red-600 text-white font-bold text-11 rounded-lg hover:bg-red-700 transition-all text-center">
                    📊 Reports
                  </a>
                  <a href="/dashboard/meddra" className="block px-4 py-3 bg-purple-600 text-white font-bold text-11 rounded-lg hover:bg-purple-700 transition-all text-center">
                    💊 MedDRA
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </ArgusLayout>
  );
}
