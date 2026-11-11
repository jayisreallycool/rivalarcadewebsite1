import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Analytics from '@/components/Analytics';
import { JsonLd } from '@/components/ui';
import { activeAnnouncements } from '@/lib/server/data';
import { orgLd, websiteLd } from '@/lib/seo';

export const revalidate = 300;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [bar] = await activeAnnouncements();
  return (
    <div style={{ ['--bar' as string]: bar ? '36px' : '0px' }}>
      <Header bar={bar ?? null} />
      <main id="main">{children}</main>
      <Footer />
      <Analytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      <JsonLd data={[orgLd(), websiteLd()]} />
    </div>
  );
}
