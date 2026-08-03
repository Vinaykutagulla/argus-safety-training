'use client';

export default function ArgusFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-argus-navy text-argus-text-header border-t border-argus-border-dark py-4 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-sm text-white/85">
          <span className="font-semibold">ARGUS Safety</span>
          <span className="opacity-50">•</span>
          <span className="text-sm">Release 8.4</span>
        </div>

        <div className="text-sm text-white/80">© {currentYear} Oracle Corporation. All rights reserved.</div>

        <div className="flex items-center gap-3 text-sm text-white/80">
          <span className="flex items-center gap-2"> <span className="text-emerald-300">✓</span> Database Connected</span>
          <span className="opacity-50">•</span>
          <span className="flex items-center gap-2"> <span className="text-emerald-300">✓</span> System Operational</span>
        </div>
      </div>
    </footer>
  );
}
