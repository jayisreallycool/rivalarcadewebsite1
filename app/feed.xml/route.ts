import { listPosts } from '@/lib/server/posts';
import { SITE_URL, absolute } from '@/lib/site';

export const revalidate = 600;
const x = (s: string) => s.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]!);

/** RSS 2.0 feed of news and blog posts. */
export async function GET() {
  const posts = (await listPosts()).slice(0, 50);
  const items = posts.map((p) => `<item><title>${x(p.title)}</title><link>${absolute(`/blog/${p.slug}`)}</link><guid isPermaLink="true">${absolute(`/blog/${p.slug}`)}</guid><pubDate>${new Date(p.publishAt).toUTCString()}</pubDate><category>${x(p.kind === 'news' ? 'News' : p.category)}</category><description>${x(p.excerpt)}</description></item>`).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>RivalArcade — News &amp; Guides</title><link>${SITE_URL}</link><description>News, game updates and competitive guides from RivalArcade.</description><language>en</language><atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, s-maxage=600' } });
}
