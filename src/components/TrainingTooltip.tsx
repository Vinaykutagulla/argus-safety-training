'use client';

import React, { useState } from 'react';
import { useTraining } from '@/lib/training-context';

interface TrainingTooltipProps {
  title: string;
  description: string;
  guidelineReference?: string;
  learningObjective?: string;
  children: React.ReactNode;
}

export default function TrainingTooltip({
  title,
  description,
  guidelineReference,
  learningObjective,
  children,
}: TrainingTooltipProps) {
  const { trainingMode } = useTraining();
  const [showTooltip, setShowTooltip] = useState(false);

  if (!trainingMode.enabled || !trainingMode.showTooltips) {
    return <>{children}</>;
  }

  return (
    <div className="relative inline-block group">
      <div onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
        {children}
        <span className="inline-block ml-1 text-10 font-bold text-blue-600 cursor-help">🎓</span>
      </div>

      {showTooltip && (
        <div className="absolute bottom-full left-0 mb-2 w-64 bg-blue-50 border-2 border-blue-400 rounded p-2 z-50 shadow-lg">
          <div className="text-11 font-bold text-blue-800 mb-1">{title}</div>
          <div className="text-10 text-blue-700 mb-1">{description}</div>
          {learningObjective && (
            <div className="text-9 text-blue-600 italic mb-1">
              <span className="font-bold">Learning Objective:</span> {learningObjective}
            </div>
          )}
          {guidelineReference && (
            <div className="text-9 text-blue-600 font-bold pt-1 border-t border-blue-300">
              📋 {guidelineReference}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
