'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin, login, logout } from './auth';
import { sql } from './db';
import { DEFAULT_SETTINGS, SOCIAL_KEYS } from './settings';
import { email as vEmail, hashPassword, randomToken, slugify, str, url as vUrl } from './security';
import { layout, sendBatch, escapeHtml, emailConfigured } from './email';
import { listUnsubscribeHeaders, unsubscribeUrl } from './newsletter';
import { renderMarkdown } from '@/lib/markdown';
import { SITE_URL } from '@/lib/site';

const refresh = () => revalidatePath('/', 'layout');
const f = (fd: FormData, k: string) => (typeof fd.get(k) === 'string' ? (fd.get(k) as string) : '');
const when = (v: string) => { if (!v) return null; const d = new Date(v); return isNaN(+d) ? null : d.toISOString(); };
export type Result = { error?: string; ok?: string } | undefined;

/* ----------------------------------------------------------------- auth */
export async function loginAction(_: Result, fd: FormData): Promise<Result> {
  const r = await login(f(fd, 'email'), f(fd, 'password'));
  if (!r.ok) return { error: r.error };
  redirect('/admin');
}
export async function logoutAction() { await logout(); redirect('/admin/login'); }

/* ----------------------------------------------------------------- posts */
export async function savePost(_: Result, fd: FormData): Promise<Result> {
  await requireAdmin();
  const title = str(f(fd, 'title'), 160);
  if ('error' in title) return { error: `Title ${title.error}` };
  const slug = slugify(f(fd, 'slug') || title.value);
  if (!slug) return { error: 'Slug is required' };
  const id = Number(f(fd, 'id')) || null;
  const kind = f(fd, 'kind') === 'news' ? 'news' : 'blog';
  const status = f(fd, 'status') === 'published' ? 'published' : 'draft';
  const tags = f(fd, 'tags').split(',').map((t) => t.trim()).filter(Boolean).slice(0, 12);
  const v = {
    excerpt: f(fd, 'excerpt').slice(0, 400), body: f(fd, 'body').slice(0, 100_000), category: f(fd, 'category').trim().slice(0, 60) || 'Guides',
    cover: f(fd, 'cover_image').trim().slice(0, 300) || null, alt: f(fd, 'cover_alt').slice(0, 200), author: f(fd, 'author').trim().slice(0, 80) || 'RivalArcade Team',
    featured: fd.get('featured') === 'on', publishAt: when(f(fd, 'publish_at')), seoT: f(fd, 'seo_title').slice(0, 70) || null, seoD: f(fd, 'seo_description').slice(0, 170) || null,
  };
  const db = sql();
  try {
    if (id) {
      await db`update posts set slug=${slug}, kind=${kind}, title=${title.value}, excerpt=${v.excerpt}, body=${v.body}, category=${v.category}, tags=${tags}, cover_image=${v.cover}, cover_alt=${v.alt}, author=${v.author}, status=${status}, featured=${v.featured}, publish_at=${v.publishAt}, seo_title=${v.seoT}, seo_description=${v.seoD}, updated_at=now() where id=${id}`;
    } else {
      const [row] = await db<{ id: number }[]>`insert into posts (slug, kind, title, excerpt, body, category, tags, cover_image, cover_alt, author, status, featured, publish_at, seo_title, seo_description)
        values (${slug}, ${kind}, ${title.value}, ${v.excerpt}, ${v.body}, ${v.category}, ${tags}, ${v.cover}, ${v.alt}, ${v.author}, ${status}, ${v.featured}, ${v.publishAt}, ${v.seoT}, ${v.seoD}) returning id`;
      refresh();
      redirect(`/admin/posts/${row.id}`);
    }
  } catch (e: any) {
    if (e?.digest?.startsWith?.('NEXT_REDIRECT')) throw e;
    return { error: e?.code === '23505' ? 'That slug is already used.' : 'Could not save the post.' };
  }
  refresh();
  return { ok: 'Saved.' };
}
export async function deletePost(fd: FormData) {
  await requireAdmin();
  await sql()`delete from posts where id=${Number(f(fd, 'id'))}`;
  refresh(); redirect('/admin/posts');
}

