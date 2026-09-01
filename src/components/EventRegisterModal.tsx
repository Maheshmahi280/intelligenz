import React, { useState, useEffect } from 'react';
import { Event, TeamMemberRegistration } from '../types';
import { api } from '../lib/api';
import { X, Sparkles, CheckCircle2, AlertCircle, Loader2, Calendar, MapPin, Users, UserPlus, Trash2, ShieldCheck, User } from 'lucide-react';
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
  // Leader / Solo state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('CSE (AIML)');
  const [year, setYear] = useState('3rd Year');
  const [rollNumber, setRollNumber] = useState('');

  // Team / Duo state
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState<TeamMemberRegistration[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<any | null>(null);

  const pType = event?.participation_type || 'SOLO';
  const minTeam = event?.min_team_size || (pType === 'SOLO' ? 1 : 2);
  const maxTeam = event?.max_team_size || (pType === 'SOLO' ? 1 : pType === 'DUO' ? 2 : 4);

  // Initialize members when event changes
  useEffect(() => {
    if (!event) return;
    if (event.participation_type === 'DUO') {
      setTeamMembers([
        { full_name: '', email: '', roll_number: '', department: 'CSE (AIML)', year: '3rd Year' },
      ]);
    } else if (event.participation_type === 'TEAM') {
      const initialAdditional = Math.max(1, (event.min_team_size || 2) - 1);
      setTeamMembers(
        Array.from({ length: initialAdditional }, () => ({
          full_name: '',
          email: '',
          roll_number: '',
          department: 'CSE (AIML)',
          year: '3rd Year',
        }))
      );
    } else {
      setTeamMembers([]);
    }
    setError(null);
  }, [event]);

  if (!isOpen || !event) return null;

  const totalCurrentMembers = 1 + teamMembers.length; // Leader + additional members

  const handleAddMember = () => {
    if (totalCurrentMembers >= maxTeam) return;
    setTeamMembers((prev) => [
      ...prev,
      { full_name: '', email: '', roll_number: '', department: 'CSE (AIML)', year: '3rd Year' },
    ]);
  };

  const handleRemoveMember = (index: number) => {
    if (pType === 'DUO') return; // Cannot remove in duo
    if (totalCurrentMembers <= minTeam) {
      setError(`Minimum team size for this event is ${minTeam} members.`);
      return;
    }
    setTeamMembers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMemberChange = (index: number, field: keyof TeamMemberRegistration, value: string) => {
    setTeamMembers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Front-end validation
    if (pType !== 'SOLO' && !teamName.trim()) {
      setError(`Please enter a ${pType === 'DUO' ? 'Duo' : 'Team'} Name.`);
      return;
    }

    if (pType === 'TEAM') {
      if (totalCurrentMembers < minTeam || totalCurrentMembers > maxTeam) {
        setError(`Team size must be between ${minTeam} and ${maxTeam} members.`);
        return;
      }
    }

    // Validate member fields for DUO and TEAM
    if (pType !== 'SOLO') {
      for (let i = 0; i < teamMembers.length; i++) {
        const m = teamMembers[i];
        if (!m.full_name.trim() || !m.email.trim() || !m.roll_number.trim()) {
          setError(`Please fill in all details for Member #${i + 2} (Name, Email, Roll Number).`);
          return;
        }
      }
    }

    setLoading(true);

    try {
      const res = await api.registerForEvent(event.id, {
        full_name: fullName,
        email,
        phone,
        department,
        year,
        roll_number: rollNumber,
        team_name: pType !== 'SOLO' ? teamName : undefined,
        team_members: pType !== 'SOLO' ? teamMembers : undefined,
      });

      setSuccessData(res);
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00E5FF', '#A78BFA', '#3B82F6', '#10B981'],
      });

      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please verify your details.');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-[#0D1017] border border-[#1A1C23] p-5 sm:p-7 shadow-2xl shadow-cyan-950/40 overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 bg-[#00E5FF]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-[#1A1C23] text-[#9CA3AF] hover:text-white hover:bg-[#252833] transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {successData ? (
          <div className="text-center py-6 space-y-4">
            <div className="inline-flex p-4 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-1">
              <CheckCircle2 className="w-12 h-12 animate-bounce" />
            </div>
            <h3 className="text-2xl font-bold text-white font-['Outfit']">
              Registration Confirmed!
            </h3>
            <p className="text-sm text-[#9CA3AF] max-w-md mx-auto">
              {pType !== 'SOLO' ? (
                <>
                  Team <span className="text-[#00E5FF] font-semibold">{teamName}</span> ({totalCurrentMembers} Members) has been successfully registered for <span className="text-white font-medium">{event.title}</span>.
                </>
              ) : (
                <>
                  <span className="text-white font-semibold">{fullName}</span> (Roll: <span className="font-mono text-[#00E5FF]">{rollNumber}</span>) has been registered for <span className="text-white font-medium">{event.title}</span>.
                </>
              )}
            </p>

            <div className="p-4 rounded-xl bg-[#0A0B0E] border border-[#1A1C23] text-left text-xs space-y-2 text-[#D1D5DB]">
              <div className="flex justify-between border-b border-[#1A1C23] pb-2">
                <span className="text-[#6B7280]">Participation Type:</span>
                <span className="font-bold text-[#00E5FF]">{pType} ({totalCurrentMembers} {totalCurrentMembers === 1 ? 'Participant' : 'Members'})</span>
              </div>
              <div className="flex justify-between border-b border-[#1A1C23] pb-2">
                <span className="text-[#6B7280]">Status:</span>
                <span className="font-bold text-emerald-400">{successData.registration?.status || 'Confirmed'}</span>
              </div>
              <div className="flex justify-between border-b border-[#1A1C23] pb-2">
                <span className="text-[#6B7280]">Date & Time:</span>
                <span>{event.date} at {event.start_time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Venue:</span>
                <span className="truncate max-w-[280px]">{event.venue}</span>
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
            {/* Header */}
            <div className="mb-5">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#00E5FF] px-2.5 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/20">
                  <Sparkles className="w-3 h-3" />
                  Event Registration
                </div>
                <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#A78BFA] px-2.5 py-1 rounded-full bg-[#A78BFA]/10 border border-[#A78BFA]/20">
                  <Users className="w-3 h-3" />
                  {pType === 'SOLO' && 'Solo Event (1 Participant)'}
                  {pType === 'DUO' && 'Duo Event (2 Members Required)'}
                  {pType === 'TEAM' && `Team Event (${minTeam}–${maxTeam} Members)`}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white font-['Outfit'] leading-snug">
                {event.title}
              </h3>
              
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-[#9CA3AF]">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span>{event.date} • {event.start_time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#A78BFA]" />
                  <span className="truncate max-w-[240px]">{event.venue}</span>
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              {/* Team Name for DUO / TEAM */}
              {pType !== 'SOLO' && (
                <div className="p-3.5 rounded-xl bg-[#0A0B0E] border border-[#1A1C23] space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#00E5FF] uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {pType === 'DUO' ? 'Duo / Pair Name *' : 'Team Name *'}
                    </label>
                    <span className="text-[11px] text-[#9CA3AF]">
                      Team Size: <strong className="text-white">{totalCurrentMembers}</strong> of {minTeam === maxTeam ? minTeam : `${minTeam}–${maxTeam}`}
                    </span>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder={pType === 'DUO' ? 'e.g. AI Pioneers' : 'e.g. Neural Ninjas'}
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#11141D] border border-[#1A1C23] text-white text-xs focus:outline-none focus:border-[#00E5FF] transition-colors"
                  />
                </div>
              )}

              {/* Section 1: Team Leader / Solo Participant */}
              <div className="p-4 rounded-xl bg-[#0A0B0E] border border-[#1A1C23] space-y-3">
                <div className="flex items-center justify-between border-b border-[#1A1C23] pb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#D1D5DB] flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#00E5FF]" />
                    {pType === 'SOLO' ? 'Participant Details' : 'Team Leader (Participant 1)'}
                  </h4>
                  <span className="text-[10px] font-semibold text-[#00E5FF] bg-[#00E5FF]/10 px-2 py-0.5 rounded">
                    Primary Contact
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#9CA3AF] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#11141D] border border-[#1A1C23] text-white text-xs focus:outline-none focus:border-[#00E5FF] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#9CA3AF] mb-1">
                      College Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="student@drkvsrit.ac.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#11141D] border border-[#1A1C23] text-white text-xs focus:outline-none focus:border-[#00E5FF] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#9CA3AF] mb-1">
                      Roll Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 238X1A05XX"
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#11141D] border border-[#1A1C23] text-white text-xs font-mono uppercase focus:outline-none focus:border-[#00E5FF] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#9CA3AF] mb-1">
                      Department *
                    </label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#11141D] border border-[#1A1C23] text-white text-xs focus:outline-none focus:border-[#00E5FF] transition-colors"
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
                    <label className="block text-xs font-medium text-[#9CA3AF] mb-1">
                      Year of Study *
                    </label>
                    <select
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#11141D] border border-[#1A1C23] text-white text-xs focus:outline-none focus:border-[#00E5FF] transition-colors"
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#9CA3AF] mb-1">
                    WhatsApp Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#11141D] border border-[#1A1C23] text-white text-xs focus:outline-none focus:border-[#00E5FF] transition-colors"
                  />
                </div>
              </div>

              {/* Section 2: Team Members (DUO / TEAM) */}
              {pType !== 'SOLO' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#A78BFA] flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />
                      {pType === 'DUO' ? 'Participant 2 Details' : 'Team Members'}
                    </h4>
                    {pType === 'TEAM' && totalCurrentMembers < maxTeam && (
                      <button
                        type="button"
                        onClick={handleAddMember}
                        className="px-2.5 py-1 rounded bg-[#A78BFA]/10 hover:bg-[#A78BFA]/20 text-[#A78BFA] border border-[#A78BFA]/30 text-[11px] font-bold flex items-center gap-1 transition-all"
                      >
                        <UserPlus className="w-3 h-3" />
                        Add Member ({totalCurrentMembers}/{maxTeam})
                      </button>
                    )}
                  </div>

                  {teamMembers.map((member, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#0A0B0E] border border-[#1A1C23] space-y-3 relative group"
                    >
                      <div className="flex items-center justify-between border-b border-[#1A1C23] pb-1.5">
                        <span className="text-xs font-semibold text-[#D1D5DB]">
                          Member #{idx + 2}
                        </span>
                        {pType === 'TEAM' && totalCurrentMembers > minTeam && (
                          <button
                            type="button"
                            onClick={() => handleRemoveMember(idx)}
                            className="p-1 rounded text-[#9CA3AF] hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                            title="Remove member"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#9CA3AF] mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Priya Sharma"
                          value={member.full_name}
                          onChange={(e) => handleMemberChange(idx, 'full_name', e.target.value)}
                          className="w-full px-3.5 py-2 rounded-lg bg-[#11141D] border border-[#1A1C23] text-white text-xs focus:outline-none focus:border-[#A78BFA] transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-[#9CA3AF] mb-1">
                            College Email *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="member@drkvsrit.ac.in"
                            value={member.email}
                            onChange={(e) => handleMemberChange(idx, 'email', e.target.value)}
                            className="w-full px-3.5 py-2 rounded-lg bg-[#11141D] border border-[#1A1C23] text-white text-xs focus:outline-none focus:border-[#A78BFA] transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#9CA3AF] mb-1">
                            Roll Number *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. 238X1A05YY"
                            value={member.roll_number}
                            onChange={(e) => handleMemberChange(idx, 'roll_number', e.target.value)}
                            className="w-full px-3.5 py-2 rounded-lg bg-[#11141D] border border-[#1A1C23] text-white text-xs font-mono uppercase focus:outline-none focus:border-[#A78BFA] transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-[#9CA3AF] mb-1">
                            Department
                          </label>
                          <select
                            value={member.department || 'CSE (AIML)'}
                            onChange={(e) => handleMemberChange(idx, 'department', e.target.value)}
                            className="w-full px-3.5 py-2 rounded-lg bg-[#11141D] border border-[#1A1C23] text-white text-xs focus:outline-none focus:border-[#A78BFA] transition-colors"
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
                          <label className="block text-xs font-medium text-[#9CA3AF] mb-1">
                            Year
                          </label>
                          <select
                            value={member.year || '3rd Year'}
                            onChange={(e) => handleMemberChange(idx, 'year', e.target.value)}
                            className="w-full px-3.5 py-2 rounded-lg bg-[#11141D] border border-[#1A1C23] text-white text-xs focus:outline-none focus:border-[#A78BFA] transition-colors"
                          >
                            <option value="1st Year">1st Year</option>
                            <option value="2nd Year">2nd Year</option>
                            <option value="3rd Year">3rd Year</option>
                            <option value="4th Year">4th Year</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-lg bg-[#00E5FF] hover:bg-[#33ebff] text-[#0A0B0E] font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#00E5FF]/20 hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Validating & Registering...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>
                        {pType === 'SOLO'
                          ? 'CONFIRM SOLO REGISTRATION'
                          : `CONFIRM ${pType} REGISTRATION (${totalCurrentMembers} MEMBERS)`}
                      </span>
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
