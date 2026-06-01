'use client';

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

export function TrainingProvider({ children }: { children: any }) {
  return children;
}

export function useTraining() {
  return {
    trainingMode: {
      enabled: false,
      showTooltips: false,
      tutorialMode: false,
      quizMode: false,
    },
    toggleTraining: () => {},
    setStep: () => {},
  };
}
