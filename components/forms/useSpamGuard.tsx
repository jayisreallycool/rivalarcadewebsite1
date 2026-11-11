'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window { turnstile?: { render: (el: HTMLElement, o: Record<string, unknown>) => string; reset: (id?: string) => void } }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/** Honeypot + time-on-form + optional Cloudflare Turnstile. Spread `fields()` into the request body. */
export function useSpamGuard() {
  const started = useRef(0);
  const [token, setToken] = useState('');
  const box = useRef<HTMLDivElement>(null);
  const widget = useRef<string | undefined>(undefined);

  useEffect(() => { started.current = Date.now(); }, []);

  const mount = () => {
    if (!SITE_KEY || !box.current || !window.turnstile || widget.current) return;
    widget.current = window.turnstile.render(box.current, { sitekey: SITE_KEY, theme: 'dark', callback: (t: string) => setToken(t), 'expired-callback': () => setToken('') });
  };
  useEffect(mount);

  const ui = (
    <>
      <label className="hp" aria-hidden="true">
        Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
      {SITE_KEY && (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="lazyOnload" onLoad={mount} />
          <div ref={box} className="min-h-[65px]" />
        </>
      )}
    </>
  );
  const fields = (form: HTMLFormElement) => ({ website: (form.elements.namedItem('website') as HTMLInputElement | null)?.value || '', startedAt: started.current, turnstileToken: token });
  const reset = () => { if (widget.current) window.turnstile?.reset(widget.current); setToken(''); };
  return { ui, fields, reset };
}

export async function postJson(url: string, body: unknown): Promise<{ ok: boolean; message?: string; errors?: Record<string, string> }> {
  try {
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok && data.ok !== false, ...data };
  } catch {
    return { ok: false, message: 'Network error — check your connection and try again.' };
  }
}
