'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api-client';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';

export default function ExpeditedReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      setLoading(true);
      const data = await api.reports.list({
        reportType: '7-day,15-day',
      });
      setReports(data.reports || []);
    } catch (error) {
      console.error('Failed to load reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, any> = {
      'Pending': 'warning',
      'Submitted': 'success',
      'Overdue': 'danger',
    };
    return colors[status] || 'gray';
  };

  const getDaysRemaining = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const days = Math.floor(
      (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    return days;
  };

  if (loading) {
    return <div className="text-center py-8">Loading reports...</div>;
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
