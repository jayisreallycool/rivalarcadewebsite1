'use client';
import { startTransition, useActionState } from 'react';
import type { Result } from '@/lib/server/admin-actions';

/** Wraps a server action with pending state and an inline result message. Submits through a transition (not the form action) so React doesn't clear the fields after each submit. */
export default function AdminForm({ action, children, submit = 'Save', className }: { action: (s: Result, fd: FormData) => Promise<Result>; children: React.ReactNode; submit?: string; className?: string }) {
  const [state, run, pending] = useActionState(action, undefined);
  return (
    <form className={className} onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); startTransition(() => run(fd)); }}>
      {children}
      <p style={{ marginTop: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button disabled={pending}>{pending ? 'Working…' : submit}</button>
        {state?.error && <span className="err" role="alert">{state.error}</span>}
        {state?.ok && <span className="ok" role="status">{state.ok}</span>}
      </p>
    </form>
  );
}
