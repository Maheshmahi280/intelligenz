import React from 'react';
import { IntelligenzLogo } from '../components/IntelligenzLogo';
import {
  Sparkles,
  Brain,
  Target,
  Eye,
  ShieldCheck,
  Cpu,
  Layers,
  GraduationCap,
  Award,
  ArrowRight,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16 text-left">
      {/* 1. Header & Identity Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 border border-[#00E5FF]/20 bg-[#00E5FF]/5 rounded-full py-1.5 px-4 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#00E5FF] font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>About INTELLIGENZ</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-['Outfit'] tracking-tight">
          Empowering Next-Gen AI Innovators &amp; Leaders
        </h1>

        <p className="text-xs sm:text-sm text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed">
          The premier student technology, software engineering, and AI club of the{' '}
          <span className="text-white font-semibold">Department of CSE (AIML) &amp; AI</span> at{' '}
          <span className="text-white font-semibold">DR. K. V. SUBBA REDDY INSTITUTE OF TECHNOLOGY</span>.
        </p>
      </div>

      {/* 2. Brand Hierarchy Breakdown Card */}
      <div className="p-6 sm:p-10 rounded-2xl bg-[#0D1017] border border-[#1A1C23] shadow-xl space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold text-[#00E5FF] uppercase tracking-widest">
            Institutional Hierarchy &amp; Affiliation
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
            Our Foundation &amp; Roots
          </h2>
          <p className="text-xs text-[#9CA3AF]">
            INTELLIGENZ represents a collaborative alliance between student innovators and department faculty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {/* 1. Brand */}
          <div className="p-6 rounded-xl bg-[#0A0B0E] border border-[#00E5FF]/40 text-center space-y-3">
            <div className="flex justify-center">
              <IntelligenzLogo size="sm" interactive={false} />
            </div>
            <div className="text-[10px] font-mono font-bold text-[#00E5FF] uppercase tracking-widest">
              Primary Visual Identity
            </div>
            <div className="text-xl font-black text-white font-['Outfit']">INTELLIGENZ</div>
            <p className="text-xs text-[#9CA3AF] leading-relaxed">
              The flagship student-driven tech brand embodying intelligence, curiosity, code craftsmanship, and futuristic innovation.
            </p>
          </div>

          {/* 2. Department */}
          <div className="p-6 rounded-xl bg-[#0A0B0E] border border-purple-500/40 text-center space-y-3">
            <div className="p-3 mx-auto w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center">
              <Brain className="w-6 h-6" />
            </div>
            <div className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest">
              Departmental Affiliation
            </div>
            <div className="text-base sm:text-lg font-bold text-white font-['Outfit']">
              Department of CSE (AIML) &amp; AI
            </div>
            <p className="text-xs text-[#9CA3AF] leading-relaxed">
              Providing rigorous academic guidance, state-of-the-art computational labs, GPU servers, and faculty mentorship.
            </p>
          </div>

          {/* 3. College */}
          <div className="p-6 rounded-xl bg-[#0A0B0E] border border-amber-500/40 text-center space-y-3">
            <div className="p-3 mx-auto w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">
              Parent Institution
            </div>
            <div className="text-sm sm:text-base font-bold text-white font-['Outfit']">
              DR. K. V. SUBBA REDDY INSTITUTE OF TECHNOLOGY
            </div>
            <p className="text-xs text-[#9CA3AF] leading-relaxed">
              A premier engineering institution fostering technical excellence, research-driven pedagogy, entrepreneurship, and ethics in Kurnool, AP.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mission */}
        <div className="p-8 rounded-2xl bg-[#0D1017] border border-[#1A1C23] space-y-4">
          <div className="inline-flex p-3 rounded-xl bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white font-['Outfit']">Our Mission</h3>
          <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
            To cultivate a vibrant peer-learning ecosystem where every student in Artificial Intelligence and Machine Learning transforms theoretical principles into real-world applications. We foster hands-on coding, competitive hackathons, research publications, and ethical AI systems.
          </p>
        </div>

        {/* Vision */}
        <div className="p-8 rounded-2xl bg-[#0D1017] border border-[#1A1C23] space-y-4">
          <div className="inline-flex p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white font-['Outfit']">Our Vision</h3>
          <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
            To be recognized as one of India's premier student technology hubs, producing innovative AI engineers, entrepreneurial founders, and open-source contributors who leverage machine intelligence to solve pressing societal, industrial, and environmental challenges.
          </p>
        </div>
      </div>

      {/* 4. Core Domains & Tracks */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
            Technologies We Master
          </h2>
          <p className="text-xs text-[#9CA3AF]">
            INTELLIGENZ conducts dedicated bootcamps and research sprints in cutting-edge computer science domains.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Generative AI & LLMs',
              desc: 'RAG pipelines, prompt engineering, fine-tuning open weights (Llama, Gemma), and agentic workflows.',
              icon: Brain,
              color: 'text-[#00E5FF]',
              bg: 'bg-[#00E5FF]/10',
            },
            {
              title: 'Computer Vision & YOLO',
              desc: 'Real-time object detection, facial biometric security, drone telemetry analysis, and medical image segmentation.',
              icon: Eye,
              color: 'text-purple-400',
              bg: 'bg-purple-500/10',
            },
            {
              title: 'Robotics & Edge AI',
              desc: 'TensorFlow Lite on Raspberry Pi/Arduino, autonomous rover navigation, and IoT sensor telemetry.',
              icon: Cpu,
              color: 'text-amber-400',
              bg: 'bg-amber-500/10',
            },
            {
              title: 'Competitive Programming',
              desc: 'Mastery of Advanced Data Structures & Algorithms, LeetCode sprints, Codeforces div contests, and ICPC prep.',
              icon: Layers,
              color: 'text-pink-400',
              bg: 'bg-pink-500/10',
            },
            {
              title: 'Full-Stack Web & Cloud',
              desc: 'React, Next.js, Node.js, Express, Docker, Kubernetes, PostgreSQL, and scalable microservice architectures.',
              icon: ShieldCheck,
              color: 'text-emerald-400',
              bg: 'bg-emerald-500/10',
            },
            {
              title: 'Open Source & Research',
              desc: 'Writing technical papers, submitting research to IEEE/Springer conferences, and maintaining GitHub tools.',
              icon: Award,
              color: 'text-blue-400',
              bg: 'bg-blue-500/10',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0D1017] border border-[#1A1C23] hover:border-[#00E5FF]/30 space-y-3 transition-colors"
              >
                <div className={`p-3 w-fit rounded-xl ${item.bg} ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white font-['Outfit']">{item.title}</h4>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Bottom CTA */}
      <div className="p-8 sm:p-12 rounded-2xl bg-[#0D1017] border border-[#1A1C23] text-center space-y-4 shadow-xl">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
          Ready to Start Your Journey?
        </h3>
        <p className="text-xs sm:text-sm text-[#9CA3AF] max-w-xl mx-auto">
          Whether you want to build your first neural network or lead a hackathon team, INTELLIGENZ is your launchpad at DR. K. V. SUBBA REDDY INSTITUTE OF TECHNOLOGY.
        </p>
        <div className="pt-2 flex justify-center">
          <button
            onClick={() => onNavigate('/join')}
            className="px-8 py-3.5 rounded-lg bg-[#00E5FF] hover:bg-[#33ebff] text-[#0A0B0E] font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#00E5FF]/20 active:scale-95 transition-all flex items-center gap-2"
          >
            <span>JOIN INTELLIGENZ NOW</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
