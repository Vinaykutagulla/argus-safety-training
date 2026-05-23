'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { api } from '@/lib/api-client';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import Link from 'next/link';

export default function CaseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const caseId = params.id as string;
  const [aeCase, setAECase] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    loadCase();
  }, [caseId]);

  const loadCase = async () => {
    try {
      setLoading(true);
      const data = await api.cases.get(caseId);
      setAECase(data);
    } catch (error) {
      console.error('Failed to load case:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, any> = {
      'New': 'info',
      'Open': 'warning',
      'Under Review': 'warning',
      'Closed': 'success',
      'Locked': 'danger',
    };
    return colors[status] || 'gray';
  };

  if (loading) {
    return <div className="text-center py-8">Loading case...</div>;
  }

  if (!aeCase) {
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
