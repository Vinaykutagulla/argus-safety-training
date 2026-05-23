'use client';

import { Card } from '@/components/Card';
import { REGULATORY_REQUIREMENTS, WHO_UMC_CAUSALITY } from '@/lib/constants';

export default function AssessmentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Safety Assessment</h1>
        <p className="text-gray-600 mt-2">Pharmacovigilance assessment tools and reference data</p>
      </div>

      {/* Listedness Assessment */}
      <Card>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Listedness Assessment</h2>
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded">
            <p className="font-medium text-blue-900">Listed Reaction</p>
            <p className="text-sm text-blue-700 mt-1">Adverse reaction is documented in the product SmPC (Summary of Product Characteristics)</p>
          </div>
          <div className="p-3 bg-red-50 border border-red-200 rounded">
            <p className="font-medium text-red-900">Unlisted Reaction</p>
            <p className="text-sm text-red-700 mt-1">Adverse reaction is NOT documented in the product SmPC</p>
          </div>
        </div>
      </Card>

      {/* WHO-UMC Causality Assessment */}
      <Card>
        <h2 className="text-xl font-bold text-gray-900 mb-4">WHO-UMC Causality Criteria</h2>
        <div className="space-y-3">
          {WHO_UMC_CAUSALITY.map((criteria) => (
            <div key={criteria} className="p-3 border border-gray-200 rounded">
              <p className="font-medium text-gray-900">{criteria}</p>
              <p className="text-sm text-gray-600 mt-1">
                {criteria === 'Certain' && 'Good temporal relationship to drug, dechallenge positive, rechallenge positive'}
                {criteria === 'Probable' && 'Reasonable temporal relationship, likely to be drug-related'}
                {criteria === 'Possible' && 'Temporal relationship unclear, could be consistent with drug reaction'}
                {criteria === 'Unlikely' && 'Temporal relationship unclear, unlikely to be drug-related'}
                {criteria === 'Unassessable' && 'Insufficient information to make assessment'}
                {criteria === 'Unrelated' && 'Clearly not related to drug administration'}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Expedited Reporting Decision Logic */}
      <Card>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Expedited Reporting Decision</h2>
        <div className="space-y-3">
          <div className="p-3 bg-red-50 border border-red-200 rounded">
            <p className="font-medium text-red-900">🚨 7-Day Report</p>
            <p className="text-sm text-red-700 mt-1">Fatal OR Life-threatening + Unexpected</p>
          </div>
          <div className="p-3 bg-orange-50 border border-orange-200 rounded">
            <p className="font-medium text-orange-900">⚠️ 15-Day Report</p>
            <p className="text-sm text-orange-700 mt-1">Serious + Unexpected (non-fatal)</p>
          </div>
          <div className="p-3 bg-green-50 border border-green-200 rounded">
            <p className="font-medium text-green-900">📋 Periodic Report</p>
            <p className="text-sm text-green-700 mt-1">Serious + Expected OR Non-serious</p>
          </div>
        </div>
      </Card>

      {/* Regulatory Requirements */}
      <Card>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Regulatory Requirements by Region</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(REGULATORY_REQUIREMENTS).map(([region, data]) => (
            <div key={region} className="p-4 border border-gray-200 rounded">
              <p className="font-bold text-gray-900">{region}</p>
              <p className="text-sm text-gray-600 mt-1">{data.country}</p>
              <div className="mt-3 space-y-2 text-sm">
                <p><span className="font-medium">7-day:</span> {data.sevenDay}</p>
                <p><span className="font-medium">15-day:</span> {data.fifteenDay}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Medical Reviewer Comments Template */}
      <Card>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Medical Reviewer Assessment</h2>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded"
          rows={6}
          placeholder="Enter medical review comments, causality assessment, and recommendations..."
        />
      </Card>
    </div>
  );
}
