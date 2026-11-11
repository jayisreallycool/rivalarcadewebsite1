/**
 * RivalArcade brand mark (gold crest: crown over a faceted shield with the interlocked RA monogram)
 * and the Rival Coin — the same artwork the game uses, drawn as inline SVG.
 */
const SHIELD = 'M32 9 L54 16 V33 C54 46 44 55 32 60 C20 55 10 46 10 33 V16 Z';
const CROWN = 'M21 10 L24 1 L32 6 L40 1 L43 10 L32 13.5 Z';
const R = ['M20.6 22.5 V47', 'M20.6 24.6 H29.4 a5.2 5.2 0 0 1 0 10.4 H20.6', 'M25.8 35 L32.4 47 L39.4 22.2 L46.4 47'];

export function Mark({ size = 40, id = 'm', className = '' }: { size?: number; id?: string; className?: string }) {
  const g = `ra-gold-${id}`;
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className} aria-hidden="true">
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff1b8" />
          <stop offset="0.45" stopColor="#e9b949" />
          <stop offset="1" stopColor="#8a5a0c" />
        </linearGradient>
      </defs>
      <path d={SHIELD} fill="#101014" stroke={`url(#${g})`} strokeWidth="3.2" />
      <path d="M32 13.5 L50 19.4 V33 C50 43.5 42 51 32 55.3 Z" fill="#fff" opacity="0.04" />
      <g fill="none" stroke={`url(#${g})`} strokeWidth="4.6" strokeLinejoin="miter" transform="translate(-1.5 0)">
        {R.map((d) => <path key={d} d={d} />)}
        <path d="M35.6 40 L39.4 37 L43.2 40" strokeWidth="2.8" />
      </g>
      <path d={CROWN} fill={`url(#${g})`} stroke="#5c3705" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ size = 36, id = 'logo', className = '' }: { size?: number; id?: string; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Mark size={size} id={id} />
      <span className="font-display leading-none" style={{ fontSize: size * 0.62 }}>
        <span className="text-white">RIVAL</span>
        <span className="gold-text">ARCADE</span>
      </span>
      <span className="sr-only">RivalArcade</span>
    </span>
  );
}

export function Coin({ size = 24, id = 'c', className = '' }: { size?: number; id?: string; className?: string }) {
  const full = size >= 32;
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className} aria-hidden="true" style={{ flexShrink: 0 }}>
      <defs>
        <linearGradient id={`${id}r`} x1="0" y1="0" x2="0.3" y2="1"><stop offset="0" stopColor="#fff1b8" /><stop offset="0.45" stopColor="#e3a92b" /><stop offset="1" stopColor="#7a4b06" /></linearGradient>
        <radialGradient id={`${id}f`} cx="0.38" cy="0.3" r="0.85"><stop offset="0" stopColor="#f8d572" /><stop offset="1" stopColor="#b8790f" /></radialGradient>
        <linearGradient id={`${id}m`} gradientUnits="userSpaceOnUse" x1="0" y1="18" x2="0" y2="46"><stop offset="0" stopColor="#fff6d0" /><stop offset="1" stopColor="#f0c04a" /></linearGradient>
      </defs>
      <circle cx="32" cy="33.4" r="30.6" fill="#5c3705" />
      <circle cx="32" cy="32" r="30.6" fill={`url(#${id}r)`} />
      {full && Array.from({ length: 48 }, (_, i) => { const a = (i / 48) * Math.PI * 2; return <line key={i} x1={32 + Math.cos(a) * 27.9} y1={32 + Math.sin(a) * 27.9} x2={32 + Math.cos(a) * 30} y2={32 + Math.sin(a) * 30} stroke="#5c3705" strokeOpacity="0.45" strokeWidth="1" />; })}
      <circle cx="32" cy="32" r="27" fill={`url(#${id}f)`} stroke="#5c3705" strokeOpacity="0.55" strokeWidth="1" />
      <g fill="none" strokeLinejoin="miter" transform="translate(-1 0)" strokeWidth={full ? 5.2 : 6.2}>
        <g stroke="#5c3705" strokeOpacity="0.75" transform="translate(0.9 1.3)">
          <path d="M18.6 19.5 V44.5" /><path d="M18.6 21.6 H28.2 a5.4 5.4 0 0 1 0 10.8 H18.6" /><path d="M24.4 32.4 L31.6 44.5 L39.4 19.2 L47.2 44.5" />
        </g>
        <g stroke={full ? `url(#${id}m)` : '#5c3705'}>
          <path d="M18.6 19.5 V44.5" /><path d="M18.6 21.6 H28.2 a5.4 5.4 0 0 1 0 10.8 H18.6" /><path d="M24.4 32.4 L31.6 44.5 L39.4 19.2 L47.2 44.5" />
          <path d="M35.2 37.4 L39.4 34.4 L43.6 37.4" strokeWidth={full ? 3.2 : 3.8} />
        </g>
      </g>
    </svg>
  );
}

export function RankBadge({ color, size = 44, label }: { color: string; size?: number; label: string }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} role="img" aria-label={label}>
      <path d="M24 3 L42 10 V24 C42 35 34 42 24 45 C14 42 6 35 6 24 V10 Z" fill="#101014" stroke={color} strokeWidth="2.5" />
      <path d="M24 10 L35 14.5 V24 C35 31 30 36 24 38.5 C18 36 13 31 13 24 V14.5 Z" fill={color} opacity="0.22" />
      <path d="M17 26 L24 16 L31 26 L24 23 Z" fill={color} />
      <path d="M17 32 L24 25 L31 32 L24 29.5 Z" fill={color} opacity="0.7" />
    </svg>
  );
}
