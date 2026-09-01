import React, { useState } from 'react';
import { api } from '../lib/api';
import { Shield, Lock, Mail, AlertCircle, Eye, EyeOff, ArrowLeft, KeyRound, CheckCircle2 } from 'lucide-react';
import { IntelligenzLogo } from '../components/IntelligenzLogo';

interface AdminLoginPageProps {
  onLoginSuccess: (token: string) => void;
  onNavigate: (path: string) => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onLoginSuccess,
  onNavigate,
}) => {
  const [identifier, setIdentifier] = useState('mahigamingzone2@gmail.com');
  const [password, setPassword] = useState('intelligenz2026');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await api.adminLogin({
        email: identifier.includes('@') ? identifier : undefined,
        username: !identifier.includes('@') ? identifier : undefined,
        password,
      });
      onLoginSuccess(res.token);
    } catch (err: any) {
      setError(err.message || 'Invalid admin credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleUsePreset = (user: string, pass: string) => {
    setIdentifier(user);
    setPassword(pass);
    setError(null);
  };

  return (
    <div className="min-h-[88vh] flex items-center justify-center pt-24 pb-16 px-4 bg-[#0A0B0E]">
      <div className="w-full max-w-md rounded-2xl bg-[#0D1017] border border-[#1A1C23] p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden text-left">
        {/* Subtle cyan glow */}
        <div className="absolute top-0 right-0 w-48 h-32 bg-[#00E5FF]/5 rounded-full blur-3xl pointer-events-none" />

        <button
          id="admin-back-to-home-btn"
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-1.5 text-xs text-[#6B7280] hover:text-[#00E5FF] transition-colors mb-6 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Public Website</span>
        </button>

        <div className="text-center mb-6 space-y-2">
          <div className="flex justify-center">
            <IntelligenzLogo size="sm" interactive={false} />
          </div>
          <h1 className="text-2xl font-black text-white font-['Outfit'] tracking-tight">
            Admin Management Portal
          </h1>
          <p className="text-xs text-[#9CA3AF]">
            IntelliGenZ Control Suite &amp; Database Management
          </p>
          <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#1A1C23] border border-[#2A2E3D] text-[10px] uppercase font-bold tracking-widest text-[#00E5FF]">
            CSE (AIML) &amp; AI • DR. KVSRIT
          </div>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#D1D5DB] mb-1.5 uppercase tracking-wider">
              Admin Email or Username
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="admin-login-identifier"
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. mahigamingzone2@gmail.com or admin"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0A0B0E] border border-[#1A1C23] text-white text-xs placeholder:text-[#4B5563] focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-[#D1D5DB] uppercase tracking-wider">
                Password / Secret Key
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] text-[#6B7280] hover:text-[#00E5FF] flex items-center gap-1 transition-colors"
              >
                {showPassword ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Hide</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Show</span>
                  </>
                )}
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="admin-login-password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#0A0B0E] border border-[#1A1C23] text-white text-xs placeholder:text-[#4B5563] focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-colors"
              />
            </div>
          </div>

          {/* Quick preset selector for ease of access */}
          <div className="p-3 bg-[#0A0B0E] border border-[#1A1C23] rounded-xl text-left space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <KeyRound className="w-3 h-3 text-[#00E5FF]" />
                Standard Credentials
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => handleUsePreset('mahigamingzone2@gmail.com', 'intelligenz2026')}
                className="px-2.5 py-1 rounded bg-[#1A1C23] hover:bg-[#252833] text-[10px] text-[#00E5FF] font-medium transition-colors border border-[#00E5FF]/20"
              >
                Personal Gmail: mahigamingzone2@gmail.com
              </button>
              <button
                type="button"
                onClick={() => handleUsePreset('admin', 'intelligenz2026')}
                className="px-2.5 py-1 rounded bg-[#1A1C23] hover:bg-[#252833] text-[10px] text-[#9CA3AF] font-medium transition-colors border border-[#1A1C23]"
              >
                Username: admin
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              id="admin-login-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-[#00E5FF] hover:bg-[#33ebff] font-bold text-xs text-[#0A0B0E] uppercase tracking-widest shadow-lg shadow-[#00E5FF]/20 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#0A0B0E]/30 border-t-[#0A0B0E] rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  <span>Sign In to Admin Portal</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-[#1A1C23] text-center text-[10px] text-[#6B7280] font-medium">
          Official Digital Platform of IntelliGenZ Club
          <div className="text-[9px] uppercase tracking-wider text-[#4B5563] mt-0.5">
            DR. K. V. SUBBA REDDY INSTITUTE OF TECHNOLOGY
          </div>
        </div>
      </div>
    </div>
  );
};
