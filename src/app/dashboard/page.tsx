'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api-client';
import { MetricCard, Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import Link from 'next/link';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalCases: 0,
    seriousCases: 0,
    dueReports: 0,
    closedCases: 0,
  });
  const [recentCases, setRecentCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const casesData = await api.cases.list({ limit: 10 });
        const cases = casesData.cases || [];

        setStats({
          totalCases: casesData.pagination?.total || 0,
          seriousCases: cases.filter((c: any) => c.reaction?.seriousnessCriteria?.length > 0).length,
          dueReports: casesData.pagination?.total || 0,
          closedCases: cases.filter((c: any) => c.status === 'Closed').length,
        });

        setRecentCases(cases.slice(0, 5));
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getStatusColor = (status: string) => {
    const colors: Record<string, any> = {
      'New': 'info',
      'Open': 'warning',
      'Under Review': 'warning',
      'Closed': 'success',
      'Locked': 'danger',
    };
    return colors[status] || 'gray';
  };

  if (loading) {
    return <div className="text-center py-8">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to Argus Safety Training Platform</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard label="Total Cases (MTD)" value={stats.totalCases} icon="📋" color="blue" />
        <MetricCard label="Serious Cases" value={stats.seriousCases} icon="🚨" color="red" />
        <MetricCard label="Reports Due" value={stats.dueReports} icon="📅" color="orange" />
        <MetricCard label="Cases Closed" value={stats.closedCases} icon="✓" color="green" />
      </div>

      {/* Overdue Alert */}
      {stats.dueReports > 0 && (
        <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded">
          <p className="text-red-800 font-medium">
            ⚠️ {stats.dueReports} expedited reports due - Action required
          </p>
        </div>
      )}

      {/* Recent Cases */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Recent Cases</h2>
          <Link href="/dashboard/cases/new" className="text-blue-600 hover:text-blue-800 font-medium">
            + New Case
          </Link>
        </div>

        {recentCases.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No cases yet. Create your first case.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-2 font-medium">Case ID</th>
                  <th className="text-left py-2 px-2 font-medium">Product</th>
                  <th className="text-left py-2 px-2 font-medium">Event</th>
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
