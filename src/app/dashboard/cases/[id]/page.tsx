'use client';

import React, { useEffect, useState } from 'react';
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
import { useTraining } from '@/lib/training-context';

export default function CaseFormPage() {
  return <CaseFormContent />;
}

function CaseFormContent() {
  const params = useParams();
  const caseId = params.id as string;
  const isNewCase = caseId === 'new';
  const { trainingMode, setStep } = useTraining();

  const [caseData, setCaseData] = useState<any>(null);
  const [loadingCase, setLoadingCase] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [expandedSections, setExpandedSections] = useState({
    drug1: true,
    event1: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({...prev, [section]: !prev[section]}));
  };

  // Initialize caseData with EMPTY fields for new cases - NO PREFILLED DATA
  useEffect(() => {
    if (isNewCase) {
      setCaseData({
        receiptDate: new Date().toISOString().split('T')[0],
        caseNumber: '',
        caseClassification: 'Spontaneous',
        reportType: 'Initial',
        countryOfOccurrence: 'USA',
        awarenessDate: new Date().toISOString().split('T')[0],
        reportSourceChannel: 'Phone',
        reporterType: 'Physician',
        reporterName: '',
        reporterQualification: '',
        reporterInstitution: '',
        reporterCity: '',
        reporterPhone: '',
        reporterEmail: '',
        isPregnancyCase: false,
        patientInitials: '',
        patientAge: '',
        patientSex: 'Unknown',
        patientMedicalHistory: '',
        products: [
          {
            productName: '',
            activeSubstance: '',
            manufacturer: '',
            drugRole: 'Suspect',
            dose: '',
            doseUnit: 'mg',
            frequency: '',
            routeOfAdmin: 'Oral',
            startDate: '',
            stopDate: '',
            indication: '',
            actionTaken: '',
            whoCausality: '',
            companyCausality: '',
          },
        ],
        reaction: {
          reactionName: '',
          onsetDate: '',
          time: '',
          stopDate: '',
          outcome: 'Unknown',
        },
        meddra: {
          soc: '',
          hlgt: '',
          pt: '',
          code: '',
          listedness: '',
        },
        narrative: '',
        labTests: '',
      });
      setLoadError(null);
      return;
    }

    const fetchCase = async () => {
      setLoadingCase(true);
      setLoadError(null);

      try {
        const response = await fetch(`/api/cases/${caseId}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to load case');
        }

        const payload = await response.json();
        setCaseData(payload);
      } catch (error: any) {
        console.error('Error loading case details:', error);
        setLoadError(error.message || 'Unable to load case');
      } finally {
        setLoadingCase(false);
      }
    };

    fetchCase();
  }, [caseId, isNewCase]);

  const handleAddDrug = () => {
    alert('Drug entry form will be added');
  };

  const handleAddDevice = () => {
    alert('Device entry form will be added');
  };

  const handleAddEvent = () => {
    alert('Event entry form will be added');
  };

  const handleClearProductForm = () => {
    if (caseData && caseData.products) {
      const clearedProducts = caseData.products.map((product: any) => ({
        productName: '',
        activeSubstance: '',
        manufacturer: '',
        drugRole: 'Suspect',
        dose: '',
        doseUnit: 'mg',
        frequency: '',
        routeOfAdmin: 'Oral',
        startDate: '',
        stopDate: '',
        indication: '',
        actionTaken: '',
        whoCausality: '',
        companyCausality: '',
      }));
      setCaseData({ ...caseData, products: clearedProducts });
    }
  };

  const updateProduct = (index: number, field: string, value: any) => {
    if (caseData && caseData.products) {
      const updatedProducts = [...caseData.products];
      updatedProducts[index] = { ...updatedProducts[index], [field]: value };
      setCaseData({ ...caseData, products: updatedProducts });
    }
  };

  const handleFieldChange = (field: string, value: any) => {
    if (caseData) {
      setCaseData({ ...caseData, [field]: value });
    }
  };

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

  const [isSaving, setIsSaving] = useState(false);

  const transformFormDataToAPI = (formData: any) => {
    // Transform form structure to API schema structure
    const firstProduct = formData.products?.[0];
    
    return {
      administration: {
        receiptDate: formData.receiptDate || new Date().toISOString(),
        caseClassification: formData.caseClassification || 'Spontaneous',
        reportType: formData.reportType || 'Initial',
        primaryReporterType: formData.reporterType || 'Physician',
        countryOfOccurrence: formData.countryOfOccurrence || 'USA',
        awarenessDate: formData.awarenessDate || formData.receiptDate || new Date().toISOString(),
        isPregnancyCase: formData.isPregnancyCase || false,
      },
      patient: {
        initials: formData.patientInitials || 'PT',
        age: parseInt(formData.patientAge) || 0,
        sex: formData.patientSex || 'Unknown',
        medicalHistory: formData.patientMedicalHistory || '',
      },
      reaction: {
        verbatimTerm: formData.reaction?.reactionName || 'Adverse Event',
        meddraPreferredTerm: formData.meddra?.pt || 'Adverse Event',
        meddraCode: formData.meddra?.code || '',
        meddraSoc: formData.meddra?.soc || '',
        outcome: formData.reaction?.outcome || 'Unknown',
        onsetDate: formData.reaction?.onsetDate,
        endDate: formData.reaction?.stopDate,
      },
      drug: {
        tradeName: firstProduct?.productName || '',
        activeSubstance: firstProduct?.activeSubstance || '',
        drugRole: firstProduct?.drugRole || 'Suspect',
        indication: firstProduct?.indication || '',
        dose: firstProduct?.dose || '',
        doseUnit: firstProduct?.doseUnit || 'mg',
        routeOfAdmin: firstProduct?.routeOfAdmin || 'Oral',
        frequency: firstProduct?.frequency || '',
        startDate: firstProduct?.startDate,
        endDate: firstProduct?.stopDate,
      },
      narrative: {
        caseNarrative: formData.narrative || 'Case entered during pharmacovigilance training',
        labTests: formData.labTests || '',
      },
      reporter: {
        type: formData.reporterType || 'Physician',
        name: formData.reporterName || '',
        qualification: formData.reporterQualification || '',
        institution: formData.reporterInstitution || '',
        city: formData.reporterCity || '',
        country: formData.reporterCountry || 'USA',
        phone: formData.reporterPhone || '',
        email: formData.reporterEmail || '',
        sourceChannel: formData.reportSourceChannel || 'Phone',
        sourceDocument: formData.sourceDocument || '',
      },
    };
  };

  const extractFormData = () => {
    // Collect all form input values directly from DOM
    const allInputs = document.querySelectorAll('input:not([type="radio"]):not([type="checkbox"]):not([type="hidden"])');
    const textareas = document.querySelectorAll('textarea');
    const formData: any = {
      products: [],
      reaction: {},
    };

    // Extract ALL input values by position/content
    let inputIndex = 0;
    const inputValues: any[] = [];
    
    allInputs.forEach((input: any) => {
      if (input.value) {
        inputValues.push({
          index: inputIndex,
          value: input.value,
          placeholder: input.placeholder,
          name: input.name,
          type: input.type,
        });
      }
      inputIndex++;
    });

    console.log('Extracted inputs:', inputValues);

    // Parse based on content and position
    // Assuming order: caseNumber, receiptDate, reporterName, qualification, institution, city, 
    //                patientInitials, patientAge, (more dates), productName, activeSubstance, dose, startDate, indication,
    //                reactionName, onsetDate
    
    formData.caseNumber = inputValues[0]?.value || 'CASE-' + Date.now();
    formData.receiptDate = inputValues[1]?.value || new Date().toISOString().split('T')[0];
    formData.reporterName = inputValues[2]?.value || '';
    formData.reporterQualification = inputValues[3]?.value || '';
    formData.reporterInstitution = inputValues[4]?.value || '';
    formData.reporterCity = inputValues[5]?.value || '';
    formData.patientInitials = inputValues[6]?.value || 'PT';
    
    // Age might be next or skipped based on form structure
    let ageIndex = 7;
    if (inputValues[ageIndex]?.value && !isNaN(parseInt(inputValues[ageIndex].value))) {
      formData.patientAge = parseInt(inputValues[ageIndex].value);
      ageIndex++;
    } else {
      formData.patientAge = 45;
    }

    // Product fields
    formData.products[0] = {
      productName: inputValues[ageIndex + 2]?.value || '',
      activeSubstance: inputValues[ageIndex + 3]?.value || '',
      dose: inputValues[ageIndex + 4]?.value || '',
      routeOfAdmin: 'Oral',
      startDate: inputValues[ageIndex + 5]?.value || '',
      indication: inputValues[ageIndex + 6]?.value || '',
    };

    // Event/Reaction fields
    const reactionIdx = ageIndex + 8;
    formData.reaction = {
      reactionName: inputValues[reactionIdx]?.value || '',
      onsetDate: inputValues[reactionIdx + 1]?.value || '',
      outcome: 'Unknown',
    };

    // Get patient sex from radio buttons
    const sexRadios = document.querySelectorAll('input[name="gender"]');
    sexRadios.forEach((radio: any) => {
      if (radio.checked) {
        formData.patientSex = radio.value === 'Male' ? 'M' : radio.value === 'Female' ? 'F' : 'Unknown';
      }
    });
    if (!formData.patientSex) formData.patientSex = 'Unknown';

    console.log('Final extracted form data:', formData);
    return formData;
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const url = isNewCase ? '/api/cases' : `/api/cases/${caseId}`;
      const method = isNewCase ? 'POST' : 'PUT';

      // Extract form data from DOM
      const formData = extractFormData();
      console.log('Extracted form data:', JSON.stringify(formData, null, 2));

      // Transform to API schema
      const apiData = transformFormDataToAPI(formData);
      console.log('Transformed API data:', JSON.stringify(apiData, null, 2));

      const response = await fetch(url, {
        method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error Response:', errorData);
        throw new Error(errorData.details || errorData.error || `Failed (${response.status})`);
      }

      const savedCase = await response.json();
      alert(`✅ SUCCESS! Case ${savedCase.caseId} saved!\n\nYou can now enter the next case.`);
      
      // Redirect to cases list to show saved case
      if (isNewCase) {
        setTimeout(() => {
          window.location.href = `/dashboard/cases`;
        }, 1000);
      }
    } catch (error: any) {
      console.error('Save Error:', error);
      alert(`❌ Error saving case:\n${error.message}\n\nPlease fill all required fields: Case#, Receipt Date, Reporter, Patient Age, Product Name, Reaction Name`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLock = async () => {
    if (!caseData?._id && !isNewCase) {
      alert('Cannot lock a new case. Please save first.');
      return;
    }

    try {
      const lockUrl = `/api/cases/${caseData._id || caseId}/lock`;
      const response = await fetch(lockUrl, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to lock case');
      }

      alert(`Case ${caseId} locked. No further modifications allowed.`);
      // Refresh case data to reflect lock status
      window.location.reload();
    } catch (error: any) {
      console.error('Error locking case:', error);
      alert(`Error locking case: ${error.message}`);
    }
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
        {loadingCase && (
          <div className="rounded border border-argus-border bg-argus-bg p-3 text-11 text-argus-text-muted">
            Loading case details...
          </div>
        )}
        {loadError && (
          <div className="rounded border border-red-500 bg-red-50 p-3 text-11 text-red-700">
            Error loading case: {loadError}
          </div>
        )}

        {/* Case Header */}
        <CaseHeader
          caseId={caseData?.caseId || 'NEW'}
          receiptDate={caseData?.administration?.receiptDate
            ? new Date(caseData.administration.receiptDate).toISOString().slice(0, 10)
            : caseData?.receiptDate || 'Unknown'}
          product={caseData?.drug?.tradeName || caseData?.products?.[0]?.productName || 'Unknown'}
          seriousness={caseData?.reaction?.outcome || caseData?.reaction?.seriousness || 'Unknown'}
          status={caseData?.status || caseData?.workflow?.currentStep || 'New'}
          actions={
            <div className="flex gap-2">
              <TrainingModeToggle />
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="px-3 py-1 bg-argus-blue text-white text-10 border border-argus-border-dark hover:bg-argus-light transition-all cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
              <button 
                onClick={handleLock}
                className="px-3 py-1 bg-argus-orange text-white text-10 border border-yellow-600 hover:bg-yellow-500 transition-all cursor-pointer active:scale-95"
              >
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
                        onChange={(e) => handleFieldChange('countryOfOccurrence', e.target.value)}
                      />
                    </ArgusFormField>
                  </TrainingTooltip>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <ArgusFormField label="Awareness Date:" required>
                    <ArgusDateField
                      value={caseData?.administration?.awarenessDate
                        ? new Date(caseData.administration.awarenessDate).toISOString().slice(0, 10)
                        : ''}
                      onChange={(e) => handleFieldChange('awarenessDate', e)}
                    />
                  </ArgusFormField>
                </div>

                <div className="flex-1">
                  <ArgusFormField label="Reporter Type:" required>
                    <ArgusSelect
                      options={[
                        { value: 'Physician', label: 'Physician' },
                        { value: 'Pharmacist', label: 'Pharmacist' },
                        { value: 'Patient', label: 'Patient' },
                        { value: 'Other', label: 'Other' }
                      ]}
                      value={caseData?.reporter?.type || caseData?.administration?.primaryReporterType || 'Physician'}
                      onChange={(e) => handleFieldChange('reporterType', e.target.value)}
                    />
                  </ArgusFormField>
                </div>
              </div>

              <SectionHeader title="Reporter / Source Information" />
              <div className="grid grid-cols-2 gap-4">
                <ArgusFormField label="Reporter Name:" required>
                  <ArgusInput value={caseData?.reporter?.name || ''} onChange={(e) => handleFieldChange('reporterName', e.target.value)} />
                </ArgusFormField>
                <ArgusFormField label="Qualification:">
                  <ArgusInput value={caseData?.reporter?.qualification || ''} onChange={(e) => handleFieldChange('reporterQualification', e.target.value)} />
                </ArgusFormField>
                <ArgusFormField label="Institution:">
                  <ArgusInput value={caseData?.reporter?.institution || ''} onChange={(e) => handleFieldChange('reporterInstitution', e.target.value)} />
                </ArgusFormField>
                <ArgusFormField label="City:">
                  <ArgusInput value={caseData?.reporter?.city || ''} onChange={(e) => handleFieldChange('reporterCity', e.target.value)} />
                </ArgusFormField>
                <ArgusFormField label="Source Channel:">
                  <ArgusSelect
                    options={[
                      { value: 'Phone', label: 'Phone' },
                      { value: 'Email', label: 'Email' },
                      { value: 'Portal', label: 'Portal' },
                      { value: 'Fax', label: 'Fax' },
                      { value: 'Letter', label: 'Letter' },
                      { value: 'Literature', label: 'Literature' },
                      { value: 'Other', label: 'Other' }
                    ]}
                    value={caseData?.reporter?.sourceChannel || 'Phone'}
                    onChange={(e) => handleFieldChange('reportSourceChannel', e.target.value)}
                  />
                </ArgusFormField>
                <ArgusFormField label="Source Document:">
                  <ArgusInput value={caseData?.reporter?.sourceDocument || ''} onChange={(e) => handleFieldChange('sourceDocument', e.target.value)} />
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
                    <ArgusInput placeholder="e.g., JD" maxLength={3} value={caseData?.patientInitials || ''} onChange={(e) => handleFieldChange('patientInitials', e.target.value)} />
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
                      <ArgusInput placeholder="Age" className="w-16" value={caseData?.patientAge || ''} onChange={(e) => handleFieldChange('patientAge', e.target.value)} />
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
                        <input type="radio" name="gender" value="M" checked={caseData?.patientSex === 'M'} onChange={(e) => handleFieldChange('patientSex', 'M')} /> Male
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="gender" value="F" checked={caseData?.patientSex === 'F'} onChange={(e) => handleFieldChange('patientSex', 'F')} /> Female
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="gender" value="Unknown" checked={caseData?.patientSex === 'Unknown' || !caseData?.patientSex} onChange={(e) => handleFieldChange('patientSex', 'Unknown')} /> Unknown
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
                <button 
                  onClick={handleClearProductForm}
                  className="px-2 py-1 bg-red-500 text-white text-10 border border-red-600 hover:bg-red-600 transition-all cursor-pointer active:scale-95"
                >
                  🗑️ Clear Form
                </button>
              </div>

              {caseData?.products?.map((product: any, idx: number) => (
                <div key={idx}>
                  <SectionHeader title={`Drug #${idx + 1}: ${product.productName || 'New Drug'}`} actions={<button onClick={() => toggleSection('drug1')} className="text-10 cursor-pointer hover:text-argus-blue">▲ Collapse</button>} />

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <ArgusFormField label="Trade Name:" required>
                        <ArgusInput 
                          value={product.productName || ''}
                          onChange={(e: any) => updateProduct(idx, 'productName', e.target.value)}
                        />
                      </ArgusFormField>
                    </div>

                    <div className="flex-1">
                      <ArgusFormField label="Generic Name:" required>
                        <ArgusInput 
                          value={product.activeSubstance || ''}
                          onChange={(e: any) => updateProduct(idx, 'activeSubstance', e.target.value)}
                        />
                      </ArgusFormField>
                    </div>
                  </div>

                  <ArgusFormField label="Manufacturer:">
                    <ArgusInput 
                      value={product.manufacturer || ''}
                      onChange={(e: any) => updateProduct(idx, 'manufacturer', e.target.value)}
                    />
                  </ArgusFormField>

                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <ArgusFormField label="Suspect/Concomitant:" required>
                        <div className="space-y-1">
                          <label className="flex items-center gap-2">
                            <input 
                              type="radio" 
                              checked={product.drugRole === 'Suspect'}
                              onChange={() => updateProduct(idx, 'drugRole', 'Suspect')}
                            /> Suspect
                          </label>
                          <label className="flex items-center gap-2">
                            <input 
                              type="radio"
                              checked={product.drugRole === 'Concomitant'}
                              onChange={() => updateProduct(idx, 'drugRole', 'Concomitant')}
                            /> Concomitant
                          </label>
                          <label className="flex items-center gap-2">
                            <input 
                              type="radio"
                              checked={product.drugRole === 'Interacting'}
                              onChange={() => updateProduct(idx, 'drugRole', 'Interacting')}
                            /> Interacting
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
                          value={product.routeOfAdmin || 'Oral'}
                          onChange={(e: any) => updateProduct(idx, 'routeOfAdmin', e.target.value)}
                        />
                      </ArgusFormField>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <ArgusFormField label="Dose:">
                        <div className="flex gap-1">
                          <ArgusInput 
                            value={product.dose || ''}
                            onChange={(e: any) => updateProduct(idx, 'dose', e.target.value)}
                            className="w-16" 
                          />
                          <ArgusSelect options={[{ value: 'mg', label: 'mg' }]} value="mg" className="w-16" />
                          <ArgusSelect
                            options={[{ value: 'Daily', label: 'Daily' }]}
                            value={product.frequency || 'Daily'}
                            onChange={(e: any) => updateProduct(idx, 'frequency', e.target.value)}
                            className="w-24"
                          />
                        </div>
                      </ArgusFormField>
                    </div>

                    <div className="flex-1">
                      <ArgusFormField label="Start Date:">
                        <ArgusDateField 
                          value={product.startDate || ''}
                          onChange={(value: string) => updateProduct(idx, 'startDate', value)}
                        />
                      </ArgusFormField>
                    </div>

                    <div className="flex-1">
                      <ArgusFormField label="Stop Date:">
                        <ArgusDateField 
                          value={product.stopDate || ''}
                          onChange={(value: string) => updateProduct(idx, 'stopDate', value)}
                        />
                      </ArgusFormField>
                    </div>
                  </div>

                  <ArgusFormField label="Indication:">
                    <ArgusInput 
                      value={product.indication || ''}
                      onChange={(e: any) => updateProduct(idx, 'indication', e.target.value)}
                    />
                  </ArgusFormField>

                  <ArgusFormField label="Action Taken:">
                    <ArgusSelect
                      options={[
                        { value: 'Withdrawn', label: 'Drug Withdrawn' },
                        { value: 'Reduced', label: 'Dose Reduced' },
                        { value: 'Increased', label: 'Dose Increased' },
                        { value: 'NotChanged', label: 'Dose Not Changed' },
                      ]}
                      onChange={(e: any) => updateProduct(idx, 'actionTaken', e.target.value)}
                      value={product.actionTaken || ''}
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
                          onChange={(e: any) => updateProduct(idx, 'whoCausality', e.target.value)}
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
                          onChange={(e: any) => updateProduct(idx, 'companyCausality', e.target.value)}
                          value={product.companyCausality || ''}
                        />
                      </ArgusFormField>
                    </div>
                  </div>
                </div>
              ))}
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
                <textarea className="w-full border border-argus-border px-1 py-0.5 text-11 font-sans min-h-10 focus:outline-none focus:border-argus-light" value={caseData?.reaction?.reactionName || caseData?.reaction?.verbatimTerm || ''} onChange={(e: any) => handleFieldChange('reactionName', e.target.value)} />
              </ArgusFormField>

              <div className="flex gap-4">
                <div className="flex-1">
                  <ArgusFormField label="Onset Date:" required>
                    <ArgusDateField 
                      value={caseData?.reaction?.onsetDate 
                        ? new Date(caseData.reaction.onsetDate).toISOString().slice(0, 10)
                        : ''}
                      onChange={(e) => handleFieldChange('onsetDate', e)}
                    />
                  </ArgusFormField>
                </div>

                <div className="flex-1">
                  <ArgusFormField label="Time:">
                    <ArgusInput type="time" />
                  </ArgusFormField>
                </div>

                <div className="flex-1">
                  <ArgusFormField label="Stop Date:">
                    <ArgusDateField />
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
                  value={caseData?.reaction?.outcome || ''}
                  onChange={(e: any) => handleFieldChange('outcome', e.target.value)}
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
