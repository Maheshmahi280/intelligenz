import React from 'react';
import { Event } from '../types';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface EventCardProps {
  event: Event;
  onViewDetails: (event: Event) => void;
  onRegister: (event: Event) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onViewDetails,
  onRegister,
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Registration Open':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
            OPEN
          </span>
        );
      case 'Upcoming':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#1A1C23] text-[#9CA3AF] border border-[#1A1C23] uppercase tracking-wider">
            UPCOMING
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#0A0B0E] text-[#6B7280] border border-[#1A1C23] uppercase tracking-wider">
            COMPLETED
          </span>
        );
      case 'Registration Closed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
            CLOSED
          </span>
        );
      default:
        return null;
    }
  };

  const getCategoryColor = (category: string) => {
    return 'bg-[#0A0B0E]/80 text-[#00E5FF] border-[#00E5FF]/30';
  };

  return (
    <div
      id={`event-card-${event.slug}`}
      className="group rounded-lg bg-[#0D1017] border border-[#1A1C23] hover:border-[#00E5FF]/40 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#00E5FF]/5 flex flex-col justify-between"
    >
      {/* Event Header Image with Overlay */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0A0B0E]">
        <img
          src={event.event_image}
          alt={event.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1017] via-transparent to-transparent" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold border uppercase tracking-wider backdrop-blur-md ${getCategoryColor(event.category)}`}>
            {event.category}
          </span>
          {getStatusBadge(event.status)}
        </div>

        {/* Date & Format pills overlay at bottom of image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#0A0B0E]/90 backdrop-blur-md border border-[#1A1C23] text-[10px] font-mono uppercase tracking-wider text-[#E0E2E6]">
            <Calendar className="w-3 h-3 text-[#00E5FF]" />
            <span>{event.date}</span>
          </div>

          <div className="px-2 py-0.5 rounded bg-[#0A0B0E]/90 backdrop-blur-md border border-[#1A1C23] text-[10px] font-mono font-bold text-[#A78BFA]">
            {(event.participation_type || 'SOLO') === 'SOLO' && 'SOLO'}
            {event.participation_type === 'DUO' && 'DUO (2)'}
            {event.participation_type === 'TEAM' && `TEAM (${event.min_team_size || 2}–${event.max_team_size || 4})`}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between text-left">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white font-['Outfit'] group-hover:text-[#00E5FF] transition-colors line-clamp-2 leading-snug">
            {event.title}
          </h3>

          <p className="text-xs text-[#9CA3AF] mt-2 line-clamp-2 leading-relaxed">
            {event.short_description}
          </p>

          {/* Metadata Grid */}
          <div className="mt-4 pt-3 border-t border-[#1A1C23] space-y-1.5 text-xs text-[#9CA3AF]">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" />
              <span className="text-[11px]">{event.start_time} - {event.end_time}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" />
              <span className="truncate text-[11px]">{event.venue}</span>
            </div>

            {event.speaker && (
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" />
                <span className="truncate text-[11px] text-[#9CA3AF]">Speaker: <span className="font-semibold text-white">{event.speaker}</span></span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 pt-3.5 border-t border-[#1A1C23] flex items-center gap-2">
          {event.status === 'Registration Open' ? (
            <button
              onClick={() => onRegister(event)}
              className="flex-1 py-2 px-3 rounded bg-[#00E5FF] hover:bg-[#33ebff] font-bold text-[11px] uppercase tracking-widest text-[#0A0B0E] shadow-sm flex items-center justify-center gap-1.5 transition-all active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>REGISTER</span>
            </button>
          ) : (
            <button
              onClick={() => onViewDetails(event)}
              className="flex-1 py-2 px-3 rounded bg-[#0A0B0E] hover:bg-[#1A1C23] font-bold text-[11px] uppercase tracking-widest text-[#9CA3AF] hover:text-white border border-[#1A1C23] transition-colors"
            >
              {event.status === 'Completed' ? 'RECAP' : 'DETAILS'}
            </button>
          )}

          <button
            onClick={() => onViewDetails(event)}
            aria-label={`View details for ${event.title}`}
            className="p-2 rounded bg-[#0A0B0E] hover:bg-[#1A1C23] text-[#9CA3AF] hover:text-[#00E5FF] border border-[#1A1C23] transition-colors flex items-center justify-center"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
