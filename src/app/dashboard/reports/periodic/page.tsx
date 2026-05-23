'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api-client';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';

export default function PeriodicReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      setLoading(true);
      const data = await api.reports.list({
        reportType: 'PSUR,DSUR,PBRER,PADER',
      });
      setReports(data.reports || []);
    } catch (error) {
      console.error('Failed to load reports:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading reports...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Periodic Reports</h1>
          <p className="text-gray-600 mt-2">PSUR, DSUR, PBRER, and PADER reports</p>
        </div>
        <Button variant="primary">+ Create Report</Button>
      </div>

      {/* Reports by Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {['PSUR', 'DSUR', 'PBRER', 'PADER'].map((type) => {
          const typeReports = reports.filter((r) => r.reportType === type);
          return (
            <Card key={type}>
              <h3 className="font-bold text-gray-900 mb-2">{type}</h3>
              <p className="text-sm text-gray-600 mb-3">
                {type === 'PSUR' && 'Periodic Safety Update Report'}
                {type === 'DSUR' && 'Development Safety Update Report'}
                {type === 'PBRER' && 'Periodic Benefit-Risk Evaluation Report'}
                {type === 'PADER' && 'Periodic Adverse Drug Experience Report'}
              </p>
              <p className="text-2xl font-bold text-blue-600">{typeReports.length}</p>
            </Card>
          );
        })}
      </div>

      {/* Reports Table */}
      <Card>
        {reports.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No periodic reports created yet</p>
            <Button variant="primary" className="mt-4">
              Create First Report
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-3 px-4 font-bold">Product</th>
                  <th className="text-left py-3 px-4 font-bold">Type</th>
                  <th className="text-left py-3 px-4 font-bold">Period Covered</th>
                  <th className="text-left py-3 px-4 font-bold">Total Cases</th>
                  <th className="text-left py-3 px-4 font-bold">Serious Cases</th>
                  <th className="text-left py-3 px-4 font-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{report.product}</td>
                    <td className="py-3 px-4">
                      <Badge variant="info">{report.reportType}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {report.periodStart ? new Date(report.periodStart).toLocaleDateString() : '-'} to{' '}
                      {report.periodEnd ? new Date(report.periodEnd).toLocaleDateString() : '-'}
                    </td>
                    <td className="py-3 px-4">{report.totalCases}</td>
                    <td className="py-3 px-4">{report.seriousCases}</td>
                    <td className="py-3 px-4">
                      <Badge variant={report.status === 'Submitted' ? 'success' : 'warning'}>
                        {report.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