/* ----------------------------------------------------------------- media */
const MAGIC: [string, number[]][] = [['image/png', [0x89, 0x50, 0x4e, 0x47]], ['image/jpeg', [0xff, 0xd8, 0xff]], ['image/gif', [0x47, 0x49, 0x46]], ['image/webp', [0x52, 0x49, 0x46, 0x46]]];
export async function uploadMedia(_: Result, fd: FormData): Promise<Result> {
  await requireAdmin();
  const file = fd.get('file');
  if (!(file instanceof File) || !file.size) return { error: 'Choose an image.' };
  if (file.size > 4 * 1024 * 1024) return { error: 'Max 4 MB. Compress it first (WebP is ideal).' };
  const buf = Buffer.from(await file.arrayBuffer());
  const type = MAGIC.find(([, m]) => m.every((b, i) => buf[i] === b))?.[0];
  if (!type) return { error: 'Only PNG, JPEG, GIF and WebP images are accepted.' };
  await sql()`insert into media (filename, content_type, bytes, size, alt) values (${file.name.slice(0, 120)}, ${type}, ${buf}, ${buf.length}, ${f(fd, 'alt').slice(0, 200)})`;
  revalidatePath('/admin/media');
  return { ok: 'Uploaded.' };
}
export async function deleteMedia(fd: FormData) { await requireAdmin(); await sql()`delete from media where id=${Number(f(fd, 'id'))}`; revalidatePath('/admin/media'); }

/* -------------------------------------------------------------- settings */
async function putSetting(key: string, value: unknown) {
  await sql()`insert into settings (key, value, updated_at) values (${key}, ${sql().json(value as never)}, now()) on conflict (key) do update set value = excluded.value, updated_at = now()`;
  refresh();
}
export async function saveSocial(_: Result, fd: FormData): Promise<Result> {
  await requireAdmin();
  const out: Record<string, string> = {};
  for (const k of SOCIAL_KEYS) { const r = vUrl(f(fd, k), { required: false }); if ('error' in r) return { error: `${k}: ${r.error}` }; out[k] = r.value; }
  await putSetting('social', out); return { ok: 'Social links saved.' };
}
export async function saveHomepage(_: Result, fd: FormData): Promise<Result> {
  await requireAdmin();
  const yt = f(fd, 'videoYoutubeId').trim();
  if (yt && !/^[\w-]{6,20}$/.test(yt)) return { error: 'YouTube ID looks wrong (only the part after v=).' };
  await putSetting('homepage', {
    heroKicker: f(fd, 'heroKicker').slice(0, 80), heroHeadline: f(fd, 'heroHeadline').slice(0, 80) || DEFAULT_SETTINGS.homepage.heroHeadline, heroSub: f(fd, 'heroSub').slice(0, 400),
    featuredGames: f(fd, 'featuredGames').split(',').map((s) => s.trim()).filter(Boolean).slice(0, 12), hiddenSections: fd.getAll('hidden').map(String),
    videoYoutubeId: yt, videoTitle: f(fd, 'videoTitle').slice(0, 100),
  });
  return { ok: 'Homepage saved.' };
}
export async function saveBanner(_: Result, fd: FormData): Promise<Result> {
  await requireAdmin();
  const link = vUrl(f(fd, 'ctaUrl'), { required: false });
  if ('error' in link) return { error: `Button link ${link.error}` };
  await putSetting('promoBanner', { enabled: fd.get('enabled') === 'on', title: f(fd, 'title').slice(0, 80), text: f(fd, 'text').slice(0, 240), ctaLabel: f(fd, 'ctaLabel').slice(0, 30), ctaUrl: link.value, image: f(fd, 'image').slice(0, 300) });
  return { ok: 'Banner saved.' };
}
export async function saveSponsorship(_: Result, fd: FormData): Promise<Result> {
  await requireAdmin();
  const packages = [0, 1, 2, 3, 4, 5].map((i) => ({ name: f(fd, `n${i}`).trim(), summary: f(fd, `s${i}`).trim(), includes: f(fd, `i${i}`).split('\n').map((x) => x.trim()).filter(Boolean), price: f(fd, `p${i}`).trim() || 'Custom quote' })).filter((p) => p.name);
  await putSetting('sponsorship', { packages, mediaKitNote: f(fd, 'mediaKitNote').slice(0, 400) });
  return { ok: 'Packages saved.' };
}
export async function saveSeo(_: Result, fd: FormData): Promise<Result> {
  await requireAdmin();
  const seo: Record<string, { title?: string; description?: string; ogImage?: string }> = {};
  for (const line of f(fd, 'paths').split('\n')) { /* path rows are posted as t:/path */ void line; }
  for (const [k, v] of fd.entries()) {
    if (typeof v !== 'string' || !k.startsWith('t|')) continue;
    const p = k.slice(2); const d = f(fd, 'd|' + p).slice(0, 170); const t = v.slice(0, 70); const o = f(fd, 'o|' + p).slice(0, 300);
    if (t || d || o) seo[p] = { title: t || undefined, description: d || undefined, ogImage: o || undefined };
  }
  await putSetting('seo', seo); return { ok: 'SEO overrides saved.' };
}

