// app/landing/page.tsx
'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import HeroSection from '../components/landing/HeroSection';
import CorporateBento from '../components/landing/CorporateBento';
import StudentJourney from '../components/landing/StudentJourney';
import FooterCTA from '../components/landing/FooterCTA';

// Dynamic import of the 3D Background (CloudHero)
const CloudHero = dynamic(() => import('../components/CloudHero'), { 
  ssr: false,
  loading: () => <div className="fixed inset-0 z-0 bg-[#0A192F]" />
});

export default function LandingPage() {
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const horizontalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Initialize Lenis for buttery smooth scrolling
    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // 2. GSAP Horizontal Scroll Logic (Desktop Only)
    const ctx = gsap.context(() => {
      // Use matchMedia to only apply horizontal scroll on desktop
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        if (horizontalSectionRef.current && horizontalContentRef.current) {
          const scrollWidth = horizontalContentRef.current.scrollWidth - window.innerWidth;
          
          gsap.to(horizontalContentRef.current, {
            x: -scrollWidth,
            ease: "none",
            scrollTrigger: {
              trigger: horizontalSectionRef.current,
              start: "top top",
              end: `+=${scrollWidth}`, // Scroll distance equals the width of the content
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            }
          });
        }
      });
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      ctx.revert();
    };
  }, []);

  return (
    <main className="relative w-full min-h-screen font-sans antialiased text-slate-200 selection:bg-[#2A86FF] selection:text-white overflow-x-hidden">
      <motion.div 
        initial={{ opacity: 1 }}
        animate={{ opacity: 0, transitionEnd: { display: "none" } }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className="fixed inset-0 z-[9999] bg-[#0A192F]"
      />
      
      {/* --- Z-0: The 3D Architectural Blueprint --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CloudHero />
      </div>

      {/* --- Z-10: The DOM Layer --- */}
      <div className="relative z-10">
        
        {/* Navigation */}
        <header className="fixed top-0 w-full px-6 py-5 md:px-12 md:py-6 flex justify-between items-center z-50 mix-blend-difference">
          <div className="font-bold text-2xl tracking-tighter text-white">IIB<span className="text-[#2A86FF]">.</span></div>
          <a href="/login" className="group flex items-center gap-2 text-sm font-bold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(42,134,255,0.5)]">
            Enter Platform
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </header>

        {/* SECTION 1: The Architect's Hero */}
        <HeroSection />

        {/* SECTION 2: Grid Expansion (Corporate Pitch) */}
        <CorporateBento />

        {/* SECTION 3: The Horizontal Bridge (Student Scrollytelling) */}
        <StudentJourney sectionRef={horizontalSectionRef} contentRef={horizontalContentRef} />

        {/* SECTION 4: Convergence (Footer CTA) */}
        <FooterCTA />

      </div>
    </main>
  );
}
