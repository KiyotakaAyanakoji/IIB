'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[110vh] px-6 text-center pointer-events-none">
      <div className="border border-[#2A86FF]/30 text-[#2A86FF] text-xs font-mono uppercase tracking-widest px-4 py-1.5 rounded-full mb-8 backdrop-blur-sm">
        Phase 1: Active
      </div>
      <h1 className="max-w-5xl text-5xl font-extrabold tracking-tighter text-white md:text-7xl/tight drop-shadow-2xl">
        Architecting the <br/> Future of Hiring.
      </h1>
      <p className="max-w-2xl mt-8 text-lg font-medium text-slate-400 drop-shadow-md">
        The intelligent placement infrastructure. Bridging the gap between 
        education and opportunity with verified data and hyper-refractive matching.
      </p>
    </section>
  );
}
