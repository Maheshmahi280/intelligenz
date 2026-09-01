import React, { useId } from 'react';

interface IntelligenzLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero' | 'watermark';
  className?: string;
  showText?: boolean;
  interactive?: boolean;
}

export const IntelligenzLogo: React.FC<IntelligenzLogoProps> = ({
  size = 'md',
  className = '',
  showText = false,
  interactive = false,
}) => {
  const uniqueId = useId().replace(/:/g, '');

  const sizeMap = {
    xs: 'w-7 h-7',
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28',
    hero: 'w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64',
    watermark: 'w-96 h-96 opacity-5 pointer-events-none select-none',
  };

  const ringGradId = `ringGrad_${uniqueId}`;
  const innerCoreBgId = `innerCoreBg_${uniqueId}`;
  const bioBrainGradId = `bioBrainGrad_${uniqueId}`;
  const techBrainGradId = `techBrainGrad_${uniqueId}`;
  const centerFlareId = `centerFlare_${uniqueId}`;
  const topArcPathId = `topArcPath_${uniqueId}`;
  const bottomArcPathId = `bottomArcPath_${uniqueId}`;

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div
        className={`relative flex items-center justify-center shrink-0 ${sizeMap[size]} ${
          interactive ? 'group cursor-pointer transition-transform duration-300 hover:scale-105' : ''
        }`}
      >
        {/* Ambient Glow */}
        {size !== 'watermark' && (
          <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-pink-500/20 via-cyan-500/30 to-emerald-400/25 blur-lg opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />
        )}

        {/* SVG Official Club Emblem */}
        <svg
          viewBox="0 0 500 500"
          className="relative w-full h-full drop-shadow-xl"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Outer Multi-color Ring Gradient (Pink -> Purple -> Cyan -> Green) */}
            <linearGradient id={ringGradId} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="25%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#00E5FF" />
              <stop offset="75%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>

            {/* Deep Midnight Navy Background */}
            <radialGradient id={innerCoreBgId} cx="50%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#0E1B38" />
              <stop offset="65%" stopColor="#070C1A" />
              <stop offset="100%" stopColor="#03050C" />
            </radialGradient>

            {/* Left Brain Bio Neural Gradient (Yellow -> Orange -> Magenta) */}
            <linearGradient id={bioBrainGradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="35%" stopColor="#F97316" />
              <stop offset="70%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#BE185D" />
            </linearGradient>

            {/* Right Brain Electronic Tech Circuit Gradient (Cyan -> Sky -> Purple) */}
            <linearGradient id={techBrainGradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="40%" stopColor="#38BDF8" />
              <stop offset="75%" stopColor="#818CF8" />
              <stop offset="100%" stopColor="#C084FC" />
            </linearGradient>

            {/* Central Amber / Gold Light Flare Beam */}
            <linearGradient id={centerFlareId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0" />
              <stop offset="50%" stopColor="#FBBF24" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </linearGradient>

            {/* Circular Text Arcs */}
            <path id={topArcPathId} d="M 68,250 A 182,182 0 0,1 432,250" fill="none" />
            <path id={bottomArcPathId} d="M 432,252 A 182,182 0 0,1 68,252" fill="none" />
          </defs>

          {/* Outer Multi-color Glowing Gradient Rim */}
          <circle cx="250" cy="250" r="242" fill="none" stroke={`url(#${ringGradId})`} strokeWidth="15" />

          {/* White Outer Circular Band */}
          <circle cx="250" cy="250" r="234.5" fill="#FFFFFF" stroke="#0A0F1D" strokeWidth="2" />

          {/* Top Curved Text: DEPARTMENT OF CSE(AIML) & AI */}
          <text fill="#070D1E" fontSize="20" fontWeight="900" letterSpacing="3" fontFamily="'Outfit', 'Plus Jakarta Sans', Arial, sans-serif">
            <textPath href={`#${topArcPathId}`} startOffset="50%" textAnchor="middle">
              <tspan fill="#00E5FF" fontSize="22">• </tspan>DEPARTMENT OF CSE(AIML) &amp; AI<tspan fill="#00E5FF" fontSize="22"> •</tspan>
            </textPath>
          </text>

          {/* Bottom Curved Text: CODE • INNOVATE • INTELLIGENTLY */}
          <text fill="#070D1E" fontSize="17" fontWeight="900" letterSpacing="3.5" fontFamily="'Outfit', 'Plus Jakarta Sans', Arial, sans-serif">
            <textPath href={`#${bottomArcPathId}`} startOffset="50%" textAnchor="middle">
              <tspan fill="#00E5FF" fontSize="20">• </tspan>CODE<tspan fill="#00E5FF" fontSize="20"> • </tspan>INNOVATE<tspan fill="#00E5FF" fontSize="20"> • </tspan>INTELLIGENTLY<tspan fill="#00E5FF" fontSize="20"> •</tspan>
            </textPath>
          </text>

          {/* Inner Deep Midnight Blue Center Body */}
          <circle cx="250" cy="250" r="172" fill={`url(#${innerCoreBgId})`} stroke="#070D1E" strokeWidth="3" />

          {/* Inner Subtle Cyan Guideline Accent Ring */}
          <circle cx="250" cy="250" r="169" fill="none" stroke="#00E5FF" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="3,3" />

          {/* LEFT FLANKING ICON: Laptop with Code </> */}
          <g transform="translate(92, 232) scale(0.85)" opacity="0.95">
            <rect x="0" y="0" width="36" height="24" rx="3" fill="#0A1124" stroke="#00E5FF" strokeWidth="2.5" />
            <text x="18" y="16" fill="#00E5FF" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">&lt;/&gt;</text>
            <path d="M -6,24 L 42,24 L 38,28 L -2,28 Z" fill="#00E5FF" />
          </g>

          {/* RIGHT FLANKING ICON: Head Profile with Connected Neural Network */}
          <g transform="translate(372, 226) scale(0.85)" opacity="0.95">
            <path d="M 18,0 C 30,0 36,9 36,20 C 36,29 30,34 26,38 L 26,46 L 10,46 L 10,38 C 4,34 0,27 0,19 C 0,8 8,0 18,0 Z" fill="none" stroke="#00E5FF" strokeWidth="2.5" strokeLinejoin="round" />
            <circle cx="14" cy="18" r="3" fill="#F43F5E" />
            <circle cx="24" cy="14" r="3" fill="#00E5FF" />
            <circle cx="19" cy="27" r="3" fill="#10B981" />
            <circle cx="26" cy="24" r="2.5" fill="#A855F7" />
            <line x1="14" y1="18" x2="24" y2="14" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.8" />
            <line x1="14" y1="18" x2="19" y2="27" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.8" />
            <line x1="24" y1="14" x2="26" y2="24" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.8" />
            <line x1="19" y1="27" x2="26" y2="24" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.8" />
          </g>

          {/* CENTER SPLIT BRAIN GRAPHIC & CODE SYMBOL */}
          <g transform="translate(0, -16)">
            {/* Center Amber Flare Seam */}
            <rect x="248" y="90" width="4" height="175" fill={`url(#${centerFlareId})`} />
            <circle cx="250" cy="175" r="24" fill="#F59E0B" opacity="0.3" filter="blur(10px)" />

            {/* Left Brain - Bio Neural Organic Convolutions */}
            <g stroke={`url(#${bioBrainGradId})`} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 238,105 C 205,98 175,114 168,140 C 152,146 148,166 154,184 C 144,196 148,216 163,228 C 173,240 190,245 206,243 C 220,240 231,248 238,252" />
              <path d="M 192,140 C 208,152 221,142 234,148" />
              <path d="M 174,174 C 190,168 202,182 218,178" />
              <path d="M 184,206 C 198,200 211,212 231,207" />
              <path d="M 198,228 C 210,224 220,232 235,229" />
              <circle cx="192" cy="140" r="4.5" fill="#F97316" stroke="#040711" strokeWidth="1.5" />
              <circle cx="234" cy="148" r="4" fill="#FBBF24" stroke="#040711" strokeWidth="1.5" />
              <circle cx="174" cy="174" r="4.5" fill="#EC4899" stroke="#040711" strokeWidth="1.5" />
              <circle cx="218" cy="178" r="4" fill="#F97316" stroke="#040711" strokeWidth="1.5" />
              <circle cx="184" cy="206" r="4.5" fill="#EC4899" stroke="#040711" strokeWidth="1.5" />
              <circle cx="231" cy="207" r="4" fill="#F97316" stroke="#040711" strokeWidth="1.5" />
            </g>

            {/* Right Brain - Cyber Circuit Traces */}
            <g stroke={`url(#${techBrainGradId})`} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 262,105 C 295,98 325,114 332,140 C 348,146 352,166 346,184 C 356,196 352,216 337,228 C 327,240 310,245 294,243 C 280,240 269,248 262,252" />
              <path d="M 265,136 H 298 L 318,148" />
              <path d="M 265,165 H 288 L 306,165 H 328" />
              <path d="M 265,192 H 294 L 312,208 H 332" />
              <path d="M 265,220 H 285 L 301,232" />
              <circle cx="318" cy="148" r="4.5" fill="#00E5FF" stroke="#040711" strokeWidth="1.5" />
              <circle cx="328" cy="165" r="4.5" fill="#38BDF8" stroke="#040711" strokeWidth="1.5" />
              <circle cx="332" cy="208" r="4.5" fill="#818CF8" stroke="#040711" strokeWidth="1.5" />
              <circle cx="301" cy="232" r="4.5" fill="#C084FC" stroke="#040711" strokeWidth="1.5" />
            </g>

            {/* Central Code Badge: </> */}
            <g transform="translate(222, 146)">
              <rect x="0" y="2" width="56" height="54" rx="10" fill="#060A16" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.8" />
              <text x="28" y="38" fill="#FFFFFF" fontSize="28" fontWeight="900" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">&lt;/&gt;</text>
            </g>
          </g>

          {/* MAIN BRAND TEXT: IntelliGenZ */}
          <text
            x="250"
            y="308"
            fill="#FFFFFF"
            fontSize="46"
            fontWeight="900"
            textAnchor="middle"
            fontFamily="'Outfit', 'Plus Jakarta Sans', Arial, sans-serif"
            letterSpacing="1"
          >
            IntelliGenZ
          </text>

          {/* CALLIGRAPHY SCRIPT TEXT: Club with Orange Swoosh */}
          <text
            x="250"
            y="350"
            fill="#FFFFFF"
            fontSize="40"
            fontWeight="700"
            textAnchor="middle"
            fontFamily="'Caveat', cursive, 'Brush Script MT', sans-serif"
          >
            Club
          </text>

          {/* Orange Accent Underline Swoosh */}
          <path
            d="M 200,358 Q 250,367 300,358"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="4.5"
            strokeLinecap="round"
          />

          {/* LOWER THREE-ICON TECH STRIP CONTAINER */}
          <g transform="translate(162, 374)">
            <rect x="0" y="0" width="176" height="34" rx="8" fill="#0A1124" stroke="#00E5FF" strokeWidth="1.2" strokeOpacity="0.4" />
            
            {/* 1. AI Microchip (Left) */}
            <g transform="translate(20, 6)">
              <rect x="0" y="0" width="22" height="22" rx="4" fill="#0284C7" stroke="#00E5FF" strokeWidth="1.2" />
              <text x="11" y="15" fill="#FFFFFF" fontSize="10" fontWeight="900" textAnchor="middle" fontFamily="'Outfit', sans-serif">AI</text>
              <line x1="5" y1="-3" x2="5" y2="0" stroke="#00E5FF" strokeWidth="1.5" />
              <line x1="11" y1="-3" x2="11" y2="0" stroke="#00E5FF" strokeWidth="1.5" />
              <line x1="17" y1="-3" x2="17" y2="0" stroke="#00E5FF" strokeWidth="1.5" />
              <line x1="5" y1="22" x2="5" y2="25" stroke="#00E5FF" strokeWidth="1.5" />
              <line x1="11" y1="22" x2="11" y2="25" stroke="#00E5FF" strokeWidth="1.5" />
              <line x1="17" y1="22" x2="17" y2="25" stroke="#00E5FF" strokeWidth="1.5" />
            </g>

            {/* Divider 1 */}
            <line x1="60" y1="5" x2="60" y2="29" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.3" />

            {/* 2. Robotic Arm (Center) */}
            <g transform="translate(72, 6)">
              <rect x="4" y="18" width="16" height="4" rx="1" fill="#00E5FF" />
              <circle cx="12" cy="18" r="3" fill="#F59E0B" />
              <line x1="12" y1="18" x2="20" y2="9" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
              <circle cx="20" cy="9" r="3" fill="#F97316" />
              <line x1="20" y1="9" x2="12" y2="3" stroke="#00E5FF" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="12" cy="3" r="2.5" fill="#00E5FF" />
            </g>

            {/* Divider 2 */}
            <line x1="116" y1="5" x2="116" y2="29" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.3" />

            {/* 3. Cloud Neural Tech (Right) */}
            <g transform="translate(126, 6)">
              <path d="M 7,18 A 5,5 0 0,1 9,9 A 7,7 0 0,1 23,9 A 5,5 0 0,1 25,18 Z" fill="none" stroke="#00E5FF" strokeWidth="2" strokeLinejoin="round" />
              <circle cx="13" cy="14" r="2" fill="#00E5FF" />
              <circle cx="19" cy="12" r="2" fill="#A855F7" />
              <circle cx="16" cy="18" r="2" fill="#F43F5E" />
              <line x1="13" y1="14" x2="19" y2="12" stroke="#00E5FF" strokeWidth="1" />
              <line x1="13" y1="14" x2="16" y2="18" stroke="#00E5FF" strokeWidth="1" />
              <line x1="19" y1="12" x2="16" y2="18" stroke="#00E5FF" strokeWidth="1" />
            </g>
          </g>
        </svg>
      </div>

      {/* Brand Text for Horizontal Layouts */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold tracking-tight text-white font-['Outfit'] text-lg sm:text-xl leading-none">
              INTELLIGENZ
            </span>
            <span className="text-xs px-1.5 py-0.5 rounded font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              CLUB
            </span>
          </div>
          <span className="text-[11px] font-medium text-slate-300 tracking-wide mt-1 leading-tight line-clamp-1">
            Dept. of CSE (AIML) &amp; AI
          </span>
          <span className="text-[9.5px] font-medium text-slate-400 tracking-tight leading-tight line-clamp-1 hidden sm:block">
            DR. K. V. SUBBA REDDY INSTITUTE OF TECHNOLOGY
          </span>
        </div>
      )}
    </div>
  );
};
