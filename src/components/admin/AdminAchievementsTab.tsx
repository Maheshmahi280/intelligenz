import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Trophy,
  Search,
  Calendar,
  ExternalLink,
  Award,
  X,
} from 'lucide-react';
import { Achievement } from '../../types';
import { DeleteConfirmModal } from '../DeleteConfirmModal';

interface AdminAchievementsTabProps {
  achievements: Achievement[];
  onSaveAchievement: (data: Partial<Achievement>) => Promise<void>;
  onDeleteAchievement: (id: string) => Promise<void>;
}

export const AdminAchievementsTab: React.FC<AdminAchievementsTabProps> = ({
  achievements,
  onSaveAchievement,
  onDeleteAchievement,
}) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState<Partial<Achievement> | null>(null);
  const [membersInput, setMembersInput] = useState('');
  const [saving, setSaving] = useState(false);

  // Delete State
  const [deleteTarget, setDeleteTarget] = useState<Achievement | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const categories = [
    'Hackathon Win',
    'Research Paper',
    'Coding Contest',
    'AI Competition',
    'Institutional Award',
  ];

  const filtered = achievements.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase()) ||
      a.organization.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'All' || a.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleOpenCreate = () => {
    setEditingAchievement({
      title: '',
      category: 'Hackathon Win',
      organization: 'National AI Challenge',
      award_rank: '1st Prize / Champions',
      date: new Date().toISOString().split('T')[0],
      description: '',
      members: ['Team IntelliGenZ'],
      proof_url: '',
      image_url: 'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&w=800&q=80',
    });
    setMembersInput('Team IntelliGenZ');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (ach: Achievement) => {
    setEditingAchievement({ ...ach });
    setMembersInput(Array.isArray(ach.members) ? ach.members.join(', ') : '');
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAchievement?.title) return;
    setSaving(true);
    try {
      const memberList = membersInput
        .split(',')
        .map((m) => m.trim())
        .filter((m) => m.length > 0);
      await onSaveAchievement({
        ...editingAchievement,
        members: memberList,
      });
      setIsModalOpen(false);
      setEditingAchievement(null);
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await onDeleteAchievement(deleteTarget.id);
      setDeleteTarget(null);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            Achievements &amp; Honors ({achievements.length})
          </h2>
          <p className="text-xs text-[#9CA3AF] mt-0.5">
            Log inter-college hackathon victories, patent publications, and national research awards
          </p>
        </div>

        <button
          id="admin-add-achievement-btn"
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-[#0A0B0E] font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-yellow-400/20 flex items-center justify-center gap-1.5 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Log Achievement</span>
        </button>
      </div>

      {/* Filter */}
      <div className="p-4 rounded-xl bg-[#0D1017] border border-[#1A1C23] flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search achievements by event, organization or student name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#0A0B0E] border border-[#1A1C23] text-xs text-white placeholder:text-[#4B5563] focus:outline-none focus:border-yellow-400"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 rounded-lg bg-[#0A0B0E] border border-[#1A1C23] text-xs text-white focus:outline-none focus:border-yellow-400"
        >
          <option value="All">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-full p-12 text-center bg-[#0D1017] border border-[#1A1C23] rounded-2xl text-[#6B7280] text-xs">
            No achievements found.
          </div>
        ) : (
          filtered.map((ach) => (
            <div
              key={ach.id}
              className="p-5 rounded-2xl bg-[#0D1017] border border-[#1A1C23] hover:border-[#2A2E3D] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">
                      {ach.category}
                    </span>
                    <span className="text-[11px] font-bold text-white flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-yellow-400" />
                      {ach.award_rank}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      id={`edit-achievement-${ach.id}`}
                      onClick={() => handleOpenEdit(ach)}
                      className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-white hover:bg-[#1A1C23]"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-yellow-400" />
                    </button>
                    <button
                      id={`delete-achievement-${ach.id}`}
                      onClick={() => setDeleteTarget(ach)}
                      className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white tracking-tight">
                  {ach.title}
                </h3>
                <div className="text-xs font-semibold text-[#00E5FF] mt-0.5">
                  {ach.organization}
                </div>
                <p className="text-xs text-[#9CA3AF] mt-1 line-clamp-2">
                  {ach.description}
                </p>

                {ach.members && ach.members.length > 0 && (
                  <div className="mt-3 text-xs text-[#6B7280]">
                    <span className="font-semibold text-[#9CA3AF]">Team:</span>{' '}
                    {ach.members.join(', ')}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-[#1A1C23] flex items-center justify-between text-xs text-[#6B7280]">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-yellow-400" />
                  {ach.date}
                </span>
                {ach.proof_url && (
                  <a
                    href={ach.proof_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white flex items-center gap-1 text-[#00E5FF]"
                  >
                    <span>Verification</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && editingAchievement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg bg-[#0D1017] border border-[#1A1C23] rounded-2xl p-6 shadow-2xl my-8 text-left max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1A1C23]">
              <h3 className="text-base font-bold text-white">
                {editingAchievement.id ? 'Edit Achievement' : 'Log New Achievement'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-[#6B7280] hover:text-white hover:bg-[#1A1C23]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#D1D5DB] mb-1">
                  Title / Event Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingAchievement.title || ''}
                  onChange={(e) => setEditingAchievement({ ...editingAchievement, title: e.target.value })}
                  placeholder="e.g. Smart India Hackathon 2026 Grand Finale"
                  className="w-full px-3.5 py-2 rounded-lg bg-[#0A0B0E] border border-[#1A1C23] text-xs text-white focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#D1D5DB] mb-1">
                    Category *
                  </label>
                  <select
                    value={editingAchievement.category || 'Hackathon Win'}
                    onChange={(e) => setEditingAchievement({ ...editingAchievement, category: e.target.value as any })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#0A0B0E] border border-[#1A1C23] text-xs text-white focus:outline-none focus:border-yellow-400"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D1D5DB] mb-1">
                    Award / Rank Secured *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingAchievement.award_rank || ''}
                    onChange={(e) => setEditingAchievement({ ...editingAchievement, award_rank: e.target.value })}
                    placeholder="e.g. 1st Place / Cash Prize ₹1,00,000"
                    className="w-full px-3.5 py-2 rounded-lg bg-[#0A0B0E] border border-[#1A1C23] text-xs text-white focus:outline-none focus:border-yellow-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#D1D5DB] mb-1">
                    Organizing Body / Institution *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingAchievement.organization || ''}
                    onChange={(e) => setEditingAchievement({ ...editingAchievement, organization: e.target.value })}
                    placeholder="e.g. Ministry of Education / IIT Madras"
                    className="w-full px-3.5 py-2 rounded-lg bg-[#0A0B0E] border border-[#1A1C23] text-xs text-white focus:outline-none focus:border-yellow-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D1D5DB] mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={editingAchievement.date || ''}
                    onChange={(e) => setEditingAchievement({ ...editingAchievement, date: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#0A0B0E] border border-[#1A1C23] text-xs text-white focus:outline-none focus:border-yellow-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#D1D5DB] mb-1">
                  Team Members Involved (comma separated)
                </label>
                <input
                  type="text"
                  value={membersInput}
                  onChange={(e) => setMembersInput(e.target.value)}
                  placeholder="e.g. Mahesh K, Sai Charan, Priya Sharma"
                  className="w-full px-3.5 py-2 rounded-lg bg-[#0A0B0E] border border-[#1A1C23] text-xs text-white focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#D1D5DB] mb-1">
                  Description / Project Details *
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingAchievement.description || ''}
                  onChange={(e) => setEditingAchievement({ ...editingAchievement, description: e.target.value })}
                  placeholder="Summary of the solution built, problem statement solved, and jury praise..."
                  className="w-full px-3.5 py-2 rounded-lg bg-[#0A0B0E] border border-[#1A1C23] text-xs text-white focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#1A1C23]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#1A1C23] text-xs text-[#9CA3AF] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-[#0A0B0E] text-xs font-bold uppercase tracking-wider disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingAchievement.id ? 'Update Record' : 'Save Achievement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Achievement Record"
        itemType="Achievement"
        itemName={deleteTarget?.title || ''}
        isDeleting={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};
