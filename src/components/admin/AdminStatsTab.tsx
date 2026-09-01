import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Save,
  CheckCircle2,
  Sparkles,
  Users,
  Calendar,
  Code2,
  Trophy,
  Award,
} from 'lucide-react';
import { SiteStats } from '../../types';

interface AdminStatsTabProps {
  stats: SiteStats | null;
  onSaveStats: (stats: SiteStats) => Promise<void>;
}

export const AdminStatsTab: React.FC<AdminStatsTabProps> = ({
  stats,
  onSaveStats,
}) => {
  const [formData, setFormData] = useState<SiteStats>({
    active_members: 250,
    events_conducted: 35,
    projects_completed: 18,
    awards_won: 12,
    workshops_held: 24,
    students_impacted: 1800,
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (stats) {
      setFormData({ ...stats });
    }
  }, [stats]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    try {
      await onSaveStats(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#00E5FF]" />
            Official Club Statistics &amp; Metrics
          </h2>
          <p className="text-xs text-[#9CA3AF] mt-0.5">
            Configure key milestone counters displayed prominently across the homepage and institutional impact banners
          </p>
        </div>
      </div>

      {success && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Club statistics updated and published successfully!</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-[#0D1017] border border-[#1A1C23] space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-4 rounded-xl bg-[#0A0B0E] border border-[#1A1C23]">
            <label className="block text-xs font-semibold text-[#D1D5DB] mb-1 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#00E5FF]" />
              Active Student Members
            </label>
            <input
              type="number"
              required
              value={formData.active_members}
              onChange={(e) => setFormData({ ...formData, active_members: Number(e.target.value) })}
              className="w-full px-3.5 py-2 rounded-lg bg-[#0D1017] border border-[#1A1C23] text-sm text-white font-bold focus:outline-none focus:border-[#00E5FF]"
            />
            <p className="text-[10px] text-[#6B7280] mt-1">Total registered club members</p>
          </div>

          <div className="p-4 rounded-xl bg-[#0A0B0E] border border-[#1A1C23]">
            <label className="block text-xs font-semibold text-[#D1D5DB] mb-1 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-purple-400" />
              Events &amp; Hackathons Conducted
            </label>
            <input
              type="number"
              required
              value={formData.events_conducted}
              onChange={(e) => setFormData({ ...formData, events_conducted: Number(e.target.value) })}
              className="w-full px-3.5 py-2 rounded-lg bg-[#0D1017] border border-[#1A1C23] text-sm text-white font-bold focus:outline-none focus:border-purple-400"
            />
            <p className="text-[10px] text-[#6B7280] mt-1">Organized events since club founding</p>
          </div>

          <div className="p-4 rounded-xl bg-[#0A0B0E] border border-[#1A1C23]">
            <label className="block text-xs font-semibold text-[#D1D5DB] mb-1 flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-cyan-300" />
              AI &amp; Software Projects Completed
            </label>
            <input
              type="number"
              required
              value={formData.projects_completed}
              onChange={(e) => setFormData({ ...formData, projects_completed: Number(e.target.value) })}
              className="w-full px-3.5 py-2 rounded-lg bg-[#0D1017] border border-[#1A1C23] text-sm text-white font-bold focus:outline-none focus:border-cyan-300"
            />
            <p className="text-[10px] text-[#6B7280] mt-1">Student research repos &amp; labs</p>
          </div>

          <div className="p-4 rounded-xl bg-[#0A0B0E] border border-[#1A1C23]">
            <label className="block text-xs font-semibold text-[#D1D5DB] mb-1 flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-yellow-400" />
              Hackathons &amp; Contests Won
            </label>
            <input
              type="number"
              required
              value={formData.awards_won}
              onChange={(e) => setFormData({ ...formData, awards_won: Number(e.target.value) })}
              className="w-full px-3.5 py-2 rounded-lg bg-[#0D1017] border border-[#1A1C23] text-sm text-white font-bold focus:outline-none focus:border-yellow-400"
            />
            <p className="text-[10px] text-[#6B7280] mt-1">State &amp; National level wins</p>
          </div>

          <div className="p-4 rounded-xl bg-[#0A0B0E] border border-[#1A1C23]">
            <label className="block text-xs font-semibold text-[#D1D5DB] mb-1 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-400" />
              Technical Workshops Held
            </label>
            <input
              type="number"
              required
              value={formData.workshops_held}
              onChange={(e) => setFormData({ ...formData, workshops_held: Number(e.target.value) })}
              className="w-full px-3.5 py-2 rounded-lg bg-[#0D1017] border border-[#1A1C23] text-sm text-white font-bold focus:outline-none focus:border-emerald-400"
            />
            <p className="text-[10px] text-[#6B7280] mt-1">Hands-on bootcamps conducted</p>
          </div>

          <div className="p-4 rounded-xl bg-[#0A0B0E] border border-[#1A1C23]">
            <label className="block text-xs font-semibold text-[#D1D5DB] mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#00E5FF]" />
              Students Impacted / Trained
            </label>
            <input
              type="number"
              required
              value={formData.students_impacted}
              onChange={(e) => setFormData({ ...formData, students_impacted: Number(e.target.value) })}
              className="w-full px-3.5 py-2 rounded-lg bg-[#0D1017] border border-[#1A1C23] text-sm text-white font-bold focus:outline-none focus:border-[#00E5FF]"
            />
            <p className="text-[10px] text-[#6B7280] mt-1">Cumulative participants reached</p>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-[#1A1C23]">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-lg bg-[#00E5FF] hover:bg-[#33ebff] text-[#0A0B0E] font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#00E5FF]/20 flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Statistics'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
