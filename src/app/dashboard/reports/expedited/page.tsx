'use client';

import React, { useState } from 'react';
import ArgusLayout from '@/components/ArgusLayout';
import SectionHeader from '@/components/SectionHeader';

interface Report {
  caseId: string;
  product: string;
  authority: string;
  reportType: string;
  dueDate: string;
  clockStart: string;
  daysRemaining: number;
  status: 'On Track' | 'Due Soon' | 'Overdue';
  submitted: boolean;
}

export default function ExpeditedReportsPage() {
  const [reports, setReports] = useState<Report[]>([
    {
      caseId: 'ARG-001',
      product: 'Metformin',
      authority: 'CDSCO (India)',
      reportType: '7-day',
      dueDate: '22-JAN-24',
      clockStart: '15-JAN-24',
      daysRemaining: 2,
      status: 'Due Soon',
      submitted: false,
    },
    {
      caseId: 'ARG-001',
      product: 'Metformin',
      authority: 'FDA (USA)',
      reportType: '15-day',
      dueDate: '30-JAN-24',
      clockStart: '15-JAN-24',
      daysRemaining: 10,
      status: 'On Track',
      submitted: false,
    },
    {
      caseId: 'ARG-002',
      product: 'Aspirin',
      authority: 'EMA (Europe)',
      reportType: '15-day',
      dueDate: '01-FEB-24',
      clockStart: '17-JAN-24',
      daysRemaining: 13,
      status: 'On Track',
      submitted: false,
    },
    {
      caseId: 'ARG-003',
      product: 'Ibuprofen',
      authority: 'PMDA (Japan)',
      reportType: '7-day',
      dueDate: '25-JAN-24',
      clockStart: '18-JAN-24',
      daysRemaining: 0,
      status: 'Overdue',
      submitted: false,
    },
    {
      caseId: 'ARG-004',
      product: 'Amoxicillin',
      authority: 'TGA (Australia)',
      reportType: '15-day',
      dueDate: '02-FEB-24',
      clockStart: '18-JAN-24',
      daysRemaining: 14,
      status: 'On Track',
      submitted: true,
    },
  ]);

  const [sortBy, setSortBy] = useState<'dueDate' | 'daysRemaining'>('daysRemaining');

  const sortedReports = [...reports].sort((a, b) => {
    if (sortBy === 'daysRemaining') {
      return a.daysRemaining - b.daysRemaining;
    } else {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
  });

  const statusColor = (status: string, daysRemaining: number) => {
    if (status === 'Overdue') return 'bg-red-100 text-red-800 border-red-300';
    if (daysRemaining <= 2) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    return 'bg-green-100 text-green-800 border-green-300';
  };

  const statusBadge = (status: string, daysRemaining: number) => {
    if (status === 'Overdue') return '🔴 OVERDUE';
    if (daysRemaining <= 2) return '🟡 DUE SOON';
    return '🟢 ON TRACK';
  };

  const overdueCases = reports.filter((r) => r.daysRemaining <= 0).length;
  const dueSoonCases = reports.filter((r) => r.daysRemaining > 0 && r.daysRemaining <= 2).length;
  const onTrackCases = reports.filter((r) => r.daysRemaining > 2).length;
  const submittedCount = reports.filter((r) => r.submitted).length;

  return (
    <ArgusLayout>
      <div className="bg-argus-bg p-3 space-y-3 text-11 font-sans">
        {/* Page Title */}
        <div className="text-13 font-bold text-argus-navy uppercase mb-4">
          Expedited Reports — Regulatory Clock Monitor
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-5 gap-2">
          <div className="bg-white border-2 border-argus-border p-2">
            <div className="text-10 text-argus-text-muted">TOTAL REPORTS</div>
            <div className="text-16 font-bold text-argus-navy">{reports.length}</div>
          </div>
          <div className="bg-red-50 border-2 border-red-300 p-2">
            <div className="text-10 text-red-700 font-bold">OVERDUE</div>
            <div className="text-16 font-bold text-red-600">{overdueCases}</div>
          </div>
          <div className="bg-yellow-50 border-2 border-yellow-300 p-2">
            <div className="text-10 text-yellow-700 font-bold">DUE SOON (&lt;2d)</div>
            <div className="text-16 font-bold text-yellow-600">{dueSoonCases}</div>
          </div>
          <div className="bg-green-50 border-2 border-green-300 p-2">
            <div className="text-10 text-green-700 font-bold">ON TRACK</div>
            <div className="text-16 font-bold text-green-600">{onTrackCases}</div>
          </div>
          <div className="bg-blue-50 border-2 border-blue-300 p-2">
            <div className="text-10 text-blue-700 font-bold">SUBMITTED</div>
            <div className="text-16 font-bold text-blue-600">{submittedCount}</div>
          </div>
        </div>

        {/* Regulatory Rules Panel */}
        <div className="bg-white border-2 border-argus-border p-2">
          <SectionHeader title="ICH E2A Expedited Reporting Rules" />
          <div className="text-10 text-argus-text-label space-y-1 p-2">
            <div>
              <span className="font-bold">7-day Rule:</span> Fatal or life-threatening adverse reaction that is unlisted (not in CCDS)
            </div>
            <div>
              <span className="font-bold">15-day Rule:</span> All other serious unexpected adverse reactions not listed in reference document
            </div>
            <div>
              <span className="font-bold">Clock Day 0:</span> Date case received at company (initial case entry)
            </div>
            <div>
              <span className="font-bold">Weekend/Holiday Rule:</span> Clock does NOT stop for weekends or holidays
            </div>
            <div>
              <span className="font-bold">Authorities:</span> FDA (USA), EMA (Europe), CDSCO (India), PMDA (Japan), TGA (Australia), etc.
            </div>
          </div>
        </div>

        {/* Sorting & Export */}
        <div className="flex gap-2 mb-2">
          <button
            onClick={() => setSortBy('daysRemaining')}
            className={`px-3 py-1 text-10 border ${
              sortBy === 'daysRemaining'
                ? 'bg-argus-blue text-white border-argus-border-dark'
                : 'bg-white text-argus-text-label border-argus-border hover:bg-argus-bg'
            }`}
          >
            Sort by Days Left
          </button>
          <button
            onClick={() => setSortBy('dueDate')}
            className={`px-3 py-1 text-10 border ${
              sortBy === 'dueDate'
                ? 'bg-argus-blue text-white border-argus-border-dark'
                : 'bg-white text-argus-text-label border-argus-border hover:bg-argus-bg'
            }`}
          >
            Sort by Due Date
          </button>
          <button className="px-3 py-1 bg-argus-orange text-white text-10 border border-yellow-600 hover:bg-yellow-500 ml-auto">
            📥 Export PDF
          </button>
        </div>

        {/* Reports Table */}
        <div className="border-2 border-argus-border bg-white overflow-auto">
          <SectionHeader title={`EXPEDITED REPORTS (${reports.length} total)`} />
          <div className="overflow-x-auto">
            <table className="w-full text-10 border-collapse">
              <thead>
                <tr className="bg-argus-blue text-white">
                  <th className="border border-argus-border px-2 py-1 text-left font-bold">Case ID</th>
                  <th className="border border-argus-border px-2 py-1 text-left font-bold">Product</th>
                  <th className="border border-argus-border px-2 py-1 text-left font-bold">Authority</th>
                  <th className="border border-argus-border px-2 py-1 text-left font-bold">Report Type</th>
                  <th className="border border-argus-border px-2 py-1 text-left font-bold">Clock Start</th>
                  <th className="border border-argus-border px-2 py-1 text-left font-bold">Due Date</th>
                  <th className="border border-argus-border px-2 py-1 text-center font-bold">Days Left</th>
                  <th className="border border-argus-border px-2 py-1 text-center font-bold">Status</th>
                  <th className="border border-argus-border px-2 py-1 text-center font-bold">Submitted</th>
                  <th className="border border-argus-border px-2 py-1 text-center font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedReports.map((report, idx) => (
                  <tr
                    key={idx}
                    className={`${idx % 2 === 1 ? 'bg-argus-bg-row-alt' : 'bg-white'} border-b border-argus-border`}
                  >
                    <td className="border border-argus-border px-2 py-1">
                      <a href={`/dashboard/cases/${report.caseId}`} className="text-argus-blue hover:underline font-bold">
                        {report.caseId}
                      </a>
                    </td>
                    <td className="border border-argus-border px-2 py-1">{report.product}</td>
                    <td className="border border-argus-border px-2 py-1 font-bold text-argus-text-label">{report.authority}</td>
                    <td className="border border-argus-border px-2 py-1">
                      <span className="bg-argus-bg px-1 py-0.5 text-9">{report.reportType}</span>
                    </td>
                    <td className="border border-argus-border px-2 py-1">{report.clockStart}</td>
                    <td className="border border-argus-border px-2 py-1 font-bold">{report.dueDate}</td>
                    <td
                      className={`border border-argus-border px-2 py-1 text-center font-bold ${
                        report.daysRemaining <= 0 ? 'text-red-600' : report.daysRemaining <= 2 ? 'text-yellow-600' : ''
                      }`}
                    >
                      {report.daysRemaining <= 0 ? (
                        <span className="text-red-600">⚠️ {report.daysRemaining}</span>
                      ) : (
                        <span>{report.daysRemaining}d</span>
                      )}
                    </td>
                    <td className={`border border-argus-border px-2 py-1 text-center text-9 font-bold ${statusColor(report.status, report.daysRemaining)}`}>
                      {statusBadge(report.status, report.daysRemaining)}
                    </td>
                    <td className="border border-argus-border px-2 py-1 text-center">
                      {report.submitted ? (
                        <span className="text-green-600 font-bold">✓ Yes</span>
                      ) : (
                        <span className="text-argus-text-muted">No</span>
                      )}
                    </td>
                    <td className="border border-argus-border px-2 py-1 text-center">
                      <button className="px-2 py-0.5 bg-argus-light text-white text-9 hover:bg-argus-blue">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Footer */}
        <div className="bg-argus-bg border-2 border-argus-border p-2 text-10 text-argus-text-muted">
          <span className="font-bold">ℹ️ Info:</span> Days remaining calculated from receipt date. Weekends and holidays are NOT excluded from the clock.
          Red (&lt;=0) indicates overdue submission. Yellow (1-2 days) requires immediate attention.
        </div>
      </div>
    </ArgusLayout>
  );
}
