'use client';

import { Bot, FileText, Briefcase } from 'lucide-react';
import { RefObject } from 'react';

interface StudentJourneyProps {
  sectionRef: RefObject<HTMLDivElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
}

export default function StudentJourney({ sectionRef, contentRef }: StudentJourneyProps) {
  return (
    <section ref={sectionRef} className="relative bg-[#050B14] border-t border-slate-800">
      <div className="md:h-screen flex items-center overflow-hidden">
        
        {/* The Continuous "Lining Bridge" Line */}
        <div className="hidden md:block absolute top-1/2 left-0 w-[500vw] h-px bg-gradient-to-r from-transparent via-[#2A86FF] to-transparent -translate-y-1/2 opacity-30 z-0" />

        {/* Scrolling Container */}
        <div ref={contentRef} className="flex flex-col md:flex-row gap-12 md:gap-32 px-6 py-24 md:py-0 md:px-[10vw] relative z-10 w-max">
          
          {/* Intro Title */}
          <div className="w-full md:w-[40vw] flex-shrink-0 flex flex-col justify-center items-center md:items-start text-center md:text-left pb-24 md:pb-0">
            <h2 className="text-sm font-mono tracking-[0.2em] text-white uppercase mb-4">02 // The Student Journey</h2>
            <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
              Your career,<br/>intelligently guided.
            </h3>
          </div>

          {/* Horizontal Item 1 */}
          <div className="w-full md:w-[30vw] flex-shrink-0 flex flex-col justify-center items-center md:items-start text-center md:text-left pb-24 md:pb-0">
            <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mb-8 relative">
              <Bot className="w-8 h-8 text-[#2A86FF]" />
              <div className="absolute top-full left-1/2 w-px h-16 bg-slate-700 -translate-x-1/2 md:hidden" /> {/* Mobile vertical line */}
            </div>
            <h4 className="text-3xl font-bold text-white mb-4">AI Career Assistant</h4>
            <p className="text-lg text-slate-400">Get personalized skill-gap analysis, learning resources, and auto-generated cover letters tailored to specific roles.</p>
          </div>

          {/* Horizontal Item 2 */}
          <div className="w-full md:w-[30vw] flex-shrink-0 flex flex-col justify-center items-center md:items-start text-center md:text-left pb-24 md:pb-0">
            <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mb-8 relative">
              <FileText className="w-8 h-8 text-purple-400" />
              <div className="absolute top-full left-1/2 w-px h-16 bg-slate-700 -translate-x-1/2 md:hidden" />
            </div>
            <h4 className="text-3xl font-bold text-white mb-4">Resume Intelligence</h4>
            <p className="text-lg text-slate-400">Upload your PDF. Our engine parses, scores, and redesigns it to bypass ATS filters and catch recruiter eyes instantly.</p>
          </div>

          {/* Horizontal Item 3 */}
          <div className="w-full md:w-[30vw] flex-shrink-0 flex flex-col justify-center items-center md:items-start text-center md:text-left pb-24 md:pb-0 pr-[10vw]">
            <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mb-8">
              <Briefcase className="w-8 h-8 text-green-400" />
            </div>
            <h4 className="text-3xl font-bold text-white mb-4">Seamless Tracking</h4>
            <p className="text-lg text-slate-400">Apply, bookmark, and track. Watch your application progress from 'Submitted' to 'Offer Released' in real-time.</p>
          </div>

        </div>
      </div>
    </section>
  );
}
