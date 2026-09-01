import React from 'react';
import { Announcement } from '../types';
import { Calendar, User, ArrowLeft, Share2, Tag } from 'lucide-react';

interface AnnouncementDetailPageProps {
  announcement: Announcement;
  onBack: () => void;
  onNavigate: (path: string) => void;
}

export const AnnouncementDetailPage: React.FC<AnnouncementDetailPageProps> = ({
  announcement,
  onBack,
}) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${announcement.title} - INTELLIGENZ`,
          text: announcement.summary,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const formattedDate = new Date(announcement.published_at).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 text-left">
      {/* Back button */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#9CA3AF] hover:text-[#00E5FF] transition-colors p-2.5 rounded-lg bg-[#0D1017] border border-[#1A1C23]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Announcements</span>
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D1D5DB] hover:text-white p-2.5 px-4 rounded-lg bg-[#0D1017] border border-[#1A1C23] hover:border-[#00E5FF]/30 transition-colors"
        >
          <Share2 className="w-3.5 h-3.5 text-[#00E5FF]" />
          <span>Share</span>
        </button>
      </div>

      {/* Main Container */}
      <article className="p-6 sm:p-10 rounded-2xl bg-[#0D1017] border border-[#1A1C23] shadow-2xl space-y-6">
        {/* Category & Date */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded text-xs font-mono font-bold bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 uppercase tracking-wider">
            {announcement.category}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
            <Calendar className="w-3.5 h-3.5 text-[#6B7280]" />
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-['Outfit'] leading-tight">
          {announcement.title}
        </h1>

        {/* Author / Authority box */}
        <div className="p-3.5 rounded-xl bg-[#0A0B0E] border border-[#1A1C23] flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#121622] text-[#00E5FF] border border-[#1A1C23]">
              <User className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white">{announcement.author}</div>
              <div className="text-[11px] text-[#9CA3AF]">{announcement.author_role}</div>
            </div>
          </div>
          <span className="text-[10px] font-mono text-[#00E5FF] hidden sm:inline uppercase tracking-widest font-semibold">
            Official Circular
          </span>
        </div>

        {/* Executive Summary */}
        <div className="p-4 rounded-xl bg-[#0A0B0E] border border-[#00E5FF]/20 text-xs sm:text-sm text-[#D1D5DB] leading-relaxed">
          <span className="font-bold text-[#00E5FF]">Summary: </span>
          {announcement.summary}
        </div>

        {/* Full Content */}
        <div className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed whitespace-pre-line space-y-4 pt-2 border-t border-[#1A1C23]">
          {announcement.content}
        </div>

        {/* Tags */}
        {announcement.tags && announcement.tags.length > 0 && (
          <div className="pt-6 border-t border-[#1A1C23] flex flex-wrap items-center gap-2">
            <Tag className="w-3.5 h-3.5 text-[#6B7280]" />
            {announcement.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs font-mono px-2.5 py-1 rounded bg-[#0A0B0E] text-[#9CA3AF] border border-[#1A1C23]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </div>
  );
};
