'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import ArgusLayout from '@/components/ArgusLayout';
import SectionHeader from '@/components/SectionHeader';

interface AuditEntry {
  revisionNumber: number;
  timestamp: string;
  userId: string;
  userName: string;
  action: 'Created' | 'Updated' | 'Locked' | 'Submitted' | 'Reviewed';
  fieldChanged: string;
  oldValue: string;
  newValue: string;
  description: string;
}

export default function CaseAuditPage() {
  const params = useParams();
  const caseId = params.id as string;

  const [auditEntries] = useState<AuditEntry[]>([
    {
      revisionNumber: 1,
      timestamp: '15-JAN-24 09:15:00',
      userId: 'USER001',
      userName: 'Dr. Sharma',
      action: 'Created',
      fieldChanged: 'Case',
      oldValue: 'N/A',
      newValue: 'ARG-001',
      description: 'Initial case entry created',
    },
    {
      revisionNumber: 2,
      timestamp: '15-JAN-24 10:30:00',
      userId: 'USER001',
      userName: 'Dr. Sharma',
      action: 'Updated',
      fieldChanged: 'Patient.Age',
      oldValue: '',
      newValue: '45',
      description: 'Patient demographics entered',
    },
    {
      revisionNumber: 3,
      timestamp: '15-JAN-24 11:45:00',
      userId: 'USER001',
      userName: 'Dr. Sharma',
      action: 'Updated',
      fieldChanged: 'Product.TradeName',
      oldValue: '',
      newValue: 'Metformin 500mg',
      description: 'Product information added',
    },
    {
      revisionNumber: 4,
      timestamp: '15-JAN-24 13:20:00',
      userId: 'USER001',
      userName: 'Dr. Sharma',
      action: 'Updated',
      fieldChanged: 'Event.VerbatimTerm',
      oldValue: '',
      newValue: 'Severe gastric upset and nausea',
      description: 'Adverse event reported',
    },
    {
      revisionNumber: 5,
      timestamp: '15-JAN-24 14:15:00',
      userId: 'USER001',
      userName: 'Dr. Sharma',
      action: 'Updated',
      fieldChanged: 'Event.MedDRA.PT',
      oldValue: '',
      newValue: 'Nausea (10031001)',
      description: 'MedDRA coding completed',
    },
    {
      revisionNumber: 6,
      timestamp: '16-JAN-24 08:00:00',
      userId: 'USER002',
      userName: 'Dr. Patel',
      action: 'Reviewed',
      fieldChanged: 'Case.WorkflowStatus',
      oldValue: 'Data Entry',
      newValue: 'Medical Review',
      description: 'Case moved to medical review',
    },
    {
      revisionNumber: 7,
      timestamp: '16-JAN-24 09:30:00',
      userId: 'USER002',
      userName: 'Dr. Patel',
      action: 'Updated',
      fieldChanged: 'Analysis.Causality',
      oldValue: '',
      newValue: 'PROBABLE',
      description: 'WHO-UMC causality assessment completed',
    },
    {
      revisionNumber: 8,
      timestamp: '16-JAN-24 10:15:00',
      userId: 'USER002',
      userName: 'Dr. Patel',
      action: 'Updated',
      fieldChanged: 'Case.AssessmentNotes',
      oldValue: '',
      newValue: 'Consistent with known safety profile. Monitor for recurrence.',
      description: 'Medical review notes added',
    },
    {
      revisionNumber: 9,
      timestamp: '17-JAN-24 07:45:00',
      userId: 'USER003',
      userName: 'Regulatory Officer',
      action: 'Reviewed',
      fieldChanged: 'Case.WorkflowStatus',
      oldValue: 'Medical Review',
      newValue: 'QC Review',
      description: 'Case moved to Quality Control',
    },
    {
      revisionNumber: 10,
      timestamp: '17-JAN-24 11:20:00',
      userId: 'USER003',
      userName: 'Regulatory Officer',
      action: 'Locked',
      fieldChanged: 'Case.Locked',
      oldValue: 'false',
      newValue: 'true',
      description: 'Case locked for submission preparation',
    },
  ]);

  const [filterAction, setFilterAction] = useState<string>('all');
  const [filterUser, setFilterUser] = useState<string>('all');

  const uniqueActions = Array.from(new Set(auditEntries.map((a) => a.action)));
  const uniqueUsers = Array.from(new Set(auditEntries.map((a) => a.userName)));

  const filteredEntries = auditEntries.filter((entry) => {
    const actionMatch = filterAction === 'all' || entry.action === filterAction;
    const userMatch = filterUser === 'all' || entry.userName === filterUser;
    return actionMatch && userMatch;
  });

  const actionColor = (action: string) => {
    switch (action) {
      case 'Created':
        return 'bg-blue-100 text-blue-800';
      case 'Updated':
        return 'bg-yellow-100 text-yellow-800';
      case 'Reviewed':
        return 'bg-purple-100 text-purple-800';
      case 'Locked':
        return 'bg-red-100 text-red-800';
      case 'Submitted':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <ArgusLayout>
      <div className="bg-argus-bg p-3 space-y-3 text-11 font-sans">
        {/* Page Title */}
        <div className="text-13 font-bold text-argus-navy uppercase mb-4">
          Case Audit Trail / Revision History
        </div>

        {/* Case Reference */}
        <div className="bg-white border-2 border-argus-border p-2">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-10 text-argus-text-label font-bold">CASE ID:</span>
              <span className="ml-2 text-11 font-bold text-argus-blue">{caseId}</span>
            </div>
            <div>
              <span className="text-10 text-argus-text-label font-bold">TOTAL REVISIONS:</span>
              <span className="ml-2 text-11 font-bold">{auditEntries.length}</span>
            </div>
            <div>
              <span className="text-10 text-argus-text-label font-bold">LAST MODIFIED:</span>
              <span className="ml-2 text-11 font-bold">{auditEntries[auditEntries.length - 1]?.timestamp}</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 bg-white border-2 border-argus-border p-2">
          <div className="flex items-center gap-1">
            <label className="text-10 font-bold text-argus-text-label">ACTION:</label>
            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="border border-argus-border px-2 py-1 text-10 bg-white"
            >
              <option value="all">All Actions</option>
              {uniqueActions.map((action) => (
                <option key={action} value={action}>
                  {action}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-1">
            <label className="text-10 font-bold text-argus-text-label">USER:</label>
            <select
              value={filterUser}
              onChange={(e) => setFilterUser(e.target.value)}
              className="border border-argus-border px-2 py-1 text-10 bg-white"
            >
              <option value="all">All Users</option>
              {uniqueUsers.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Audit Trail Table */}
        <div className="border-2 border-argus-border bg-white overflow-auto">
          <SectionHeader title={`REVISION HISTORY (${filteredEntries.length} entries)`} />
          <div className="overflow-x-auto">
            <table className="w-full text-10 border-collapse">
              <thead>
                <tr className="bg-argus-blue text-white">
                  <th className="border border-argus-border px-2 py-1 text-center font-bold w-16">Rev #</th>
                  <th className="border border-argus-border px-2 py-1 text-left font-bold">Timestamp</th>
                  <th className="border border-argus-border px-2 py-1 text-left font-bold">User</th>
                  <th className="border border-argus-border px-2 py-1 text-center font-bold">Action</th>
                  <th className="border border-argus-border px-2 py-1 text-left font-bold">Field Changed</th>
                  <th className="border border-argus-border px-2 py-1 text-left font-bold">Old Value</th>
                  <th className="border border-argus-border px-2 py-1 text-left font-bold">New Value</th>
                  <th className="border border-argus-border px-2 py-1 text-left font-bold">Description</th>
                </tr>
              </thead>
              <tbody>
                {filteredEntries.map((entry, idx) => (
                  <tr
                    key={entry.revisionNumber}
                    className={`${idx % 2 === 1 ? 'bg-argus-bg-row-alt' : 'bg-white'} border-b border-argus-border`}
                  >
                    <td className="border border-argus-border px-2 py-1 text-center font-bold text-argus-blue">
                      {entry.revisionNumber}
                    </td>
                    <td className="border border-argus-border px-2 py-1 text-9">{entry.timestamp}</td>
                    <td className="border border-argus-border px-2 py-1 font-bold">{entry.userName}</td>
                    <td className={`border border-argus-border px-2 py-1 text-center font-bold text-9 ${actionColor(entry.action)}`}>
                      {entry.action}
                    </td>
                    <td className="border border-argus-border px-2 py-1 font-bold text-argus-text-label">{entry.fieldChanged}</td>
                    <td className="border border-argus-border px-2 py-1 text-9">
                      {entry.oldValue ? (
                        <span className="line-through text-gray-500">{entry.oldValue}</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="border border-argus-border px-2 py-1 text-9 font-bold text-green-700">{entry.newValue}</td>
                    <td className="border border-argus-border px-2 py-1 text-9">{entry.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Audit Rules Panel */}
        <div className="bg-white border-2 border-argus-border p-2">
          <SectionHeader title="Audit Trail Rules" />
          <div className="text-10 text-argus-text-label space-y-1 p-2">
            <div>
              <span className="font-bold">• All changes are recorded:</span> Every modification to case data is logged with timestamp, user, and change details
            </div>
            <div>
              <span className="font-bold">• Immutable history:</span> Audit entries cannot be deleted or modified (regulatory compliance requirement)
            </div>
            <div>
              <span className="font-bold">• Traceability:</span> User identity and access role recorded for each action
            </div>
            <div>
              <span className="font-bold">• ICH E2A compliant:</span> Audit trail supports regulatory inspections and data integrity audits
            </div>
            <div>
              <span className="font-bold">• Workflow tracking:</span> Case state transitions (New → Open → Data Entry → etc.) are recorded
            </div>
          </div>
        </div>

        {/* Export Button */}
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 bg-argus-light text-white text-10 border border-argus-border-dark hover:bg-argus-blue">
            📄 Export to PDF
          </button>
          <button className="px-4 py-2 bg-argus-blue text-white text-10 border border-argus-border-dark hover:bg-argus-navy">
            📋 Export to Excel
          </button>
        </div>
      </div>
    </ArgusLayout>
  );
}
