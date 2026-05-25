'use client';

import ArgusNavbar from './ArgusNavbar';

interface ArgusLayoutProps {
  children: React.ReactNode;
}

export default function ArgusLayout({ children }: ArgusLayoutProps) {
  return (
    <div className="min-h-screen bg-argus-bg font-sans">
      <ArgusNavbar />
      <div className="flex flex-1">
        {/* Main Content */}
        <main className="flex-1 p-3">
          {children}
        </main>
      </div>
    </div>
  );
}
