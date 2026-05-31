'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api-client';
import Link from 'next/link';
import ArgusLayout from '@/components/ArgusLayout';
import SectionHeader from '@/components/SectionHeader';
import ArgusInput from '@/components/ArgusInput';
import ArgusButton from '@/components/Button';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    newCases: 5,
    openCases: 12,
    reviewCases: 3,
    lockedCases: 8,
    closedCases: 45,
    totalMTD: 73,
    overdueReports: 1,
  });
  const [actionItems, setActionItems] = useState([
    { caseId: 'ARG-001', action: 'Medical Review', dueDate: '20-JAN-2024', priority: 'HIGH' },
    { caseId: 'ARG-002', action: 'QC Review', dueDate: '22-JAN-2024', priority: 'MEDIUM' },
    { caseId: 'ARG-004', action: 'Submit Report', dueDate: '25-JAN-2024', priority: 'HIGH' },
  ]);
  const [reportsDueSoon, setReportsDueSoon] = useState([
    { caseId: 'ARG-003', reportType: '7-day', daysLeft: 2 },
    { caseId: 'ARG-007', reportType: '15-day', daysLeft: 5 },
  ]);
  const [searchCaseId, setSearchCaseId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

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
        <div className="text-center py-8">Loading PERSONAL ARGUS STATUS...</div>
      </ArgusLayout>
    );
  }

  return (
    <ArgusLayout>
      <div className="bg-argus-bg p-3 space-y-3 text-11 font-sans">
        {/* Main Title */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-13 font-bold text-argus-navy uppercase">
            Personal Argus Status
          </div>
          <button className="px-2 py-1 bg-argus-blue text-white hover:bg-argus-light text-10 border border-argus-border-dark">
            🔄 Refresh
          </button>
        </div>

        {/* Three-Column Layout */}
        <div className="grid grid-cols-3 gap-3">
          {/* Column 1: My Worklist */}
          <div className="border-2 border-argus-border bg-white">
            <SectionHeader title="MY WORKLIST" />
            <div className="p-3 space-y-1">
              <div className="flex justify-between">
                <span>New Cases:</span>
                <span className="font-bold text-argus-orange">{stats.newCases}</span>
              </div>
              <div className="flex justify-between">
                <span>Open:</span>
                <span className="font-bold">{stats.openCases}</span>
              </div>
              <div className="flex justify-between">
                <span>Under Review:</span>
                <span className="font-bold">{stats.reviewCases}</span>
              </div>
              <div className="flex justify-between">
                <span>Locked:</span>
                <span className="font-bold">{stats.lockedCases}</span>
              </div>
              <div className="flex justify-between">
                <span>Closed:</span>
                <span className="font-bold">{stats.closedCases}</span>
              </div>
              <div className="border-t border-argus-border my-1 pt-1 font-bold flex justify-between">
                <span>TOTAL MTD:</span>
                <span>{stats.totalMTD}</span>
              </div>
            </div>
          </div>

          {/* Column 2: My Action Items */}
          <div className="border-2 border-argus-border bg-white">
            <SectionHeader title="MY ACTION ITEMS" />
            <div className="overflow-auto max-h-48">
              <table className="w-full text-10">
                <thead>
                  <tr className="bg-argus-blue text-white">
                    <th className="px-1 py-0.5 text-left">Case ID</th>
                    <th className="px-1 py-0.5 text-left">Action</th>
                    <th className="px-1 py-0.5 text-left">Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {actionItems.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 1 ? 'bg-argus-bg-row-alt' : ''}>
                      <td className="px-1 py-0.5">
                        <a href={`/dashboard/cases/${item.caseId}`} className="text-argus-blue hover:underline">
                          {item.caseId}
                        </a>
                      </td>
                      <td className="px-1 py-0.5">{item.action}</td>
                      <td className={`px-1 py-0.5 font-bold ${item.priority === 'HIGH' ? 'text-red-600' : 'text-argus-text-muted'}`}>
                        {item.dueDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Column 3: Reports Due Soon */}
          <div className="border-2 border-argus-border bg-white">
            <SectionHeader title="REPORTS DUE SOON" />
            <div className="p-3 space-y-1">
              {reportsDueSoon.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span>
                    <a href={`/dashboard/cases/${item.caseId}`} className="text-argus-blue hover:underline">
                      {item.caseId}
                    </a>
                  </span>
                  <span className="text-10">{item.reportType}</span>
                  <span className={item.daysLeft <= 2 ? 'text-red-600 font-bold' : 'text-argus-text-muted'}>
                    ⚠️ {item.daysLeft}d
                  </span>
                </div>
              ))}
              <div className="border-t border-argus-border pt-1 text-red-600 font-bold">
                OVERDUE: {stats.overdueReports}
              </div>
            </div>
          </div>
        </div>

        {/* Case Quick Launch */}
        <div className="border-2 border-argus-border bg-white p-2">
          <SectionHeader title="CASE QUICK LAUNCH" />
          <div className="flex gap-2 items-center p-2">
            <span className="text-11 font-bold text-argus-text-label">Case #:</span>
            <ArgusInput
              value={searchCaseId}
              onChange={(e) => setSearchCaseId(e.target.value)}
              placeholder="ARG-XXXX-XXXXXX"
              className="w-48"
            />
            <button
              onClick={handleOpenCase}
              className="px-3 py-1 bg-argus-blue text-white text-10 border border-argus-border-dark hover:bg-argus-light"
            >
              Open Case
            </button>
            <button
              onClick={handleNewCase}
              className="px-3 py-1 bg-argus-light text-white text-10 border border-argus-border-dark hover:bg-argus-blue"
            >
              New Case
            </button>
            <a
              href="/dashboard/cases"
              className="px-3 py-1 bg-gray-600 text-white text-10 border border-gray-700 hover:bg-gray-700"
            >
              Case Search
            </a>
          </div>
        </div>

        {/* Workflow State Summary */}
        <div className="border-2 border-argus-border bg-white p-2">
          <SectionHeader title="OPEN CASES BY WORKFLOW STATE" />
          <div className="flex gap-4 p-2 justify-center">
            <div className="flex items-center gap-1">
              <span className="text-10">[Intake:</span>
              <span className="font-bold text-orange-600">5</span>
              <span className="text-10">]</span>
            </div>
            <span className="text-argus-border">→</span>
            <div className="flex items-center gap-1">
              <span className="text-10">[Triage:</span>
              <span className="font-bold">3</span>
              <span className="text-10">]</span>
            </div>
            <span className="text-argus-border">→</span>
            <div className="flex items-center gap-1">
              <span className="text-10">[Data Entry:</span>
              <span className="font-bold">8</span>
              <span className="text-10">]</span>
            </div>
            <span className="text-argus-border">→</span>
            <div className="flex items-center gap-1">
              <span className="text-10">[Med Review:</span>
              <span className="font-bold">4</span>
              <span className="text-10">]</span>
            </div>
            <span className="text-argus-border">→</span>
            <div className="flex items-center gap-1">
              <span className="text-10">[QC:</span>
              <span className="font-bold">2</span>
              <span className="text-10">]</span>
            </div>
            <span className="text-argus-border">→</span>
            <div className="flex items-center gap-1">
              <span className="text-10">[Lock:</span>
              <span className="font-bold">1</span>
              <span className="text-10">]</span>
            </div>
          </div>
        </div>
      </div>
    </ArgusLayout>
  );
}
              </div>
              <div className="flex justify-between">
                <span>Closed:</span>
                <span className="font-bold">{stats.closedCases}</span>
              </div>
              <div className="border-t border-argus-border my-1 pt-1 flex justify-between font-bold bg-argus-bg-row-alt px-1">
                <span>TOTAL MTD:</span>
                <span>{stats.totalMTD}</span>
              </div>
            </div>
          </div>

          {/* Column 2: My Action Items */}
          <div className="border-2 border-argus-border bg-white">
            <div className="bg-argus-blue text-white px-2 py-1 text-11 font-bold uppercase">
              MY ACTION ITEMS
            </div>
            <div className="p-0 text-10">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-argus-bg-tab-inactive border-b border-argus-border">
                    <th className="border-r border-argus-border px-1 py-1 text-left font-bold">Case ID</th>
                    <th className="border-r border-argus-border px-1 py-1 text-left font-bold">Action</th>
                    <th className="px-1 py-1 text-left font-bold">Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {actionItems.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-argus-bg-row-alt'}>
                      <td className="border-r border-argus-border px-1 py-1">
                        <button className="text-argus-link hover:underline cursor-pointer">{item.caseId}</button>
                      </td>
                      <td className="border-r border-argus-border px-1 py-1">{item.action}</td>
                      <td className={`px-1 py-1 ${item.priority === 'HIGH' ? 'text-red-600 font-bold' : ''}`}>
                        {item.dueDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Column 3: Reports Due Soon */}
          <div className="border-2 border-argus-border bg-white">
            <div className="bg-argus-blue text-white px-2 py-1 text-11 font-bold uppercase">
              REPORTS DUE SOON
            </div>
            <div className="p-0 text-10">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-argus-bg-tab-inactive border-b border-argus-border">
                    <th className="border-r border-argus-border px-1 py-1 text-left font-bold">Case ID</th>
                    <th className="border-r border-argus-border px-1 py-1 text-left font-bold">Report</th>
                    <th className="px-1 py-1 text-left font-bold">Days</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border-r border-argus-border px-1 py-1">ARG-003</td>
                    <td className="border-r border-argus-border px-1 py-1">7-day</td>
                    <td className="px-1 py-1 text-red-600 font-bold">⚠️ 2</td>
                  </tr>
                  <tr className="bg-argus-bg-row-alt">
                    <td className="border-r border-argus-border px-1 py-1">ARG-007</td>
                    <td className="border-r border-argus-border px-1 py-1">15-day</td>
                    <td className="px-1 py-1">5</td>
                  </tr>
                  <tr className="bg-white border-t border-argus-border">
                    <td colSpan={3} className="px-1 py-1 text-right font-bold">
                      OVERDUE: {stats.overdueReports}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Case Quick Launch */}
        <div className="border-2 border-argus-border bg-white mt-4">
          <div className="bg-argus-blue text-white px-2 py-1 text-11 font-bold uppercase">
            CASE QUICK LAUNCH
          </div>
          <div className="p-3 flex items-end gap-2">
            <div>
              <label className="block text-11 font-bold text-argus-text-label mb-1">Case #:</label>
              <input
                type="text"
                value={searchCaseId}
                onChange={(e) => setSearchCaseId(e.target.value)}
                placeholder="ARG-0001234"
                className="px-2 py-1 border border-argus-border text-11 focus:border-argus-light focus:outline-none"
              />
            </div>
            <button
              onClick={handleOpenCase}
              className="px-3 py-1 bg-argus-blue text-white hover:bg-argus-light text-11 font-bold border border-argus-border-dark"
            >
              Open Case
            </button>
            <Link
              href="/dashboard/cases/new"
              className="px-3 py-1 bg-argus-light text-white hover:bg-argus-blue text-11 font-bold border border-argus-border-dark"
            >
              New Case
            </Link>
            <Link
              href="/dashboard/cases"
              className="px-3 py-1 bg-argus-light text-white hover:bg-argus-blue text-11 font-bold border border-argus-border-dark"
            >
              Case Search
            </Link>
          </div>
        </div>

        {/* Workflow Pipeline */}
        <div className="border-2 border-argus-border bg-white mt-4">
          <div className="bg-argus-blue text-white px-2 py-1 text-11 font-bold uppercase">
            OPEN CASES BY WORKFLOW STATE
          </div>
          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-11 font-bold">
              <span className="px-2 py-1 bg-status-review text-argus-navy border border-argus-border">
                [Intake: 5]
              </span>
              <span>→</span>
              <span className="px-2 py-1 bg-status-review text-argus-navy border border-argus-border">
                [Triage: 3]
              </span>
              <span>→</span>
              <span className="px-2 py-1 bg-status-open text-argus-navy border border-argus-border">
                [Data Entry: 8]
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
