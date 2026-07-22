'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function FooterCTA() {
  return (
    <section className="relative py-32 px-6 flex flex-col items-center justify-center bg-[#0A192F] border-t border-slate-800 overflow-hidden">
      {/* Radial gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#2A86FF] opacity-10 blur-[120px] rounded-full pointer-events-none" />
      
      <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter text-center mb-8 relative z-10">
        Ready to cross the bridge?
      </h2>
      
      <Link href="/login" className="relative z-10 group bg-white text-[#0A192F] font-bold text-lg px-8 py-4 rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95">
        <span className="relative z-10 flex items-center gap-2">
          Access Platform <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </span>
      </Link>

      <footer className="w-full max-w-7xl mt-32 border-t border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
        <p>© {new Date().getFullYear()} Industry Intelligence Bridge. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </footer>
    </section>
  );
}
