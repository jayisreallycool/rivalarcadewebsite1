import { sql } from '@/lib/server/db';

const num = (n: unknown) => Number(n ?? 0).toLocaleString();

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ days?: string }> }) {
  const days = [7, 30, 90].includes(Number((await searchParams).days)) ? Number((await searchParams).days) : 30;
  const db = sql();
  const since = db`now() - make_interval(days => ${days})`;
  const [[t], pages, sources, campaigns, ctas, counts] = await Promise.all([
    db`select count(*) filter (where type='pageview') pv, count(distinct visitor_hash) filter (where type='pageview') uv, count(*) filter (where type='app_click') app, count(*) filter (where type='newsletter_signup') news from events where created_at > ${since}`,
    db`select path, count(*) n from events where type='pageview' and created_at > ${since} group by path order by n desc limit 10`,
    db`select coalesce(utm_source, nullif(split_part(regexp_replace(coalesce(referrer,''),'^https?://',''),'/',1),''), 'direct') src, count(*) n from events where type='pageview' and created_at > ${since} group by 1 order by n desc limit 10`,
    db`select utm_campaign c, count(*) filter (where type='pageview') visits, count(*) filter (where type='app_click') clicks from events where utm_campaign is not null and created_at > ${since} group by 1 order by 2 desc limit 15`,
    db`select label, count(*) n from events where type='app_click' and created_at > ${since} group by label order by n desc limit 10`,
    db`select (select count(*) from subscribers where status='confirmed') subs, (select count(*) from inquiries where status='new') inq, (select count(*) from creator_applications where status='new') cre`,
  ]);
  const rate = Number(t.pv) ? ((Number(t.app) / Number(t.pv)) * 100).toFixed(1) : '0.0';
  const Table = ({ rows, a, b, c }: { rows: Record<string, unknown>[]; a: string; b: string; c?: string }) => (
    <table><thead><tr><th>{a}</th><th>{b}</th>{c && <th>{c}</th>}</tr></thead><tbody>
      {rows.length ? rows.map((r, i) => { const v = Object.values(r); return <tr key={i}><td>{String(v[0] ?? '—')}</td><td>{num(v[1])}</td>{c && <td>{num(v[2])}</td>}</tr>; }) : <tr><td colSpan={3} className="muted">No data yet.</td></tr>}
    </tbody></table>
  );
  return (
    <>
      <h1>Dashboard</h1>
      <p>{[7, 30, 90].map((d) => <a key={d} href={`?days=${d}`} style={{ marginRight: 12, fontWeight: d === days ? 700 : 400 }}>{d} days</a>)}</p>
      <div className="stats">
        {[['Page views', t.pv], ['Unique visitors (daily-hash sum)', t.uv], ['Play clicks', t.app], ['Click-through to app', rate + '%'], ['Newsletter sign-ups', t.news], ['Confirmed subscribers', counts[0].subs], ['New inquiries', counts[0].inq], ['New creator applications', counts[0].cre]].map(([l, v]) => (
          <div className="adm-card stat" key={String(l)}><span className="muted">{String(l)}</span><b>{typeof v === 'string' ? v : num(v)}</b></div>
        ))}
      </div>
      <p className="muted">First-party, cookieless, consent-free counts. Unique visitors are counted per day, so multi-day totals can double-count returning people. GA4 (if enabled) has the full picture.</p>
      <div className="row">
        <div className="adm-card"><h2>Top pages</h2><Table rows={pages} a="Path" b="Views" /></div>
        <div className="adm-card"><h2>Traffic sources</h2><Table rows={sources} a="Source" b="Views" /></div>
      </div>
      <div className="row">
        <div className="adm-card"><h2>Campaigns (UTM)</h2><Table rows={campaigns} a="Campaign" b="Visits" c="App clicks" /></div>
        <div className="adm-card"><h2>Play clicks by placement</h2><Table rows={ctas} a="Placement" b="Clicks" /></div>
      </div>
    </>
  );
}
