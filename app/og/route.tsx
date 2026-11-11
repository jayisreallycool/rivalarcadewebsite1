import fs from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';

let font: Buffer | null = null;

/** Branded 1200×630 social preview: /og?title=...&kicker=... */
export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  const title = (q.get('title') || 'Enter the arena. Compete. Win.').slice(0, 110);
  const kicker = (q.get('kicker') || 'Free competitive skill games').slice(0, 60);
  font ??= await fs.readFile(path.join(process.cwd(), 'app/fonts/lilita-one.woff'));
  const size = title.length > 60 ? 64 : title.length > 34 ? 78 : 96;
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 72px', background: 'radial-gradient(ellipse at 80% 0%, rgba(233,185,73,0.28), transparent 55%), radial-gradient(ellipse at 0% 100%, rgba(56,232,255,0.16), transparent 50%), #07070a', color: '#fff', fontFamily: 'Lilita' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <svg width="64" height="64" viewBox="0 0 64 64">
            <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff1b8" /><stop offset="0.45" stopColor="#e9b949" /><stop offset="1" stopColor="#8a5a0c" /></linearGradient></defs>
            <path d="M32 9 L54 16 V33 C54 46 44 55 32 60 C20 55 10 46 10 33 V16 Z" fill="#101014" stroke="url(#g)" strokeWidth="3.2" />
            <g fill="none" stroke="url(#g)" strokeWidth="4.6" transform="translate(-1.5 0)"><path d="M20.6 22.5 V47" /><path d="M20.6 24.6 H29.4 a5.2 5.2 0 0 1 0 10.4 H20.6" /><path d="M25.8 35 L32.4 47 L39.4 22.2 L46.4 47" /></g>
            <path d="M21 10 L24 1 L32 6 L40 1 L43 10 L32 13.5 Z" fill="url(#g)" />
          </svg>
          <div style={{ display: 'flex', fontSize: 40 }}><span>RIVAL</span><span style={{ color: '#e9b949' }}>ARCADE</span></div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 26, letterSpacing: 6, color: '#e9b949', textTransform: 'uppercase', marginBottom: 18 }}>{kicker}</div>
          <div style={{ display: 'flex', fontSize: size, lineHeight: 1.02, maxWidth: 1000 }}>{title}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 26, color: '#a1a1b5' }}>
          <span>Same seed · Fair fight · No pay-to-win</span>
          <span style={{ display: 'flex', background: '#e9b949', color: '#07070a', padding: '12px 26px', borderRadius: 14 }}>PLAY FREE</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts: [{ name: 'Lilita', data: font, weight: 400 }], headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=604800' } },
  );
}
