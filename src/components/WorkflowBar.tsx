'use client';

import React from 'react';

interface WorkflowStage {
  name: string;
  completed: boolean;
  current: boolean;
}

interface WorkflowBarProps {
  stages: WorkflowStage[];
}

export default function WorkflowBar({ stages }: WorkflowBarProps) {
  return (
    <div className="flex items-center justify-start gap-2 bg-argus-bg p-2 border border-argus-border my-2">
      {stages.map((stage, idx) => (
        <React.Fragment key={idx}>
          {/* Stage Indicator */}
          <div className="flex items-center gap-1">
            <div
              className={`w-6 h-6 rounded flex items-center justify-center text-10 font-bold ${
                stage.completed
                  ? 'bg-green-600 text-white'
                  : stage.current
                    ? 'bg-argus-blue text-white'
                    : 'bg-gray-300 text-gray-600'
              }`}
            >
              {stage.completed ? '✓' : stage.current ? '●' : '○'}
            </div>
            <span className="text-11 font-bold text-argus-text-label">
              {stage.name}
            </span>
          </div>

          {/* Arrow between stages */}
          {idx < stages.length - 1 && (
            <div className="text-argus-border text-11 mx-1">→</div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
