'use client';

import ArgusNavbar from './ArgusNavbar';

interface ArgusLayoutProps {
  children: React.ReactNode;
}

export default function ArgusLayout({ children }: ArgusLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 font-sans">
      <ArgusNavbar />
      <div className="flex flex-1">
        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
