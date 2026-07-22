'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Target, Zap } from 'lucide-react';

export default function CorporateBento() {
  return (
    <section className="relative min-h-screen bg-[#0A192F]/90 backdrop-blur-2xl border-t border-slate-800">
       {/* Blueprint Background */}
       <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(to_right,#64748B_1px,transparent_1px),linear-gradient(to_bottom,#64748B_1px,transparent_1px)] bg-[size:4rem_4rem]" />
       
       <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 md:py-48">
          <h2 className="text-sm font-mono tracking-[0.2em] text-[#2A86FF] uppercase mb-4 flex items-center gap-4">
            <span className="w-8 h-px bg-[#2A86FF]"></span>
            The Enterprise Protocol
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-16 tracking-tight max-w-2xl">
            Absolute precision for companies and institutions.
          </h3>
          
          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            
            <motion.div 
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, ease: "easeOut" }}
              className="group col-span-1 md:col-span-2 relative overflow-hidden bg-slate-900/50 border border-slate-700/50 rounded-2xl p-8 md:p-12 hover:border-[#2A86FF]/50 transition-colors duration-500"
            >
               <div className="absolute inset-0 bg-gradient-to-br from-[#2A86FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               <CheckCircle className="w-8 h-8 text-[#2A86FF] mb-6" />
               <h4 className="text-2xl font-bold text-white mb-3 relative z-10">Verified Data Ecosystem</h4>
               <p className="text-slate-400 relative z-10 max-w-md">Every student, college, and company on IIB is cryptographically authenticated. Zero noise, 100% signal.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              className="group col-span-1 relative overflow-hidden bg-slate-900/50 border border-slate-700/50 rounded-2xl p-8 md:p-12 hover:border-[#2A86FF]/50 transition-colors duration-500"
            >
               <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               <Target className="w-8 h-8 text-purple-400 mb-6" />
               <h4 className="text-2xl font-bold text-white mb-3 relative z-10">Smart Matching</h4>
               <p className="text-slate-400 relative z-10">AI-driven parameter mapping aligns job requirements instantly with student capabilities.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
              className="group col-span-1 md:col-span-3 relative overflow-hidden bg-slate-900/50 border border-slate-700/50 rounded-2xl p-8 md:p-12 hover:border-[#2A86FF]/50 transition-colors duration-500 flex flex-col md:flex-row items-start md:items-center justify-between"
            >
               <div className="absolute inset-0 bg-gradient-to-r from-[#2A86FF]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               <div className="max-w-xl relative z-10">
                 <Zap className="w-8 h-8 text-yellow-400 mb-6" />
                 <h4 className="text-2xl font-bold text-white mb-3">Placement Automation</h4>
                 <p className="text-slate-400">From LOR generation to Excel/Google Sheets live synchronization, operational workflows are automated.</p>
               </div>
               <div className="mt-8 md:mt-0 relative z-10 border border-slate-700 bg-slate-950 p-4 rounded-xl font-mono text-sm text-[#2A86FF]">
                 &gt; sync_status: LIVE
               </div>
            </motion.div>

          </div>
       </div>
    </section>
  );
}
