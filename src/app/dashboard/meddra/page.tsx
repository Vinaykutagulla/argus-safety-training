'use client';

import { useState } from 'react';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { MEDDRA_TERMS } from '@/lib/constants';

export default function MedDRAPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedTerm, setSelectedTerm] = useState<any>(null);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    const results = MEDDRA_TERMS.filter(
      (term) =>
        term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.llt.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(results);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">MedDRA Coding</h1>
        <p className="text-gray-600 mt-2">
          Search and select MedDRA codes for adverse events
        </p>
      </div>

      {/* Search */}
      <Card>
        <div className="space-y-4">
          <Input
            label="Search MedDRA Terms"
            type="text"
            placeholder="Enter verbatim term or MedDRA code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="primary" onClick={handleSearch} fullWidth>
            Search
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
