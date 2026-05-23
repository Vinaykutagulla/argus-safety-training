'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api-client';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';

export default function WorkflowPage() {
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = async () => {
    try {
      setLoading(true);
      const data = await api.cases.list({ status: 'Open' });
      setCases(data.cases || []);
    } catch (error) {
      console.error('Failed to load cases:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStepColor = (step: string) => {
    const colors: Record<string, string> = {
      'Intake': 'blue',
      'Triage': 'purple',
      'Data Entry': 'cyan',
      'Medical Review': 'orange',
      'QC Check': 'yellow',
      'Lock Case': 'red',
      'Submit Report': 'green',
    };
    return colors[step] || 'gray';
  };

  if (loading) {
    return <div className="text-center py-8">Loading workflow cases...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Workflow & Routing</h1>
        <p className="text-gray-600 mt-2">Manage case workflow and assignments</p>
      </div>

      {/* Workflow Steps Reference */}
      <Card>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Case Workflow Steps</h2>
        <div className="flex items-center justify-between text-sm mb-6">
          {['Intake', 'Triage', 'Data Entry', 'Medical Review', 'QC Check', 'Lock', 'Submit'].map(
            (step, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mb-2">
                  {idx + 1}
                </div>
                <p className="text-xs text-center">{step}</p>
              </div>
            )
          )}
        </div>
      </Card>

      {/* Active Cases in Workflow */}
      <Card>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Active Cases in Workflow</h2>

        {cases.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No cases in workflow</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cases.map((aeCase) => (
              <div key={aeCase._id} className="p-4 border border-gray-200 rounded hover:shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-bold text-gray-900">{aeCase.caseId}</p>
                    <p className="text-sm text-gray-600">{aeCase.drug?.tradeName}</p>
                  </div>
                  <Badge variant={aeCase.status === 'Open' ? 'warning' : 'info'}>
                    {aeCase.status}
                  </Badge>
                </div>

                {/* Mini workflow */}
                <div className="flex items-center justify-between text-xs">
                  {['Intake', 'Triage', 'Data Entry', 'Medical Review', 'QC Check'].map(
                    (step, idx) => (
                      <div key={idx} className="flex items-center">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            idx <= 1
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-600'
                          }`}
                        >
                          {idx + 1}
                        </div>
                        {idx < 4 && <div className="w-6 h-0.5 bg-gray-300 mx-1" />}
                      </div>
                    )
                  )}
                </div>

                {/* Assignment */}
                {aeCase.workflow?.assignedTo ? (
                  <p className="text-xs text-gray-600 mt-2">
                    Assigned to: <span className="font-medium">{aeCase.workflow.assignedTo}</span>
                  </p>
                ) : (
                  <p className="text-xs text-gray-500 mt-2">Unassigned</p>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Routing History */}
      <Card>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Routing History</h2>
        <p className="text-gray-600 text-sm mb-4">Recent case assignments and transfers</p>
        
        {cases.length > 0 ? (
          <div className="space-y-3">
            {cases.slice(0, 5).map((aeCase) => (
              <div key={aeCase._id} className="flex justify-between items-center pb-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">{aeCase.caseId}</p>
                <p className="text-xs text-gray-600">
                  Last updated: {new Date(aeCase.updatedAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No routing history</p>
        )}
      </Card>
    </div>
  );
}
