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
