'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api-client';
import ArgusLayout from '@/components/ArgusLayout';

export default function ExpeditedReportsPage() {
  const [reports, setReports] = useState([
    { id: 1, caseId: 'ARG-001', reportType: '7-day', dueDate: '2024-02-15', status: 'OVERDUE', priority: 'HIGH' },
    { id: 2, caseId: 'ARG-003', reportType: '7-day', dueDate: '2024-02-05', status: 'SUBMITTED', priority: 'NORMAL' },
    { id: 3, caseId: 'ARG-007', reportType: '15-day', dueDate: '2024-02-20', status: 'PENDING', priority: 'HIGH' },
  ]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      setLoading(true);
      // For demo, use hardcoded data above
    } catch (error) {
      console.error('Failed to load reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBgColor = (status: string) => {
    const colors: Record<string, string> = {
      'OVERDUE': 'bg-status-locked text-red-600',
      'PENDING': 'bg-status-open',
      'SUBMITTED': 'bg-status-closed',
    };
    return colors[status] || 'bg-gray-100';
  };

  const getDaysRemaining = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const days = Math.floor((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };

  const filteredReports = filter === 'all' ? reports : reports.filter((r) => r.status === filter);

  if (loading) {
    return (
      <ArgusLayout>
        <div className="text-center py-8">Loading expedited reports...</div>
      </ArgusLayout>
    );
  }

  return (
    <ArgusLayout>
      <div className="bg-argus-bg p-3 space-y-3 text-11 font-sans">
        {/* Title */}
        <div className="text-13 font-bold text-argus-navy mb-4">
          EXPEDITED REPORTING
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-3">
          {['all', 'OVERDUE', 'PENDING', 'SUBMITTED'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 text-10 font-bold border transition-colors ${
                filter === status
                  ? 'bg-argus-blue text-white border-argus-border-dark'
                  : 'bg-argus-bg-tab-inactive text-argus-text-primary border-argus-border hover:bg-white'
              }`}
            >
              {status === 'all' ? 'All Reports' : status}
            </button>
          ))}
        </div>

        {/* Reports Table */}
        <div className="border-2 border-argus-border bg-white">
          <div className="bg-argus-blue text-white px-2 py-1 text-11 font-bold uppercase">
            EXPEDITED REPORTS ({filteredReports.length})
          </div>

          {filteredReports.length === 0 ? (
            <div className="p-4 text-center text-argus-text-muted text-10">
              No reports found for the selected status.
            </div>
          ) : (
            <div className="p-0 text-10 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-argus-bg-tab-inactive border-b border-argus-border">
                    <th className="border-r border-argus-border px-2 py-1 text-left font-bold">Case #</th>
                    <th className="border-r border-argus-border px-2 py-1 text-left font-bold">Report Type</th>
                    <th className="border-r border-argus-border px-2 py-1 text-left font-bold">Due Date</th>
                    <th className="border-r border-argus-border px-2 py-1 text-center font-bold">Days Left</th>
                    <th className="border-r border-argus-border px-2 py-1 text-left font-bold">Status</th>
                    <th className="px-2 py-1 text-left font-bold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.map((report, idx) => (
                    <tr key={report.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-argus-bg-row-alt'}>
                      <td className="border-r border-argus-border px-2 py-1 font-bold text-argus-link">
                        {report.caseId}
                      </td>
                      <td className="border-r border-argus-border px-2 py-1">
                        <span className="px-1 py-0 bg-argus-bg-tab-inactive text-9">{report.reportType}</span>
                      </td>
                      <td className="border-r border-argus-border px-2 py-1">
                        {new Date(report.dueDate).toLocaleDateString()}
                      </td>
                      <td className={`border-r border-argus-border px-2 py-1 text-center font-bold ${
                        getDaysRemaining(report.dueDate) < 0 ? 'text-red-600' : getDaysRemaining(report.dueDate) < 3 ? 'text-orange-600' : ''
                      }`}>
                        {getDaysRemaining(report.dueDate) < 0 ? (
                          <span className="text-red-600">✘ {Math.abs(getDaysRemaining(report.dueDate))}d</span>
                        ) : (
                          getDaysRemaining(report.dueDate) + 'd'
                        )}
                      </td>
                      <td className={`border-r border-argus-border px-2 py-1 text-center font-bold ${getStatusBgColor(report.status)}`}>
                        {report.status}
                      </td>
                      <td className="px-2 py-1">
                        {report.status === 'PENDING' ? (
                          <button className="text-argus-link hover:underline font-bold text-9 cursor-pointer">
                            Submit Report →
                          </button>
                        ) : report.status === 'SUBMITTED' ? (
                          <button className="text-argus-text-muted text-9">
                            View Submission
                          </button>
                        ) : (
                          <button className="text-red-600 hover:underline font-bold text-9 cursor-pointer">
                            ⚠️ View / Resubmit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Expedited Reporting Requirements */}
        <div className="border-2 border-argus-border bg-white mt-4">
          <div className="bg-argus-blue text-white px-2 py-1 text-11 font-bold uppercase">
            REPORTING REQUIREMENTS
          </div>
          <div className="p-3 text-10 space-y-1">
            <div className="flex justify-between border-b border-argus-border pb-1">
              <span className="font-bold">7-Day Report (Serious):</span>
              <span>Submit within 7 calendar days of receipt for all countries</span>
            </div>
            <div className="flex justify-between border-b border-argus-border pb-1">
              <span className="font-bold">15-Day Report:</span>
              <span>Submit within 15 calendar days for certain serious outcomes</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Alert Report:</span>
              <span>Immediate notification to safety team (urgent cases)</span>
            </div>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="border-2 border-argus-border bg-white p-2">
            <div className="text-12 font-bold text-red-600 text-center">
              {reports.filter((r) => r.status === 'OVERDUE').length}
            </div>
            <div className="text-9 text-center text-argus-text-muted">Overdue Reports</div>
          </div>
          <div className="border-2 border-argus-border bg-white p-2">
            <div className="text-12 font-bold text-orange-600 text-center">
              {reports.filter((r) => r.status === 'PENDING').length}
            </div>
            <div className="text-9 text-center text-argus-text-muted">Pending Submission</div>
          </div>
          <div className="border-2 border-argus-border bg-white p-2">
            <div className="text-12 font-bold text-green-600 text-center">
              {reports.filter((r) => r.status === 'SUBMITTED').length}
            </div>
            <div className="text-9 text-center text-argus-text-muted">Submitted</div>
          </div>
        </div>
      </div>
    </ArgusLayout>
  );
}
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Expedited Reports</h1>
          <p className="text-gray-600 mt-2">7-day and 15-day regulatory reports</p>
        </div>
      </div>

      {/* Overdue Alert */}
      {reports.some((r) => r.status === 'Overdue') && (
        <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded">
          <p className="text-red-800 font-medium">
            ⚠️ {reports.filter((r) => r.status === 'Overdue').length} report(s) overdue - Immediate action required
          </p>
        </div>
      )}

      {/* Reports Table */}
      <Card>
        {reports.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No expedited reports</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-3 px-4 font-bold">Case ID</th>
                  <th className="text-left py-3 px-4 font-bold">Report Type</th>
                  <th className="text-left py-3 px-4 font-bold">Authority</th>
                  <th className="text-left py-3 px-4 font-bold">Due Date</th>
                  <th className="text-left py-3 px-4 font-bold">Days Left</th>
                  <th className="text-left py-3 px-4 font-bold">Status</th>
                  <th className="text-left py-3 px-4 font-bold">Action</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => {
                  const daysLeft = getDaysRemaining(report.dueDate);
                  const urgency =
                    daysLeft < 0 ? 'Overdue' : daysLeft <= 3 ? 'Urgent' : 'Normal';

                  return (
                    <tr key={report._id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{report.reportId}</td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={
                            report.reportType === '7-day' ? 'danger' : 'warning'
                          }
                        >
                          {report.reportType}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">{report.product}</td>
                      <td className="py-3 px-4">
                        {new Date(report.dueDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`font-bold ${
                            daysLeft < 0
                              ? 'text-red-600'
                              : daysLeft <= 3
                              ? 'text-orange-600'
                              : 'text-green-600'
                          }`}
                        >
                          {daysLeft < 0 ? `${Math.abs(daysLeft)} days overdue` : `${daysLeft} days`}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={getStatusColor(report.status) as any}>
                          {report.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        {report.status === 'Pending' && (
                          <Button variant="primary" onClick={() => alert('Submit functionality')}>
                            Submit
                          </Button>
                        )}
                        <Button variant="secondary" className="ml-2">
                          View
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Regulatory Clock Reference */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-3">Regulatory Clock Rules (ICH E2A)</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• <strong>7-day Report:</strong> Fatal or life-threatening reactions with unexpected outcomes</li>
          <li>• <strong>15-day Report:</strong> All other serious unexpected adverse reactions</li>
          <li>• Clock starts from receipt date of case at company</li>
          <li>• Weekends and holidays do NOT extend the clock</li>
        </ul>
      </Card>
    </div>
  );
}
