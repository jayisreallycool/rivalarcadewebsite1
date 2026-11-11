import { getSettings, SOCIAL_KEYS, SOCIAL_LABEL } from '@/lib/server/settings';
import { saveBanner, saveHomepage, saveSeo, saveSocial, saveSponsorship } from '@/lib/server/admin-actions';
import { GAMES } from '@/lib/content';
import { SEO_PAGES } from '@/lib/seo-pages';
import AdminForm from '../../AdminForm';

const SECTIONS = ['featured', 'how', 'compete', 'coins', 'cosmetics', 'progression', 'cups', 'community', 'why', 'news', 'faq', 'social'];
const PATHS = ['/', '/about', '/how-it-works', '/games', '/competitions', '/tournaments', '/rival-coins', '/rewards', '/progression', '/community', '/news', '/blog', '/faq', '/contact', '/advertise', '/creators', '/press', '/invite', '/newsletter'];

export default async function SettingsPage() {
  const s = await getSettings();
  const seoPaths = [...PATHS, ...Object.keys(s.seo).filter((p) => !PATHS.includes(p))];
  return (
    <>
      <h1>Site settings</h1>
      <p className="muted">Changes go live immediately. Games reference: {GAMES.map((g) => g.id).join(', ')}.</p>

      <div className="adm-card"><h2>Social links</h2><p className="muted">Empty links show as “Soon” on the site. Add only real, live profiles.</p>
        <AdminForm action={saveSocial}><div className="row">{SOCIAL_KEYS.map((k) => <div key={k}><label>{SOCIAL_LABEL[k]} URL</label><input name={k} defaultValue={s.social[k]} placeholder="https://" /></div>)}</div></AdminForm></div>

      <div className="adm-card"><h2>Homepage</h2>
        <AdminForm action={saveHomepage}>
          <label>Kicker</label><input name="heroKicker" defaultValue={s.homepage.heroKicker} />
          <label>Headline</label><input name="heroHeadline" defaultValue={s.homepage.heroHeadline} />
          <label>Sub-headline</label><textarea name="heroSub" defaultValue={s.homepage.heroSub} style={{ minHeight: 80 }} />
          <label>Featured games (slugs, comma separated, in order)</label><input name="featuredGames" defaultValue={s.homepage.featuredGames.join(', ')} />
          <div className="row"><div><label>YouTube video ID (blank hides the video section)</label><input name="videoYoutubeId" defaultValue={s.homepage.videoYoutubeId} /></div><div><label>Video title</label><input name="videoTitle" defaultValue={s.homepage.videoTitle} /></div></div>
          <label>Hide sections</label>
          <div className="row">{SECTIONS.map((x) => <label key={x}><input type="checkbox" name="hidden" value={x} defaultChecked={s.homepage.hiddenSections.includes(x)} />{x}</label>)}</div>
        </AdminForm></div>

      <div className="adm-card"><h2>Promotional banner</h2>
        <AdminForm action={saveBanner}>
          <label><input type="checkbox" name="enabled" defaultChecked={s.promoBanner.enabled} />Show on homepage</label>
          <div className="row"><div><label>Title</label><input name="title" defaultValue={s.promoBanner.title} /></div><div><label>Image URL</label><input name="image" defaultValue={s.promoBanner.image} /></div><div><label>Button label</label><input name="ctaLabel" defaultValue={s.promoBanner.ctaLabel} /></div><div><label>Button link</label><input name="ctaUrl" defaultValue={s.promoBanner.ctaUrl} /></div></div>
          <label>Text</label><textarea name="text" defaultValue={s.promoBanner.text} style={{ minHeight: 70 }} />
        </AdminForm></div>

      <div className="adm-card"><h2>Sponsorship &amp; advertising packages</h2><p className="muted">Leave prices as “Custom quote” unless you have real rates to publish.</p>
        <AdminForm action={saveSponsorship}>
          {[0, 1, 2, 3].map((i) => { const p = s.sponsorship.packages[i]; return (
            <fieldset key={i} style={{ border: '1px solid var(--b)', borderRadius: 8, marginBottom: 8 }}><legend>Package {i + 1}</legend>
              <div className="row"><div><label>Name</label><input name={`n${i}`} defaultValue={p?.name ?? ''} /></div><div><label>Price label</label><input name={`p${i}`} defaultValue={p?.price ?? ''} /></div></div>
              <label>Summary</label><input name={`s${i}`} defaultValue={p?.summary ?? ''} />
              <label>Includes (one per line)</label><textarea name={`i${i}`} defaultValue={p?.includes.join('\n') ?? ''} style={{ minHeight: 80 }} />
            </fieldset>); })}
          <label>Media-kit note</label><textarea name="mediaKitNote" defaultValue={s.sponsorship.mediaKitNote} style={{ minHeight: 70 }} />
        </AdminForm></div>

      <div className="adm-card"><h2>SEO overrides</h2><p className="muted">Per-page title, description and social image. Blank = built-in default. Blog posts and landing pages have their own SEO fields. Landing keywords pages: {SEO_PAGES.length}.</p>
        <AdminForm action={saveSeo}>
          {seoPaths.map((p) => { const o = s.seo[p] ?? {}; return (
            <div key={p} className="row" style={{ borderTop: '1px solid var(--b)', paddingTop: 6 }}>
              <div><label>{p} — title</label><input name={`t|${p}`} defaultValue={o.title ?? ''} maxLength={70} /></div>
              <div><label>description</label><input name={`d|${p}`} defaultValue={o.description ?? ''} maxLength={170} /></div>
              <div><label>OG image URL</label><input name={`o|${p}`} defaultValue={o.ogImage ?? ''} /></div>
            </div>); })}
        </AdminForm></div>
    </>
  );
}
