'use client';

import React from 'react';
import { useTraining, TrainingStep } from '@/lib/training-context';

interface TutorialModeProps {
  steps: TrainingStep[];
  onComplete?: () => void;
}

export default function TutorialMode({ steps, onComplete }: TutorialModeProps) {
  const { trainingMode, setStep } = useTraining();

  if (!trainingMode.enabled || !trainingMode.tutorialMode || trainingMode.currentStep === undefined) {
    return null;
  }

  const currentStep = steps[trainingMode.currentStep];
  const progress = ((trainingMode.currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (trainingMode.currentStep !== undefined && trainingMode.currentStep < steps.length - 1) {
      setStep(trainingMode.currentStep + 1);
    } else if (onComplete) {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (trainingMode.currentStep !== undefined && trainingMode.currentStep > 0) {
      setStep(trainingMode.currentStep - 1);
    }
  };

  const handleSkip = () => {
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-end">
      <div className="w-full bg-white border-t-4 border-blue-600 shadow-lg">
        {/* Header */}
        <div className="bg-blue-600 text-white px-4 py-2 flex items-center justify-between">
          <div className="text-12 font-bold">🎓 Training Tutorial — New Case Entry</div>
          <div className="text-10">
            Step {trainingMode.currentStep + 1} of {steps.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-gray-200">
          <div className="h-full bg-blue-600" style={{ width: `${progress}%` }}></div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <div className="text-12 font-bold text-argus-navy">{currentStep.title}</div>
          <div className="text-11 text-argus-text-label">{currentStep.description}</div>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 px-3 py-2 mt-2">
            <div className="text-10 font-bold text-yellow-800">💡 Hint:</div>
            <div className="text-10 text-yellow-800">{currentStep.hint}</div>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-400 px-3 py-2 mt-2">
            <div className="text-10 font-bold text-blue-800">🎯 Learning Objective:</div>
            <div className="text-10 text-blue-800">{currentStep.learningObjective}</div>
          </div>
          <div className="bg-purple-50 border-l-4 border-purple-400 px-3 py-2 mt-2">
            <div className="text-10 font-bold text-purple-800">📋 Guideline Reference:</div>
            <div className="text-10 text-purple-800">{currentStep.guidelineReference}</div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-gray-100 px-4 py-2 flex gap-2 justify-end border-t border-gray-200">
          <button
            onClick={handlePrevious}
            disabled={trainingMode.currentStep === 0}
            className="px-3 py-1 bg-gray-400 text-white text-10 disabled:opacity-50 hover:bg-gray-500"
          >
            ← Previous
          </button>
          <button
            onClick={handleSkip}
            className="px-3 py-1 bg-gray-600 text-white text-10 hover:bg-gray-700"
          >
            Skip Tutorial
          </button>
          <button
            onClick={handleNext}
            className="px-3 py-1 bg-blue-600 text-white text-10 hover:bg-blue-700 font-bold"
          >
            {trainingMode.currentStep === steps.length - 1 ? 'Complete ✓' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}
