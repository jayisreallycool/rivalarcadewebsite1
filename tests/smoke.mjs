// Smoke test: node tests/smoke.mjs [baseUrl]   (start the site first: npm run build && npm start)
const base = (process.argv[2] || 'http://localhost:3000').replace(/\/$/, '');
const APP = 'https://rivalarcade.vercel.app';
let fails = 0;
const ok = (c, m) => { if (!c) { fails++; console.log('FAIL', m); } };
const get = (p, init) => fetch(base + p, { redirect: 'manual', ...init });

const sm = await (await get('/sitemap.xml')).text();
const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
ok(urls.length > 60, `sitemap has ${urls.length} urls`);
const internal = new Set();
let plays = 0;
for (const p of urls) {
  const r = await get(p);
  ok(r.status === 200, `${p} -> ${r.status}`);
  const h = await r.text();
  ok(/<title>[^<]{10,}/.test(h), `${p} title`);
  ok(/<meta name="description" content="[^"]{50,}/.test(h), `${p} description`);
  ok(/<link rel="canonical"/.test(h), `${p} canonical`);
  ok(/property="og:image"/.test(h), `${p} og:image`);
  ok((h.match(/<h1[ >]/g) || []).length === 1, `${p} exactly one h1`);
  for (const m of h.matchAll(/href="([^"#]+)"/g)) {
    const u = m[1];
    if (u.startsWith('/') && !u.startsWith('//')) internal.add(u.split('?')[0]);
    if (u.startsWith(APP)) plays++;
    if (/^https?:\/\/rivalarcade\.vercel\.app/.test(u)) ok(u.startsWith(APP), `${p} bad app link ${u}`);
  }
  for (const m of h.matchAll(/<a [^>]*href="(https?:\/\/[^"]+)"[^>]*target="_blank"[^>]*>/g)) ok(/noopener/.test(m[0]), `${p} target=_blank w/o noopener: ${m[1]}`);
}
ok(plays > 100, `Play links found: ${plays}`);
for (const u of internal) {
  if (u.startsWith('/_next') || u.startsWith('/admin') || u.startsWith('/cdn')) continue;
  const r = await get(u);
  ok(r.status < 400, `link ${u} -> ${r.status}`);
}
for (const [p, t] of [['/robots.txt', 'Sitemap'], ['/feed.xml', '<rss'], ['/manifest.webmanifest', 'RivalArcade']]) ok((await (await get(p)).text()).includes(t), `${p} content`);
ok((await get('/press/rivalarcade-press-kit.zip')).status === 200, 'press kit zip');
ok((await get('/admin')).status === 307 || (await get('/admin')).status === 302, 'admin redirects when signed out');
ok((await get('/nope-404')).status === 404, '404 page');

// Forms
const post = (p, b) => get(p, { method: 'POST', headers: { 'content-type': 'application/json', origin: base }, body: JSON.stringify(b) });
const early = Date.now() - 10_000;
let r = await post('/api/inquiry', { kind: 'general', name: 'Bot', email: 'a@b.co', subject: 'x', message: 'hello hello hello', website: 'spam', startedAt: early });
ok(r.status === 400, `honeypot rejected (${r.status})`);
r = await post('/api/inquiry', { kind: 'general', name: 'Fast', email: 'a@b.co', subject: 'x', message: 'hello hello hello', startedAt: Date.now() });
ok(r.status === 400, `too-fast submit rejected (${r.status})`);
r = await post('/api/inquiry', { kind: 'general', name: 'Smoke Test', email: 'smoke@example.com', subject: 'Smoke test', message: 'Automated smoke test message.', startedAt: early });
ok(r.status === 200 || r.status === 503, `valid inquiry accepted (${r.status})`);
r = await post('/api/inquiry', { kind: 'general', name: '', email: 'bad', message: '' });
ok(r.status === 400 || r.status === 422, `invalid inquiry rejected (${r.status})`);
r = await post('/api/newsletter/subscribe', { email: 'not-an-email' });
ok(r.status >= 400 && r.status < 500, `invalid newsletter email rejected (${r.status})`);
r = await post('/api/creators/apply', {});
ok(r.status >= 400 && r.status < 500, `empty creator application rejected (${r.status})`);
r = await get('/api/cron/publish');
ok(r.status === 401 || r.status === 403, `cron requires secret (${r.status})`);
console.log(fails ? `\n${fails} failure(s)` : `\nAll checks passed (${urls.length} pages)`);
process.exit(fails ? 1 : 0);
