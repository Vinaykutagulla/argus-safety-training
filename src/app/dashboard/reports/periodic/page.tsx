'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api-client';
import ArgusLayout from '@/components/ArgusLayout';

export default function PeriodicReportsPage() {
  const [reports, setReports] = useState([
    { id: 1, reportId: 'PSUR-2024-001', type: 'PSUR', product: 'Product A', dueDate: '2024-03-15', status: 'IN PROGRESS', progress: 65 },
    { id: 2, reportId: 'PBRER-2024-001', type: 'PBRER', product: 'Product B', dueDate: '2024-04-30', status: 'NOT STARTED', progress: 0 },
    { id: 3, reportId: 'DSUR-2024-001', type: 'DSUR', product: 'Product C', dueDate: '2024-02-28', status: 'COMPLETED', progress: 100 },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      setLoading(true);
      // Using hardcoded data for demo
    } catch (error) {
      console.error('Failed to load reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'IN PROGRESS': 'bg-status-review text-argus-navy',
      'NOT STARTED': 'bg-status-new text-argus-navy',
      'COMPLETED': 'bg-status-closed text-green-700',
    };
    return colors[status] || 'bg-gray-100';
  };

  if (loading) {
    return (
      <ArgusLayout>
        <div className="text-center py-8">Loading periodic reports...</div>
      </ArgusLayout>
    );
  }

  return (
    <ArgusLayout>
      <div className="bg-argus-bg p-3 space-y-3 text-11 font-sans">
        {/* Title */}
        <div className="text-13 font-bold text-argus-navy mb-4">
          PERIODIC REPORTING (PSUR / PBRER / DSUR)
        </div>

        {/* Reports Table */}
        <div className="border-2 border-argus-border bg-white">
          <div className="bg-argus-blue text-white px-2 py-1 text-11 font-bold uppercase">
            PERIODIC REPORTS ({reports.length})
          </div>

          <div className="p-0 text-10 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-argus-bg-tab-inactive border-b border-argus-border">
                  <th className="border-r border-argus-border px-2 py-1 text-left font-bold">Report ID</th>
                  <th className="border-r border-argus-border px-2 py-1 text-left font-bold">Type</th>
                  <th className="border-r border-argus-border px-2 py-1 text-left font-bold">Product</th>
                  <th className="border-r border-argus-border px-2 py-1 text-left font-bold">Due Date</th>
                  <th className="border-r border-argus-border px-2 py-1 text-left font-bold">Progress</th>
                  <th className="border-r border-argus-border px-2 py-1 text-left font-bold">Status</th>
                  <th className="px-2 py-1 text-left font-bold">Action</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report, idx) => (
                  <tr key={report.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-argus-bg-row-alt'}>
                    <td className="border-r border-argus-border px-2 py-1 font-bold text-argus-link">
                      {report.reportId}
                    </td>
                    <td className="border-r border-argus-border px-2 py-1">
                      <span className="px-1 py-0 bg-argus-bg-tab-inactive text-9 font-bold">{report.type}</span>
                    </td>
                    <td className="border-r border-argus-border px-2 py-1">{report.product}</td>
                    <td className="border-r border-argus-border px-2 py-1">
                      {new Date(report.dueDate).toLocaleDateString()}
                    </td>
                    <td className="border-r border-argus-border px-2 py-1">
                      <div className="w-24 bg-argus-bg-row-alt border border-argus-border">
                        <div
                          className="bg-argus-light h-4 flex items-center justify-center text-9 font-bold text-white"
                          style={{ width: `${report.progress}%` }}
                        >
                          {report.progress > 10 && `${report.progress}%`}
                        </div>
                      </div>
                    </td>
                    <td className={`border-r border-argus-border px-2 py-1 text-center font-bold text-9 ${getStatusColor(report.status)}`}>
                      {report.status}
                    </td>
                    <td className="px-2 py-1">
                      <button className="text-argus-link hover:underline font-bold text-9 cursor-pointer">
                        {report.progress === 100 ? 'View' : 'Edit'} →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Report Types Reference */}
        <div className="border-2 border-argus-border bg-white mt-4">
          <div className="bg-argus-blue text-white px-2 py-1 text-11 font-bold uppercase">
            PERIODIC REPORT TYPES
          </div>
          <div className="p-3 text-10 space-y-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-argus-border p-2">
                <div className="font-bold text-argus-navy">PSUR</div>
                <div className="text-argus-text-muted">Periodic Safety Update Report</div>
                <div className="text-9 mt-1">Annual or periodic summary of safety data</div>
              </div>
              <div className="border border-argus-border p-2">
                <div className="font-bold text-argus-navy">PBRER</div>
                <div className="text-argus-text-muted">Periodic Benefit-Risk Evaluation Report</div>
                <div className="text-9 mt-1">Evaluation of benefits vs. risks over time</div>
              </div>
              <div className="border border-argus-border p-2">
                <div className="font-bold text-argus-navy">DSUR</div>
                <div className="text-argus-text-muted">Development Safety Update Report</div>
                <div className="text-9 mt-1">Safety data during clinical development</div>
              </div>
              <div className="border border-argus-border p-2">
                <div className="font-bold text-argus-navy">PADER</div>
                <div className="text-argus-text-muted">Pharmacovigilance Audit Report</div>
                <div className="text-9 mt-1">Results of audit activities and inspections</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ArgusLayout>
  );
}
