import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  ExternalLink,
  Code2,
  Brain,
  Cpu,
  Layers,
  Sparkles,
  Search,
  Tag,
  Copy,
  Check,
  Bookmark,
  Terminal,
  FolderGit2,
  Video,
  FileText,
  Compass,
} from 'lucide-react';
import { api } from '../lib/api';
import { LearningResource } from '../types';

interface ResourcesPageProps {
  onNavigate: (path: string) => void;
}

export function ResourcesPage({ onNavigate }: ResourcesPageProps) {
  const [resources, setResources] = useState<LearningResource[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      const data = await api.getResources();
      setResources(data);
    } catch (err) {
      console.error('Failed to load learning resources:', err);
    } finally {
      setLoading(false);
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
    const matchesCategory = selectedCategory === 'All' || r.category === selectedCategory;
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getFormatIcon = (format: string) => {
    switch (format?.toLowerCase()) {
      case 'colab':
      case 'github':
        return <FolderGit2 className="w-4 h-4 text-emerald-400" />;
      case 'video':
        return <Video className="w-4 h-4 text-rose-400" />;
      case 'code repository':
        return <Terminal className="w-4 h-4 text-cyan-400" />;
      case 'guide / cheatsheet':
      case 'article':
      default:
        return <FileText className="w-4 h-4 text-indigo-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Department Knowledge Hub
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            AI & Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">Learning Roadmaps</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Hand-curated code repositories, interactive Colab notebooks, architectural roadmaps, and cheatsheets maintained by IntelliGenZ Club members and faculty.
          </p>
        </div>

        {/* Search & Category Tabs */}
        <div className="space-y-4">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides, PyTorch, YOLO, Gemini API..."
              className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl px-4 py-2.5 pl-10 text-sm text-white placeholder-slate-500 transition-colors"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Resource Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-64 bg-slate-900/60 rounded-xl border border-slate-800 animate-pulse" />
            ))}
          </div>
        ) : filteredResources.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-slate-800">
            <Compass className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 font-medium text-sm">No resources match your search.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-cyan-400 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((res) => (
              <div
                key={res.id}
                className="bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-6 transition-all flex flex-col justify-between space-y-4 shadow-lg hover:shadow-cyan-950/20 group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-semibold font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                      {res.category}
                    </span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {res.level}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {res.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1.5 line-clamp-3 leading-relaxed">
                      {res.description}
                    </p>
                  </div>

                  {res.tags && res.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {res.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800/80"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    {getFormatIcon(res.format)}
                    <span className="text-[11px] font-mono">{res.format || 'Guide'}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyLink(res.url, res.id)}
                      title="Copy resource URL"
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors border border-slate-700"
                    >
                      {copiedId === res.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 shadow-sm shadow-cyan-600/20"
                    >
                      <span>Open</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Suggestion Callout */}
        <div className="bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-500/20 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base font-bold text-white">Have a high-quality AI project or tutorial to share?</h3>
            <p className="text-xs text-slate-400">
              Submit your GitHub repositories, research notes, or Colab notebooks to be featured on the IntelliGenZ Learning Hub.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/contact')}
            className="flex-shrink-0 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all"
          >
            Submit Resource
          </button>
        </div>
      </div>
    </div>
  );
}
