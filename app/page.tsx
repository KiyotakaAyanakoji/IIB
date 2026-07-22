'use client';

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Bot, Target, ShieldCheck, Database, Network, Zap, CheckCircle2, Building2, GraduationCap, Briefcase, Menu, X, Lock } from 'lucide-react';

const customEase = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: customEase } }
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1, ease: customEase }
  }
};

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const getFloatConfig = (distance: number, duration: number, delay: number = 0) => {
    return shouldReduceMotion ? {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.8, delay }
    } : {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: [0, -distance, 0] },
      transition: { 
        opacity: { duration: 0.8, delay },
        y: { repeat: Infinity, duration, ease: "easeInOut", delay: delay + 0.8 }
      }
    };
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#2A86FF] selection:text-white overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 sm:px-12 lg:px-16 py-4">
          {/* Left: Logo */}
          <div className="flex-1 flex justify-start">
            <div className="text-2xl font-black tracking-tighter text-[#0A192F]">
              IIB<span className="text-[#2A86FF]">.</span>
            </div>
          </div>
          
          {/* Center: Links (Desktop) */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-500">
            <Link href="#product" className="hover:text-[#2A86FF] transition-colors">Product</Link>
            <Link href="#features" className="hover:text-[#2A86FF] transition-colors">Features</Link>
            <Link href="#ecosystem" className="hover:text-[#2A86FF] transition-colors">Ecosystem</Link>
            <Link href="#testimonials" className="hover:text-[#2A86FF] transition-colors">Testimonials</Link>
          </div>

          {/* Right: Actions (Desktop) */}
          <div className="hidden md:flex flex-1 items-center justify-end gap-4">
            <Link href="/contact" className="text-sm font-semibold text-slate-600 hover:text-[#0A192F] transition-colors">
              Request Demo
            </Link>
            <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-[#0A192F] transition-colors">
              Sign in
            </Link>
            <Link href="/signup" className="text-sm font-bold bg-[#2A86FF] text-white px-5 py-2.5 rounded-full hover:bg-blue-700 transition-all shadow-sm hover:shadow-md hover:-translate-y-[1px] whitespace-nowrap">
              Create Account
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex-1 flex justify-end">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="p-2 -mr-2 text-slate-600 hover:text-[#0A192F] transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-6 text-lg font-bold text-[#0A192F]">
              <Link href="#product" onClick={() => setIsMobileMenuOpen(false)}>Product</Link>
              <Link href="#features" onClick={() => setIsMobileMenuOpen(false)}>Features</Link>
              <Link href="#ecosystem" onClick={() => setIsMobileMenuOpen(false)}>Ecosystem</Link>
              <Link href="#testimonials" onClick={() => setIsMobileMenuOpen(false)}>Testimonials</Link>
              <hr className="border-slate-100" />
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Request Demo</Link>
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>Sign in</Link>
              <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)} className="bg-[#2A86FF] text-white px-6 py-4 rounded-xl text-center shadow-sm">
                Create Account
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-40 pb-20 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto text-center flex flex-col items-center justify-center min-h-[90vh]">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white pointer-events-none" />

        {/* Floating Data Nodes */}
        <motion.div {...getFloatConfig(10, 4, 0.1)} className="hidden lg:flex absolute top-32 left-10 xl:left-[15%] bg-white p-4 rounded-2xl shadow-sm ring-1 ring-slate-900/5 items-center gap-3 z-10 shrink-0 whitespace-nowrap min-w-max">
          <Database className="w-6 h-6 text-[#2A86FF]" />
          <div className="text-left"><p className="text-xs font-bold text-[#0A192F]">Data Sync</p><p className="text-[10px] text-slate-400">Live</p></div>
        </motion.div>
        <motion.div {...getFloatConfig(-15, 5, 0.3)} className="hidden lg:flex absolute top-48 right-10 xl:right-[15%] bg-white p-4 rounded-2xl shadow-sm ring-1 ring-slate-900/5 items-center gap-3 z-10 shrink-0 whitespace-nowrap min-w-max">
          <Bot className="w-6 h-6 text-purple-600" />
          <div className="text-left"><p className="text-xs font-bold text-[#0A192F]">AI Engine</p><p className="text-[10px] text-slate-400">Active</p></div>
        </motion.div>
        <motion.div {...getFloatConfig(15, 6, 0.5)} className="hidden lg:flex absolute bottom-32 left-10 xl:left-[20%] bg-white p-4 rounded-2xl shadow-sm ring-1 ring-slate-900/5 items-center gap-3 z-10 shrink-0 whitespace-nowrap min-w-max">
          <Target className="w-6 h-6 text-green-600" />
          <div className="text-left"><p className="text-xs font-bold text-[#0A192F]">Precision Match</p><p className="text-[10px] text-slate-400">99.8%</p></div>
        </motion.div>

        {/* Core Hero Text & CTA */}
        <motion.div initial="hidden" animate="show" variants={containerVariants} className="relative z-20 max-w-4xl flex flex-col items-center">
          
          {/* High Contrast Badge */}
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-widest mb-8 shadow-sm">
            <span className="text-base">🚀</span> The New Standard in IT Hiring
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="text-[clamp(2.5rem,6vw,5.5rem)] font-black tracking-tighter text-[#0A192F] leading-[1.05] mb-8">
            All-in-one AI <br className="hidden md:block" /> placement platform.
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-[clamp(1rem,2vw,1.25rem)] text-slate-500 font-medium max-w-3xl mx-auto mb-10 leading-relaxed">
            Streamline hiring with cryptographic resumes, multi-tenant verification, and precision AI matching built for colleges and enterprises.
          </motion.p>
          
          <motion.div variants={fadeUp} className="mb-10">
            <Link href="/signup" className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-white bg-[#2A86FF] rounded-full transition-all hover:bg-blue-700 shadow-[0_0_20px_rgba(42,134,255,0.4)] hover:shadow-[0_0_30px_rgba(42,134,255,0.6)] hover:-translate-y-1">
              <span className="relative z-10 flex items-center gap-2">
                Cross the Bridge <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </motion.div>

          {/* Social Proof / Security Badges below CTA */}
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center items-center gap-6 text-slate-400 text-sm font-semibold">
            <div className="flex items-center gap-2"><Lock className="w-4 h-4" /> SOC2 Type II Certified</div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-300"></div>
            <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> End-to-End Encryption</div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-300"></div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Cryptographically Verified</div>
          </motion.div>

        </motion.div>
      </section>

      {/* --- BENTO GRID SECTION --- */}
      <section id="product" className="bg-slate-50/50 py-32 px-6 sm:px-12 lg:px-16 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0A192F] mb-4">Built for the Ecosystem</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">A unified multi-tenant architecture designed exclusively for the three pillars of the placement ecosystem.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Students */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="col-span-1 bg-white p-8 rounded-3xl shadow-sm ring-1 ring-slate-900/5 flex flex-col h-full hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 text-[#2A86FF] rounded-xl flex items-center justify-center mb-6">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#0A192F]">For Students</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                AI-driven resume optimization, skill-gap analysis, and real-time application tracking. Empowering both College and External students to land their ideal roles.
              </p>
              <div className="w-full bg-slate-50 rounded-xl ring-1 ring-slate-900/5 p-4 font-mono text-xs text-[#2A86FF] flex flex-col gap-2">
                 <div className="flex justify-between items-center bg-white p-2 rounded shadow-sm"><span>Resume Score</span> <span className="font-bold">98/100</span></div>
                 <div className="flex justify-between items-center bg-white p-2 rounded shadow-sm"><span>Skill Match</span> <span className="font-bold text-green-500">High</span></div>
              </div>
            </motion.div>

            {/* Card 2: Enterprise Leaders */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: 0.1 }} variants={fadeUp} className="col-span-1 bg-white p-8 rounded-3xl shadow-sm ring-1 ring-slate-900/5 flex flex-col h-full hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#0A192F]">For Enterprise & Recruiters</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                Always up-to-date hiring data, verified talent pools, and bulk execution workflows. Stop sifting through noise and instantly access cryptographically verified candidates.
              </p>
              <ul className="space-y-3 mb-2 bg-slate-50 rounded-xl p-4 ring-1 ring-slate-900/5">
                <li className="flex items-center gap-2 text-sm font-semibold text-slate-700"><CheckCircle2 className="w-4 h-4 text-green-500"/> Verified Talent Pool</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-slate-700"><CheckCircle2 className="w-4 h-4 text-green-500"/> Cryptographic Resumes</li>
              </ul>
            </motion.div>

            {/* Card 3: Colleges & Placement */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: 0.2 }} variants={fadeUp} className="col-span-1 bg-white p-8 rounded-3xl shadow-sm ring-1 ring-slate-900/5 flex flex-col h-full hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-6">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#0A192F]">For Colleges & Coordinators</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                Complete institutional tracking, one-click LOR generation, and automated live synchronization with Excel and Google Sheets for effortless reporting.
              </p>
              <div className="w-full bg-[#0A192F] rounded-xl ring-1 ring-slate-900/10 p-4 font-mono text-xs text-green-400">
                 &gt; SYNC: Google_Sheets_API<br/>
                 &gt; STATUS: Connected<br/>
                 &gt; RECORDS_UPDATED: 4,291
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- INTEGRATIONS SECTION --- */}
      <section id="ecosystem" className="py-32 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto overflow-hidden bg-white">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="text-center mb-24">
          <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center mx-auto mb-6 shrink-0">
            <Zap className="w-6 h-6" />
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight text-[#0A192F] mb-4">
            Integrate with your existing <br/> tools in seconds
          </h2>
          <p className="text-[clamp(0.875rem,1.5vw,1.125rem)] text-slate-500 max-w-2xl mx-auto">IIB central intelligence connects securely with your enterprise tools, ATS platforms, and verification pipelines.</p>
        </motion.div>

        {/* Node Connectivity Visualization */}
        <div className="relative w-full max-w-4xl mx-auto h-[400px] flex items-center justify-center">
          {/* Central IIB Node */}
          <div className="relative z-20 w-24 h-24 bg-[#2A86FF] rounded-3xl shadow-[0_0_40px_rgba(42,134,255,0.4)] flex items-center justify-center text-white font-black text-3xl shrink-0">
            IIB
          </div>

          {/* SVG Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.05))' }}>
            <path d="M 450 200 L 250 100" stroke="#E2E8F0" strokeWidth="2" fill="none" strokeDasharray="5,5" />
            <path d="M 450 200 L 200 300" stroke="#E2E8F0" strokeWidth="2" fill="none" strokeDasharray="5,5" />
            <path d="M 450 200 L 650 100" stroke="#E2E8F0" strokeWidth="2" fill="none" strokeDasharray="5,5" />
            <path d="M 450 200 L 700 300" stroke="#E2E8F0" strokeWidth="2" fill="none" strokeDasharray="5,5" />
          </svg>

          {/* Orbiting Tools */}
          <motion.div {...getFloatConfig(5, 4, 0.2)} className="absolute top-16 left-1/4 w-20 h-20 bg-white rounded-2xl shadow-sm ring-1 ring-slate-900/5 flex flex-col items-center justify-center z-10 gap-1 shrink-0 aspect-square">
            <Database className="w-6 h-6 text-green-600" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">ATS</span>
          </motion.div>
          <motion.div {...getFloatConfig(-5, 5, 0.4)} className="absolute bottom-16 left-[20%] w-20 h-20 bg-white rounded-2xl shadow-sm ring-1 ring-slate-900/5 flex flex-col items-center justify-center z-10 gap-1 shrink-0 aspect-square">
             <ShieldCheck className="w-6 h-6 text-[#0A192F]" />
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Verify</span>
          </motion.div>
          <motion.div {...getFloatConfig(8, 6, 0.6)} className="absolute top-16 right-1/4 w-20 h-20 bg-white rounded-2xl shadow-sm ring-1 ring-slate-900/5 flex flex-col items-center justify-center z-10 gap-1 shrink-0 aspect-square">
             <Bot className="w-6 h-6 text-purple-600" />
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">AI Core</span>
          </motion.div>
          <motion.div {...getFloatConfig(-8, 4.5, 0.8)} className="absolute bottom-20 right-[15%] w-20 h-20 bg-white rounded-2xl shadow-sm ring-1 ring-slate-900/5 flex flex-col items-center justify-center z-10 gap-1 shrink-0 aspect-square">
             <Network className="w-6 h-6 text-[#2A86FF]" />
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Network</span>
          </motion.div>
        </div>
      </section>

      {/* --- GIANT FOOTER --- */}
      <footer className="relative pt-32 pb-12 overflow-hidden bg-white border-t border-slate-100">
        
        {/* The background watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden opacity-[0.02] z-0">
          <span className="text-[30vw] font-black text-[#0A192F] tracking-tighter whitespace-nowrap">
            IIB
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="font-black text-2xl tracking-tighter mb-4 text-[#0A192F]">
              IIB<span className="text-[#2A86FF]">.</span>
            </div>
            <p className="text-slate-500 font-medium max-w-sm">
              The intelligent placement infrastructure. Bridging the gap between education and opportunity securely and compliantly.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-[#0A192F]">Platform</h4>
            <ul className="space-y-3 text-slate-500 font-medium text-sm">
              <li><Link href="#" className="hover:text-[#2A86FF] transition-colors">Smart Matching</Link></li>
              <li><Link href="#" className="hover:text-[#2A86FF] transition-colors">ATS Integration</Link></li>
              <li><Link href="#" className="hover:text-[#2A86FF] transition-colors">College Portal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-[#0A192F]">Company & Legal</h4>
            <ul className="space-y-3 text-slate-500 font-medium text-sm">
              <li><Link href="#" className="hover:text-[#2A86FF] transition-colors">Security & Compliance</Link></li>
              <li><Link href="#" className="hover:text-[#2A86FF] transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-[#2A86FF] transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-[#2A86FF] transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 font-medium">
          <p>© {new Date().getFullYear()} Industry Intelligence Bridge. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Enterprise-Grade Placement Infrastructure.</p>
        </div>
      </footer>

    </main>
  );
}
