'use client';

import React, { useState } from 'react';

interface MedDRANode {
  code: string;
  name: string;
  level: 'SOC' | 'HLGT' | 'HLT' | 'PT' | 'LLT';
  children?: MedDRANode[];
}

interface MedDRABrowserProps {
  onSelect?: (pt: string, code: string, llt?: string) => void;
  onClose?: () => void;
  isOpen?: boolean;
}

// Sample MedDRA hierarchy for demonstration
const MEDDRA_DATA: MedDRANode[] = [
  {
    code: '10003571',
    name: 'Cardiac Disorders',
    level: 'SOC',
    children: [
      {
        code: '10021331',
        name: 'Ischaemic coronary artery disorders',
        level: 'HLGT',
        children: [
          {
            code: '10021333',
            name: 'Ischaemic coronary artery disorders',
            level: 'HLT',
            children: [
              { code: '10028596', name: 'Myocardial infarction', level: 'PT' },
              { code: '10028599', name: 'Myocardial infarction acute', level: 'PT' },
            ],
          },
        ],
      },
      {
        code: '10003518',
        name: 'Cardiac failures and complications',
        level: 'HLGT',
        children: [
          {
            code: '10003519',
            name: 'Cardiac failure',
            level: 'HLT',
            children: [
              { code: '10007515', name: 'Congestive heart failure', level: 'PT' },
              { code: '10061329', name: 'Acute heart failure', level: 'PT' },
            ],
          },
        ],
      },
    ],
  },
  {
    code: '10009800',
    name: 'Blood and Lymphatic System Disorders',
    level: 'SOC',
    children: [
      {
        code: '10003555',
        name: 'Anaemias',
        level: 'HLGT',
        children: [
          {
            code: '10003559',
            name: 'Anaemias NEC',
            level: 'HLT',
            children: [
              { code: '10002034', name: 'Anaemia', level: 'PT' },
              { code: '10006386', name: 'Iron deficiency anaemia', level: 'PT' },
            ],
          },
        ],
      },
    ],
  },
  {
    code: '10010601',
    name: 'Respiratory, Thoracic and Mediastinal Disorders',
    level: 'SOC',
    children: [
      {
        code: '10037931',
        name: 'Respiratory tract infections',
        level: 'HLGT',
        children: [
          {
            code: '10039104',
            name: 'Lower respiratory tract infections',
            level: 'HLT',
            children: [
              { code: '10011881', name: 'Pneumonia', level: 'PT' },
              { code: '10011814', name: 'Pneumonia aspiration', level: 'PT' },
            ],
          },
        ],
      },
    ],
  },
];

export default function MedDRABrowser({ onSelect, onClose, isOpen = true }: MedDRABrowserProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [selectedPT, setSelectedPT] = useState<{ name: string; code: string } | null>(null);
  const [selectedLLT, setSelectedLLT] = useState<string>();

  const toggleNode = (code: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(code)) {
      newExpanded.delete(code);
    } else {
      newExpanded.add(code);
    }
    setExpandedNodes(newExpanded);
  };

  const handleSelectPT = (pt: string, code: string) => {
    setSelectedPT({ name: pt, code });
  };

  const handleConfirm = () => {
    if (selectedPT) {
      onSelect?.(selectedPT.name, selectedPT.code, selectedLLT);
      onClose?.();
    }
  };

  const filterNodes = (nodes: MedDRANode[], term: string): MedDRANode[] => {
    if (!term) return nodes;
    return nodes.filter((node) => node.name.toLowerCase().includes(term.toLowerCase()));
  };

  const renderNode = (node: MedDRANode, depth: number = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes.has(node.code);
    const filteredChildren = filterNodes(node.children || [], searchTerm);
    const shouldShow = !searchTerm || node.name.toLowerCase().includes(searchTerm.toLowerCase());

    if (!shouldShow && filteredChildren.length === 0) return null;

    return (
      <div key={node.code} className="text-10">
        <div className={`flex items-center gap-1 py-0.5 pl-${depth * 2}`}>
          {hasChildren && (
            <button
              onClick={() => toggleNode(node.code)}
              className="w-4 text-center text-argus-text-label hover:text-argus-blue"
            >
              {isExpanded ? '▼' : '▶'}
            </button>
          )}
          {!hasChildren && <span className="w-4" />}

          <span className="text-argus-text-label font-bold">{node.level}:</span>
          <span className="text-argus-text-muted">{node.code}</span>

          {node.level === 'PT' && (
            <button
              onClick={() => handleSelectPT(node.name, node.code)}
              className={`ml-auto px-2 py-0.5 text-9 border ${
                selectedPT?.code === node.code
                  ? 'bg-argus-blue text-white border-argus-blue'
                  : 'bg-white border-argus-border hover:border-argus-blue'
              }`}
            >
              Select
            </button>
          )}
        </div>

        <div className="text-11 font-bold text-argus-text-primary py-0.5" style={{ paddingLeft: `${depth * 8 + 20}px` }}>
          {node.name}
        </div>

        {isExpanded && filteredChildren.length > 0 && (
          <div className="border-l-2 border-argus-border ml-2">{filteredChildren.map((child) => renderNode(child, depth + 1))}</div>
        )}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white border-2 border-argus-border max-w-2xl w-full max-h-96 flex flex-col">
        {/* Header */}
        <div className="bg-argus-navy text-white px-3 py-2 text-12 font-bold uppercase flex justify-between items-center">
          <span>MedDRA Browser — Preferred Term Search</span>
          <button onClick={onClose} className="text-16 hover:text-gray-300">
            ✕
          </button>
        </div>

        {/* Search */}
        <div className="p-2 border-b border-argus-border bg-argus-bg">
          <input
            type="text"
            placeholder="Search MedDRA terms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-argus-border px-2 py-1 text-11 focus:outline-none focus:border-argus-blue"
          />
        </div>

        {/* Tree View */}
        <div className="flex-1 overflow-auto p-2 bg-white">
          {MEDDRA_DATA.map((node) => renderNode(node))}
        </div>

        {/* Selected Info */}
        {selectedPT && (
          <div className="bg-argus-bg-row-alt p-2 border-t border-argus-border text-10">
            <span className="font-bold">Selected PT: </span>
            <span>{selectedPT.name}</span>
            <span className="text-argus-text-muted ml-2">(Code: {selectedPT.code})</span>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-2 justify-between p-2 border-t border-argus-border bg-argus-bg">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-400 text-white text-10 border border-gray-600 hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedPT}
            className="px-3 py-1 bg-argus-blue text-white text-10 border border-argus-border-dark hover:bg-argus-light disabled:opacity-50"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
}
