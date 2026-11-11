'use client';

import { useState } from 'react';
import { postJson, useSpamGuard } from './useSpamGuard';

type Kind = 'general' | 'support' | 'advertising' | 'sponsorship' | 'partnership' | 'media';
const KINDS: { v: Kind; label: string }[] = [
  { v: 'general', label: 'General question' },
  { v: 'support', label: 'Player support' },
  { v: 'advertising', label: 'Advertising' },
  { v: 'sponsorship', label: 'Sponsorship' },
  { v: 'partnership', label: 'Brand partnership' },
  { v: 'media', label: 'Media / press' },
];

/** Contact, advertising, sponsorship and media inquiries — one validated, rate-limited endpoint. */
export default function InquiryForm({ defaultKind = 'general', kinds, showCompany = false, packages = [], source }: { defaultKind?: Kind; kinds?: Kind[]; showCompany?: boolean; packages?: string[]; source: string }) {
  const guard = useSpamGuard();
  const [state, setState] = useState<'idle' | 'busy' | 'done' | 'error'>('idle');
  const [msg, setMsg] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [kind, setKind] = useState<Kind>(defaultKind);
  const options = KINDS.filter((k) => !kinds || kinds.includes(k.v));
  const business = showCompany || ['advertising', 'sponsorship', 'partnership', 'media'].includes(kind);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setState('busy');
    setErrors({});
    const body = Object.fromEntries(['name', 'email', 'company', 'subject', 'message', 'budget', 'package', 'timeline'].map((k) => [k, fd.get(k) ?? '']));
    const r = await postJson('/api/inquiry', { ...body, kind, source, ...guard.fields(form) });
    if (r.ok) {
      setState('done');
      setMsg(r.message || 'Thanks — your message is in. We’ll reply by email.');
      window.raTrack?.(kind === 'general' || kind === 'support' ? 'contact_submit' : 'business_inquiry', kind);
    } else {
      setState('error');
      setErrors(r.errors || {});
      setMsg(r.message || 'Please check the form and try again.');
      guard.reset();
    }
  }

  if (state === 'done')
    return (
      <div role="status" className="panel p-8 text-center">
        <p className="font-display text-3xl text-white">Message received</p>
        <p className="mt-2 text-mist">{msg}</p>
      </div>
    );

  const err = (k: string) => errors[k] && <span className="mt-1 block text-xs font-bold text-crimson">{errors[k]}</span>;

  return (
    <form onSubmit={onSubmit} className="panel grid gap-5 p-6 sm:p-8">
      {options.length > 1 && (
        <label className="field">
          <span>What’s this about?</span>
          <select name="kind" value={kind} onChange={(e) => setKind(e.target.value as Kind)} className="input">
            {options.map((o) => <option key={o.v} value={o.v}>{o.label}</option>)}
          </select>
        </label>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="field"><span>Your name</span><input name="name" required maxLength={100} autoComplete="name" className="input" />{err('name')}</label>
        <label className="field"><span>Email</span><input name="email" type="email" required maxLength={254} autoComplete="email" className="input" />{err('email')}</label>
      </div>
      {business && (
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="field"><span>Company or brand</span><input name="company" maxLength={120} autoComplete="organization" className="input" />{err('company')}</label>
          {packages.length > 0 ? (
            <label className="field"><span>Interested in</span>
              <select name="package" className="input" defaultValue="">
                <option value="">Not sure yet</option>
                {packages.map((p) => <option key={p}>{p}</option>)}
              </select>
            </label>
          ) : (
            <label className="field"><span>Timeline</span><input name="timeline" maxLength={80} placeholder="e.g. next quarter" className="input" /></label>
          )}
        </div>
      )}
      {business && packages.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="field"><span>Budget range (optional)</span><input name="budget" maxLength={80} className="input" /></label>
          <label className="field"><span>Timeline (optional)</span><input name="timeline" maxLength={80} placeholder="e.g. next quarter" className="input" /></label>
        </div>
      )}
      <label className="field"><span>Subject</span><input name="subject" required maxLength={150} className="input" />{err('subject')}</label>
      <label className="field"><span>Message</span><textarea name="message" required minLength={10} maxLength={5000} className="input" />{err('message')}</label>
      {guard.ui}
      <p className="text-xs text-white/50">We use your details only to reply to this message. See our privacy policy.</p>
      {state === 'error' && <p role="alert" className="text-sm font-bold text-crimson">{msg}</p>}
      <div><button type="submit" disabled={state === 'busy'} className="btn btn-gold">{state === 'busy' ? 'Sending…' : 'Send message'}</button></div>
    </form>
  );
}
