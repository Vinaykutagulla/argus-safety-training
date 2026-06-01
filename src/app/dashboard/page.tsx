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
      <div style={{ backgroundColor: '#F3F4F6', minHeight: '100vh', padding: '32px 24px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {/* PAGE HEADER */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', margin: 0, marginBottom: '8px' }}>
            📊 Dashboard
          </h1>
          <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
            Welcome back! Here's your pharmacovigilance overview.
          </p>
        </div>

        {/* STATS GRID - 4 COLUMNS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
          {/* Total Cases */}
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #2563EB' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', marginBottom: '12px' }}>Total Cases</div>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#2563EB', marginBottom: '8px' }}>{stats.totalMTD}</div>
            <div style={{ fontSize: '12px', color: '#9CA3AF' }}>This Month</div>
          </div>

          {/* Serious Cases */}
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #DC2626' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', marginBottom: '12px' }}>Serious Cases</div>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#DC2626', marginBottom: '8px' }}>{stats.seriousCases}</div>
            <div style={{ fontSize: '12px', color: '#9CA3AF' }}>Requiring Reports</div>
          </div>

          {/* Reports Due */}
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #F59E0B' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', marginBottom: '12px' }}>Reports Due</div>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#F59E0B', marginBottom: '8px' }}>{reportsDueSoon.length}</div>
            <div style={{ fontSize: '12px', color: '#9CA3AF' }}>Next 7 Days</div>
          </div>

          {/* Overdue */}
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #EF4444' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', marginBottom: '12px' }}>🔴 Overdue</div>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#EF4444', marginBottom: '8px' }}>{stats.overdueReports}</div>
            <div style={{ fontSize: '12px', color: '#9CA3AF' }}>Action Needed</div>
          </div>
        </div>

        {/* MAIN CONTENT - 2 COLUMN GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
          {/* LEFT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* MY WORKLIST */}
            <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
              <div style={{ background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)', color: 'white', padding: '16px 24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0 }}>📋 My Worklist</h3>
              </div>
              <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ backgroundColor: '#EFF6FF', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>New Cases</div>
                  <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#2563EB' }}>{stats.newCases}</div>
                </div>
                <div style={{ backgroundColor: '#DBEAFE', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>Open Cases</div>
                  <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#0284C7' }}>{stats.openCases}</div>
                </div>
                <div style={{ backgroundColor: '#E0E7FF', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>In Review</div>
                  <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#4F46E5' }}>{stats.reviewCases}</div>
                </div>
                <div style={{ backgroundColor: '#F3E8FF', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>Locked</div>
                  <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#A855F7' }}>{stats.lockedCases}</div>
                </div>
              </div>
            </div>

            {/* HIGH PRIORITY ACTIONS TABLE */}
            <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
              <div style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)', color: 'white', padding: '16px 24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0 }}>⚡ High Priority Actions</h3>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#111827' }}>Case ID</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#111827' }}>Action</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#111827' }}>Due Date</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: '#111827' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {actionItems.map((item, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #E5E7EB', backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#F9FAFB' }}>
                        <td style={{ padding: '12px 16px', fontWeight: '600', color: '#2563EB' }}>{item.caseId}</td>
                        <td style={{ padding: '12px 16px', color: '#111827' }}>{item.action}</td>
                        <td style={{ padding: '12px 16px', color: '#DC2626', fontWeight: '600' }}>{item.dueDate}</td>
                        <td style={{ padding: '12px 16px', fontWeight: '600', color: '#111827' }}>{item.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* REPORTS DUE SOON */}
            <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
              <div style={{ background: 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)', color: 'white', padding: '16px 24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0 }}>⏰ Reports Due Soon</h3>
              </div>
              <div style={{ padding: '16px' }}>
                {reportsDueSoon.map((item, idx) => (
                  <div key={idx} style={{ padding: '16px', marginBottom: idx < reportsDueSoon.length - 1 ? '12px' : 0, backgroundColor: '#FEF2F2', borderLeft: '4px solid #DC2626', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <a href={`/dashboard/cases/${item.caseId}`} style={{ fontSize: '13px', fontWeight: '700', color: '#2563EB', textDecoration: 'none', cursor: 'pointer' }}>
                        {item.caseId}
                      </a>
                      <div style={{ fontSize: '12px', fontWeight: '700', color: '#111827' }}>{item.status}</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div style={{ fontSize: '12px', color: '#6B7280' }}>{item.reportType}</div>
                      <div style={{ fontSize: '12px', color: '#DC2626', fontWeight: '600' }}>{item.daysLeft} days left</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px', borderTop: '4px solid #2563EB' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#111827', marginTop: 0, marginBottom: '16px' }}>🚀 Quick Actions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href="/dashboard/cases/new" style={{ padding: '12px 16px', background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', color: 'white', fontWeight: '600', fontSize: '13px', borderRadius: '8px', textAlign: 'center', textDecoration: 'none', cursor: 'pointer', border: 'none' }}>
                  ➕ Create New Case
                </a>
                <a href="/dashboard/cases" style={{ padding: '12px 16px', background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)', color: 'white', fontWeight: '600', fontSize: '13px', borderRadius: '8px', textAlign: 'center', textDecoration: 'none', cursor: 'pointer', border: 'none' }}>
                  🔍 Search Cases
                </a>
                <a href="/dashboard/reports/expedited" style={{ padding: '12px 16px', background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)', color: 'white', fontWeight: '600', fontSize: '13px', borderRadius: '8px', textAlign: 'center', textDecoration: 'none', cursor: 'pointer', border: 'none' }}>
                  📊 View Reports
                </a>
                <a href="/dashboard/meddra" style={{ padding: '12px 16px', background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)', color: 'white', fontWeight: '600', fontSize: '13px', borderRadius: '8px', textAlign: 'center', textDecoration: 'none', cursor: 'pointer', border: 'none' }}>
                  💊 MedDRA Coding
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ marginTop: '32px', padding: '16px 24px', backgroundColor: '#1F2937', color: 'white', borderRadius: '12px', fontSize: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: '#93C5FD', fontWeight: '600' }}>Last Updated:</span> {new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
          </div>
          <div>
            <span style={{ color: '#93C5FD', fontWeight: '600' }}>Training Mode:</span> Enabled 🎓
          </div>
        </div>
      </div>
    </ArgusLayout>
  );
}
