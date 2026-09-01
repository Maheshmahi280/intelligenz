import React, { useState, useEffect } from 'react';
import {
  QrCode,
  CheckCircle2,
  AlertCircle,
  Search,
  Download,
  Trash2,
  Users,
  Calendar,
  Sparkles,
  RefreshCw,
  Clock,
  ScanLine,
  UserCheck,
  Check,
} from 'lucide-react';
import { api } from '../../lib/api';
import { AttendanceRecord, Event, EventRegistration } from '../../types';

interface AdminAttendanceTabProps {
  onRefreshData?: () => void;
}

export function AdminAttendanceTab({ onRefreshData }: AdminAttendanceTabProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [checkins, setCheckins] = useState<AttendanceRecord[]>([]);
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [loading, setLoading] = useState(true);

  // Check-in input
  const [checkinCode, setCheckinCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string; record?: AttendanceRecord } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [eventsData, checkinsData, regsData] = await Promise.all([
        api.getEvents(),
        api.adminGetCheckins(),
        api.adminGetRegistrations(),
      ]);
      setEvents(eventsData);
      if (eventsData.length > 0 && !selectedEventId) {
        setSelectedEventId(eventsData[0].id);
      }
      setCheckins(checkinsData);
      setRegistrations(regsData);
    } catch (err) {
      console.error('Failed to load attendance data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const term = checkinCode.trim();
    if (!term) return;

    setIsProcessing(true);
    setFeedback(null);

    try {
      const result = await api.adminCheckinParticipant({
        code: term,
        event_id: selectedEventId || undefined,
        method: 'Admin Terminal',
      });

      setFeedback({
        type: 'success',
        message: result.message,
        record: result.record,
      });
      setCheckinCode('');
      // Reload checkins
      const updatedCheckins = await api.adminGetCheckins(selectedEventId || undefined);
      setCheckins(updatedCheckins);
      onRefreshData?.();
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: err.message || 'Check-in failed. Please verify the ticket or roll number.',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteCheckin = async (id: string) => {
    try {
      await api.adminDeleteCheckin(id);
      const updated = checkins.filter((c) => c.id !== id);
      setCheckins(updated);
    } catch (err) {
      console.error('Failed to delete checkin record:', err);
    }
  };

  const exportAttendanceCSV = () => {
    const headers = ['Event', 'Student Name', 'Roll Number', 'Email', 'Department', 'Checked-in Time', 'Method'];
    const rows = filteredCheckins.map((c) => [
      `"${c.event_title}"`,
      `"${c.participant_name}"`,
      `"${c.roll_number}"`,
      `"${c.email}"`,
      `"${c.department}"`,
      `"${new Date(c.checked_in_at).toLocaleString()}"`,
      `"${c.checkin_method}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `attendance_${selectedEvent?.slug || 'all'}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const selectedEvent = events.find((e) => e.id === selectedEventId);
  const eventRegistrations = registrations.filter((r) => !selectedEventId || r.event_id === selectedEventId);
  const eventCheckins = checkins.filter((c) => !selectedEventId || c.event_id === selectedEventId);

  const filteredCheckins = eventCheckins.filter((c) => {
    return (
      c.participant_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.roll_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <QrCode className="w-5 h-5 text-cyan-400" />
            Event Check-In & Live Attendance Engine
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time scanner and ticket verification terminal for workshops and hackathons.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportAttendanceCSV}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5 border border-slate-700"
          >
            <Download className="w-3.5 h-3.5" />
            Export Attendance Roster
          </button>
          <button
            onClick={loadInitialData}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl transition-colors border border-slate-700"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Event Selector & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 md:col-span-1 space-y-2">
          <label className="block text-xs font-mono uppercase text-slate-400">Select Active Event</label>
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-medium text-white focus:border-cyan-500"
          >
            <option value="">All Events Combined</option>
            {events.map((ev) => (
              <option key={ev.id} value={ev.id}>
                {ev.title} ({ev.date})
              </option>
            ))}
          </select>
          {selectedEvent && (
            <p className="text-[11px] text-slate-400">
              Venue: <span className="text-slate-300">{selectedEvent.venue}</span> • {selectedEvent.start_time}
            </p>
          )}
        </div>

        {/* Stats Summary Cards */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Registered Participants</p>
            <h3 className="text-2xl font-black text-white mt-1 font-mono">{eventRegistrations.length}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Checked-In (Attended)</p>
            <h3 className="text-2xl font-black text-emerald-400 mt-1 font-mono">{eventCheckins.length}</h3>
            <p className="text-[10px] text-slate-500 mt-0.5">
              Attendance Rate: {eventRegistrations.length ? Math.round((eventCheckins.length / eventRegistrations.length) * 100) : 0}%
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Terminal Check-in Input Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border-2 border-cyan-500/30 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
          <ScanLine className="w-4 h-4 animate-pulse" />
          Rapid Scan & Check-In Station
        </div>

        <form onSubmit={handleCheckin} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              autoFocus
              value={checkinCode}
              onChange={(e) => setCheckinCode(e.target.value)}
              placeholder="Scan QR / Enter Ticket Code (TKT-xxx) or Student Roll Number (22K61A4201)..."
              className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-3 pl-11 text-sm font-mono text-white placeholder-slate-500 transition-colors"
            />
            <QrCode className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
          </div>

          <button
            type="submit"
            disabled={isProcessing || !checkinCode.trim()}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white font-bold rounded-xl text-sm shadow-md shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 flex-shrink-0"
          >
            {isProcessing ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <CheckCircle2 className="w-4 h-4" />
            )}
            Verify & Check-In
          </button>
        </form>

        {/* Feedback Message Banner */}
        {feedback && (
          <div
            className={`p-4 rounded-xl text-xs flex items-start gap-3 animate-in fade-in duration-200 ${
              feedback.type === 'success'
                ? 'bg-emerald-950/70 border border-emerald-500/40 text-emerald-200'
                : 'bg-red-950/70 border border-red-500/40 text-red-200'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <p className="font-bold text-sm">{feedback.message}</p>
              {feedback.record && (
                <p className="text-[11px] text-emerald-300 font-mono">
                  Event: {feedback.record.event_title} • Dept: {feedback.record.department} • Time: {new Date(feedback.record.checked_in_at).toLocaleTimeString()}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Attendance Roster Table */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            Checked-in Attendees Log ({filteredCheckins.length})
          </h3>
          <div className="relative min-w-[220px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by roll no or name..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 pl-8 text-xs text-white placeholder-slate-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        {filteredCheckins.length === 0 ? (
          <div className="p-8 text-center bg-slate-900/40 border border-slate-800 rounded-xl text-xs text-slate-400">
            No attendees checked in yet for this event filter.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Roll Number</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Event</th>
                  <th className="py-3 px-4">Time Checked-in</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                {filteredCheckins.map((chk) => (
                  <tr key={chk.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-sans font-bold text-white">
                      {chk.participant_name}
                    </td>
                    <td className="py-3 px-4 text-cyan-300 font-bold">{chk.roll_number}</td>
                    <td className="py-3 px-4 text-slate-400">{chk.department}</td>
                    <td className="py-3 px-4 text-slate-300 max-w-[180px] truncate" title={chk.event_title}>
                      {chk.event_title}
                    </td>
                    <td className="py-3 px-4 text-emerald-400">
                      {new Date(chk.checked_in_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleDeleteCheckin(chk.id)}
                        title="Remove Check-in"
                        className="p-1 rounded hover:bg-red-950/60 text-red-400 hover:text-red-300 transition-colors"
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
      </div>
    </div>
  );
}
