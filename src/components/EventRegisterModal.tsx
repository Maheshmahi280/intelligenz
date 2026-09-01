import React, { useState } from 'react';
import { Event } from '../types';
import { api } from '../lib/api';
import { X, Sparkles, CheckCircle2, AlertCircle, Loader2, Calendar, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EventRegisterModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const EventRegisterModal: React.FC<EventRegisterModalProps> = ({
  event,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('CSE (AIML)');
  const [year, setYear] = useState('3rd Year');
  const [rollNumber, setRollNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<any | null>(null);

  if (!isOpen || !event) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await api.registerForEvent(event.id, {
        full_name: fullName,
        email,
        phone,
        department,
        year,
        roll_number: rollNumber,
      });

      setSuccessData(res);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#a855f7', '#ec4899', '#f59e0b'],
      });

      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSuccessData(null);
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-2xl bg-[#0D1017] border border-[#1A1C23] p-5 sm:p-7 shadow-2xl shadow-cyan-950/30 overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-32 bg-[#00E5FF]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-[#1A1C23] text-[#9CA3AF] hover:text-white hover:bg-[#252833] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {successData ? (
          <div className="text-center py-5 space-y-4">
            <div className="inline-flex p-3.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-1">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-['Outfit']">
              Registration Confirmed!
            </h3>
            <p className="text-xs sm:text-sm text-[#9CA3AF] max-w-sm mx-auto">
              Your details have been saved to the database for <span className="text-[#00E5FF] font-semibold">{event.title}</span> (Roll No: <span className="font-mono text-white">{rollNumber}</span>).
            </p>
            <div className="p-3.5 rounded-xl bg-[#0A0B0E] border border-[#1A1C23] text-left text-xs space-y-1.5 text-[#D1D5DB]">
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Status:</span>
                <span className="font-bold text-emerald-400">{successData.registration?.status || 'Confirmed'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Date:</span>
                <span>{event.date} at {event.start_time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Venue:</span>
                <span>{event.venue}</span>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-full py-3 rounded-lg bg-[#00E5FF] hover:bg-[#33ebff] text-[#0A0B0E] font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#00E5FF]/20 transition-all"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-5">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#00E5FF] px-2.5 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/20 mb-2">
                <Sparkles className="w-3 h-3" />
                Event Registration
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white font-['Outfit'] line-clamp-2">
                {event.title}
              </h3>
              <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-[#9CA3AF]">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span>{event.date} • {event.start_time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#A78BFA]" />
                  <span className="truncate max-w-[200px]">{event.venue}</span>
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 text-left">
              <div>
                <label className="block text-xs font-semibold text-[#D1D5DB] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#0A0B0E] border border-[#1A1C23] text-white text-xs focus:outline-none focus:border-[#00E5FF] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#D1D5DB] mb-1">
                    College Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@drkvsrit.ac.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#0A0B0E] border border-[#1A1C23] text-white text-xs focus:outline-none focus:border-[#00E5FF] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D1D5DB] mb-1">
                    Roll Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 238X1A05XX"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#0A0B0E] border border-[#1A1C23] text-white text-xs font-mono uppercase focus:outline-none focus:border-[#00E5FF] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#D1D5DB] mb-1">
                    Department *
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#0A0B0E] border border-[#1A1C23] text-white text-xs focus:outline-none focus:border-[#00E5FF] transition-colors"
                  >
                    <option value="CSE (AIML)">CSE (AIML)</option>
                    <option value="AI & Data Science">AI &amp; Data Science</option>
                    <option value="CSE Core">CSE Core</option>
                    <option value="ECE">ECE</option>
                    <option value="EEE">EEE</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Civil">Civil</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D1D5DB] mb-1">
                    Year of Study *
                  </label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#0A0B0E] border border-[#1A1C23] text-white text-xs focus:outline-none focus:border-[#00E5FF] transition-colors"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#D1D5DB] mb-1">
                  Phone Number (WhatsApp)
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#0A0B0E] border border-[#1A1C23] text-white text-xs focus:outline-none focus:border-[#00E5FF] transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg bg-[#00E5FF] hover:bg-[#33ebff] text-[#0A0B0E] font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#00E5FF]/20 hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Confirming Registration...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>SUBMIT REGISTRATION</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
