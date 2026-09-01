import React, { useState, useEffect } from 'react';
import { SiteStats, CommunityImpactStat } from '../types';
import { INITIAL_COMMUNITY_IMPACT_STATS } from '../data/initialData';
import {
  Users,
  Calendar,
  CalendarCheck,
  Lightbulb,
  GraduationCap,
  Award,
  Trophy,
  Flame,
  Sparkles,
  Code2,
  Terminal,
  BookOpen,
  Globe,
  Cpu,
  Brain,
  Layers,
  CheckCircle2,
  Target,
  Zap,
  Star,
  Activity,
  Compass,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  Students: Users,
  Calendar,
  CalendarCheck,
  Events: CalendarCheck,
  Lightbulb,
  Projects: Lightbulb,
  GraduationCap,
  Labs: GraduationCap,
  Award,
  Trophy,
  Wins: Award,
  Flame,
  Members: Flame,
  Sparkles,
  Code2,
  Terminal,
  BookOpen,
  Globe,
  Cpu,
  Brain,
  Layers,
  CheckCircle2,
  Target,
  Zap,
  Star,
  Activity,
  Compass,
};

function getIconComponent(iconName?: string) {
  if (!iconName) return Users;
  const normalized = iconName.trim();
  return ICON_MAP[normalized] || Users;
}

// Animate numeric counters smoothly on mount
const AnimatedStatValue: React.FC<{ value: string }> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState<string>(value);

  useEffect(() => {
    // Parse numeric prefix if present (e.g., "650+" -> 650, suffix "+")
    const match = String(value).match(/^([^\d]*)(\d+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const prefix = match[1] || '';
    const targetNum = parseInt(match[2], 10);
    const suffix = match[3] || '';

    if (isNaN(targetNum) || targetNum === 0) {
      setDisplayValue(value);
      return;
    }

    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    let animationFrameId: number;

    const updateCount = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (targetNum - start) * easeOut);
      setDisplayValue(`${prefix}${current}${suffix}`);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value]);

  return <>{displayValue}</>;
};

interface StatsSectionProps {
  stats?: SiteStats;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  const [dynamicStats, setDynamicStats] = useState<CommunityImpactStat[]>(() => {
    if (stats?.community_impact_stats && Array.isArray(stats.community_impact_stats) && stats.community_impact_stats.length > 0) {
      return stats.community_impact_stats.filter((s) => s.active !== false);
    }
    return INITIAL_COMMUNITY_IMPACT_STATS;
  });

  useEffect(() => {
    if (stats?.community_impact_stats && Array.isArray(stats.community_impact_stats) && stats.community_impact_stats.length > 0) {
      setDynamicStats(stats.community_impact_stats.filter((s) => s.active !== false));
    }
  }, [stats]);

  // Fallback if dynamicStats is empty
  const displayItems = dynamicStats.length > 0 ? dynamicStats : INITIAL_COMMUNITY_IMPACT_STATS;

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
          {displayItems.map((item) => {
            const Icon = getIconComponent(item.icon);
            return (
              <div
                key={item.id}
                id={`stat-card-${item.id}`}
                className="flex flex-col items-center text-center p-4 rounded-lg bg-[#0A0B0E] border border-[#1A1C23] hover:border-[#00E5FF]/40 transition-all duration-200 group"
              >
                <div className="p-2.5 rounded-lg bg-[#0D1017] border border-[#1A1C23] text-[#00E5FF] mb-2.5 group-hover:scale-105 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] tracking-tight group-hover:text-[#00E5FF] transition-colors">
                  <AnimatedStatValue value={item.value} />
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
