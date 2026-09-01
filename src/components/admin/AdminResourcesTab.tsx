import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  Trash2,
  Edit2,
  ExternalLink,
  Tag,
  CheckCircle2,
  AlertCircle,
  FolderGit2,
  Terminal,
  FileText,
  Video,
} from 'lucide-react';
import { api } from '../../lib/api';
import { LearningResource } from '../../types';

interface AdminResourcesTabProps {
  onRefreshData?: () => void;
}

export function AdminResourcesTab({ onRefreshData }: AdminResourcesTabProps) {
  const [resources, setResources] = useState<LearningResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<LearningResource | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Generative AI & LLMs',
    description: '',
    url: '',
    format: 'Guide / Cheatsheet' as 'Guide / Cheatsheet' | 'Colab' | 'GitHub' | 'Video' | 'Code Repository' | 'Article',
    level: 'Beginner' as 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels',
    tagsString: '',
    featured: false,
  });

  const [formLoading, setFormLoading] = useState(false);
  const [actionNotice, setActionNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    setLoading(true);
    try {
      const data = await api.getResources();
      setResources(data);
    } catch (err) {
      console.error('Failed to load resources:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setActionNotice(null);

    const tags = formData.tagsString
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload: Partial<LearningResource> = {
      title: formData.title.trim(),
      category: formData.category,
      description: formData.description.trim(),
      url: formData.url.trim(),
      format: formData.format,
      level: formData.level,
      tags,
      featured: formData.featured,
    };

    try {
      if (editingResource) {
        await api.adminUpdateResource(editingResource.id, payload);
        setActionNotice({ type: 'success', text: 'Resource updated successfully!' });
      } else {
        await api.adminCreateResource(payload);
        setActionNotice({ type: 'success', text: 'Resource created and added to knowledge hub!' });
      }
      setIsModalOpen(false);
      setEditingResource(null);
      loadResources();
      onRefreshData?.();
    } catch (err: any) {
      setActionNotice({ type: 'error', text: err.message || 'Failed to save resource' });
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.adminDeleteResource(id);
      setDeleteConfirmId(null);
      loadResources();
      onRefreshData?.();
    } catch (err) {
      console.error('Failed to delete resource:', err);
    }
  };

  const categories = [
    'All',
    'Generative AI & LLMs',
    'Computer Vision',
    'Deep Learning & PyTorch',
    'MLOps & Deployment',
    'Hackathon Starter Kits',
  ];

  const filteredResources = resources.filter((r) => {
    const matchesCat = categoryFilter === 'All' || r.category === categoryFilter;
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            Learning Resources & Roadmaps Manager
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Publish and curate AI tutorials, GitHub starters, Colab notebooks, and cheatsheets for students.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingResource(null);
            setFormData({
              title: '',
              category: 'Generative AI & LLMs',
              description: '',
              url: '',
              format: 'Guide / Cheatsheet',
              level: 'Beginner',
              tagsString: 'PyTorch, Gemini, Python',
              featured: false,
            });
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
        >
          <Plus className="w-4 h-4" />
          Add Resource
        </button>
      </div>

      {actionNotice && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center gap-2 ${
            actionNotice.type === 'success'
              ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
              : 'bg-red-950/60 border border-red-500/40 text-red-300'
          }`}
        >
          {actionNotice.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{actionNotice.text}</span>
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resources by title, description, or tag..."
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 pl-8 text-xs text-white placeholder-slate-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Resources Table */}
      {loading ? (
        <div className="p-12 text-center text-slate-400 text-xs font-mono">Loading resources...</div>
      ) : filteredResources.length === 0 ? (
        <div className="p-12 text-center text-slate-400 bg-slate-900/40 border border-slate-800 rounded-xl text-xs">
          No resources found. Click "Add Resource" to publish your first learning guide.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Title & Details</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Format</th>
                <th className="py-3 px-4">Level</th>
                <th className="py-3 px-4">Link</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filteredResources.map((res) => (
                <tr key={res.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 max-w-[280px]">
                    <p className="font-bold text-white line-clamp-1">{res.title}</p>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">{res.description}</p>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                      {res.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-slate-300 font-mono text-[11px]">
                    {res.format || 'Guide'}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                      {res.level}
                    </span>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:underline flex items-center gap-1 text-xs"
                    >
                      <span>Visit</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap space-x-1">
                    <button
                      onClick={() => {
                        setEditingResource(res);
                        setFormData({
                          title: res.title,
                          category: res.category,
                          description: res.description,
                          url: res.url,
                          format: res.format as any,
                          level: res.level as any,
                          tagsString: res.tags?.join(', ') || '',
                          featured: !!res.featured,
                        });
                        setIsModalOpen(true);
                      }}
                      className="p-1.5 rounded hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(res.id)}
                      className="p-1.5 rounded hover:bg-red-950/60 text-red-400 hover:text-red-300 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit Resource Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-lg shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              {editingResource ? 'Edit Learning Resource' : 'Add Learning Resource'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Master Gemini 2.5 Flash & LangChain RAG in 30 Days"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-500"
                  >
                    <option value="Generative AI & LLMs">Generative AI & LLMs</option>
                    <option value="Computer Vision">Computer Vision</option>
                    <option value="Deep Learning & PyTorch">Deep Learning & PyTorch</option>
                    <option value="MLOps & Deployment">MLOps & Deployment</option>
                    <option value="Hackathon Starter Kits">Hackathon Starter Kits</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Format</label>
                  <select
                    value={formData.format}
                    onChange={(e) => setFormData({ ...formData, format: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-500"
                  >
                    <option value="Guide / Cheatsheet">Guide / Cheatsheet</option>
                    <option value="Colab">Google Colab Notebook</option>
                    <option value="GitHub">GitHub Repository</option>
                    <option value="Video">Video Course</option>
                    <option value="Code Repository">Code Repository</option>
                    <option value="Article">Research / Article</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Target URL / GitHub Link *</label>
                <input
                  type="url"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://github.com/..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:border-cyan-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Skill Level</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-500"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="All Levels">All Levels</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Tags (Comma Separated)</label>
                  <input
                    type="text"
                    value={formData.tagsString}
                    onChange={(e) => setFormData({ ...formData, tagsString: e.target.value })}
                    placeholder="PyTorch, YOLO, Vision"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief summary of what students will learn..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:border-cyan-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950"
                >
                  {formLoading ? 'Saving...' : editingResource ? 'Update Resource' : 'Publish Resource'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Delete Learning Resource?</h3>
            <p className="text-xs text-slate-400">
              This resource will be removed from the student learning portal.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
