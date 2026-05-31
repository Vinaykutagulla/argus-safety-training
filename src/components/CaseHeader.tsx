'use client';

import React from 'react';

interface CaseHeaderProps {
  caseId: string;
  receiptDate?: string;
  product?: string;
  seriousness?: string;
  status?: string;
  actions?: React.ReactNode;
}

export default function CaseHeader({
  caseId,
  receiptDate,
  product,
  seriousness,
  status,
  actions,
}: CaseHeaderProps) {
  return (
    <div className="bg-argus-bg border-2 border-argus-border p-2 mb-2 text-11">
      <div className="flex justify-between items-center mb-1">
        <div className="flex gap-4 text-argus-text-label font-bold">
          <span>
            Case: <span className="text-argus-blue">{caseId}</span>
          </span>
          {receiptDate && (
            <span>
              Receipt: <span className="text-argus-text-primary">{receiptDate}</span>
            </span>
          )}
          {seriousness && (
            <span>
              <span className="text-red-600">● {seriousness}</span>
            </span>
          )}
          {status && <span className="text-argus-text-muted">[{status}]</span>}
        </div>

        {actions && <div className="flex gap-2">{actions}</div>}
      </div>

      {product && (
        <div className="text-10 text-argus-text-muted">
          Product: <span className="text-argus-text-primary font-bold">{product}</span>
        </div>
      )}
    </div>
  );
}
