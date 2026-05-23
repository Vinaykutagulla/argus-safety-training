'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api-client';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

export default function CasesPage() {
  const router = useRouter();
  const [cases, setCases] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    status: '',
    product: '',
    search: '',
    page: 1,
  });
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCases();
  }, [filters]);

  const loadCases = async () => {
    try {
      setLoading(true);
      const data = await api.cases.list(filters);
      setCases(data.cases || []);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Failed to load cases:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
      page: 1,
    });
  };

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

  if (loading && cases.length === 0) {
    return <div className="text-center py-8">Loading cases...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cases</h1>
          <p className="text-gray-600 mt-2">Manage adverse event cases</p>
        </div>
        <Link href="/dashboard/cases/new">
          <Button variant="primary">+ New Case</Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            label="Search"
            type="text"
            name="search"
            placeholder="Case ID or Product"
            value={filters.search}
            onChange={handleFilterChange}
          />
          <Input
            label="Status"
            type="select"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            options={[
              { value: '', label: 'All Statuses' },
              { value: 'New', label: 'New' },
              { value: 'Open', label: 'Open' },
              { value: 'Under Review', label: 'Under Review' },
              { value: 'Closed', label: 'Closed' },
              { value: 'Locked', label: 'Locked' },
            ]}
          />
          <Input
            label="Product"
            type="text"
            name="product"
            placeholder="Filter by product"
            value={filters.product}
            onChange={handleFilterChange}
          />
        </div>
      </Card>

      {/* Cases Table */}
      <Card>
        {cases.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No cases found</p>
            <Link href="/dashboard/cases/new">
              <Button variant="primary" className="mt-4">
                Create First Case
              </Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-3 px-4 font-bold">Case ID</th>
                  <th className="text-left py-3 px-4 font-bold">Receipt Date</th>
                  <th className="text-left py-3 px-4 font-bold">Product</th>
                  <th className="text-left py-3 px-4 font-bold">Event</th>
                  <th className="text-left py-3 px-4 font-bold">Serious</th>
                  <th className="text-left py-3 px-4 font-bold">Status</th>
                  <th className="text-left py-3 px-4 font-bold">Action</th>
                </tr>
              </thead>
              <tbody>
                {cases.map((caseItem) => (
                  <tr key={caseItem._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{caseItem.caseId}</td>
                    <td className="py-3 px-4">
                      {new Date(caseItem.administration?.receiptDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">{caseItem.drug?.tradeName}</td>
                    <td className="py-3 px-4">{caseItem.reaction?.meddraPreferredTerm}</td>
                    <td className="py-3 px-4">
                      {caseItem.reaction?.seriousnessCriteria?.length > 0 ? (
                        <Badge variant="danger">Yes</Badge>
                      ) : (
                        <Badge variant="success">No</Badge>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={getStatusColor(caseItem.status) as any}>
                        {caseItem.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Link href={`/dashboard/cases/${caseItem._id}`} className="text-blue-600 hover:underline font-medium">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="mt-4 flex justify-center gap-2">
            <Button
              variant="secondary"
              disabled={filters.page === 1}
              onClick={() =>
                setFilters({ ...filters, page: Math.max(1, filters.page - 1) })
              }
            >
              Previous
            </Button>
            <span className="px-4 py-2">
              Page {filters.page} of {pagination.pages}
            </span>
            <Button
              variant="secondary"
              disabled={filters.page === pagination.pages}
              onClick={() =>
                setFilters({ ...filters, page: Math.min(pagination.pages, filters.page + 1) })
              }
            >
              Next
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
