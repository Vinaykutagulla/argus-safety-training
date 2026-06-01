'use client';

interface InfoPanelProps {
  type?: 'info' | 'warning' | 'error' | 'success';
  title?: string;
  message: string;
  icon?: string;
}

export default function InfoPanel({
  type = 'info',
  title,
  message,
  icon,
}: InfoPanelProps) {
  const typeStyles = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-300',
      text: 'text-blue-700',
      icon: '🛈',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-400',
      text: 'text-yellow-700',
      icon: '⚠️',
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-300',
      text: 'text-red-700',
      icon: '❌',
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-300',
      text: 'text-green-700',
      icon: '✓',
    },
  };

  const style = typeStyles[type];

  return (
    <div className={`${style.bg} border ${style.border} rounded px-3 py-2 mb-3`}>
      <div className={`flex items-start gap-2 text-11 ${style.text}`}>
        <span className="text-12 font-bold mt-0.5">
          {icon || style.icon}
        </span>
        <div className="flex-1">
          {title && (
            <div className="font-bold mb-1">{title}</div>
          )}
          <div>{message}</div>
        </div>
      </div>
    </div>
  );
}