/* --------------------------------------------------------- announcements */
export async function saveAnnouncement(_: Result, fd: FormData): Promise<Result> {
  await requireAdmin();
  const msg = str(f(fd, 'message'), 200); if ('error' in msg) return { error: `Message ${msg.error}` };
  const link = vUrl(f(fd, 'link_url'), { required: false }); if ('error' in link) return { error: `Link ${link.error}` };
  const tone = ['gold', 'electric', 'neutral'].includes(f(fd, 'tone')) ? f(fd, 'tone') : 'gold';
  await sql()`insert into announcements (message, link_url, link_label, tone, starts_at, ends_at) values (${msg.value}, ${link.value || null}, ${f(fd, 'link_label').slice(0, 30) || null}, ${tone}, ${when(f(fd, 'starts_at'))}, ${when(f(fd, 'ends_at'))})`;
  refresh(); return { ok: 'Announcement added.' };
}
export async function toggleAnnouncement(fd: FormData) { await requireAdmin(); await sql()`update announcements set active = not active where id=${Number(f(fd, 'id'))}`; refresh(); }
export async function deleteAnnouncement(fd: FormData) { await requireAdmin(); await sql()`delete from announcements where id=${Number(f(fd, 'id'))}`; refresh(); }

/* ---------------------------------------------------------- landing pages */
export async function saveLanding(_: Result, fd: FormData): Promise<Result> {
  await requireAdmin();
  const title = str(f(fd, 'title'), 120); if ('error' in title) return { error: `Title ${title.error}` };
  const slug = slugify(f(fd, 'slug') || title.value); if (!slug) return { error: 'Slug is required' };
  const id = Number(f(fd, 'id')) || null;
  const status = f(fd, 'status') === 'published' ? 'published' : 'draft';
  const v = { h: f(fd, 'headline').slice(0, 120) || title.value, sub: f(fd, 'subheadline').slice(0, 300), body: f(fd, 'body').slice(0, 50_000), cta: f(fd, 'cta_label').slice(0, 30) || 'Play RivalArcade', utm: slugify(f(fd, 'utm_campaign')).slice(0, 60), hero: f(fd, 'hero_image').slice(0, 300) || null, pub: when(f(fd, 'publish_at')), st: f(fd, 'seo_title').slice(0, 70) || null, sd: f(fd, 'seo_description').slice(0, 170) || null };
  try {
    if (id) await sql()`update landing_pages set slug=${slug}, title=${title.value}, headline=${v.h}, subheadline=${v.sub}, body=${v.body}, cta_label=${v.cta}, utm_campaign=${v.utm}, hero_image=${v.hero}, status=${status}, publish_at=${v.pub}, seo_title=${v.st}, seo_description=${v.sd}, updated_at=now() where id=${id}`;
    else {
      const [r] = await sql()<{ id: number }[]>`insert into landing_pages (slug,title,headline,subheadline,body,cta_label,utm_campaign,hero_image,status,publish_at,seo_title,seo_description) values (${slug},${title.value},${v.h},${v.sub},${v.body},${v.cta},${v.utm},${v.hero},${status},${v.pub},${v.st},${v.sd}) returning id`;
      refresh(); redirect(`/admin/landing/${r.id}`);
    }
  } catch (e: any) {
    if (e?.digest?.startsWith?.('NEXT_REDIRECT')) throw e;
    return { error: e?.code === '23505' ? 'That slug is already used.' : 'Could not save.' };
  }
  refresh(); return { ok: 'Saved.' };
}
export async function deleteLanding(fd: FormData) { await requireAdmin(); await sql()`delete from landing_pages where id=${Number(f(fd, 'id'))}`; refresh(); redirect('/admin/landing'); }

