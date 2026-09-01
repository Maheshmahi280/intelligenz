import React from 'react';
import { Achievement } from '../types';
import { Trophy, Medal, Calendar, Building, Sparkles } from 'lucide-react';

interface AchievementsPageProps {
  achievements: Achievement[];
  onNavigate: (path: string) => void;
}

export const AchievementsPage: React.FC<AchievementsPageProps> = ({ achievements, onNavigate }) => {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 border border-[#00E5FF]/20 bg-[#00E5FF]/5 rounded-full py-1.5 px-4 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#00E5FF] font-bold">
          <Trophy className="w-3.5 h-3.5" />
          <span>Hall of Fame &amp; Accolades</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-['Outfit'] tracking-tight">
          Club Milestones &amp; Honors
        </h1>

        <p className="text-xs sm:text-sm text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed">
          Celebrating national hackathon victories, state-level project awards, and institutional excellence achieved by CSE (AIML) &amp; AI students of{' '}
          <span className="text-white font-semibold">DR. K. V. SUBBA REDDY INSTITUTE OF TECHNOLOGY</span>.
        </p>
      </div>

      {/* Modern Card Layout */}
      <div className="space-y-6">
        {achievements.map((ach) => (
          <div
            key={ach.id}
            className="rounded-2xl bg-[#0D1017] border border-[#1A1C23] hover:border-[#00E5FF]/40 p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-[#00E5FF]/5 text-left grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
          >
            {/* Image if available */}
            {ach.image_url && (
              <div className="lg:col-span-4 rounded-xl overflow-hidden aspect-[16/10] bg-[#0A0B0E] border border-[#1A1C23]">
                <img
                  src={ach.image_url}
                  alt={ach.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className={`${ach.image_url ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-3`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded text-[10px] font-mono font-bold bg-amber-400/10 text-amber-400 border border-amber-400/30 flex items-center gap-1.5 uppercase">
                    <Medal className="w-3.5 h-3.5" />
                    {ach.award_rank || ach.category}
                  </span>
                  <span className="text-xs text-[#6B7280] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {ach.date}
                  </span>
                </div>

                <div className="text-xs text-[#9CA3AF] flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span className="font-semibold text-white">{ach.organization}</span>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white font-['Outfit']">
                {ach.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
                {ach.description}
              </p>

              {ach.members && ach.members.length > 0 && (
                <div className="pt-2 text-xs text-[#6B7280]">
                  <span className="font-semibold text-[#D1D5DB]">Achievers: </span>
                  <span className="text-[#9CA3AF]">{ach.members.join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
