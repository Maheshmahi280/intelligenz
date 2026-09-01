import React from 'react';
import { Event } from '../types';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Sparkles,
  ArrowLeft,
  Share2,
  Trophy,
  CheckCircle2,
  Users,
} from 'lucide-react';

interface EventDetailPageProps {
  event: Event;
  onBack: () => void;
  onRegister: (event: Event) => void;
  onSelectEvent: (event: Event) => void;
  relatedEvents?: Event[];
}

export const EventDetailPage: React.FC<EventDetailPageProps> = ({
  event,
  onBack,
  onRegister,
}) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${event.title} - INTELLIGENZ`,
          text: event.short_description,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10 text-left">
      {/* Back Button & Share */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#9CA3AF] hover:text-[#00E5FF] transition-colors p-2.5 rounded-lg bg-[#0D1017] border border-[#1A1C23]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Events</span>
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D1D5DB] hover:text-white p-2.5 px-4 rounded-lg bg-[#0D1017] border border-[#1A1C23] hover:border-[#00E5FF]/30 transition-colors"
        >
          <Share2 className="w-3.5 h-3.5 text-[#00E5FF]" />
          <span>Share Event</span>
        </button>
      </div>

      {/* Main Event Header Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-[#0A0B0E] border border-[#1A1C23] shadow-2xl">
        <div className="relative aspect-[21/9] sm:aspect-[2.5/1] w-full bg-[#0A0B0E]">
          <img
            src={event.event_image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0E] via-[#0A0B0E]/60 to-transparent" />
        </div>

        <div className="p-6 sm:p-10 -mt-16 sm:-mt-24 relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded text-xs font-mono font-bold bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 uppercase tracking-wider">
              {event.category}
            </span>
            <span
              className={`px-3 py-1 rounded text-xs font-mono font-bold border uppercase tracking-wider ${
                event.status === 'Registration Open'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : event.status === 'Completed'
                  ? 'bg-[#1A1C23] text-[#6B7280] border-[#252833]'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              }`}
            >
              {event.status}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white font-['Outfit'] leading-tight">
            {event.title}
          </h1>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2 text-xs text-[#9CA3AF]">
            <div className="p-3 rounded-lg bg-[#0D1017] border border-[#1A1C23] flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-[#00E5FF] shrink-0" />
              <div>
                <div className="text-[10px] text-[#6B7280]">Date &amp; Time</div>
                <div className="font-semibold text-white">
                  {event.date} • {event.start_time}
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#0D1017] border border-[#1A1C23] flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
              <div>
                <div className="text-[10px] text-[#6B7280]">Venue</div>
                <div className="font-semibold text-white truncate max-w-[200px]">
                  {event.venue}
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#0D1017] border border-[#1A1C23] flex items-center gap-2.5">
              <Users className="w-4 h-4 text-indigo-400 shrink-0" />
              <div>
                <div className="text-[10px] text-[#6B7280]">Format</div>
                <div className="font-semibold text-white">
                  {(event.participation_type || 'SOLO') === 'SOLO' && 'Solo (1 Student)'}
                  {event.participation_type === 'DUO' && 'Duo (2 Members)'}
                  {event.participation_type === 'TEAM' && `Team (${event.min_team_size || 2}–${event.max_team_size || 4} Members)`}
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#0D1017] border border-[#1A1C23] flex items-center gap-2.5">
              <Users className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <div className="text-[10px] text-[#6B7280]">Registrations</div>
                <div className="font-semibold text-white">
                  {event.current_participants} / {event.maximum_participants || '∞'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Description & Highlights */}
        <div className="lg:col-span-2 space-y-8">
          {/* Detailed Description */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0D1017] border border-[#1A1C23] space-y-4">
            <h2 className="text-xl font-bold text-white font-['Outfit']">About This Event</h2>
            <div className="text-sm text-[#9CA3AF] leading-relaxed whitespace-pre-line space-y-3">
              {event.description}
            </div>
          </div>

          {/* Highlights */}
          {event.highlights && event.highlights.length > 0 && (
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0D1017] border border-[#1A1C23] space-y-4">
              <h3 className="text-lg font-bold text-white font-['Outfit'] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#00E5FF]" />
                Event Highlights &amp; Takeaways
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {event.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-lg bg-[#0A0B0E] border border-[#1A1C23] text-xs text-[#D1D5DB] flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* If Event is Completed: Results & Winners */}
          {event.status === 'Completed' && (
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0D1017] border border-amber-500/30 space-y-4">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-lg font-['Outfit']">
                <Trophy className="w-5 h-5 text-amber-400" />
                Event Recap &amp; Winners
              </div>

              {event.results && (
                <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
                  {event.results}
                </p>
              )}

              {event.winners && event.winners.length > 0 && (
                <div className="space-y-2.5 pt-2">
                  <div className="text-xs font-mono font-bold text-[#6B7280] uppercase">
                    Podium Winners
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {event.winners.map((winner, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-[#0A0B0E] border border-[#1A1C23] text-left"
                      >
                        <div className="text-xs font-bold text-amber-400">{winner.position}</div>
                        <div className="text-xs font-semibold text-white mt-1">
                          {winner.name}
                        </div>
                        {winner.team_name && (
                          <div className="text-[11px] text-[#6B7280]">
                            Team: {winner.team_name}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Speaker & Registration Action */}
        <div className="space-y-6">
          {/* Registration Card */}
          <div className="p-6 rounded-2xl bg-[#0D1017] border border-[#00E5FF]/30 shadow-xl space-y-4 text-center">
            <div className="text-[10px] font-mono font-bold text-[#00E5FF] uppercase tracking-widest">
              Official Entry
            </div>

            <div className="text-xl font-bold text-white font-['Outfit']">
              {event.status === 'Registration Open'
                ? 'Reserve Your Seat'
                : `Status: ${event.status}`}
            </div>

            <p className="text-xs text-[#9CA3AF]">
              Open for students of DR. K. V. SUBBA REDDY INSTITUTE OF TECHNOLOGY &amp; affiliated institutions.
            </p>

            {event.status === 'Registration Open' ? (
              <button
                onClick={() => onRegister(event)}
                className="w-full py-3.5 rounded-lg bg-[#00E5FF] hover:bg-[#33ebff] text-[#0A0B0E] font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#00E5FF]/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>REGISTER NOW</span>
              </button>
            ) : (
              <div className="p-3 rounded-lg bg-[#0A0B0E] border border-[#1A1C23] text-xs text-[#6B7280] font-medium">
                {event.status === 'Completed'
                  ? 'This event has successfully concluded.'
                  : 'Registrations are currently closed.'}
              </div>
            )}
          </div>

          {/* Speaker Bio */}
          {event.speaker && (
            <div className="p-6 rounded-2xl bg-[#0D1017] border border-[#1A1C23] space-y-3">
              <div className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">
                Keynote Speaker
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-[#0A0B0E] text-amber-400 border border-[#1A1C23]">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{event.speaker}</h4>
                  <p className="text-xs text-[#9CA3AF]">{event.speaker_bio}</p>
                </div>
              </div>
            </div>
          )}

          {/* Institutional Note */}
          <div className="p-4 rounded-xl bg-[#0A0B0E] border border-[#1A1C23] text-[11px] text-[#9CA3AF] space-y-1">
            <div className="font-bold text-white uppercase tracking-wider text-[10px]">
              Organized by
            </div>
            <div className="text-[#00E5FF] font-semibold">INTELLIGENZ Club</div>
            <div>Department of CSE (AIML) &amp; AI</div>
            <div className="text-[10px] text-[#6B7280]">
              DR. K. V. SUBBA REDDY INSTITUTE OF TECHNOLOGY
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
