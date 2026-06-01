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
    <div className="border-b-2 border-argus-border-section bg-gradient-to-r from-argus-bg to-white mb-4 p-3">
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {icon && <span className="text-16">{icon}</span>}
            <h1 className="text-14 font-bold text-argus-navy uppercase tracking-wide">
              {title}
            </h1>
          </div>
          {description && (
            <p className="text-11 text-argus-text-muted ml-6">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex gap-2 items-center">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
