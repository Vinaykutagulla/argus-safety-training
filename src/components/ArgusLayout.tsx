'use client';

import ArgusNavbar from './ArgusNavbar';
import ArgusFooter from './ArgusFooter';

interface ArgusLayoutProps {
  children: React.ReactNode;
}

export default function ArgusLayout({ children }: ArgusLayoutProps) {
  return (
    <div className="min-h-screen bg-argus-bg font-sans flex flex-col argus-dense">
      <ArgusNavbar />
      <div className="flex flex-1">
        {/* Main Content */}
        <main className="flex-1">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>
      </div>
      <ArgusFooter />
    </div>
  );
}
