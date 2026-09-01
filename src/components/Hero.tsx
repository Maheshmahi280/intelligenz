import React from 'react';
import { IntelligenzLogo } from './IntelligenzLogo';
import {
  Sparkles,
  Calendar,
  ChevronRight,
  Cpu,
  Brain,
  Terminal,
  Zap,
  ArrowRight,
} from 'lucide-react';
import { SiteSettings } from '../types';

interface HeroProps {
  onNavigate: (path: string) => void;
  settings?: SiteSettings;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, settings }) => {
  return (
    <section id="hero-section" className="relative min-h-[85vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#0A0B0E] via-[#0D1017] to-[#0A0B0E] border-b border-[#1A1C23]">
      {/* Background Subtle Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-40 pointer-events-none" />
      
      {/* Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00E5FF]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Watermarked background logo */}
      <div className="absolute right-1/2 translate-x-1/2 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none scale-150 sm:scale-175 lg:scale-200">
        <IntelligenzLogo size="watermark" />
      </div>

      <div className="max-w-5xl mx-auto w-full relative z-10 text-center flex flex-col items-center">
        
        {/* Institutional Pill Badge */}
        <div className="inline-flex items-center justify-center border border-[#00E5FF]/20 bg-[#00E5FF]/5 rounded-2xl sm:rounded-full py-2 px-4 sm:px-6 mb-6 max-w-4xl mx-auto text-center shadow-[0_0_20px_rgba(0,229,255,0.05)]">
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 text-[10px] sm:text-[11px] md:text-[11.5px] uppercase tracking-[0.14em] sm:tracking-[0.18em] font-bold leading-relaxed">
            <span className="inline-flex items-center gap-2 text-[#00E5FF]">
              <span className="flex h-1.5 w-1.5 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00E5FF]"></span>
              </span>
              <span>DEPARTMENT OF AIML &amp; AI</span>
            </span>
            <span className="text-[#00E5FF]/40 hidden sm:inline">•</span>
            <span className="text-[#9CA3AF]">
              DR. K. V. SUBBA REDDY INSTITUTE OF TECHNOLOGY
            </span>
          </div>
        </div>

        {/* Hero Logo Emblem */}
        <div className="flex justify-center mb-5">
          <IntelligenzLogo size="hero" interactive />
        </div>

        {/* DOMINANT BRAND HEADING */}
        <h1
          id="hero-title"
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white font-['Outfit'] leading-[0.95] mb-2"
        >
          INTELLIGENZ
        </h1>

        {/* Club Identity Subtitle */}
        <div className="text-sm sm:text-base font-bold uppercase tracking-[0.25em] text-[#6B7280] font-['Outfit'] mb-3">
          {settings?.club_sub_name || 'IntelliGenZ Club'} • {settings?.department_name || 'Department of CSE (AIML) & AI'}
        </div>

        {/* Tagline */}
        <div className="text-[15px] sm:text-[18px] text-[#00E5FF] font-mono tracking-widest uppercase italic mb-5">
          "{settings?.tagline || 'Code • Innovate • IntelliGently'}"
        </div>

        {/* Supporting Text */}
        <p className="max-w-2xl mx-auto text-[14px] sm:text-[16px] text-[#9CA3AF] leading-relaxed mb-8 font-normal">
          {settings?.supporting_text ||
            'Where curiosity meets code, intelligence meets innovation, and students build the future.'}
        </p>

        {/* Two Prominent CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto">
          {/* CTA 1: Join Us Primary */}
          <button
            id="hero-join-btn"
            onClick={() => onNavigate('/join')}
            className="w-full sm:w-auto bg-[#00E5FF] hover:bg-[#33ebff] text-[#0A0B0E] px-8 py-3.5 font-bold text-[13px] uppercase tracking-widest transition-all shadow-lg shadow-[#00E5FF]/20 flex items-center justify-center gap-2 rounded-sm active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>JOIN INTELLIGENZ</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* CTA 2: Explore Events Secondary */}
          <button
            id="hero-explore-events-btn"
            onClick={() => onNavigate('/events')}
            className="w-full sm:w-auto border border-[#1A1C23] hover:border-[#00E5FF]/30 hover:bg-[#1A1C23] text-white px-8 py-3.5 font-bold text-[13px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 rounded-sm"
          >
            <Calendar className="w-4 h-4 text-[#00E5FF]" />
            <span>EXPLORE EVENTS</span>
          </button>
        </div>

        {/* 4 Feature Pillars Grid */}
        <div className="mt-14 pt-8 border-t border-[#1A1C23] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left w-full">
          <div className="p-5 border border-[#1A1C23] bg-[#0D1017]/70 hover:bg-[#0D1017] hover:border-[#00E5FF]/30 transition-all rounded-sm">
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#00E5FF] mb-1.5 flex items-center gap-2">
              <Brain className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>AI &amp; Neural Systems</span>
            </div>
            <div className="text-white font-medium text-[14px] mb-1">Deep Learning Labs</div>
            <div className="text-[12px] text-[#6B7280] leading-relaxed">LLMs, Computer Vision &amp; Generative Architectures.</div>
          </div>

          <div className="p-5 border border-[#1A1C23] bg-[#0D1017]/70 hover:bg-[#0D1017] hover:border-[#00E5FF]/30 transition-all rounded-sm">
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#00E5FF] mb-1.5 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>Hackathons</span>
            </div>
            <div className="text-white font-medium text-[14px] mb-1">24-Hour Code Sprints</div>
            <div className="text-[12px] text-[#6B7280] leading-relaxed">Rapid engineering and competitive algorithm challenges.</div>
          </div>

          <div className="p-5 border border-[#1A1C23] bg-[#0D1017]/70 hover:bg-[#0D1017] hover:border-[#00E5FF]/30 transition-all rounded-sm">
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#00E5FF] mb-1.5 flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>Edge Computing</span>
            </div>
            <div className="text-white font-medium text-[14px] mb-1">Robotics &amp; IoT</div>
            <div className="text-[12px] text-[#6B7280] leading-relaxed">Embedded AI deployment on microcontroller hardware.</div>
          </div>

          <div className="p-5 border border-[#1A1C23] bg-[#0D1017]/70 hover:bg-[#0D1017] hover:border-[#00E5FF]/30 transition-all rounded-sm">
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#00E5FF] mb-1.5 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>Mentorship</span>
            </div>
            <div className="text-white font-medium text-[14px] mb-1">Peer Code Reviews</div>
            <div className="text-[12px] text-[#6B7280] leading-relaxed">Senior-to-junior technical guidance and interview prep.</div>
          </div>
        </div>

      </div>
    </section>
  );
};
