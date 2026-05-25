'use client';

import { useState } from 'react';
import { MEDDRA_TERMS } from '@/lib/constants';
import ArgusLayout from '@/components/ArgusLayout';

export default function MedDRAPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchScope, setSearchScope] = useState('pt'); // pt, llt, soc
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedTerm, setSelectedTerm] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    const term = searchTerm.toLowerCase();
    const results = MEDDRA_TERMS.filter((item) => {
      if (searchScope === 'pt') {
        return item.term.toLowerCase().includes(term) || item.code.toLowerCase().includes(term);
      } else if (searchScope === 'llt') {
        return item.llt?.toLowerCase().includes(term);
      } else {
        return item.soc?.toLowerCase().includes(term);
      }
    });

    setSearchResults(results);
  };

  const handleSelectTerm = (term: any) => {
    setSelectedTerm(term);
  };

  return (
    <ArgusLayout>
      <div className="bg-argus-bg p-3 space-y-3 text-11 font-sans">
        {/* Title */}
        <div className="text-13 font-bold text-argus-navy mb-4">
          MedDRA CODING UTILITY
        </div>

        {/* Search Panel */}
        <div className="border-2 border-argus-border bg-white">
          <div className="bg-argus-blue text-white px-2 py-1 text-11 font-bold uppercase">
            SEARCH MedDRA TERMS
          </div>

          <form onSubmit={handleSearch} className="p-3 space-y-2">
            <div className="grid grid-cols-4 gap-2">
              <div className="col-span-2">
                <label className="block text-10 font-bold text-argus-text-label mb-1">Search Term:</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="e.g., nausea, headache, rash..."
                  className="w-full px-2 py-1 border border-argus-border text-10 focus:border-argus-light focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-10 font-bold text-argus-text-label mb-1">Search In:</label>
                <select
                  value={searchScope}
                  onChange={(e) => setSearchScope(e.target.value)}
                  className="w-full px-2 py-1 border border-argus-border text-10 focus:border-argus-light focus:outline-none cursor-pointer bg-white"
                >
                  <option value="pt">Preferred Terms</option>
                  <option value="llt">Low Level Terms</option>
                  <option value="soc">System/Organ Class</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full px-2 py-1 bg-argus-blue text-white hover:bg-argus-light text-10 font-bold border border-argus-border-dark"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Results and Detail Panels */}
        <div className="grid grid-cols-2 gap-3">
          {/* Search Results */}
          <div className="border-2 border-argus-border bg-white">
            <div className="bg-argus-blue text-white px-2 py-1 text-11 font-bold uppercase">
              SEARCH RESULTS ({searchResults.length})
            </div>
            <div className="p-0 text-10 max-h-96 overflow-y-auto">
              {searchResults.length === 0 ? (
                <div className="p-3 text-argus-text-muted italic">
                  No results. Try entering a search term above.
                </div>
              ) : (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-argus-bg-tab-inactive border-b border-argus-border sticky top-0">
                      <th className="border-r border-argus-border px-2 py-1 text-left font-bold">Code</th>
                      <th className="px-2 py-1 text-left font-bold">Term</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.map((item, idx) => (
                      <tr
                        key={idx}
                        onClick={() => handleSelectTerm(item)}
                        className={`border-b border-argus-border cursor-pointer hover:bg-argus-bg ${
                          selectedTerm?.code === item.code ? 'bg-status-review' : idx % 2 === 0 ? 'bg-white' : 'bg-argus-bg-row-alt'
                        }`}
                      >
                        <td className="border-r border-argus-border px-2 py-1 font-bold text-argus-link">
                          {item.code}
                        </td>
                        <td className="px-2 py-1">{item.term}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Term Details */}
          <div className="border-2 border-argus-border bg-white">
            <div className="bg-argus-blue text-white px-2 py-1 text-11 font-bold uppercase">
              TERM DETAILS
            </div>
            {!selectedTerm ? (
              <div className="p-3 text-10 text-argus-text-muted italic">
                Select a term from the results to view details.
              </div>
            ) : (
              <div className="p-3 space-y-2 text-10">
                <div className="border-b border-argus-border pb-2">
                  <div className="font-bold text-argus-navy">Preferred Term (PT):</div>
                  <div className="text-argus-text-primary mt-1">{selectedTerm.term}</div>
                </div>

                <div className="border-b border-argus-border pb-2">
                  <div className="font-bold text-argus-navy">MedDRA Code:</div>
                  <div className="font-mono font-bold text-argus-link mt-1">{selectedTerm.code}</div>
                </div>

                {selectedTerm.llt && (
                  <div className="border-b border-argus-border pb-2">
                    <div className="font-bold text-argus-navy">Low Level Term (LLT):</div>
                    <div className="text-argus-text-primary mt-1">{selectedTerm.llt}</div>
                  </div>
                )}

                {selectedTerm.soc && (
                  <div className="border-b border-argus-border pb-2">
                    <div className="font-bold text-argus-navy">System/Organ Class (SOC):</div>
                    <div className="text-argus-text-primary mt-1">{selectedTerm.soc}</div>
                  </div>
                )}

                <div className="border-t border-argus-border pt-2 mt-2">
                  <div className="text-argus-text-muted italic text-9 mb-2">
                    Click "Copy to Case" to add this term to your current case.
                  </div>
                  <button className="w-full px-2 py-1 bg-argus-orange text-white hover:opacity-90 text-10 font-bold border border-red-700">
                    📋 Copy to Case
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* MedDRA Version Info */}
        <div className="border border-argus-border bg-argus-bg-tab-inactive p-2 text-9 text-argus-text-muted">
          <strong>MedDRA Version:</strong> 28.0 | <strong>Last Updated:</strong> January 2024
        </div>
      </div>
    </ArgusLayout>
  );
}
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Results */}
        <div className="lg:col-span-2">
          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Search Results ({searchResults.length})
            </h2>

            {searchResults.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No results found. Try searching with different terms.
              </p>
            ) : (
              <div className="space-y-3">
                {searchResults.map((result) => (
                  <div
                    key={result.code}
                    onClick={() => setSelectedTerm(result)}
                    className={`p-3 border rounded cursor-pointer transition ${
                      selectedTerm?.code === result.code
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="font-medium text-gray-900">{result.term}</p>
                    <p className="text-sm text-gray-600">Code: {result.code}</p>
                    <p className="text-sm text-gray-600">LLT: {result.llt}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Hierarchy View */}
        <div>
          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              MedDRA Hierarchy
            </h2>

            {selectedTerm ? (
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-xs font-bold text-gray-600 uppercase">
                    LLT (Lowest Level Term)
                  </p>
                  <p className="text-gray-900">{selectedTerm.llt}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-600 uppercase">
                    PT (Preferred Term)
                  </p>
                  <p className="text-gray-900">{selectedTerm.term}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-600 uppercase">
                    Code
                  </p>
                  <p className="text-gray-900 font-mono">{selectedTerm.code}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-600 uppercase">
                    SOC (System Organ Class)
                  </p>
                  <p className="text-gray-900">{selectedTerm.soc}</p>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <Button variant="primary" fullWidth>
                    Use This Code
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                Select a term to view hierarchy
              </p>
            )}
          </Card>
        </div>
      </div>

      {/* WHO Drug Dictionary */}
      <Card>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          WHO Drug Dictionary
        </h2>
        <p className="text-gray-600 mb-4">Search for active substances and trade names</p>

        <div className="space-y-3">
          <Input
            label="Drug Name"
            type="text"
            placeholder="Enter trade name or substance..."
          />
          <Button variant="primary" fullWidth>
            Search Drugs
          </Button>
        </div>
      </Card>

      {/* MedDRA Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <p className="text-gray-600 font-medium">Available MedDRA Terms</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {MEDDRA_TERMS.length}
          </p>
        </Card>
        <Card>
          <p className="text-gray-600 font-medium">System Organ Classes</p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {new Set(MEDDRA_TERMS.map((t) => t.soc)).size}
          </p>
        </Card>
        <Card>
          <p className="text-gray-600 font-medium">Coverage</p>
          <p className="text-3xl font-bold text-purple-600 mt-2">
            95%
          </p>
        </Card>
      </div>
    </div>
  );
}
