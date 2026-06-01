'use client';

import ArgusNavbar from './ArgusNavbar';
import ArgusFooter from './ArgusFooter';

interface ArgusLayoutProps {
  children: React.ReactNode;
}

export default function ArgusLayout({ children }: ArgusLayoutProps) {
  return (
    <div className="min-h-screen bg-argus-bg font-sans flex flex-col">
      <ArgusNavbar />
      <div className="flex flex-1">
        {/* Main Content */}
        <main className="flex-1 p-3">
          {children}
        </main>
      </div>
      <ArgusFooter />
    </div>
  );
}
