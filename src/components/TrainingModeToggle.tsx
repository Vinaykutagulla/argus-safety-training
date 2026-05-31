'use client';

import React from 'react';
import { useTraining } from '@/lib/training-context';

export default function TrainingModeToggle() {
  const { trainingMode, toggleTraining } = useTraining();

  return (
    <button
      onClick={toggleTraining}
      className={`px-3 py-1 text-10 font-bold border transition-all ${
        trainingMode.enabled
          ? 'bg-blue-600 text-white border-blue-800 hover:bg-blue-700'
          : 'bg-white text-argus-text-label border-argus-border hover:bg-blue-50'
      }`}
    >
      <span className="mr-1">🎓</span>
      Training Mode: {trainingMode.enabled ? 'ON' : 'OFF'}
    </button>
  );
}
