'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ArgusLayout from '@/components/ArgusLayout';
import SectionHeader from '@/components/SectionHeader';
import ArgusInput from '@/components/ArgusInput';
import ArgusSelect from '@/components/ArgusSelect';
import ArgusDateField from '@/components/ArgusDateField';
import { api } from '@/lib/api-client';

interface Case {
  _id?: string;
  caseId: string;
  receiptDate: string;
  product: string;
  country: string;
  reporter: string;
  seriousness: string;
  workflowState: string;
}

export default function CaseSearchPage() {
  const router = useRouter();
  const [searchFilters, setSearchFilters] = useState({
    caseId: '',
    product: '',
    reporter: '',
    fromDate: '',
    toDate: '',
    country: 'All',
    workflowState: 'All',
    seriousness: 'All',
    reportType: 'All',
  });

  const [cases, setCases] = useState<Case[]>([]);
  const [loadingCases, setLoadingCases] = useState(false);

  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchCases = async (filters?: typeof searchFilters) => {
    setLoadingCases(true);
    try {
      const filtersToUse = filters || searchFilters;
      const query: Record<string, string> = { page: '1', limit: '50' };

      // Add search filters
      if (filtersToUse.caseId) query.caseId = filtersToUse.caseId;
      if (filtersToUse.product) query.product = filtersToUse.product;
      if (filtersToUse.country && filtersToUse.country !== 'All') query.country = filtersToUse.country;
      if (filtersToUse.workflowState && filtersToUse.workflowState !== 'All') query.status = filtersToUse.workflowState;
      if (filtersToUse.seriousness && filtersToUse.seriousness !== 'All') query.seriousness = filtersToUse.seriousness;
      if (filtersToUse.reportType && filtersToUse.reportType !== 'All') query.reportType = filtersToUse.reportType;
      if (filtersToUse.fromDate) query.fromDate = filtersToUse.fromDate;
      if (filtersToUse.toDate) query.toDate = filtersToUse.toDate;

      const data = await api.cases.list(query);
      const mappedCases = (data.cases || []).map((c: any) => ({
        _id: c._id || c.caseId,
        caseId: c.caseId || c.caseNumber || 'UNKNOWN',
        receiptDate: c.administration?.receiptDate
          ? new Date(c.administration.receiptDate).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })
          : c.receiptDate || '',
        product: c.drug?.tradeName || c.products?.[0]?.productName || 'Unknown',
        country: c.administration?.countryOfOccurrence || c.reporter?.country || 'Unknown',
        reporter: c.reporter?.name || c.reporter?.qualification || 'Unknown',
        seriousness: c.reaction?.seriousness || c.reaction?.outcome || 'Unknown',
        workflowState: c.status || c.workflow?.currentStep || 'New',
      }));
      setCases(mappedCases);
    } catch (error) {
      console.error('Failed to load cases:', error);
    } finally {
      setLoadingCases(false);
    }
  };

  const handleSearch = async () => {
    await fetchCases();
  };

  const handleClear = () => {
    setSearchFilters({
      caseId: '',
      product: '',
      reporter: '',
      fromDate: '',
      toDate: '',
      country: 'All',
      workflowState: 'All',
      seriousness: 'All',
      reportType: 'All',
    });
    setCurrentPage(1);
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const handleOpenCase = (caseId: string) => {
    router.push(`/dashboard/cases/${caseId}`);
  };

  useEffect(() => {
    fetchCases();
  }, []);

  // Pagination
  const totalPages = Math.ceil(cases.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const paginatedCases = cases.slice(startIdx, endIdx);

  return (
    <ArgusLayout>
      <div className="bg-argus-bg p-3 space-y-3 text-11 font-sans">
        {/* Page Title */}
        <div className="text-13 font-bold text-argus-navy uppercase mb-4">
          CASE SEARCH &amp; WORKLIST
        </div>

        {/* Search Panel */}
        <div className="border-2 border-argus-border bg-white p-2">
          <SectionHeader title="CASE SEARCH" />

          <div className="space-y-2 p-2">
            {/* Row 1 */}
            <div className="flex gap-4">
              <div className="flex-1 flex gap-2 items-center">
                <label className="text-11 font-bold text-argus-text-label w-20">Case ID:</label>
                <ArgusInput
                  value={searchFilters.caseId}
                  onChange={(e) => setSearchFilters({ ...searchFilters, caseId: e.target.value })}
                  placeholder="ARG-XXXX"
                  className="w-32"
                />
              </div>
              <div className="flex-1 flex gap-2 items-center">
                <label className="text-11 font-bold text-argus-text-label w-20">Product:</label>
                <ArgusInput
                  value={searchFilters.product}
                  onChange={(e) => setSearchFilters({ ...searchFilters, product: e.target.value })}
                  placeholder="Product name"
                  className="w-40"
                />
              </div>
              <div className="flex-1 flex gap-2 items-center">
                <label className="text-11 font-bold text-argus-text-label w-20">Reporter:</label>
                <ArgusInput
                  value={searchFilters.reporter}
                  onChange={(e) => setSearchFilters({ ...searchFilters, reporter: e.target.value })}
                  placeholder="Reporter"
                  className="w-40"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex gap-4">
              <div className="flex-1 flex gap-2 items-center">
                <label className="text-11 font-bold text-argus-text-label">Receipt Date From:</label>
                <ArgusDateField
                  value={searchFilters.fromDate}
                  onChange={(e) => setSearchFilters({ ...searchFilters, fromDate: e })}
                />
              </div>
              <div className="flex-1 flex gap-2 items-center">
                <label className="text-11 font-bold text-argus-text-label">To:</label>
                <ArgusDateField
                  value={searchFilters.toDate}
                  onChange={(e) => setSearchFilters({ ...searchFilters, toDate: e })}
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex gap-4">
              <div className="flex-1 flex gap-2 items-center">
                <label className="text-11 font-bold text-argus-text-label w-20">Country:</label>
                <ArgusSelect
                  options={[
                    { value: 'All', label: 'All' },
                    { value: 'USA', label: 'United States' },
                    { value: 'India', label: 'India' },
                    { value: 'UK', label: 'United Kingdom' },
                    { value: 'Canada', label: 'Canada' },
                  ]}
                  value={searchFilters.country}
                  onChange={(e) => setSearchFilters({ ...searchFilters, country: e.target.value })}
                  className="w-32"
                />
              </div>
              <div className="flex-1 flex gap-2 items-center">
                <label className="text-11 font-bold text-argus-text-label w-32">Workflow State:</label>
                <ArgusSelect
                  options={[
                    { value: 'All', label: 'All' },
                    { value: 'New', label: 'New' },
                    { value: 'Open', label: 'Open' },
                    { value: 'Data Entry', label: 'Data Entry' },
                    { value: 'Med Review', label: 'Medical Review' },
                    { value: 'QC', label: 'QC Review' },
                    { value: 'Locked', label: 'Locked' },
                  ]}
                  value={searchFilters.workflowState}
                  onChange={(e) => setSearchFilters({ ...searchFilters, workflowState: e.target.value })}
                  className="w-40"
                />
              </div>
              <div className="flex-1 flex gap-2 items-center">
                <label className="text-11 font-bold text-argus-text-label w-20">Seriousness:</label>
                <ArgusSelect
                  options={[
                    { value: 'All', label: 'All' },
                    { value: 'SERIOUS', label: 'Serious' },
                    { value: 'Non-Serious', label: 'Non-Serious' },
                  ]}
                  value={searchFilters.seriousness}
                  onChange={(e) => setSearchFilters({ ...searchFilters, seriousness: e.target.value })}
                  className="w-32"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-3">
              <button
                onClick={handleSearch}
                className="px-4 py-1 bg-argus-blue text-white text-10 border border-argus-border-dark hover:bg-argus-light"
              >
                Search
              </button>
              <button
                onClick={handleClear}
                className="px-4 py-1 bg-gray-400 text-white text-10 border border-gray-600 hover:bg-gray-500"
              >
                Clear
              </button>
              <button className="px-4 py-1 bg-argus-orange text-white text-10 border border-yellow-600 hover:bg-yellow-500">
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Results Table */}
          {loadingCases && (
            <div className="text-11 font-bold text-argus-text-muted p-2">Loading cases...</div>
          )}
          {!loadingCases && cases.length === 0 && (
            <div className="text-11 font-bold text-argus-text-muted p-2">No cases found. Create a new case to see it here.</div>
          )}
        <div className="border-2 border-argus-border bg-white overflow-auto">
          <SectionHeader title={`SEARCH RESULTS (Showing ${startIdx + 1}-${Math.min(endIdx, cases.length)} of ${cases.length})`} />
          <div className="overflow-x-auto">
            <table className="w-full text-10 border-collapse">
              <thead>
                <tr className="bg-argus-blue text-white">
                  <th className="border border-argus-border px-2 py-1 text-left font-bold">Case ID</th>
                  <th className="border border-argus-border px-2 py-1 text-left font-bold">Receipt Date</th>
                  <th className="border border-argus-border px-2 py-1 text-left font-bold">Product</th>
                  <th className="border border-argus-border px-2 py-1 text-left font-bold">Country</th>
                  <th className="border border-argus-border px-2 py-1 text-left font-bold">Reporter</th>
                  <th className="border border-argus-border px-2 py-1 text-left font-bold">Seriousness</th>
                  <th className="border border-argus-border px-2 py-1 text-left font-bold">Workflow</th>
                  <th className="border border-argus-border px-2 py-1 text-center font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCases.map((caseItem, idx) => (
                  <tr
                    key={caseItem._id || caseItem.caseId}
                    className={`${idx % 2 === 1 ? 'bg-argus-bg-row-alt' : 'bg-white'} border-b border-argus-border`}
                  >
                    <td className="border border-argus-border px-2 py-1">
                      <a
                        href={`/dashboard/cases/${caseItem._id || caseItem.caseId}`}
                        className="text-argus-blue hover:underline font-bold"
                      >
                        {caseItem.caseId}
                      </a>
                    </td>
                    <td className="border border-argus-border px-2 py-1">{caseItem.receiptDate}</td>
                    <td className="border border-argus-border px-2 py-1">{caseItem.product}</td>
                    <td className="border border-argus-border px-2 py-1">{caseItem.country}</td>
                    <td className="border border-argus-border px-2 py-1">{caseItem.reporter}</td>
                    <td className="border border-argus-border px-2 py-1">
                      <span className={caseItem.seriousness === 'SERIOUS' ? 'text-red-600 font-bold' : ''}>
                        ● {caseItem.seriousness}
                      </span>
                    </td>
                    <td className="border border-argus-border px-2 py-1">
                      <span className="bg-argus-bg px-1 py-0.5 text-10">[{caseItem.workflowState}]</span>
                    </td>
                    <td className="border border-argus-border px-2 py-1 text-center">
                      <button
                        onClick={() => handleOpenCase(caseItem._id || caseItem.caseId)}
                        className="px-2 py-0.5 bg-argus-light text-white text-9 hover:bg-argus-blue"
                      >
                        Open
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center p-2 bg-argus-bg border-t border-argus-border text-10">
            <div>
              Showing {startIdx + 1} to {Math.min(endIdx, cases.length)} of {cases.length} cases
            </div>
            <div className="flex gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-2 py-0.5 bg-gray-400 text-white disabled:opacity-50 hover:bg-gray-500"
              >
                ◀ Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-2 py-0.5 ${
                    currentPage === page
                      ? 'bg-argus-blue text-white'
                      : 'bg-gray-300 text-black hover:bg-gray-400'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-2 py-0.5 bg-gray-400 text-white disabled:opacity-50 hover:bg-gray-500"
              >
                Next ▶
              </button>
            </div>
          </div>
        </div>
      </div>
    </ArgusLayout>
  );
}
