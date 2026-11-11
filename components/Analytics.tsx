'use client';

import Script from 'next/script';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const KEY = 'ra_consent';

/**
 * Google Analytics 4, loaded only after the visitor accepts analytics cookies. The choice is kept
 * in localStorage and can be changed from the footer ("Cookie settings").
 */
export default function Analytics({ gaId }: { gaId?: string }) {
  const [consent, setConsent] = useState<'granted' | 'denied' | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = localStorage.getItem(KEY);
    setConsent(v === 'granted' || v === 'denied' ? v : null);
    setReady(true);
    const reopen = () => setConsent(null);
    window.addEventListener('ra:cookie-settings', reopen);
    return () => window.removeEventListener('ra:cookie-settings', reopen);
  }, []);

  if (!gaId) return null;
  const choose = (v: 'granted' | 'denied') => {
    localStorage.setItem(KEY, v);
    setConsent(v);
    if (v === 'denied') window.gtag?.('consent', 'update', { analytics_storage: 'denied' });
  };

  return (
    <>
      {consent === 'granted' && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'granted'});gtag('config','${gaId}',{anonymize_ip:true});`}</Script>
        </>
      )}
      {ready && consent === null && (
        <div role="dialog" aria-label="Cookie preferences" className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-xl rounded-2xl border border-white/10 bg-[#111117]/95 p-4 shadow-2xl backdrop-blur sm:bottom-5">
          <p className="text-sm text-white/80">
            We use Google Analytics cookies to understand which pages and channels bring players to RivalArcade. No ads, no selling data.{' '}
            <Link href="/privacy#analytics" className="text-gold underline underline-offset-2">Learn more</Link>
          </p>
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={() => choose('granted')} className="btn btn-gold btn-sm">Accept analytics</button>
            <button type="button" onClick={() => choose('denied')} className="btn btn-ghost btn-sm">Decline</button>
          </div>
        </div>
      )}
    </>
  );
}

export function CookieSettingsButton() {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event('ra:cookie-settings'))} className="hover:text-white">
      Cookie settings
    </button>
  );
}
