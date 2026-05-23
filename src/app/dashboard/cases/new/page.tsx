'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api-client';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Tabs } from '@/components/Tabs';
import { MEDDRA_TERMS, DRUGS } from '@/lib/constants';
import Link from 'next/link';

export default function NewCasePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('admin');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    administration: {
      receiptDate: new Date().toISOString().split('T')[0],
      caseClassification: 'Spontaneous',
      reportType: 'Initial',
      primaryReporterType: 'Physician',
      countryOfOccurrence: '',
      awarenessDate: new Date().toISOString().split('T')[0],
      isPregnancyCase: false,
    },
    patient: {
      initials: '',
      age: 0,
      sex: 'Unknown',
      weight: 0,
      height: 0,
      ethnicity: '',
      medicalHistory: '',
      concomitantMeds: '',
    },
    reaction: {
      verbatimTerm: '',
      meddraPreferredTerm: '',
      meddraCode: '',
      meddraSoc: '',
      onsetDate: '',
      endDate: '',
      outcome: 'Unknown',
      dateOfDeath: '',
      seriousnessCriteria: [] as string[],
    },
    drug: {
      tradeName: '',
      activeSubstance: '',
      drugRole: 'Suspect',
      indication: '',
      dose: '',
      doseUnit: '',
      routeOfAdmin: '',
      frequency: '',
      startDate: '',
      endDate: '',
      lotNumber: '',
      dechallenge: 'Unknown',
      rechallenge: 'Unknown',
      causality: 'Unassessable',
    },
    narrative: {
      caseNarrative: '',
      labTests: '',
      additionalNotes: '',
    },
    reporter: {
      title: '',
      name: '',
      qualification: 'Physician',
      institution: '',
      city: '',
      country: '',
      phone: '',
      email: '',
      reporterCausality: 'Unassessable',
    },
    status: 'New',
    priority: 'Medium',
  });

  const handleChange = (section: string, field: string, value: any) => {
    setFormData({
      ...formData,
      [section]: {
        ...(formData as any)[section],
        [field]: value,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent, draft: boolean = false) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await api.cases.create(formData);
      router.push(`/dashboard/cases/${result._id}`);
    } catch (error) {
      console.error('Failed to create case:', error);
      alert('Failed to create case');
    } finally {
      setLoading(false);
    }
  };

  const meddraOptions = MEDDRA_TERMS.map((term) => ({
    value: term.code,
    label: `${term.term} (${term.code})`,
  }));

  const drugOptions = DRUGS.map((drug) => ({
    value: drug.name,
    label: drug.name,
  }));

  const administrationTab = (
    <div className="space-y-4">
      <Input
        label="Receipt Date"
        type="date"
        value={formData.administration.receiptDate}
        onChange={(e) =>
          handleChange('administration', 'receiptDate', e.target.value)
        }
        required
      />
      <Input
        label="Case Classification"
        type="select"
        value={formData.administration.caseClassification}
        onChange={(e) =>
          handleChange('administration', 'caseClassification', e.target.value)
        }
        options={[
          { value: 'Spontaneous', label: 'Spontaneous' },
          { value: 'Literature', label: 'Literature' },
          { value: 'Clinical Trial', label: 'Clinical Trial' },
          { value: 'Solicited', label: 'Solicited' },
          { value: 'Regulatory Authority', label: 'Regulatory Authority' },
        ]}
        required
      />
      <Input
        label="Report Type"
        type="select"
        value={formData.administration.reportType}
        onChange={(e) =>
          handleChange('administration', 'reportType', e.target.value)
        }
        options={[
          { value: 'Initial', label: 'Initial' },
          { value: 'Follow-up', label: 'Follow-up' },
        ]}
        required
      />
      <Input
        label="Country of Occurrence"
        type="text"
        value={formData.administration.countryOfOccurrence}
        onChange={(e) =>
          handleChange('administration', 'countryOfOccurrence', e.target.value)
        }
        required
      />
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={formData.administration.isPregnancyCase}
          onChange={(e) =>
            handleChange('administration', 'isPregnancyCase', e.target.checked)
          }
          className="mr-2"
        />
        <span>Pregnancy Case</span>
      </label>
    </div>
  );

  const patientTab = (
    <div className="space-y-4">
      <Input
        label="Patient Initials"
        type="text"
        value={formData.patient.initials}
        onChange={(e) => handleChange('patient', 'initials', e.target.value)}
        required
      />
      <Input
        label="Age"
        type="number"
        value={formData.patient.age}
        onChange={(e) =>
          handleChange('patient', 'age', parseInt(e.target.value))
        }
        required
      />
      <Input
        label="Sex"
        type="select"
        value={formData.patient.sex}
        onChange={(e) => handleChange('patient', 'sex', e.target.value)}
        options={[
          { value: 'M', label: 'Male' },
          { value: 'F', label: 'Female' },
          { value: 'Unknown', label: 'Unknown' },
        ]}
        required
      />
      <Input
        label="Weight (kg)"
        type="number"
        value={formData.patient.weight}
        onChange={(e) =>
          handleChange('patient', 'weight', parseFloat(e.target.value))
        }
      />
      <Input
        label="Height (cm)"
        type="number"
        value={formData.patient.height}
        onChange={(e) =>
          handleChange('patient', 'height', parseFloat(e.target.value))
        }
      />
      <Input
        label="Medical History"
        type="text"
        multiline
        value={formData.patient.medicalHistory}
        onChange={(e) =>
          handleChange('patient', 'medicalHistory', e.target.value)
        }
      />
    </div>
  );

  const reactionTab = (
    <div className="space-y-4">
      <Input
        label="Verbatim Term (as reported)"
        type="text"
        value={formData.reaction.verbatimTerm}
        onChange={(e) =>
          handleChange('reaction', 'verbatimTerm', e.target.value)
        }
        required
      />
      <Input
        label="MedDRA Preferred Term"
        type="select"
        value={formData.reaction.meddraPreferredTerm}
        onChange={(e) => {
          const selected = MEDDRA_TERMS.find((t) => t.code === e.target.value);
          if (selected) {
            handleChange('reaction', 'meddraPreferredTerm', selected.term);
            handleChange('reaction', 'meddraCode', selected.code);
            handleChange('reaction', 'meddraSoc', selected.soc);
          }
        }}
        options={meddraOptions}
        required
      />
      <Input
        label="Event Outcome"
        type="select"
        value={formData.reaction.outcome}
        onChange={(e) => handleChange('reaction', 'outcome', e.target.value)}
        options={[
          { value: 'Recovered', label: 'Recovered' },
          { value: 'Recovering', label: 'Recovering' },
          { value: 'Not Recovered', label: 'Not Recovered' },
          { value: 'Recovered with Sequelae', label: 'Recovered with Sequelae' },
          { value: 'Fatal', label: 'Fatal' },
          { value: 'Unknown', label: 'Unknown' },
        ]}
        required
      />
      <Input
        label="Seriousness Criteria"
        type="text"
        multiline
        value={formData.reaction.seriousnessCriteria.join(', ')}
        onChange={(e) =>
          handleChange(
            'reaction',
            'seriousnessCriteria',
            e.target.value
              .split(',')
              .map((s) => s.trim())
              .filter((s) => s)
          )
        }
        placeholder="Enter criteria separated by commas"
      />
    </div>
  );

  const drugTab = (
    <div className="space-y-4">
      <Input
        label="Drug Name (Trade)"
        type="select"
        value={formData.drug.tradeName}
        onChange={(e) => {
          const selected = DRUGS.find((d) => d.name === e.target.value);
          if (selected) {
            handleChange('drug', 'tradeName', selected.name);
            handleChange('drug', 'activeSubstance', selected.substance);
          }
        }}
        options={drugOptions}
        required
      />
      <Input
        label="Drug Role"
        type="select"
        value={formData.drug.drugRole}
        onChange={(e) => handleChange('drug', 'drugRole', e.target.value)}
        options={[
          { value: 'Suspect', label: 'Suspect' },
          { value: 'Concomitant', label: 'Concomitant' },
          { value: 'Interacting', label: 'Interacting' },
        ]}
        required
      />
      <Input
        label="Dose"
        type="text"
        value={formData.drug.dose}
        onChange={(e) => handleChange('drug', 'dose', e.target.value)}
      />
      <Input
        label="Route of Administration"
        type="text"
        value={formData.drug.routeOfAdmin}
        onChange={(e) =>
          handleChange('drug', 'routeOfAdmin', e.target.value)
        }
      />
      <Input
        label="Causality Assessment"
        type="select"
        value={formData.drug.causality}
        onChange={(e) => handleChange('drug', 'causality', e.target.value)}
        options={[
          { value: 'Certain', label: 'Certain' },
          { value: 'Probable', label: 'Probable' },
          { value: 'Possible', label: 'Possible' },
          { value: 'Unlikely', label: 'Unlikely' },
          { value: 'Unassessable', label: 'Unassessable' },
        ]}
      />
    </div>
  );

  const narrativeTab = (
    <div className="space-y-4">
      <Input
        label="Case Narrative"
        type="text"
        multiline
        rows={6}
        value={formData.narrative.caseNarrative}
        onChange={(e) =>
          handleChange('narrative', 'caseNarrative', e.target.value)
        }
        required
      />
      <Input
        label="Lab Tests Performed"
        type="text"
        multiline
        value={formData.narrative.labTests}
        onChange={(e) =>
          handleChange('narrative', 'labTests', e.target.value)
        }
      />
    </div>
  );

  const reporterTab = (
    <div className="space-y-4">
      <Input
        label="Reporter Name"
        type="text"
        value={formData.reporter.name}
        onChange={(e) => handleChange('reporter', 'name', e.target.value)}
        required
      />
      <Input
        label="Qualification"
        type="select"
        value={formData.reporter.qualification}
        onChange={(e) =>
          handleChange('reporter', 'qualification', e.target.value)
        }
        options={[
          { value: 'Physician', label: 'Physician' },
          { value: 'Pharmacist', label: 'Pharmacist' },
          { value: 'Nurse', label: 'Nurse' },
          { value: 'Consumer', label: 'Consumer' },
          { value: 'Other', label: 'Other' },
        ]}
        required
      />
      <Input
        label="Email"
        type="email"
        value={formData.reporter.email}
        onChange={(e) => handleChange('reporter', 'email', e.target.value)}
      />
      <Input
        label="Phone"
        type="tel"
        value={formData.reporter.phone}
        onChange={(e) => handleChange('reporter', 'phone', e.target.value)}
      />
    </div>
  );

  const tabs = [
    { id: 'admin', label: 'Administration', content: administrationTab },
    { id: 'patient', label: 'Patient', content: patientTab },
    { id: 'reaction', label: 'Reaction/Event', content: reactionTab },
    { id: 'drug', label: 'Drug', content: drugTab },
    { id: 'narrative', label: 'Narrative', content: narrativeTab },
    { id: 'reporter', label: 'Reporter', content: reporterTab },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">New Case Entry</h1>
          <p className="text-gray-600 mt-2">ICH E2B(R3) Compliant Form</p>
        </div>
        <Link href="/dashboard/cases">
          <Button variant="secondary">Cancel</Button>
        </Link>
      </div>

      <Card>
        <Tabs
          tabs={tabs.map((tab) => ({
            id: tab.id,
            label: tab.label,
            content: (
              <div className="space-y-6">
                {tab.content}
                <div className="flex justify-between gap-4">
                  {tabs.findIndex((t) => t.id === activeTab) > 0 && (
                    <Button
                      variant="secondary"
                      onClick={() => {
                        const prevIdx =
                          tabs.findIndex((t) => t.id === activeTab) - 1;
                        setActiveTab(tabs[prevIdx].id);
                      }}
                    >
                      Previous
                    </Button>
                  )}
                  {tabs.findIndex((t) => t.id === activeTab) < tabs.length - 1 && (
                    <Button
                      variant="primary"
                      onClick={() => {
                        const nextIdx =
                          tabs.findIndex((t) => t.id === activeTab) + 1;
                        setActiveTab(tabs[nextIdx].id);
                      }}
                    >
                      Next
                    </Button>
                  )}
                </div>
              </div>
            ),
          }))}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="mt-6 pt-6 border-t border-gray-300 flex gap-4">
          <Button variant="secondary">Save as Draft</Button>
          <Button
            variant="primary"
            onClick={(e: any) => handleSubmit(e, false)}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Case'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
