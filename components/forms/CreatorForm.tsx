'use client';

import { useState } from 'react';
import { postJson, useSpamGuard } from './useSpamGuard';

const PLATFORMS = ['TikTok', 'YouTube', 'Twitch', 'Instagram', 'Kick', 'X', 'Discord', 'Other'];

export default function CreatorForm() {
  const guard = useSpamGuard();
  const [state, setState] = useState<'idle' | 'busy' | 'done' | 'error'>('idle');
  const [msg, setMsg] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setState('busy');
    setErrors({});
    const r = await postJson('/api/creators/apply', {
      name: fd.get('name'), email: fd.get('email'), handle: fd.get('handle'), channelUrl: fd.get('channelUrl'),
      platforms: fd.getAll('platforms'), audienceSize: fd.get('audienceSize'), contentFocus: fd.get('contentFocus'), pitch: fd.get('pitch'),
      agree: fd.get('agree') === 'on', ...guard.fields(form),
    });
    if (r.ok) {
      setState('done');
      setMsg(r.message || 'Application received.');
      window.raTrack?.('creator_application', String(fd.getAll('platforms').join(',')));
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
        <p className="font-display text-3xl text-white">Application received</p>
        <p className="mt-2 text-mist">{msg}</p>
      </div>
    );
  const err = (k: string) => errors[k] && <span className="mt-1 block text-xs font-bold text-crimson">{errors[k]}</span>;

  return (
    <form onSubmit={onSubmit} className="panel grid gap-5 p-6 sm:p-8" id="apply">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="field"><span>Your name</span><input name="name" required maxLength={100} autoComplete="name" className="input" />{err('name')}</label>
        <label className="field"><span>Email</span><input name="email" type="email" required maxLength={254} autoComplete="email" className="input" />{err('email')}</label>
        <label className="field"><span>Creator handle</span><input name="handle" required maxLength={60} placeholder="@yourname" className="input" />{err('handle')}</label>
        <label className="field"><span>Main channel link</span><input name="channelUrl" required maxLength={300} inputMode="url" placeholder="https://" className="input" />{err('channelUrl')}</label>
      </div>
      <fieldset>
        <legend className="mb-2 text-sm font-extrabold text-white/85">Where do you create?</legend>
        <div className="flex flex-wrap gap-2">
          {PLATFORMS.map((p) => (
            <label key={p} className="chip cursor-pointer has-[:checked]:border-gold has-[:checked]:bg-gold/15 has-[:checked]:text-gold">
              <input type="checkbox" name="platforms" value={p} className="sr-only" /> {p}
            </label>
          ))}
        </div>
        {err('platforms')}
      </fieldset>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="field"><span>Audience size</span>
          <select name="audienceSize" className="input" defaultValue="">
            <option value="" disabled>Choose a range</option>
            <option>Under 1K</option><option>1K–10K</option><option>10K–50K</option><option>50K–250K</option><option>250K–1M</option><option>1M+</option>
          </select>
          {err('audienceSize')}
        </label>
        <label className="field"><span>Content focus</span><input name="contentFocus" maxLength={120} placeholder="e.g. mobile gaming, speedruns, comedy" className="input" /></label>
      </div>
      <label className="field"><span>What would you make with RivalArcade?</span><textarea name="pitch" required minLength={30} maxLength={3000} placeholder="A 1v1 series with viewers, a weekly cup, Brick Blitz high-score attempts…" className="input" />{err('pitch')}</label>
      <label className="flex items-start gap-2 text-sm text-white/70">
        <input type="checkbox" name="agree" required className="mt-1 h-4 w-4 accent-[#e9b949]" />
        <span>I agree RivalArcade may contact me about this application and store these details to review it. Sponsored content must follow platform disclosure rules (#ad / paid partnership).</span>
      </label>
      {err('agree')}
      {guard.ui}
      {state === 'error' && <p role="alert" className="text-sm font-bold text-crimson">{msg}</p>}
      <div><button type="submit" disabled={state === 'busy'} className="btn btn-gold">{state === 'busy' ? 'Sending…' : 'Submit application'}</button></div>
    </form>
  );
}
