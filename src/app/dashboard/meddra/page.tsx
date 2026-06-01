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
