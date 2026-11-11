import Link from 'next/link';
import { requireAdmin } from '@/lib/server/auth';
import { logoutAction } from '@/lib/server/admin-actions';

const NAV = [['/admin', 'Dashboard'], ['/admin/posts', 'Posts'], ['/admin/media', 'Media'], ['/admin/settings', 'Site settings'], ['/admin/announcements', 'Announcements'], ['/admin/landing', 'Landing pages'], ['/admin/subscribers', 'Subscribers'], ['/admin/newsletters', 'Newsletters'], ['/admin/inbox', 'Inbox'], ['/admin/users', 'Users']] as const;

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const me = await requireAdmin();
  return (
    <div className="adm-shell">
      <nav className="adm-nav" aria-label="Admin">
        <strong style={{ padding: '.3rem .6rem' }}>RivalArcade</strong>
        {NAV.map(([h, l]) => <Link key={h} href={h}>{l}</Link>)}
        <a href="/" target="_blank" rel="noreferrer">View site ↗</a>
        <form action={logoutAction} style={{ marginTop: 'auto' }}>
          <p className="muted" style={{ fontSize: 12, margin: '0 .6rem .4rem' }}>{me.email} · {me.role}</p>
          <button className="ghost">Sign out</button>
        </form>
      </nav>
      <main className="adm-main">{children}</main>
    </div>
  );
}
