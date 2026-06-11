'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ArgusLayout from '@/components/ArgusLayout';
import CaseHeader from '@/components/CaseHeader';
import WorkflowBar from '@/components/WorkflowBar';
import SectionHeader from '@/components/SectionHeader';
import ArgusFormField from '@/components/ArgusFormField';
import ArgusInput from '@/components/ArgusInput';
import ArgusSelect from '@/components/ArgusSelect';
import ArgusDateField from '@/components/ArgusDateField';
import TrainingModeToggle from '@/components/TrainingModeToggle';
import TrainingTooltip from '@/components/TrainingTooltip';
import RegulatoryReferencePanel from '@/components/RegulatoryReferencePanel';
import TutorialMode, { TrainingStep } from '@/components/TutorialMode';
import { useTraining } from '@/lib/training-context';
import { api } from '@/lib/api-client';

export default function CaseFormPage() {
  return <CaseFormContent />;
}

function CaseFormContent() {
  const params = useParams();
  const router = useRouter();
  const caseId = params.id as string;
  const isNewCase = caseId === 'new';
  const { trainingMode } = useTraining();

  // Case state with proper structure
  const [caseData, setCaseData] = useState<any>({
    // Administrative
    administration: {
      receiptDate: new Date().toISOString().split('T')[0],
      countryOfOccurrence: 'India',
      awarenessDate: new Date().toISOString().split('T')[0],
      primaryReporterType: 'Healthcare Professional',
    },
    // Reporter
    reporter: {
      name: '',
      type: 'Healthcare Professional',
      qualification: '',
      institution: '',
      city: '',
      country: 'India',
      sourceChannel: 'Direct',
      sourceDocument: '',
    },
    // Case classification
    reportType: 'Spontaneous',
    serious: 'yes',
    seriousnessReasons: [],
    
    // Patient
    patient: {
      initials: '',
      dateOfBirth: '',
      ageAtOnset: '',
      ageUnit: 'Years',
      gender: 'Unknown',
      weight: '',
      weightUnit: 'kg',
      height: '',
      heightUnit: 'cm',
      ethnicity: '',
      medicalHistory: '',
    },
    
    // Products
    products: [
      {
        type: 'Drug',
        tradeName: '',
        genericName: '',
        manufacturer: '',
        role: 'Suspect',
        dose: '',
        doseUnit: 'mg',
        frequency: '',
        route: '',
        indication: '',
        startDate: '',
        endDate: '',
        daysTherapy: '',
      }
    ],
    
    // Reactions/Events
    reactions: [
      {
        verbatimTerm: '',
        onsetDate: '',
        outcomeTerm: 'Unknown',
        meddraCode: '',
        meddraPreferredTerm: '',
        seriousness: 'Non-Serious',
      }
    ],
    
    // Assessment
    assessment: {
      causality: 'Possible',
      temporalRelationship: 'Yes',
      dechallenge: 'Unknown',
      rechallenge: 'Unknown',
      comments: '',
    },
    
    // Workflow
    status: 'New',
    workflow: {
      currentStep: 'Data Entry',
      assignedTo: '',
    },
  });

  const [loadingCase, setLoadingCase] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  // Fetch existing case data
  useEffect(() => {
    if (isNewCase) {
      setLoadError(null);
      return;
    }

    const fetchCase = async () => {
      setLoadingCase(true);
      setLoadError(null);

      try {
        const payload = await api.cases.get(caseId);
        setCaseData(payload || caseData);
        setIsLocked(payload?.status === 'Locked' || false);
      } catch (error: any) {
        console.error('Error loading case:', error);
        setLoadError(error.message || 'Unable to load case');
      } finally {
        setLoadingCase(false);
      }
    };

    fetchCase();
  }, [caseId, isNewCase]);

  // Helper function to update nested object properties
  const updateNestedField = (obj: any, path: string, value: any) => {
    const keys = path.split('.');
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    return { ...obj };
  };

  // Handle saving case
  const handleSave = async () => {
    setSaveError(null);
    setSuccessMessage(null);
    setIsSaving(true);

    try {
      let savedCase;
      if (isNewCase) {
        savedCase = await api.cases.create(caseData);
      } else {
        savedCase = await api.cases.update(caseId, caseData);
      }

      setSuccessMessage(`Case ${savedCase.caseId} saved successfully!`);
      setCaseData(savedCase);

      // Redirect to case page if new
      if (isNewCase && savedCase._id) {
        setTimeout(() => {
          router.push(`/dashboard/cases/${savedCase._id}`);
        }, 1000);
      }
    } catch (error: any) {
      console.error('Error saving case:', error);
      setSaveError(error.message || 'Failed to save case');
    } finally {
      setIsSaving(false);
    }
  };

  // Handle locking case
  const handleLock = async () => {
    try {
      const result = await api.cases.lock(caseId);
      setIsLocked(true);
      setSuccessMessage('Case locked successfully. No further modifications allowed.');
    } catch (error: any) {
      setSaveError(error.message || 'Failed to lock case');
    }
  };

  // Handle unlocking case (admin only)
  const handleUnlock = async () => {
    try {
      const result = await api.cases.unlock(caseId);
      setIsLocked(false);
      setSuccessMessage('Case unlocked successfully.');
    } catch (error: any) {
      setSaveError(error.message || 'Failed to unlock case');
    }
  };

  const tabs = ['General', 'Patient', 'Products', 'Events', 'Assessment', 'Workflow', 'Attachments'];

  const workflowStages = [
    { name: 'Intake', completed: true, current: false },
    { name: 'Data Entry', completed: false, current: true },
    { name: 'Medical Review', completed: false, current: false },
    { name: 'QC', completed: false, current: false },
    { name: 'Locked', completed: false, current: false },
    { name: 'Submitted', completed: false, current: false },
  ];

  const tutorialSteps: TrainingStep[] = [
    {
      id: '1',
      title: 'Welcome to Case Entry',
      description: 'This tutorial guides you through entering an adverse event case using the ICH E2A standard.',
      hint: 'Start by reviewing the General Information tab for case classification.',
      learningObjective: 'Understand the workflow for reporting adverse events',
      guidelineReference: 'ICH E2A Section 2: Case Reporting',
    },
    {
      id: '2',
      title: 'General Information',
      description: 'Capture the receipt date, country, and report type.',
      hint: 'The receipt date starts the expedited reporting clock.',
      learningObjective: 'Correctly document case intake',
      guidelineReference: 'ICH E2A Section 3.1',
    },
    {
      id: '3',
      title: 'Patient Information',
      description: 'Record patient demographics using initials only.',
      hint: 'Always protect patient privacy.',
      learningObjective: 'Protect patient privacy',
      guidelineReference: 'ICH E2A Section 3.2',
    },
    {
      id: '4',
      title: 'Product Information',
      description: 'Document the suspected drug and concomitant medications.',
      hint: 'Distinguish between Suspect and Concomitant roles.',
      learningObjective: 'Identify suspect medication',
      guidelineReference: 'ICH E2A Section 3.3',
    },
    {
      id: '5',
      title: 'Adverse Events',
      description: 'Record the verbatim term and code to MedDRA.',
      hint: 'Always code to PT level.',
      learningObjective: 'Apply MedDRA coding',
      guidelineReference: 'ICH E2A Section 3.3',
    },
    {
      id: '6',
      title: 'Causality Assessment',
      description: 'Assess relatedness using WHO-UMC scale.',
      hint: 'Consider temporal relationship and alternative causes.',
      learningObjective: 'Assess relatedness',
      guidelineReference: 'WHO-UMC Scale',
    },
    {
      id: '7',
      title: 'Review & Submit',
      description: 'Lock the case and submit for processing.',
      hint: 'Check expedited reporting requirements.',
      learningObjective: 'Identify reporting obligations',
      guidelineReference: 'ICH E2A Section 7',
    },
  ];

  return (
    <ArgusLayout>
      <RegulatoryReferencePanel />
      <div className={`bg-argus-bg p-3 space-y-2 text-11 font-sans min-h-screen ${trainingMode.enabled ? 'mr-64' : ''}`}>
        
        {/* Loading/Error States */}
        {loadingCase && (
          <div className="rounded border border-argus-border bg-argus-bg p-3 text-11 text-argus-text-muted">
            Loading case details...
          </div>
        )}
        
        {loadError && (
          <div className="rounded border border-red-500 bg-red-50 p-3 text-11 text-red-700">
            Error: {loadError}
          </div>
        )}
        
        {saveError && (
          <div className="rounded border border-red-500 bg-red-50 p-3 text-11 text-red-700">
            Error: {saveError}
          </div>
        )}
        
        {successMessage && (
          <div className="rounded border border-green-500 bg-green-50 p-3 text-11 text-green-700">
            ✓ {successMessage}
          </div>
        )}

        {isLocked && (
          <div className="rounded border border-yellow-500 bg-yellow-50 p-3 text-11 text-yellow-700">
            ⚠️ This case is locked. No modifications are allowed.
          </div>
        )}

        {/* Case Header */}
        <CaseHeader
          caseId={caseData?.caseId || 'NEW CASE'}
          receiptDate={caseData?.administration?.receiptDate || 'Unknown'}
          product={caseData?.products?.[0]?.tradeName || 'Unknown'}
          seriousness={caseData?.reactions?.[0]?.seriousness || 'Unknown'}
          status={caseData?.status || 'New'}
          actions={
            <div className="flex gap-2">
              <TrainingModeToggle />
              <button 
                onClick={handleSave}
                disabled={isSaving || isLocked}
                className="px-3 py-1 bg-argus-blue text-white text-10 border border-argus-border-dark hover:bg-argus-light transition-all cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
              {!isLocked ? (
                <button 
                  onClick={handleLock}
                  className="px-3 py-1 bg-argus-orange text-white text-10 border border-yellow-600 hover:bg-yellow-500 transition-all cursor-pointer active:scale-95"
                >
                  🔒 Lock
                </button>
              ) : (
                <button 
                  onClick={handleUnlock}
                  className="px-3 py-1 bg-gray-500 text-white text-10 border border-gray-600 hover:bg-gray-600 transition-all cursor-pointer active:scale-95"
                >
                  🔓 Unlock
                </button>
              )}
            </div>
          }
        />

        {/* Workflow Progress Bar */}
        <WorkflowBar stages={workflowStages} />

        {/* Tab Navigation */}
        <div className="flex gap-0 bg-argus-bg border-b-2 border-argus-border overflow-x-auto">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-3 py-1 text-11 font-bold border-r border-argus-border whitespace-nowrap ${
                idx === activeTab
                  ? 'bg-argus-bg-tab-active text-argus-text-primary border-b-2 border-argus-blue'
                  : 'bg-argus-bg-tab-inactive text-argus-text-label'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <TrainingTooltip
                    title="Receipt Date"
                    description="The date this adverse event case was first received at your organization."
                    learningObjective="Correctly document the case intake date for expedited reporting clock"
                    guidelineReference="ICH E2A Section 3.1"
                  >
                    <ArgusFormField label="Initial Receipt Date:" required>
                      <ArgusDateField
                        value={caseData?.administration?.receiptDate
                          ? new Date(caseData.administration.receiptDate).toISOString().slice(0, 10)
                          : caseData?.receiptDate || ''}
                        onChange={(e) => setCaseData({ ...caseData, receiptDate: e })}
                      />
                    </ArgusFormField>
                  </TrainingTooltip>
                </div>

                <div className="flex-1">
                  <TrainingTooltip
                    title="Country of Incidence"
                    description="The country where the adverse event occurred. This determines applicable regulatory reporting requirements."
                    learningObjective="Identify regulatory reporting obligations by country"
                    guidelineReference="ICH E2A Expedited Reporting - Country-Specific Rules"
                  >
                    <ArgusFormField label="Country of Incidence:" required>
                      <ArgusInput
                        value={caseData?.administration?.countryOfOccurrence || caseData?.country || ''}
                        readOnly
                      />
                    </ArgusFormField>
                  </TrainingTooltip>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <ArgusFormField label="Awareness Date:" required>
                    <ArgusInput
                      value={caseData?.administration?.awarenessDate
                        ? new Date(caseData.administration.awarenessDate).toISOString().slice(0, 10)
                        : ''}
                      readOnly
                    />
                  </ArgusFormField>
                </div>

                <div className="flex-1">
                  <ArgusFormField label="Reporter Type:" required>
                    <ArgusInput
                      value={caseData?.reporter?.type || caseData?.administration?.primaryReporterType || 'Unknown'}
                      readOnly
                    />
                  </ArgusFormField>
                </div>
              </div>

              <SectionHeader title="Reporter / Source Information" />
              <div className="grid grid-cols-2 gap-4">
                <ArgusFormField label="Reporter Name:" required>
                  <ArgusInput value={caseData?.reporter?.name || ''} readOnly />
                </ArgusFormField>
                <ArgusFormField label="Qualification:">
                  <ArgusInput value={caseData?.reporter?.qualification || ''} readOnly />
                </ArgusFormField>
                <ArgusFormField label="Institution:">
                  <ArgusInput value={caseData?.reporter?.institution || ''} readOnly />
                </ArgusFormField>
                <ArgusFormField label="City:">
                  <ArgusInput value={caseData?.reporter?.city || ''} readOnly />
                </ArgusFormField>
                <ArgusFormField label="Source Channel:">
                  <ArgusInput value={caseData?.reporter?.sourceChannel || ''} readOnly />
                </ArgusFormField>
                <ArgusFormField label="Source Document:">
                  <ArgusInput value={caseData?.reporter?.sourceDocument || ''} readOnly />
                </ArgusFormField>
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <ArgusFormField label="Report Type:" required>
                    <div className="space-y-1">
                      <label className="flex items-center gap-2">
                        <input type="radio" name="reportType" value="Spontaneous" checked readOnly /> Spontaneous
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="reportType" value="Study" /> Study
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="reportType" value="Literature" /> Literature
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="reportType" value="Other" /> Other
                      </label>
                    </div>
                  </ArgusFormField>
                </div>

                <div className="w-1/2">
                  <ArgusFormField label="Serious:" required>
                    <div className="space-y-1">
                      <label className="flex items-center gap-2">
                        <input type="radio" name="serious" value="yes" checked readOnly /> Yes
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="serious" value="no" /> No
                      </label>
                    </div>
                  </ArgusFormField>
                </div>
              </div>

              <ArgusFormField label="Seriousness Criteria:">
                <div className="space-y-1">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked readOnly /> Death
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" /> Life-threatening
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked readOnly /> Hospitalized
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" /> Disability
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" /> Congenital
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" /> Other Serious
                  </label>
                </div>
              </ArgusFormField>

              <SectionHeader title="Study Information" />

              <div className="flex gap-4">
                <div className="flex-1">
                  <ArgusFormField label="Study Name:">
                    <ArgusInput placeholder="Study name or identifier" />
                  </ArgusFormField>
                </div>

                <div className="flex-1">
                  <ArgusFormField label="Protocol No.:">
                    <ArgusInput placeholder="Protocol number" />
                  </ArgusFormField>
                </div>
              </div>

              <ArgusFormField label="Study Type:">
                <ArgusSelect
                  options={[
                    { value: 'RCT', label: 'Randomized Controlled Trial' },
                    { value: 'Cohort', label: 'Cohort Study' },
                    { value: 'Case-Control', label: 'Case-Control Study' },
                    { value: 'Other', label: 'Other' },
                  ]}
                  placeholder="Select study type"
                />
              </ArgusFormField>
            </div>
          )}

          {/* PATIENT TAB */}
          {activeTab === 1 && (
            <div className="space-y-3">
              <SectionHeader title="Patient Information" />

              <div className="flex gap-4">
                <div className="flex-1">
                  <ArgusFormField label="Patient Initials:" required>
                    <ArgusInput placeholder="e.g., JD" maxLength={3} />
                  </ArgusFormField>
                </div>

                <div className="flex-1">
                  <ArgusFormField label="Date of Birth:">
                    <ArgusDateField />
                  </ArgusFormField>
                </div>

                <div className="flex-1">
                  <ArgusFormField label="Age at Onset:">
                    <div className="flex gap-1">
                      <ArgusInput placeholder="Age" className="w-16" />
                      <ArgusSelect options={[{ value: 'Years', label: 'Years' }]} className="w-24" />
                    </div>
                  </ArgusFormField>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <ArgusFormField label="Gender:">
                    <div className="space-y-1">
                      <label className="flex items-center gap-2">
                        <input type="radio" name="gender" /> Male
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="gender" /> Female
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="gender" checked readOnly /> Unknown
                      </label>
                    </div>
                  </ArgusFormField>
                </div>

                <div className="flex-1">
                  <ArgusFormField label="Weight:">
                    <div className="flex gap-1">
                      <ArgusInput placeholder="Weight" className="w-20" />
                      <ArgusSelect options={[{ value: 'kg', label: 'kg' }]} className="w-16" />
                    </div>
                  </ArgusFormField>
                </div>

                <div className="flex-1">
                  <ArgusFormField label="Height:">
                    <div className="flex gap-1">
                      <ArgusInput placeholder="Height" className="w-20" />
                      <ArgusSelect options={[{ value: 'cm', label: 'cm' }]} className="w-16" />
                    </div>
                  </ArgusFormField>
                </div>
              </div>

              <ArgusFormField label="Ethnicity:">
                <ArgusSelect
                  options={[
                    { value: 'Caucasian', label: 'Caucasian' },
                    { value: 'African', label: 'African' },
                    { value: 'Asian', label: 'Asian' },
                    { value: 'Hispanic', label: 'Hispanic' },
                    { value: 'Other', label: 'Other' },
                  ]}
                />
              </ArgusFormField>

              <SectionHeader title="Current Medical Status" />

              <ArgusFormField label="Medical History:">
                <textarea className="w-full border border-argus-border px-1 py-0.5 text-11 font-sans min-h-16 focus:outline-none focus:border-argus-light" />
              </ArgusFormField>
            </div>
          )}

          {/* PRODUCTS TAB */}
          {activeTab === 2 && (
            <div className="space-y-3">
              <div className="flex gap-2 mb-2">
                <button 
                  onClick={handleAddDrug}
                  className="px-2 py-1 bg-argus-blue text-white text-10 border border-argus-border-dark hover:bg-argus-light transition-all cursor-pointer active:scale-95"
                >
                  + Add Drug
                </button>
                <button 
                  onClick={handleAddDevice}
                  className="px-2 py-1 bg-argus-blue text-white text-10 border border-argus-border-dark hover:bg-argus-light transition-all cursor-pointer active:scale-95"
                >
                  + Add Device
                </button>
              </div>

              <SectionHeader title="Drug #1: Metformin" actions={<button onClick={() => toggleSection('drug1')} className="text-10 cursor-pointer hover:text-argus-blue">▲ Collapse</button>} />

              <div className="flex gap-4">
                <div className="flex-1">
                  <ArgusFormField label="Trade Name:" required>
                    <ArgusInput value="Metformin 500mg" />
                  </ArgusFormField>
                </div>

                <div className="flex-1">
                  <ArgusFormField label="Generic Name:" required>
                    <ArgusInput value="Metformin Hydrochloride" />
                  </ArgusFormField>
                </div>
              </div>

              <ArgusFormField label="Manufacturer:">
                <ArgusInput value="Bristol-Myers Squibb" />
              </ArgusFormField>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <ArgusFormField label="Suspect/Concomitant:" required>
                    <div className="space-y-1">
                      <label className="flex items-center gap-2">
                        <input type="radio" checked readOnly /> Suspect
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" /> Concomitant
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" /> Interacting
                      </label>
                    </div>
                  </ArgusFormField>
                </div>

                <div className="w-1/2">
                  <ArgusFormField label="Route of Admin:">
                    <ArgusSelect
                      options={[
                        { value: 'Oral', label: 'Oral' },
                        { value: 'IV', label: 'Intravenous' },
                        { value: 'IM', label: 'Intramuscular' },
                        { value: 'Topical', label: 'Topical' },
                      ]}
                      value="Oral"
                    />
                  </ArgusFormField>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <ArgusFormField label="Dose:">
                    <div className="flex gap-1">
                      <ArgusInput value="500" className="w-16" />
                      <ArgusSelect options={[{ value: 'mg', label: 'mg' }]} value="mg" className="w-16" />
                      <ArgusSelect
                        options={[{ value: 'Daily', label: 'Daily' }]}
                        value="Daily"
                        className="w-24"
                      />
                    </div>
                  </ArgusFormField>
                </div>

                <div className="flex-1">
                  <ArgusFormField label="Start Date:">
                    <ArgusDateField value="2024-01-01" />
                  </ArgusFormField>
                </div>

                <div className="flex-1">
                  <ArgusFormField label="Stop Date:">
                    <ArgusDateField value="2024-01-15" />
                  </ArgusFormField>
                </div>
              </div>

              <ArgusFormField label="Indication:">
                <ArgusInput value="Type 2 Diabetes Mellitus" />
              </ArgusFormField>

              <ArgusFormField label="Action Taken:">
                <ArgusSelect
                  options={[
                    { value: 'Withdrawn', label: 'Drug Withdrawn' },
                    { value: 'Reduced', label: 'Dose Reduced' },
                    { value: 'Increased', label: 'Dose Increased' },
                    { value: 'NotChanged', label: 'Dose Not Changed' },
                  ]}
                  value="Withdrawn"
                />
              </ArgusFormField>

              <SectionHeader title="Causality Assessment" />

              <div className="flex gap-4">
                <div className="flex-1">
                  <ArgusFormField label="WHO Causality:">
                    <ArgusSelect
                      options={[
                        { value: 'Certain', label: 'Certain' },
                        { value: 'Probable', label: 'Probable' },
                        { value: 'Possible', label: 'Possible' },
                        { value: 'Unlikely', label: 'Unlikely' },
                      ]}
                      value="Probable"
                    />
                  </ArgusFormField>
                </div>

                <div className="flex-1">
                  <ArgusFormField label="Company Causality:">
                    <ArgusSelect
                      options={[
                        { value: 'Certain', label: 'Certain' },
                        { value: 'Probable', label: 'Probable' },
                        { value: 'Possible', label: 'Possible' },
                      ]}
                      value="Possible"
                    />
                  </ArgusFormField>
                </div>
              </div>
            </div>
          )}

          {/* EVENTS TAB */}
          {activeTab === 3 && (
            <div className="space-y-3">
              <button 
                onClick={handleAddEvent}
                className="px-2 py-1 bg-argus-blue text-white text-10 border border-argus-border-dark hover:bg-argus-light transition-all cursor-pointer active:scale-95"
              >
                + Add Event
              </button>

              <SectionHeader title="Event #1" actions={<button onClick={() => toggleSection('event1')} className="text-10 cursor-pointer hover:text-argus-blue">▲ Collapse</button>} />

              <ArgusFormField label="Verbatim Term:" required>
                <textarea className="w-full border border-argus-border px-1 py-0.5 text-11 font-sans min-h-10 focus:outline-none focus:border-argus-light" defaultValue="Patient reported severe chest pain" />
              </ArgusFormField>

              <div className="flex gap-4">
                <div className="flex-1">
                  <ArgusFormField label="Onset Date:" required>
                    <ArgusDateField value="2024-01-14" />
                  </ArgusFormField>
                </div>

                <div className="flex-1">
                  <ArgusFormField label="Time:">
                    <ArgusInput type="time" value="14:30" />
                  </ArgusFormField>
                </div>

                <div className="flex-1">
                  <ArgusFormField label="Stop Date:">
                    <ArgusDateField value="2024-01-15" />
                  </ArgusFormField>
                </div>
              </div>

              <ArgusFormField label="Outcome:">
                <ArgusSelect
                  options={[
                    { value: 'Fatal', label: 'Fatal' },
                    { value: 'Recovered', label: 'Recovered' },
                    { value: 'Recovering', label: 'Recovering' },
                    { value: 'NotRecovered', label: 'Not Recovered' },
                  ]}
                  value="Fatal"
                />
              </ArgusFormField>

              <SectionHeader title="MedDRA Coding" />

              <div className="flex gap-4">
                <div className="flex-1">
                  <ArgusFormField label="SOC:">
                    <ArgusSelect
                      options={[
                        { value: 'Cardiac', label: 'Cardiac Disorders' },
                        { value: 'Blood', label: 'Blood Disorders' },
                      ]}
                      value="Cardiac"
                    />
                  </ArgusFormField>
                </div>

                <div className="flex-1">
                  <ArgusFormField label="HLGT:">
                    <ArgusInput value="Ischaemic coronary artery disorders" disabled />
                  </ArgusFormField>
                </div>
              </div>

              <ArgusFormField label="Preferred Term (PT):" required>
                <div className="flex gap-1">
                  <ArgusInput value="Myocardial infarction" className="flex-1" />
                  <button className="px-2 py-0.5 bg-argus-blue text-white text-10 border border-argus-border-dark">
                    🔍 Search
                  </button>
                </div>
              </ArgusFormField>

              <ArgusFormField label="Listedness (Company):">
                <ArgusSelect
                  options={[
                    { value: 'Listed', label: 'Listed' },
                    { value: 'NotListed', label: 'Not Listed (Unlisted/Unexpected)' },
                  ]}
                  value="NotListed"
                />
              </ArgusFormField>
            </div>
          )}

          {/* ANALYSIS TAB */}
          {activeTab === 4 && (
            <div className="space-y-3">
              <SectionHeader title="WHO-UMC Causality Assessment" />

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-11">A. Plausible time relationship between drug intake and AE?</span>
                  <div className="flex gap-1">
                    <label className="flex items-center gap-1">
                      <input type="radio" checked readOnly /> Yes
                    </label>
                    <label className="flex items-center gap-1">
                      <input type="radio" /> No
                    </label>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-11">B. Response on withdrawal (Dechallenge)?</span>
                  <div className="flex gap-1">
                    <label className="flex items-center gap-1">
                      <input type="radio" checked readOnly /> Yes
                    </label>
                    <label className="flex items-center gap-1">
                      <input type="radio" /> No
                    </label>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-11">C. AE cannot be explained by disease or other drugs?</span>
                  <div className="flex gap-1">
                    <label className="flex items-center gap-1">
                      <input type="radio" checked readOnly /> Yes
                    </label>
                    <label className="flex items-center gap-1">
                      <input type="radio" /> No
                    </label>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-11">D. Rechallenge positive?</span>
                  <div className="flex gap-1">
                    <label className="flex items-center gap-1">
                      <input type="radio" /> Yes
                    </label>
                    <label className="flex items-center gap-1">
                      <input type="radio" checked readOnly /> N/A
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-argus-bg-row-alt p-2 border border-argus-border">
                <span className="font-bold text-11">WHO-UMC Assessment: PROBABLE</span>
                <span className="text-10 text-argus-text-muted ml-2">(Calculated automatically)</span>
              </div>

              <SectionHeader title="Expedited Reporting Assessment" />

              <div className="overflow-x-auto">
                <table className="w-full text-10 border-collapse">
                  <thead>
                    <tr className="bg-argus-blue text-white">
                      <th className="border border-argus-border px-2 py-1 text-left">Authority</th>
                      <th className="border border-argus-border px-2 py-1 text-left">Report Type</th>
                      <th className="border border-argus-border px-2 py-1 text-left">Due Date</th>
                      <th className="border border-argus-border px-2 py-1 text-left">Clock Start</th>
                      <th className="border border-argus-border px-2 py-1 text-center">Days Left</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="border border-argus-border px-2 py-1">CDSCO (India)</td>
                      <td className="border border-argus-border px-2 py-1">7-day</td>
                      <td className="border border-argus-border px-2 py-1">22-JAN-24</td>
                      <td className="border border-argus-border px-2 py-1">15-JAN-24</td>
                      <td className="border border-argus-border px-2 py-1 text-center text-red-600 font-bold">
                        ⚠️ 2
                      </td>
                    </tr>
                    <tr className="bg-argus-bg-row-alt">
                      <td className="border border-argus-border px-2 py-1">FDA (USA)</td>
                      <td className="border border-argus-border px-2 py-1">15-day</td>
                      <td className="border border-argus-border px-2 py-1">30-JAN-24</td>
                      <td className="border border-argus-border px-2 py-1">15-JAN-24</td>
                      <td className="border border-argus-border px-2 py-1 text-center">10</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-argus-border px-2 py-1">EMA (Europe)</td>
                      <td className="border border-argus-border px-2 py-1">15-day</td>
                      <td className="border border-argus-border px-2 py-1">30-JAN-24</td>
                      <td className="border border-argus-border px-2 py-1">15-JAN-24</td>
                      <td className="border border-argus-border px-2 py-1 text-center">10</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ACTIVITIES TAB */}
          {activeTab === 5 && (
            <div className="space-y-3">
              <SectionHeader title="Action Items" />
              <div className="text-10 text-argus-text-muted italic p-2">
                No action items assigned to this case yet.
              </div>
            </div>
          )}

          {/* ADDITIONAL INFO TAB */}
          {activeTab === 6 && (
            <div className="space-y-3">
              <SectionHeader title="Additional Information" />

              <ArgusFormField label="Case Assessment Notes:">
                <textarea className="w-full border border-argus-border px-1 py-0.5 text-11 font-sans min-h-16 focus:outline-none focus:border-argus-light" />
              </ArgusFormField>

              <ArgusFormField label="Reviewer Comments:">
                <textarea className="w-full border border-argus-border px-1 py-0.5 text-11 font-sans min-h-16 focus:outline-none focus:border-argus-light" />
              </ArgusFormField>
            </div>
          )}

          {/* ATTACHMENTS TAB */}
          {activeTab === 7 && (
            <div className="space-y-3">
              <SectionHeader title="Attachments" />

              <button className="px-3 py-1 bg-argus-blue text-white text-10 border border-argus-border-dark hover:bg-argus-light">
                + Upload Document
              </button>

              <div className="text-10 text-argus-text-muted italic p-2">
                No attachments for this case.
              </div>
            </div>
          )}
        </div>

        {/* Footer Action Buttons */}
        <div className="flex justify-between gap-2 mt-4">
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-1 bg-argus-blue text-white text-10 border border-argus-border-dark hover:bg-argus-light font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            <button className="px-4 py-1 bg-gray-400 text-white text-10 border border-gray-600 hover:bg-gray-500">
              Cancel
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleLock}
              className="px-4 py-1 bg-argus-orange text-white text-10 border border-yellow-600 hover:bg-yellow-500 font-bold"
            >
              Lock Case
            </button>
            <button className="px-4 py-1 bg-green-600 text-white text-10 border border-green-700 hover:bg-green-700">
              Submit for Review
            </button>
          </div>
        </div>
      </div>
    </ArgusLayout>
  );
}
