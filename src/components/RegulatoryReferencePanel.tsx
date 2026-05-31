'use client';

import React, { useState } from 'react';
import { useTraining } from '@/lib/training-context';

interface ReferenceSection {
  id: string;
  title: string;
  content: string;
  guidelines: string[];
}

const referenceSections: ReferenceSection[] = [
  {
    id: 'ich-e2a',
    title: 'ICH E2A Guidelines',
    content: 'Clinical Safety Data: Management and Reporting',
    guidelines: [
      '7-day rule: Fatal or life-threatening unlisted adverse reactions',
      '15-day rule: Other serious unexpected adverse reactions',
      'Clock Day 0: Date of case receipt at company',
      'Weekends and holidays do NOT stop the clock',
      'Reporting authorities: FDA, EMA, CDSCO, PMDA, TGA, etc.',
    ],
  },
  {
    id: 'meddra',
    title: 'MedDRA Coding',
    content: 'Medical Dictionary for Regulatory Activities',
    guidelines: [
      'Use MedDRA v27 or later for all adverse event terms',
      'Encode to Preferred Term (PT) level',
      'Include System Organ Class (SOC) for reporting',
      'LLT (Lowest Level Term) shows original verbatim term',
      'Update MedDRA classification annually',
    ],
  },
  {
    id: 'causality',
    title: 'WHO-UMC Causality Assessment',
    content: 'Assessment scale for adverse event relatedness',
    guidelines: [
      'Certain: Event is clearly related to medicine',
      'Probable: Strong relationship with temporal pattern',
      'Possible: Temporal relationship suggestive',
      'Unlikely: No clear temporal relationship',
      'Conditional: Cannot be assessed without more information',
      'Unassessable: Insufficient information to assess',
    ],
  },
  {
    id: 'case-quality',
    title: 'Case Quality Standards',
    content: 'Minimum data requirements for regulatory submission',
    guidelines: [
      'Complete patient demographics (age, gender, weight)',
      'Clear adverse event description with onset/stop dates',
      'Product information (dose, route, duration)',
      'Relevant medical history and concomitant medications',
      'Medical assessment and WHO-UMC causality',
      'Reviewer signature and date before submission',
    ],
  },
  {
    id: 'data-protection',
    title: 'Data Protection & Privacy',
    content: 'Patient privacy and GDPR compliance',
    guidelines: [
      'Collect only minimum necessary patient information',
      'Use initials instead of full patient names',
      'Encrypt sensitive data in transit and at rest',
      'Maintain audit trail for all data access',
      'Comply with local data protection regulations (GDPR, HIPAA)',
      'Retain case data per regulatory requirements (minimum 2 years)',
    ],
  },
];

export default function RegulatoryReferencePanel() {
  const { trainingMode } = useTraining();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['ich-e2a']));

  if (!trainingMode.enabled) {
    return null;
  }

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <div className="fixed right-0 top-0 h-screen w-64 bg-white border-l-4 border-purple-600 shadow-lg overflow-y-auto z-40">
      {/* Header */}
      <div className="bg-purple-600 text-white px-3 py-2 sticky top-0">
        <div className="text-11 font-bold">📋 Regulatory Reference</div>
        <div className="text-9 text-purple-200">ICH E2A Guidelines & Standards</div>
      </div>

      {/* Sections */}
      <div className="space-y-0">
        {referenceSections.map((section) => (
          <div key={section.id} className="border-b border-gray-300">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full text-left px-3 py-2 bg-purple-50 hover:bg-purple-100 transition-colors flex items-center justify-between"
            >
              <div>
                <div className="text-10 font-bold text-purple-800">{section.title}</div>
                <div className="text-9 text-purple-700">{section.content}</div>
              </div>
              <span className="text-11 ml-2">{expandedSections.has(section.id) ? '▼' : '▶'}</span>
            </button>

            {expandedSections.has(section.id) && (
              <div className="px-3 py-2 bg-white space-y-1">
                {section.guidelines.map((guideline, idx) => (
                  <div key={idx} className="text-9 text-argus-text-label">
                    <span className="text-purple-600 font-bold">•</span> {guideline}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-3 py-2 bg-purple-50 text-9 text-purple-800 border-t border-purple-300 mt-2">
        <strong>💡 Tip:</strong> Hover over 🎓 icons for quick field-level guidance. Use this panel for detailed regulatory context.
      </div>
    </div>
  );
}
