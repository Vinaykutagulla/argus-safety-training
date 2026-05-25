'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api-client';
import ArgusLayout from '@/components/ArgusLayout';

export default function WorkflowPage() {
  const [workflowStates] = useState([
    {
      stage: 'Intake',
      count: 5,
      icon: '📥',
      description: 'Newly received cases awaiting initial review',
      color: 'bg-status-new',
    },
    {
      stage: 'Triage',
      count: 3,
      icon: '🔍',
      description: 'Cases assigned to appropriate handling pathway',
      color: 'bg-status-review',
    },
    {
      stage: 'Data Entry',
      count: 8,
      icon: '📝',
      description: 'Data being entered into system',
      color: 'bg-status-open',
    },
    {
      stage: 'Medical Review',
      count: 4,
      icon: '👨‍⚕️',
      description: 'Under review by medical professional',
      color: 'bg-status-review',
    },
    {
      stage: 'Quality Check',
      count: 2,
      icon: '✓',
      description: 'Final QC review before submission',
      color: 'bg-status-review',
    },
    {
      stage: 'Locked',
      count: 1,
      icon: '🔒',
      description: 'Case completed and locked from editing',
      color: 'bg-status-locked',
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [selectedStage, setSelectedStage] = useState(workflowStates[0].stage);

  useEffect(() => {
    loadWorkflow();
  }, []);

  const loadWorkflow = async () => {
    try {
      setLoading(true);
      // Using hardcoded workflow data for demo
    } catch (error) {
      console.error('Failed to load workflow:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ArgusLayout>
        <div className="text-center py-8">Loading workflow...</div>
      </ArgusLayout>
    );
  }

  return (
    <ArgusLayout>
      <div className="bg-argus-bg p-3 space-y-3 text-11 font-sans">
        {/* Title */}
        <div className="text-13 font-bold text-argus-navy mb-4">
          CASE WORKFLOW MANAGEMENT
        </div>

        {/* Workflow Pipeline Visualization */}
        <div className="border-2 border-argus-border bg-white p-3">
          <div className="text-11 font-bold text-argus-navy mb-3">WORKFLOW PIPELINE</div>
          <div className="flex items-center justify-between gap-1 overflow-x-auto pb-2">
            {workflowStates.map((state, idx) => (
              <div key={state.stage} className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => setSelectedStage(state.stage)}
                  className={`px-3 py-2 text-center cursor-pointer border-2 transition-all ${
                    selectedStage === state.stage
                      ? 'border-argus-border-dark shadow-md'
                      : 'border-argus-border hover:border-argus-border-dark'
                  } ${state.color}`}
                >
                  <div className="text-14 font-bold">{state.icon}</div>
                  <div className="text-10 font-bold whitespace-nowrap">{state.stage}</div>
                  <div className="text-12 font-bold">{state.count}</div>
                </button>
                {idx < workflowStates.length - 1 && (
                  <div className="text-14">→</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Selected Stage Details */}
        {selectedStage && (
          <div className="border-2 border-argus-border bg-white">
            <div className="bg-argus-blue text-white px-2 py-1 text-11 font-bold uppercase">
              {workflowStates.find((s) => s.stage === selectedStage)?.icon} {selectedStage.toUpperCase()} STAGE
            </div>
            <div className="p-3 text-10 space-y-2">
              <div>
                <p className="text-argus-text-label font-bold mb-1">Description:</p>
                <p className="text-argus-text-muted">
                  {workflowStates.find((s) => s.stage === selectedStage)?.description}
                </p>
              </div>
              <div className="border-t border-argus-border pt-2">
                <p className="font-bold text-argus-navy mb-2">
                  Cases in {selectedStage}: {workflowStates.find((s) => s.stage === selectedStage)?.count}
                </p>
                <table className="w-full border-collapse text-9">
                  <thead>
                    <tr className="bg-argus-bg-tab-inactive border-b border-argus-border">
                      <th className="border-r border-argus-border px-2 py-1 text-left font-bold">Case ID</th>
                      <th className="border-r border-argus-border px-2 py-1 text-left font-bold">Product</th>
                      <th className="border-r border-argus-border px-2 py-1 text-left font-bold">Assigned To</th>
                      <th className="border-r border-argus-border px-2 py-1 text-left font-bold">Days in Stage</th>
                      <th className="px-2 py-1 text-left font-bold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(workflowStates.find((s) => s.stage === selectedStage)?.count || 0)].map((_, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-argus-bg-row-alt'}>
                        <td className="border-r border-argus-border px-2 py-1 font-bold text-argus-link">
                          ARG-00{idx + 1000}
                        </td>
                        <td className="border-r border-argus-border px-2 py-1">Product {String.fromCharCode(65 + (idx % 3))}</td>
                        <td className="border-r border-argus-border px-2 py-1">User {idx + 1}</td>
                        <td className="border-r border-argus-border px-2 py-1 text-center">{idx + 1}</td>
                        <td className="px-2 py-1">
                          <button className="text-argus-link hover:underline font-bold cursor-pointer">
                            Open →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Workflow Statistics */}
        <div className="border-2 border-argus-border bg-white mt-4">
          <div className="bg-argus-blue text-white px-2 py-1 text-11 font-bold uppercase">
            WORKFLOW STATISTICS
          </div>
          <div className="p-3 space-y-2 text-10">
            <div className="grid grid-cols-3 gap-3">
              <div className="border border-argus-border p-2">
                <div className="font-bold text-argus-navy">Total Cases:</div>
                <div className="text-14 font-bold text-argus-blue">
                  {workflowStates.reduce((sum, s) => sum + s.count, 0)}
                </div>
              </div>
              <div className="border border-argus-border p-2">
                <div className="font-bold text-argus-navy">Avg. Time in System:</div>
                <div className="text-12 font-bold text-argus-navy">12.5 days</div>
              </div>
              <div className="border border-argus-border p-2">
                <div className="font-bold text-argus-navy">Bottleneck Stage:</div>
                <div className="text-12 font-bold text-argus-orange">Data Entry (8)</div>
              </div>
            </div>

            <div className="border-t border-argus-border pt-2">
              <div className="font-bold text-argus-navy mb-1">Processing Efficiency:</div>
              <div className="space-y-1">
                {workflowStates.map((state) => (
                  <div key={state.stage} className="flex items-center gap-2">
                    <span className="w-20 text-9 font-bold">{state.stage}:</span>
                    <div className="flex-1 bg-argus-border h-3 border border-argus-border">
                      <div
                        className={`h-full ${state.color}`}
                        style={{ width: `${(state.count / 8) * 100}%` }}
                      ></div>
                    </div>
                    <span className="w-8 text-right text-9 font-bold">{state.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ArgusLayout>
  );
}
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
