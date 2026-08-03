export interface WorkflowStep {
  id: string;
  title: string;
  stage: string;
  role: string;
  description: string;
}

const workflowSteps: WorkflowStep[] = [
  {
    id: 'case-receipt',
    title: 'Case Receipt / Intake',
    stage: '1. Intake',
    role: 'Data Entry',
    description: 'Adverse event reports arrive from hospitals, call centers, literature, clinical trials, or regulatory sources and are created as new cases or imported via E2B.',
  },
  {
    id: 'triage',
    title: 'Triage / Duplicate Check',
    stage: '2. Triage',
    role: 'Safety Operations',
    description: 'The team checks for duplicate cases and merges them where appropriate so each case has a unique identity and a clean audit trail.',
  },
  {
    id: 'data-entry',
    title: 'Data Entry / Case Processing',
    stage: '3. Data Entry',
    role: 'Data Entry',
    description: 'Patient, reporter, product, reaction, and narrative details are captured in the case record with the required supporting information.',
  },
  {
    id: 'medical-coding',
    title: 'Medical Coding',
    stage: '4. Coding',
    role: 'Medical Coding',
    description: 'Adverse events are coded using MedDRA and drugs are mapped through the relevant dictionary-based coding standards.',
  },
  {
    id: 'assessment',
    title: 'Assessment: Seriousness & Causality',
    stage: '5. Assessment',
    role: 'Medical Review',
    description: 'Seriousness, causality, and expectedness are evaluated to determine whether the case meets expedited reporting criteria.',
  },
  {
    id: 'medical-review',
    title: 'Medical Review',
    stage: '6. Review',
    role: 'Medical Reviewer',
    description: 'A physician or medical reviewer validates the narrative, medical accuracy, and overall case assessment before approval.',
  },
  {
    id: 'qc',
    title: 'Quality Review (QC)',
    stage: '7. QC',
    role: 'Quality',
    description: 'The QC team checks coding, data quality, and completeness before the case moves toward submission readiness.',
  },
  {
    id: 'reportability',
    title: 'Regulatory Reportability Assessment',
    stage: '8. Reportability',
    role: 'Safety Operations',
    description: 'The system or user decides which authorities and timelines apply, including 7-day, 15-day, or other regulatory reporting rules.',
  },
  {
    id: 'report-generation',
    title: 'Report Generation',
    stage: '9. Reporting',
    role: 'Reporting',
    description: 'Approved reports are generated in the required format such as E2B(R2/R3), CIOMS I, or MedWatch where applicable.',
  },
  {
    id: 'submission',
    title: 'Submission',
    stage: '10. Submission',
    role: 'Regulatory',
    description: 'Reports are transmitted to the relevant agency through the gateway or other approved submission channels.',
  },
  {
    id: 'follow-up',
    title: 'Follow-up',
    stage: '11. Follow-up',
    role: 'Case Management',
    description: 'Additional information or follow-up reports reopen the case and the same workflow is repeated for the updated information.',
  },
  {
    id: 'closure',
    title: 'Case Closure',
    stage: '12. Closure',
    role: 'Case Management',
    description: 'Once all assessments and reporting actions are complete, the case is closed, while still allowing future follow-up if new information appears.',
  },
];

export default workflowSteps;
