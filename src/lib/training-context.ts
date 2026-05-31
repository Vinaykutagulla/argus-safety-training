'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface TrainingStep {
  id: string;
  title: string;
  description: string;
  targetElement?: string;
  hint: string;
  learningObjective: string;
  guidelineReference: string;
}

export interface TrainingMode {
  enabled: boolean;
  showTooltips: boolean;
  tutorialMode: boolean;
  quizMode: boolean;
  currentStep?: number;
}

interface TrainingContextType {
  trainingMode: TrainingMode;
  setTrainingMode: (mode: TrainingMode) => void;
  toggleTraining: () => void;
  setStep: (step: number) => void;
}

const TrainingContext = createContext<TrainingContextType | undefined>(undefined);

export function TrainingProvider({ children }: { children: ReactNode }) {
  const [trainingMode, setTrainingMode] = useState<TrainingMode>({
    enabled: false,
    showTooltips: false,
    tutorialMode: false,
    quizMode: false,
  });

  const toggleTraining = () => {
    setTrainingMode((prev) => ({
      ...prev,
      enabled: !prev.enabled,
      showTooltips: !prev.enabled,
    }));
  };

  const setStep = (step: number) => {
    setTrainingMode((prev) => ({ ...prev, currentStep: step }));
  };

  return (
    <TrainingContext.Provider value={{ trainingMode, setTrainingMode, toggleTraining, setStep }}>
      {children}
    </TrainingContext.Provider>
  );
}

export function useTraining() {
  const context = useContext(TrainingContext);
  if (!context) {
    throw new Error('useTraining must be used within TrainingProvider');
  }
  return context;
}
