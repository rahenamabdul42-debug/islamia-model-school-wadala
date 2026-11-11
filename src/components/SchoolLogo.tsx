import React from 'react';

interface SchoolLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  light?: boolean;
}

export const SchoolLogo: React.FC<SchoolLogoProps> = ({
  className = '',
  size = 48,
  showText = false,
  light = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 select-none drop-shadow-sm transition-transform hover:scale-105 duration-300"
        aria-label="Islamia Model School Wadala Official Emblem"
        role="img"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#065f46" />
            <stop offset="50%" stopColor="#047857" />
            <stop offset="100%" stopColor="#064e3b" />
          </linearGradient>

          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="35%" stopColor="#eab308" />
            <stop offset="70%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#a16207" />
          </linearGradient>

          <linearGradient id="softWhite" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f1f5f9" />
          </linearGradient>

          {/* Text paths */}
          <path
            id="textPathTop"
            d="M 18,60 A 42,42 0 0,1 102,60"
            fill="none"
          />
          <path
            id="textPathBottom"
            d="M 102,60 A 42,42 0 0,1 18,60"
            fill="none"
          />
        </defs>

        {/* Outer Golden Serrated / Star Edge */}
        <circle cx="60" cy="60" r="58" fill="url(#goldGrad)" />
        <circle cx="60" cy="60" r="54" fill="url(#emeraldGrad)" />

        {/* Delicate Inner Ring */}
        <circle cx="60" cy="60" r="52" fill="none" stroke="url(#goldGrad)" strokeWidth="1" strokeDasharray="2,2" />
        <circle cx="60" cy="60" r="41" fill="none" stroke="url(#goldGrad)" strokeWidth="1.5" />

        {/* Circular Inscribed School Name */}
        <text fontSize="7" fontWeight="700" fill="#fef08a" letterSpacing="1.2">
          <textPath href="#textPathTop" startOffset="50%" textAnchor="middle">
            ISLAMIA MODEL SCHOOL
          </textPath>
        </text>
        <text fontSize="7.5" fontWeight="800" fill="#fef08a" letterSpacing="2">
          <textPath href="#textPathBottom" startOffset="50%" textAnchor="middle">
            ★ WADALA ★
          </textPath>
        </text>

        {/* Center Shield Core */}
        <circle cx="60" cy="60" r="38" fill="#064e3b" />
        <circle cx="60" cy="60" r="37" fill="url(#emeraldGrad)" />

        {/* Crescent Moon & Star Symbol */}
        <g transform="translate(60, 40) scale(0.85)">
          <path
            d="M -3,-14 A 10,10 0 1,0 11,2 A 8,8 0 1,1 -3,-14 Z"
            fill="url(#goldGrad)"
          />
          {/* Small 5-pointed star */}
          <polygon
            points="6,-10 7.5,-6 11.5,-6 8.5,-3.5 9.5,0.5 6,-2 2.5,0.5 3.5,-3.5 0.5,-6 4.5,-6"
            fill="url(#goldGrad)"
          />
        </g>

        {/* Open Book (Holy Quran / Knowledge) */}
        <g transform="translate(60, 68)">
          {/* Left Page */}
          <path
            d="M -1,-2 C -8,-7 -18,-7 -24,-4 L -24,11 C -18,8 -8,8 -1,13 Z"
            fill="url(#softWhite)"
            stroke="url(#goldGrad)"
            strokeWidth="1"
          />
          {/* Page text lines left */}
          <line x1="-20" y1="-1" x2="-6" y2="-2" stroke="#94a3b8" strokeWidth="0.8" />
          <line x1="-20" y1="3" x2="-6" y2="2" stroke="#94a3b8" strokeWidth="0.8" />
          <line x1="-20" y1="7" x2="-8" y2="6" stroke="#94a3b8" strokeWidth="0.8" />

          {/* Right Page */}
          <path
            d="M 1,-2 C 8,-7 18,-7 24,-4 L 24,11 C 18,8 8,8 1,13 Z"
            fill="url(#softWhite)"
            stroke="url(#goldGrad)"
            strokeWidth="1"
          />
          {/* Page text lines right */}
          <line x1="6" y1="-2" x2="20" y2="-1" stroke="#94a3b8" strokeWidth="0.8" />
          <line x1="6" y1="2" x2="20" y2="3" stroke="#94a3b8" strokeWidth="0.8" />
          <line x1="6" y1="6" x2="18" y2="7" stroke="#94a3b8" strokeWidth="0.8" />

          {/* Book Spine Center Ribbon */}
          <path d="M 0,-3 L 0,14" stroke="url(#goldGrad)" strokeWidth="1.5" />
          <polygon points="0,12 -2,16 0,15 2,16" fill="url(#goldGrad)" />
        </g>

        {/* Center Initials "IMS" */}
        <text
          x="60"
          y="56"
          textAnchor="middle"
          fontSize="9.5"
          fontWeight="900"
          fontFamily="serif"
          fill="url(#goldGrad)"
          letterSpacing="1.5"
        >
          IMS
        </text>

        {/* ESTD 2001 */}
        <text
          x="60"
          y="88"
          textAnchor="middle"
          fontSize="5"
          fontWeight="700"
          fill="#cbd5e1"
          letterSpacing="0.8"
        >
          ESTD. 2001
        </text>
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-serif font-bold tracking-tight leading-tight text-base sm:text-lg ${
              light ? 'text-white' : 'text-emerald-950'
            }`}
          >
            ISLAMIA MODEL SCHOOL
          </span>
          <span
            className={`text-xs font-semibold tracking-wider uppercase ${
              light ? 'text-amber-300' : 'text-emerald-700'
            }`}
          >
            Wadala, Punjab, Pakistan
          </span>
        </div>
      )}
    </div>
  );
};
