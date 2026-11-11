import 'server-only';
import { SITE_URL } from '@/lib/site';
import { sql } from './db';
import { layout, sendEmail } from './email';
import { randomToken, sha256 } from './security';

export const CONSENT_TEXT = 'Email me RivalArcade news, cup announcements and feature updates. Unsubscribe any time.';

export const unsubscribeUrl = (token: string) => `${SITE_URL}/newsletter/unsubscribe?token=${encodeURIComponent(token)}`;
export const listUnsubscribeHeaders = (token: string) => ({
  'List-Unsubscribe': `<${SITE_URL}/api/newsletter/unsubscribe?token=${encodeURIComponent(token)}>`,
  'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
});

/** Double opt-in: store a pending subscriber and email a confirmation link (token stored hashed). */
export async function subscribe(email: string, meta: { source: string; ip: string; utm: Record<string, string> }) {
  const db = sql();
  const confirm = randomToken();
  const [existing] = await db`select id, status, unsubscribe_token from subscribers where email = ${email}`;
  if (existing?.status === 'confirmed') return { already: true };
  const unsub = existing?.unsubscribe_token || randomToken();
  if (existing) {
    await db`update subscribers set status = 'pending', confirm_token = ${sha256(confirm)}, consent_text = ${CONSENT_TEXT}, consent_ip = ${meta.ip}, source = ${meta.source} where id = ${existing.id}`;
  } else {
    await db`insert into subscribers (email, status, confirm_token, unsubscribe_token, source, utm, consent_text, consent_ip)
      values (${email}, 'pending', ${sha256(confirm)}, ${unsub}, ${meta.source}, ${db.json(meta.utm)}, ${CONSENT_TEXT}, ${meta.ip})`;
  }
  const link = `${SITE_URL}/newsletter/confirm?token=${encodeURIComponent(confirm)}`;
  const sent = await sendEmail({
    to: email,
    subject: 'Confirm your RivalArcade newsletter subscription',
    text: `Tap to confirm you want RivalArcade news and cup announcements:\n${link}\n\nIf you didn't sign up, ignore this email and you won't hear from us.`,
    html: layout({
      heading: 'Confirm your subscription',
      bodyHtml: '<p style="margin:0 0 12px">Tap the button to confirm you want RivalArcade news, cup announcements and feature updates.</p><p style="margin:0">If you didn’t sign up, ignore this email — you won’t be added.</p>',
      cta: { label: 'Confirm subscription', url: link },
      footerHtml: 'You’re receiving this because someone entered this address on the RivalArcade website.',
    }),
  });
  return { already: false, emailed: sent.ok };
}

export async function confirm(token: string) {
  const [row] = await sql()`update subscribers set status = 'confirmed', confirmed_at = now(), confirm_token = null
    where confirm_token = ${sha256(token)} and status = 'pending' returning email`;
  return row?.email as string | undefined;
}

export async function unsubscribe(token: string) {
  const [row] = await sql()`update subscribers set status = 'unsubscribed', unsubscribed_at = now(), confirm_token = null
    where unsubscribe_token = ${token} and status <> 'unsubscribed' returning email`;
  if (row) return true;
  const [exists] = await sql()`select 1 from subscribers where unsubscribe_token = ${token}`;
  return Boolean(exists);
}
