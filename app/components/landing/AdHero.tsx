'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Dynamically import CloudHero to bypass SSR hydration issues
const CloudHero = dynamic(() => import('../CloudHero'), { 
  ssr: false,
  loading: () => <div className="fixed inset-0 z-0 bg-[#0A192F]" />
});

export default function AdHero() {
  // Custom fast-entrance easing curve
  const customEase = [0.16, 1, 0.3, 1];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: customEase } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2, ease: customEase }
    }
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 pb-16 px-6 overflow-hidden">
      {/* Z-0: The 3D Engine (CloudHero) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CloudHero />
      </div>

      {/* Z-10: Content Layer */}
      <motion.div 
        className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Announcement Badge */}
        <motion.div 
          variants={fadeUp}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-white text-xs font-bold uppercase tracking-wider mb-8 shadow-sm"
        >
          <span className="text-xl">🚀</span> Early Access Intake Closing Soon
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          variants={fadeUp}
          className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 leading-[1.05] mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.9)]"
        >
          All-in-one AI <br className="hidden md:block" /> placement platform.
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          variants={fadeUp}
          className="text-lg md:text-xl text-slate-800 font-semibold max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        >
          Reduce hiring cycles by 40% with cryptographic resumes and instant AI matching.
        </motion.p>

        {/* Call to Action */}
        <motion.div variants={fadeUp} className="mb-6 flex flex-col items-center">
          <Link 
            href="/signup" 
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-white bg-blue-600 rounded-full transition-all hover:bg-blue-700 shadow-[0_0_20px_rgba(37,99,235,0.6)]"
          >
            {/* Pulsing effect built-in with framer-motion */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-blue-600"
              animate={{ opacity: [0.8, 0, 0.8], scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
            <span className="relative z-10 flex items-center gap-2">
              See IIB in Action <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </motion.div>

        {/* Social Proof / Trust Signals */}
        <motion.div variants={fadeUp} className="flex flex-col items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/40 shadow-sm">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
            ))}
          </div>
          <p className="text-xs font-bold text-slate-700 tracking-wide">
            4.9/5 Average Rating <span className="mx-2 text-slate-400">•</span> Trusted by 50+ Top Universities
          </p>
        </motion.div>

      </motion.div>
    </section>
  );
}
