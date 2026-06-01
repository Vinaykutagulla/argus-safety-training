'use client';

import { useState } from 'react';
import ArgusLayout from '@/components/ArgusLayout';

export default function AssessmentPage() {
  const [selectedTab, setSelectedTab] = useState('who-umc');

  return (
    <ArgusLayout>
      <div className="bg-argus-bg p-3 space-y-3 text-11 font-sans">
        {/* Title */}
        <div className="text-13 font-bold text-argus-navy mb-4">
          SAFETY ASSESSMENT TOOLS
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-3">
          {[
            { id: 'who-umc', label: 'WHO-UMC Causality' },
            { id: 'listedness', label: 'Listedness Assessment' },
            { id: 'seriousness', label: 'Seriousness Criteria' },
            { id: 'expectedness', label: 'Expectedness' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`px-3 py-1 text-10 font-bold border transition-colors ${
                selectedTab === tab.id
                  ? 'bg-argus-blue text-white border-argus-border-dark'
                  : 'bg-argus-bg-tab-inactive text-argus-text-primary border-argus-border hover:bg-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* WHO-UMC Causality Assessment */}
        {selectedTab === 'who-umc' && (
          <div className="border-2 border-argus-border bg-white">
            <div className="bg-argus-blue text-white px-2 py-1 text-11 font-bold uppercase">
              WHO-UMC CAUSALITY ASSESSMENT CATEGORIES
            </div>
            <div className="p-3 space-y-2 text-10">
              {[
                {
                  name: 'CERTAIN',
                  description: 'Event or laboratory test abnormality, with plausible time relationship to drug intake; cannot be explained by disease or other drugs.',
                  requirements: ['Temporal relationship', 'Dechallenge response (if applicable)', 'Dose-response'],
                },
                {
                  name: 'PROBABLE / LIKELY',
                  description: 'Event or laboratory test abnormality, with reasonable time relationship to drug intake; unlikely to be attributed to disease or other drugs.',
                  requirements: ['Reasonable temporal relationship', 'Response to dechallenge', 'Event is among known reactions'],
                },
                {
                  name: 'POSSIBLE',
                  description: 'Event or laboratory test abnormality, with a temporal relationship to drug intake; could also be explained by disease or other drugs.',
                  requirements: ['Temporal relationship present', 'Could be drug-related', 'Other causes plausible'],
                },
                {
                  name: 'UNLIKELY',
                  description: 'Event or laboratory test abnormality, with a temporal relationship to drug intake; more likely explained by disease or other drugs.',
                  requirements: ['Temporal relationship but weak', 'Event typical of disease', 'Other causes more likely'],
                },
                {
                  name: 'UNRELATED',
                  description: 'No temporal relationship to drug intake; disease or other drugs provide plausible explanations.',
                  requirements: ['No temporal relationship', 'Clear alternative cause', 'No biological plausibility'],
                },
                {
                  name: 'UNASSESSABLE / INCOMPLETE',
                  description: 'Report suggests an adverse reaction but information is insufficient to make a causality assessment.',
                  requirements: ['Insufficient data', 'Missing key information', 'Cannot complete evaluation'],
                },
              ].map((category, idx) => (
                <div key={category.name} className={`border border-argus-border p-2 ${idx % 2 === 0 ? 'bg-white' : 'bg-argus-bg-row-alt'}`}>
                  <div className="font-bold text-argus-navy mb-1">{category.name}</div>
                  <p className="text-9 text-argus-text-muted mb-1">{category.description}</p>
                  <div className="text-9 space-y-0.5">
                    {category.requirements.map((req, i) => (
                      <div key={i} className="flex items-start gap-1">
                        <span className="text-argus-blue font-bold">•</span>
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Listedness Assessment */}
        {selectedTab === 'listedness' && (
          <div className="border-2 border-argus-border bg-white">
            <div className="bg-argus-blue text-white px-2 py-1 text-11 font-bold uppercase">
              LISTEDNESS ASSESSMENT
            </div>
            <div className="p-3 space-y-3 text-10">
              <div className="border border-blue-300 bg-blue-50 p-2">
                <div className="font-bold text-blue-900">✓ LISTED REACTION</div>
                <p className="text-blue-800 text-9 mt-1">
                  Adverse reaction is documented in the product's Summary of Product Characteristics (SmPC) or package insert.
                </p>
                <div className="mt-2 space-y-1 text-9">
                  <div>Implications:</div>
                  <ul className="list-disc list-inside text-9">
                    <li>Reaction is a known adverse effect of the product</li>
                    <li>Expected to be included in routine adverse event reports</li>
                    <li>Does not typically require expedited reporting (unless serious/unexpected outcome)</li>
                  </ul>
                </div>
              </div>

              <div className="border border-red-300 bg-red-50 p-2">
                <div className="font-bold text-red-900">✘ UNLISTED REACTION</div>
                <p className="text-red-800 text-9 mt-1">
                  Adverse reaction is NOT documented in the product's SmPC or package insert.
                </p>
                <div className="mt-2 space-y-1 text-9">
                  <div>Implications:</div>
                  <ul className="list-disc list-inside text-9">
                    <li>Represents a new or previously unreported adverse effect</li>
                    <li>May require expedited reporting in many regulatory jurisdictions</li>
                    <li>Should trigger investigation and follow-up activities</li>
                    <li>May lead to product labeling changes</li>
                  </ul>
                </div>
              </div>

              <div className="border border-orange-300 bg-orange-50 p-2">
                <div className="font-bold text-orange-900">? POTENTIALLY SERIOUS UNLISTED</div>
                <p className="text-orange-800 text-9 mt-1">
                  Unlisted reaction that meets criteria for seriousness (hospitalization, disability, death, etc.)
                </p>
                <div className="mt-1 font-bold text-red-600 text-9">
                  ⚠️ REQUIRES IMMEDIATE EXPEDITED REPORTING
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Seriousness Criteria */}
        {selectedTab === 'seriousness' && (
          <div className="border-2 border-argus-border bg-white">
            <div className="bg-argus-blue text-white px-2 py-1 text-11 font-bold uppercase">
              SERIOUSNESS CRITERIA
            </div>
            <div className="p-3 space-y-2 text-10">
              {[
                {
                  criterion: 'DEATH',
                  definition: 'The adverse reaction resulted in death',
                  icon: '💀',
                },
                {
                  criterion: 'LIFE-THREATENING',
                  definition: 'The adverse reaction, in the view of the reporter, placed the patient at immediate risk of death',
                  icon: '🚨',
                },
                {
                  criterion: 'HOSPITALIZATION',
                  definition: 'The adverse reaction resulted in or prolonged hospitalization',
                  icon: '🏥',
                },
                {
                  criterion: 'DISABILITY / INCAPACITY',
                  definition: 'The adverse reaction resulted in persistent or significant disability or incapacity',
                  icon: '♿',
                },
                {
                  criterion: 'CONGENITAL ANOMALY / BIRTH DEFECT',
                  definition: 'The adverse reaction resulted in an abnormality of fetal development',
                  icon: '👶',
                },
                {
                  criterion: 'MEDICALLY IMPORTANT CONDITION',
                  definition: 'Event may jeopardize patient; may require intervention to prevent serious outcome',
                  icon: '⚠️',
                },
              ].map((item, idx) => (
                <div key={item.criterion} className={`border border-argus-border p-2 flex gap-2 ${idx % 2 === 0 ? 'bg-white' : 'bg-argus-bg-row-alt'}`}>
                  <div className="text-14 flex-shrink-0">{item.icon}</div>
                  <div className="flex-1">
                    <div className="font-bold text-argus-navy">{item.criterion}</div>
                    <p className="text-9 text-argus-text-muted mt-1">{item.definition}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Expectedness */}
        {selectedTab === 'expectedness' && (
          <div className="border-2 border-argus-border bg-white">
            <div className="bg-argus-blue text-white px-2 py-1 text-11 font-bold uppercase">
              EXPECTEDNESS ASSESSMENT
            </div>
            <div className="p-3 space-y-2 text-10">
              <div className="bg-green-50 border border-green-300 p-2">
                <div className="font-bold text-green-900">EXPECTED</div>
                <p className="text-green-800 text-9 mt-1">
                  The adverse reaction is listed in the product's SmPC / labeling AND consistent with the known safety profile.
                </p>
              </div>

              <div className="bg-red-50 border border-red-300 p-2">
                <div className="font-bold text-red-900">UNEXPECTED</div>
                <p className="text-red-800 text-9 mt-1">
                  The adverse reaction is NOT listed in the SmPC / labeling OR differs from the known safety profile in terms of nature, severity, specificity, or outcome.
                </p>
                <p className="text-red-800 text-9 mt-1 font-bold">
                  ⚠️ Unexpected serious reactions typically require expedited reporting
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-300 p-2">
                <div className="font-bold text-yellow-900">PARTIALLY EXPECTED</div>
                <p className="text-yellow-800 text-9 mt-1">
                  The adverse reaction is listed but with different severity or outcome than documented in SmPC.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </ArgusLayout>
  );
}
