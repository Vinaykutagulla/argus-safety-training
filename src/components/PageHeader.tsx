'use client';

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: string;
  actions?: React.ReactNode;
}

export default function PageHeader({
  title,
  description,
  icon,
  actions,
}: PageHeaderProps) {
  return (
    <div className="mb-4">
      <div className="max-w-7xl mx-auto px-4 py-2 border-b border-argus-border-section bg-[color:var(--argus-classic-top)] flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider text-gray-700">Safety Operations Center</div>
          <h1 className="text-2xl font-bold text-argus-navy">{title}</h1>
          {description && <p className="text-sm text-gray-700 mt-1">{description}</p>}
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  );
}
