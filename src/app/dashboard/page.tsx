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
      <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 min-h-screen p-6 space-y-6 text-11 font-sans">
        {/* HEADER with Refresh Button */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-20 font-bold text-argus-navy tracking-wider flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-argus-blue to-argus-light rounded-lg">
              <span className="text-white text-18">📊</span>
            </div>
            Personal Argus Status Dashboard
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-argus-blue to-argus-light text-white hover:shadow-xl text-11 font-bold border-0 rounded-lg transition-all transform hover:scale-105 flex items-center gap-2">
            <span>🔄</span> Refresh Data
          </button>
        </div>

        {/* KEY METRICS - 4 COLUMN CARDS with Enhanced Styling */}
        <div className="grid grid-cols-4 gap-4 mb-2">
          {/* Card 1: Total Cases */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-4 border-l-4 border-argus-blue overflow-hidden group">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-10 text-gray-500 font-bold uppercase tracking-wide">Total Cases</div>
                <div className="text-32 font-bold text-argus-blue mt-2">{stats.totalMTD}</div>
                <div className="text-9 text-gray-400 mt-2">Month to Date</div>
              </div>
              <div className="text-40 opacity-20 group-hover:opacity-40 transition-opacity">📦</div>
            </div>
            <div className="mt-3 h-1 bg-gradient-to-r from-argus-blue to-transparent rounded-full"></div>
          </div>

          {/* Card 2: Serious Cases */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-4 border-l-4 border-red-500 overflow-hidden group">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-10 text-red-600 font-bold uppercase tracking-wide">Serious Cases</div>
                <div className="text-32 font-bold text-red-600 mt-2">{stats.seriousCases}</div>
                <div className="text-9 text-red-400 mt-2">Expedited Reports</div>
              </div>
              <div className="text-40 opacity-20 group-hover:opacity-40 transition-opacity">⚠️</div>
            </div>
            <div className="mt-3 h-1 bg-gradient-to-r from-red-500 to-transparent rounded-full"></div>
          </div>

          {/* Card 3: Reports Due */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-4 border-l-4 border-yellow-500 overflow-hidden group">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-10 text-yellow-700 font-bold uppercase tracking-wide">Reports Due</div>
                <div className="text-32 font-bold text-yellow-600 mt-2">{reportsDueSoon.length}</div>
                <div className="text-9 text-yellow-500 mt-2">Next 7 Days</div>
              </div>
              <div className="text-40 opacity-20 group-hover:opacity-40 transition-opacity">⏰</div>
            </div>
            <div className="mt-3 h-1 bg-gradient-to-r from-yellow-500 to-transparent rounded-full"></div>
          </div>

          {/* Card 4: Overdue */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-4 border-l-4 border-orange-600 overflow-hidden group">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-10 text-orange-700 font-bold uppercase tracking-wide">🔴 Overdue</div>
                <div className="text-32 font-bold text-orange-600 mt-2">{stats.overdueReports}</div>
                <div className="text-9 text-orange-500 mt-2">Immediate Action</div>
              </div>
              <div className="text-40 opacity-20 group-hover:opacity-40 transition-opacity">🚨</div>
            </div>
            <div className="mt-3 h-1 bg-gradient-to-r from-orange-600 to-transparent rounded-full"></div>
          </div>
        </div>

        {/* MAIN CONTENT - 2 ROW LAYOUT */}
        <div className="grid grid-cols-2 gap-6">
          {/* LEFT: Worklist + Action Items */}
          <div className="space-y-6">
            {/* My Worklist */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-argus-blue to-argus-light text-white px-4 py-3">
                <div className="text-12 font-bold uppercase tracking-wider">📋 My Worklist</div>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all">
                  <span className="text-11 font-semibold text-gray-700">New Cases</span>
                  <span className="text-18 font-bold text-argus-blue">{stats.newCases}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-lg hover:from-cyan-100 hover:to-cyan-200 transition-all">
                  <span className="text-11 font-semibold text-gray-700">Open Cases</span>
                  <span className="text-18 font-bold text-cyan-600">{stats.openCases}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg hover:from-indigo-100 hover:to-indigo-200 transition-all">
                  <span className="text-11 font-semibold text-gray-700">Under Review</span>
                  <span className="text-18 font-bold text-indigo-600">{stats.reviewCases}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg hover:from-purple-100 hover:to-purple-200 transition-all">
                  <span className="text-11 font-semibold text-gray-700">Locked</span>
                  <span className="text-18 font-bold text-purple-600">{stats.lockedCases}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg hover:from-green-100 hover:to-green-200 transition-all">
                  <span className="text-11 font-semibold text-gray-700">Closed</span>
                  <span className="text-18 font-bold text-green-600">{stats.closedCases}</span>
                </div>
              </div>
            </div>

            {/* My Action Items */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-argus-orange to-yellow-500 text-white px-4 py-3">
                <div className="text-12 font-bold uppercase tracking-wider">⚡ High Priority Actions</div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-10">
                  <thead>
                    <tr className="bg-gradient-to-r from-orange-100 to-yellow-100 border-b-2 border-orange-300">
                      <th className="px-4 py-2 text-left font-bold text-gray-700">Case ID</th>
                      <th className="px-4 py-2 text-left font-bold text-gray-700">Action</th>
                      <th className="px-4 py-2 text-left font-bold text-gray-700">Due Date</th>
                      <th className="px-4 py-2 text-left font-bold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {actionItems.map((item, idx) => (
                      <tr key={idx} className={idx % 2 === 1 ? 'bg-orange-50' : 'bg-white'}>
                        <td className="px-4 py-3 border-b border-orange-100">
                          <a href={`/dashboard/cases/${item.caseId}`} className="text-argus-blue font-bold hover:underline hover:text-argus-light">
                            {item.caseId}
                          </a>
                        </td>
                        <td className="px-4 py-3 border-b border-orange-100 font-semibold text-gray-700">{item.action}</td>
                        <td className="px-4 py-3 border-b border-orange-100 font-bold text-red-600">{item.dueDate}</td>
                        <td className="px-4 py-3 border-b border-orange-100 font-bold">{item.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* RIGHT: Reports Due + Quick Launch */}
          <div className="space-y-6">
            {/* Expedited Reports Due Soon */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-3">
                <div className="text-12 font-bold uppercase tracking-wider">⏰ Expedited Reports Due</div>
              </div>
              <div className="p-4 space-y-2">
                {reportsDueSoon.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-lg border-l-4 border-red-600 bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-150 flex justify-between items-center transition-all">
                    <div className="flex-1">
                      <a href={`/dashboard/cases/${item.caseId}`} className="text-argus-blue font-bold hover:underline text-11">
                        {item.caseId}
                      </a>
                      <div className="text-9 text-red-600 font-medium">{item.reportType}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-11 text-gray-800">{item.status}</div>
                      <div className="text-10 text-red-600 font-bold">{item.daysLeft} days left</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-4 border-t-4 border-argus-blue">
              <div className="text-12 font-bold text-argus-navy mb-4 uppercase tracking-wider">🚀 Quick Actions</div>
              <div className="space-y-3">
                <a
                  href="/dashboard/cases/new"
                  className="block px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-11 rounded-lg hover:shadow-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 text-center"
                >
                  + Create New Case
                </a>
                <a
                  href="/dashboard/cases"
                  className="block px-4 py-3 bg-gradient-to-r from-argus-blue to-argus-light text-white font-bold text-11 rounded-lg hover:shadow-lg hover:from-argus-light hover:to-blue-600 transition-all transform hover:scale-105 text-center"
                >
                  🔍 Search Cases
                </a>
                <a
                  href="/dashboard/reports/expedited"
                  className="block px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-11 rounded-lg hover:shadow-lg hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 text-center"
                >
                  📊 Expedited Reports
                </a>
                <a
                  href="/dashboard/meddra"
                  className="block px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold text-11 rounded-lg hover:shadow-lg hover:from-purple-700 hover:to-purple-800 transition-all transform hover:scale-105 text-center"
                >
                  💊 MedDRA Coding
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER INFO */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-4 mt-6 text-white shadow-lg">
          <div className="text-10 flex items-center justify-between">
            <div className="flex gap-6">
              <span><span className="font-bold text-cyan-400">Last Updated:</span> {new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</span>
              <span><span className="font-bold text-cyan-400">Training Mode:</span> Available in case entry - Enable 🎓 toggle</span>
              <span><span className="font-bold text-cyan-400">Data Source:</span> Sample data (Demo Mode)</span>
            </div>
          </div>
        </div>
      </div>
    </ArgusLayout>
  );
}
