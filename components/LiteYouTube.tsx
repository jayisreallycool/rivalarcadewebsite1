'use client';

import { useState } from 'react';
import { Icon } from './Icons';

/** Click-to-load YouTube embed: no third-party requests until the visitor presses play. */
export default function LiteYouTube({ id, title }: { id: string; title: string }) {
  const [on, setOn] = useState(false);
  return (
    <div className="relative aspect-video overflow-hidden rounded-[1.5rem] border border-white/10 bg-black">
      {on ? (
        <iframe className="absolute inset-0 h-full w-full" src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`} title={title} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
      ) : (
        <button type="button" onClick={() => { setOn(true); window.raTrack?.('cta_click', 'video_play'); }} className="group absolute inset-0 flex items-center justify-center" aria-label={`Play video: ${title}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://i.ytimg.com/vi/${encodeURIComponent(id)}/hqdefault.jpg`} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-80 transition group-hover:opacity-100" />
          <span className="relative inline-flex h-20 w-20 items-center justify-center rounded-full bg-gold text-ink shadow-2xl transition group-hover:scale-110">
            <Icon name="play" size={34} fill="currentColor" strokeWidth={0} />
          </span>
        </button>
      )}
    </div>
  );
}
