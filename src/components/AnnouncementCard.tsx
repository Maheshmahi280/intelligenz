import React from 'react';
import { Announcement } from '../types';
import { Bell, Calendar, User, ArrowRight, Tag } from 'lucide-react';

interface AnnouncementCardProps {
  announcement: Announcement;
  onReadMore: (ann: Announcement) => void;
}

export const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  announcement,
  onReadMore,
}) => {
  const formattedDate = new Date(announcement.published_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div
      id={`announcement-${announcement.slug}`}
      onClick={() => onReadMore(announcement)}
      className="group p-5 rounded-lg bg-[#0D1017] border border-[#1A1C23] hover:border-[#00E5FF]/40 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#00E5FF]/5 cursor-pointer flex flex-col justify-between text-left"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold border border-[#00E5FF]/30 bg-[#00E5FF]/10 text-[#00E5FF] uppercase tracking-wider">
            {announcement.category}
          </span>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#6B7280] uppercase tracking-wider">
            <Calendar className="w-3 h-3 text-[#4B5563]" />
            <span>{formattedDate}</span>
          </div>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-white font-['Outfit'] group-hover:text-[#00E5FF] transition-colors line-clamp-2 leading-snug">
          {announcement.title}
        </h3>

        <p className="text-xs text-[#9CA3AF] mt-2 line-clamp-3 leading-relaxed">
          {announcement.summary}
        </p>

        {announcement.tags && announcement.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[#1A1C23]">
            {announcement.tags.map((t, i) => (
              <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0A0B0E] text-[#6B7280] border border-[#1A1C23]">
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-[#1A1C23] flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-[#6B7280] text-[11px] truncate max-w-[200px]">
          <User className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" />
          <span className="truncate">{announcement.author} ({announcement.author_role})</span>
        </div>
        <div className="flex items-center gap-1 font-bold text-[#00E5FF] text-[11px] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
          <span>Read</span>
          <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
};