/* ------------------------------------------------------------ newsletter */
export async function saveIssue(_: Result, fd: FormData): Promise<Result> {
  await requireAdmin();
  const subject = str(f(fd, 'subject'), 140); if ('error' in subject) return { error: `Subject ${subject.error}` };
  const id = Number(f(fd, 'id')) || null;
  const slug = slugify(f(fd, 'slug') || subject.value);
  const body = f(fd, 'body').slice(0, 50_000), preview = f(fd, 'preview').slice(0, 200), pub = fd.get('public') === 'on';
  try {
    if (id) await sql()`update newsletters set slug=${slug}, subject=${subject.value}, preview=${preview}, body=${body}, public=${pub}, updated_at=now() where id=${id} and status='draft'`;
    else { const [r] = await sql()<{ id: number }[]>`insert into newsletters (slug, subject, preview, body, public) values (${slug}, ${subject.value}, ${preview}, ${body}, ${pub}) returning id`; redirect(`/admin/newsletters/${r.id}`); }
  } catch (e: any) {
    if (e?.digest?.startsWith?.('NEXT_REDIRECT')) throw e;
    return { error: e?.code === '23505' ? 'That slug is already used.' : 'Could not save.' };
  }
  return { ok: 'Draft saved.' };
}
export async function sendTest(_: Result, fd: FormData): Promise<Result> {
  const admin = await requireAdmin();
  if (!emailConfigured()) return { error: 'Email is not configured (RESEND_API_KEY and EMAIL_FROM).' };
  const [i] = await sql()`select subject, body from newsletters where id=${Number(f(fd, 'id'))}`;
  if (!i) return { error: 'Save the draft first.' };
  const html = layout({ heading: i.subject, bodyHtml: renderMarkdown(i.body), footerHtml: 'Test send — no unsubscribe link.' });
  await sendBatch([{ to: admin.email, subject: `[TEST] ${i.subject}`, html, text: i.body }]);
  return { ok: `Test sent to ${admin.email}.` };
}
export async function sendIssue(_: Result, fd: FormData): Promise<Result> {
  await requireAdmin('owner');
  if (!emailConfigured()) return { error: 'Email is not configured (RESEND_API_KEY and EMAIL_FROM).' };
  if (f(fd, 'confirm') !== 'SEND') return { error: 'Type SEND to confirm.' };
  const db = sql();
  const id = Number(f(fd, 'id'));
  // Claim the issue atomically so a double click cannot send twice.
  const [i] = await db`update newsletters set status='sent', sent_at=now() where id=${id} and status='draft' returning subject, body, slug`;
  if (!i) return { error: 'Already sent, or not found.' };
  const subs = await db<{ email: string; unsubscribe_token: string }[]>`select email, unsubscribe_token from subscribers where status='confirmed'`;
  const bodyHtml = renderMarkdown(i.body);
  let sent = 0;
  for (let n = 0; n < subs.length; n += 100) {
    const chunk = subs.slice(n, n + 100);
    const r = await sendBatch(chunk.map((s) => ({
      to: s.email, subject: i.subject, text: `${i.body}\n\nUnsubscribe: ${unsubscribeUrl(s.unsubscribe_token)}`, headers: listUnsubscribeHeaders(s.unsubscribe_token),
      html: layout({ heading: i.subject, bodyHtml, footerHtml: `You get this because you subscribed at ${escapeHtml(SITE_URL)}. <a href="${unsubscribeUrl(s.unsubscribe_token)}">Unsubscribe</a>` }),
    })));
    if (r && (r as { ok?: boolean }).ok !== false) sent += chunk.length;
  }
  await db`update newsletters set sent_count=${sent} where id=${id}`;
  refresh(); redirect('/admin/newsletters');
}
export async function deleteIssue(fd: FormData) { await requireAdmin(); await sql()`delete from newsletters where id=${Number(f(fd, 'id'))} and status='draft'`; redirect('/admin/newsletters'); }

