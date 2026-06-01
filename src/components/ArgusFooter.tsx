'use client';

export default function ArgusFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-argus-navy text-argus-text-header border-t-2 border-argus-border-dark py-3 px-4 text-center shadow-lg">
      <div className="flex justify-between items-center max-w-full">
        {/* Left: Version Info */}
        <div className="text-9 opacity-75 flex items-center gap-2">
          <span className="font-bold">ARGUS Safety</span>
          <span className="opacity-50">•</span>
          <span>Release 8.4</span>
        </div>

        {/* Center: Copyright */}
        <div className="text-9 opacity-75">
          © {currentYear} Oracle Corporation. All rights reserved.
        </div>

        {/* Right: Status Indicators */}
        <div className="text-9 opacity-75 flex items-center gap-2">
          <span className="text-10">✓ Database Connected</span>
          <span className="opacity-50">•</span>
          <span className="text-10">✓ System Operational</span>
        </div>
      </div>
    </footer>
  );
}
