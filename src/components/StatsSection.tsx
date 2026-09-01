import React, { useState, useEffect } from 'react';
import { SiteStats } from '../types';
import { Users, CalendarCheck, Lightbulb, GraduationCap, Award, Flame } from 'lucide-react';

interface StatsSectionProps {
  stats?: SiteStats;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  const items = [
    {
      label: 'Students Reached',
      value: stats?.students_reached || '650+',
      icon: Users,
    },
    {
      label: 'Events & Sprints',
      value: stats?.events_conducted || '28+',
      icon: CalendarCheck,
    },
    {
      label: 'Live AI Projects',
      value: stats?.projects_completed || '14+',
      icon: Lightbulb,
    },
    {
      label: 'Technical Labs',
      value: stats?.workshops_held || '18+',
      icon: GraduationCap,
    },
    {
      label: 'Hackathon Wins',
      value: stats?.hackathon_wins || '8+',
      icon: Award,
    },
    {
      label: 'Core Members',
      value: stats?.active_members || '120+',
      icon: Flame,
    },
  ];

  return (
    <section id="club-stats-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="rounded-xl bg-[#0D1017]/60 border border-[#1A1C23] p-6 sm:p-10 shadow-xl relative overflow-hidden">
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00E5FF]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#00E5FF] px-3.5 py-1 rounded-full border border-[#00E5FF]/20 bg-[#00E5FF]/5 mb-2.5">
            Real-Time Community Impact
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
            Empowering Next-Gen AI Innovators
          </h2>
          <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1.5">
            Department of CSE (AIML) &amp; AI • DR. K. V. SUBBA REDDY INSTITUTE OF TECHNOLOGY
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-4 rounded-lg bg-[#0A0B0E] border border-[#1A1C23] hover:border-[#00E5FF]/40 transition-all duration-200 group"
              >
                <div className="p-2.5 rounded-lg bg-[#0D1017] border border-[#1A1C23] text-[#00E5FF] mb-2.5 group-hover:scale-105 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] tracking-tight group-hover:text-[#00E5FF] transition-colors">
                  {item.value}
                </div>
                <div className="text-[10px] uppercase tracking-wider font-semibold text-[#6B7280] mt-1 leading-tight">
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