/* ----------------------------------------------------------------- inbox */
export async function setInquiryStatus(fd: FormData) {
  await requireAdmin();
  const s = ['new', 'in_progress', 'closed'].includes(f(fd, 'status')) ? f(fd, 'status') : 'new';
  await sql()`update inquiries set status=${s} where id=${Number(f(fd, 'id'))}`; revalidatePath('/admin/inbox');
}
export async function setCreatorStatus(fd: FormData) {
  await requireAdmin();
  const s = ['new', 'reviewing', 'approved', 'declined'].includes(f(fd, 'status')) ? f(fd, 'status') : 'new';
  await sql()`update creator_applications set status=${s}, notes=${f(fd, 'notes').slice(0, 2000) || null}, referral_code=${f(fd, 'referral_code').trim().slice(0, 40) || null} where id=${Number(f(fd, 'id'))}`;
  revalidatePath('/admin/inbox');
}
export async function removeSubscriber(fd: FormData) { await requireAdmin('owner'); await sql()`delete from subscribers where id=${Number(f(fd, 'id'))}`; revalidatePath('/admin/subscribers'); }

/* ----------------------------------------------------------------- users */
export async function addUser(_: Result, fd: FormData): Promise<Result> {
  await requireAdmin('owner');
  const e = vEmail(f(fd, 'email')); if ('error' in e) return { error: `Email ${e.error}` };
  const pw = f(fd, 'password'); if (pw.length < 12) return { error: 'Password must be at least 12 characters.' };
  const role = f(fd, 'role') === 'owner' ? 'owner' : 'editor';
  try { await sql()`insert into admin_users (email, name, password_hash, role) values (${e.value}, ${f(fd, 'name').slice(0, 80)}, ${hashPassword(pw)}, ${role})`; }
  catch { return { error: 'That email already has an account.' }; }
  revalidatePath('/admin/users'); return { ok: 'User added.' };
}
export async function setUserActive(fd: FormData) {
  const me = await requireAdmin('owner');
  const id = Number(f(fd, 'id')); if (id === me.id) return;
  await sql()`update admin_users set active = not active where id=${id}`;
  await sql()`delete from admin_sessions where user_id=${id} and (select not active from admin_users where id=${id})`;
  revalidatePath('/admin/users');
}
export async function changePassword(_: Result, fd: FormData): Promise<Result> {
  const me = await requireAdmin();
  const pw = f(fd, 'password'); if (pw.length < 12) return { error: 'Password must be at least 12 characters.' };
  await sql()`update admin_users set password_hash=${hashPassword(pw)} where id=${me.id}`;
  return { ok: 'Password changed.' };
}
void randomToken;
