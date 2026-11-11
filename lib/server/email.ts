import 'server-only';
import { SITE_URL } from '@/lib/site';

/**
 * Transactional + newsletter email through Resend's HTTP API (no SDK needed).
 * Env: RESEND_API_KEY, EMAIL_FROM ("RivalArcade <news@yourdomain.com>" on a verified domain),
 * optional EMAIL_REPLY_TO and NOTIFY_EMAIL (where new form submissions are announced).
 */
export const emailConfigured = () => Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);

interface Mail { to: string | string[]; subject: string; html: string; text: string; headers?: Record<string, string>; replyTo?: string }

export async function sendEmail(m: Mail) {
  if (!emailConfigured()) {
    console.warn('[email] RESEND_API_KEY / EMAIL_FROM not set — skipped:', m.subject);
    return { ok: false, skipped: true };
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: process.env.EMAIL_FROM, to: m.to, subject: m.subject, html: m.html, text: m.text, headers: m.headers, reply_to: m.replyTo || process.env.EMAIL_REPLY_TO || undefined }),
  });
  if (!res.ok) {
    console.error('[email] send failed', res.status, await res.text());
    return { ok: false };
  }
  return { ok: true };
}

/** Send up to 100 personalised emails per request (Resend batch API). */
export async function sendBatch(mails: Mail[]) {
  if (!emailConfigured()) return { sent: 0, skipped: true };
  let sent = 0;
  for (let i = 0; i < mails.length; i += 100) {
    const chunk = mails.slice(i, i + 100).map((m) => ({ from: process.env.EMAIL_FROM, to: m.to, subject: m.subject, html: m.html, text: m.text, headers: m.headers, reply_to: process.env.EMAIL_REPLY_TO || undefined }));
    const res = await fetch('https://api.resend.com/emails/batch', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(chunk),
    });
    if (res.ok) sent += chunk.length;
    else console.error('[email] batch failed', res.status, await res.text());
  }
  return { sent };
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

/** Branded, table-based email shell that renders in every major client. */
export function layout({ heading, bodyHtml, cta, footerHtml }: { heading: string; bodyHtml: string; cta?: { label: string; url: string }; footerHtml?: string }) {
  return `<!doctype html><html><body style="margin:0;background:#07070a;font-family:Arial,Helvetica,sans-serif;color:#e5e7eb">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#07070a"><tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#101014;border:1px solid #2a2a33;border-radius:16px">
<tr><td style="padding:28px 28px 8px"><img src="${SITE_URL}/brand/icon-192.png" width="44" height="44" alt="RivalArcade" style="display:block;border-radius:10px">
<p style="margin:16px 0 0;font-size:12px;letter-spacing:3px;color:#e9b949;font-weight:bold">RIVALARCADE</p>
<h1 style="margin:6px 0 0;font-size:24px;line-height:1.25;color:#ffffff">${esc(heading)}</h1></td></tr>
<tr><td style="padding:8px 28px 8px;font-size:16px;line-height:1.6;color:#d1d5db">${bodyHtml}</td></tr>
${cta ? `<tr><td style="padding:12px 28px 24px"><a href="${cta.url}" style="display:inline-block;background:#e9b949;color:#07070a;text-decoration:none;font-weight:bold;padding:14px 22px;border-radius:10px">${esc(cta.label)}</a></td></tr>` : ''}
<tr><td style="padding:16px 28px 28px;font-size:12px;line-height:1.6;color:#8b8b96;border-top:1px solid #2a2a33">${footerHtml || ''}</td></tr>
</table></td></tr></table></body></html>`;
}

/** Let the team know a form came in (optional; NOTIFY_EMAIL). Never includes the full message. */
export async function notifyTeam(subject: string, lines: string[]) {
  const to = process.env.NOTIFY_EMAIL;
  if (!to) return;
  await sendEmail({
    to,
    subject: `[RivalArcade site] ${subject}`,
    text: lines.join('\n') + `\n\nReview it: ${SITE_URL}/admin`,
    html: layout({ heading: subject, bodyHtml: lines.map((l) => `<p style="margin:0 0 8px">${esc(l)}</p>`).join(''), cta: { label: 'Open admin', url: `${SITE_URL}/admin` } }),
  });
}
export { esc as escapeHtml };
