'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
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
import { TrainingProvider, useTraining } from '@/lib/training-context';

export default function CaseFormPage() {
  return (
    <TrainingProvider>
      <CaseFormContent />
    </TrainingProvider>
  );
}

function CaseFormContent() {
  const params = useParams();
  const caseId = params.id as string;
  const isNewCase = caseId === 'new';
  const { trainingMode, setStep } = useTraining();

  // Sample case data
  const [caseData, setCaseData] = useState({
    caseId: isNewCase ? '' : 'ARG-2024-001234',
    receiptDate: '2024-01-15',
    product: 'Metformin 500mg',
    seriousness: 'SERIOUS - Death',
    reportType: 'Spontaneous',
    country: 'USA',
    status: 'Data Entry',
  });

  const [activeTab, setActiveTab] = useState(0);

  const tabs = ['General', 'Patient', 'Products', 'Events', 'Analysis', 'Activities', 'Add. Info', 'Attachments'];

  const workflowStages = [
    { name: 'Intake', completed: true, current: false },
    { name: 'Triage', completed: true, current: false },
    { name: 'Data Entry', completed: false, current: true },
    { name: 'Med Review', completed: false, current: false },
    { name: 'QC', completed: false, current: false },
    { name: 'Lock', completed: false, current: false },
    { name: 'Submit', completed: false, current: false },
  ];

  const handleSave = () => {
    console.log('Saving case:', caseData);
  };

  const handleLock = () => {
    console.log('Locking case:', caseId);
  };

  // Training tutorial steps for new case entry
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
      title: 'Step 1: General Information',
      description: 'Capture the initial receipt date, country of incidence, and report type (Spontaneous/Study/Literature).',
      hint: 'Always capture the date the case was first reported to your organization.',
      learningObjective: 'Correctly classify and date an adverse event report',
      guidelineReference: 'ICH E2A Section 3.1: Administrative Information',
    },
    {
      id: '3',
      title: 'Step 2: Patient Demographics',
      description: 'Record patient age, gender, weight, and relevant medical history.',
      hint: 'Use patient initials only; do not enter full names for privacy.',
      learningObjective: 'Protect patient privacy while capturing essential data',
      guidelineReference: 'ICH E2A Section 3.2: Patient Information',
    },
    {
      id: '4',
      title: 'Step 3: Product Information',
      description: 'Document the suspected drug (trade name, dose, route, indication, dates of use).',
      hint: 'Distinguish between Suspect, Concomitant, and Interacting medications.',
      learningObjective: 'Accurately document product exposure and identify suspect medication',
      guidelineReference: 'ICH E2A Section 3.3: Reaction & Product History',
    },
    {
      id: '5',
      title: 'Step 4: Adverse Event Reporting',
      description: 'Record the verbatim term, onset date, outcome, and MedDRA coding.',
      hint: 'Always code to Preferred Term (PT) level using current MedDRA version.',
      learningObjective: 'Apply MedDRA coding and identify serious outcomes',
      guidelineReference: 'ICH E2A Section 3.3: Reaction Description & MedDRA',
    },
    {
      id: '6',
      title: 'Step 5: Causality Assessment',
      description: 'Apply WHO-UMC causality scale (Certain/Probable/Possible/Unlikely).',
      hint: 'Use temporal relationship, dechallenge/rechallenge, and alternative causes.',
      learningObjective: 'Assess relatedness of adverse event to medication',
      guidelineReference: 'WHO-UMC Causality Assessment Scale',
    },
    {
      id: '7',
      title: 'Step 6: Review & Submit',
      description: 'Verify all information, check for expedited reporting requirements, and lock the case.',
      hint: 'Expedited 7-day reporting: Fatal/Life-threatening unlisted reactions. 15-day: Other serious unexpected.',
      learningObjective: 'Identify expedited reporting obligations per ICH E2A',
      guidelineReference: 'ICH E2A Section 7: Expedited Reporting (7-day/15-day)',
    },
  ];

  return (
    <ArgusLayout>
      <RegulatoryReferencePanel />
      <div className={`bg-argus-bg p-3 space-y-2 text-11 font-sans min-h-screen ${trainingMode.enabled ? 'mr-64' : ''}`}>
        {/* Case Header */}
        <CaseHeader
          caseId={caseData.caseId || 'NEW'}
          receiptDate={caseData.receiptDate}
          product={caseData.product}
          seriousness={caseData.seriousness}
          status={caseData.status}
          actions={
            <div className="flex gap-2">
              <TrainingModeToggle />
              <button className="px-3 py-1 bg-argus-blue text-white text-10 border border-argus-border-dark hover:bg-argus-light">
                Save
              </button>
              <button className="px-3 py-1 bg-argus-orange text-white text-10 border border-yellow-600 hover:bg-yellow-500">
                Lock
              </button>
            </div>
          }
        />

        {/* Workflow Progress Bar */}
        <WorkflowBar stages={workflowStages} />

        {/* Tab Navigation */}
        <div className="flex gap-0 bg-argus-bg border-b-2 border-argus-border">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-3 py-1 text-11 font-bold border-r border-argus-border ${
                idx === activeTab
                  ? 'bg-argus-bg-tab-active text-argus-text-primary border-b-2 border-argus-blue'
                  : 'bg-argus-bg-tab-inactive text-argus-text-label'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white border-2 border-argus-border p-3">
          {/* GENERAL TAB */}
          {activeTab === 0 && (
            <div className="space-y-3">
              <SectionHeader title="General Information" />

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
                        value={caseData.receiptDate}
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
                      <ArgusSelect
                        options={[
                          { value: 'USA', label: 'United States' },
                          { value: 'India', label: 'India' },
                          { value: 'UK', label: 'United Kingdom' },
                          { value: 'Canada', label: 'Canada' },
                        ]}
                        value={caseData.country}
                        onChange={(e) => setCaseData({ ...caseData, country: e.target.value })}
                      />
                    </ArgusFormField>
                  </TrainingTooltip>
                </div>
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
                <button className="px-2 py-1 bg-argus-blue text-white text-10 border border-argus-border-dark hover:bg-argus-light">
                  + Add Drug
                </button>
                <button className="px-2 py-1 bg-argus-blue text-white text-10 border border-argus-border-dark hover:bg-argus-light">
                  + Add Device
                </button>
              </div>

              <SectionHeader title="Drug #1: Metformin" actions={<button className="text-10">▲ Collapse</button>} />

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
              <button className="px-2 py-1 bg-argus-blue text-white text-10 border border-argus-border-dark hover:bg-argus-light">
                + Add Event
              </button>

              <SectionHeader title="Event #1" actions={<button className="text-10">▲ Collapse</button>} />

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
              className="px-4 py-1 bg-argus-blue text-white text-10 border border-argus-border-dark hover:bg-argus-light font-bold"
            >
              Save
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
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Case not found</p>
        <Link href="/dashboard/cases">
          <Button variant="primary" className="mt-4">
            Back to Cases
          </Button>
        </Link>
      </div>
    );
  }

  const tabs = [
    { label: 'Administration', id: 'admin' },
    { label: 'Patient', id: 'patient' },
    { label: 'Reaction/Event', id: 'reaction' },
    { label: 'Drug', id: 'drug' },
    { label: 'Narrative', id: 'narrative' },
    { label: 'Reporter', id: 'reporter' },
    { label: 'Audit Trail', id: 'audit' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{aeCase.caseId}</h1>
          <div className="flex gap-2 mt-2">
            <Badge variant={getStatusColor(aeCase.status) as any}>{aeCase.status}</Badge>
            <Badge variant={aeCase.priority === 'High' ? 'danger' : 'info'}>
              {aeCase.priority} Priority
            </Badge>
          </div>
        </div>
        <Link href="/dashboard/cases">
          <Button variant="secondary">Back to Cases</Button>
        </Link>
      </div>

      {/* Workflow Steps */}
      <Card>
        <div className="flex items-center justify-between text-sm">
          {['Intake', 'Triage', 'Data Entry', 'Medical Review', 'QC Check', 'Lock', 'Submit'].map(
            (step, idx) => (
              <div key={idx} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                    idx <= 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {idx + 1}
                </div>
                <span className="ml-2">{step}</span>
                {idx < 6 && <div className="w-8 h-0.5 bg-gray-300 mx-2" />}
              </div>
            )
          )}
        </div>
      </Card>

      {/* Tabs */}
      <Card>
        <div className="border-b border-gray-300 mb-6">
          <div className="flex gap-0">
            {tabs.map((tab, idx) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(idx)}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === idx
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-4">
          {activeTab === 0 && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Receipt Date</p>
                <p className="font-medium">
                  {new Date(aeCase.administration?.receiptDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Case Classification</p>
                <p className="font-medium">{aeCase.administration?.caseClassification}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Report Type</p>
                <p className="font-medium">{aeCase.administration?.reportType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Country of Occurrence</p>
                <p className="font-medium">{aeCase.administration?.countryOfOccurrence}</p>
              </div>
            </div>
          )}

          {activeTab === 1 && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Patient Initials</p>
                <p className="font-medium">{aeCase.patient?.initials}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Age</p>
                <p className="font-medium">{aeCase.patient?.age} years</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Sex</p>
                <p className="font-medium">{aeCase.patient?.sex}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Ethnicity</p>
                <p className="font-medium">{aeCase.patient?.ethnicity || 'Not specified'}</p>
              </div>
              {aeCase.patient?.medicalHistory && (
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Medical History</p>
                  <p className="font-medium">{aeCase.patient?.medicalHistory}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 2 && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Verbatim Term</p>
                <p className="font-medium">{aeCase.reaction?.verbatimTerm}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">MedDRA PT</p>
                <p className="font-medium">{aeCase.reaction?.meddraPreferredTerm}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">MedDRA Code</p>
                <p className="font-medium">{aeCase.reaction?.meddraCode}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">SOC</p>
                <p className="font-medium">{aeCase.reaction?.meddraSoc}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Outcome</p>
                <p className="font-medium">{aeCase.reaction?.outcome}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Seriousness</p>
                <div className="flex gap-2 flex-wrap">
                  {aeCase.reaction?.seriousnessCriteria?.map((criteria: string) => (
                    <Badge key={criteria} variant="danger">
                      {criteria}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 3 && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Trade Name</p>
                <p className="font-medium">{aeCase.drug?.tradeName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Substance</p>
                <p className="font-medium">{aeCase.drug?.activeSubstance}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Drug Role</p>
                <p className="font-medium">{aeCase.drug?.drugRole}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Causality</p>
                <p className="font-medium">{aeCase.drug?.causality || 'Not assessed'}</p>
              </div>
            </div>
          )}

          {activeTab === 4 && (
            <div>
              <p className="text-sm text-gray-600">Narrative</p>
              <p className="font-medium whitespace-pre-wrap">{aeCase.narrative?.caseNarrative}</p>
            </div>
          )}

          {activeTab === 5 && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Reporter Name</p>
                <p className="font-medium">{aeCase.reporter?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Qualification</p>
                <p className="font-medium">{aeCase.reporter?.qualification}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Institution</p>
                <p className="font-medium">{aeCase.reporter?.institution || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{aeCase.reporter?.email || 'Not specified'}</p>
              </div>
            </div>
          )}

          {activeTab === 6 && (
            <div className="space-y-3">
              {aeCase.auditTrail?.map((entry: any, idx: number) => (
                <div key={idx} className="pb-3 border-b border-gray-200">
                  <div className="flex justify-between">
                    <p className="font-medium">{entry.action}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(entry.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">By: {entry.performedBy}</p>
                  {entry.details && <p className="text-sm text-gray-600">{entry.details}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        {aeCase.status !== 'Locked' && aeCase.status !== 'Closed' && (
          <Link href={`/dashboard/cases/${caseId}/edit`}>
            <Button variant="primary">Edit Case</Button>
          </Link>
        )}
        {aeCase.status === 'Open' && (
          <Button variant="warning">Submit for Review</Button>
        )}
      </div>
    </div>
  );
}
