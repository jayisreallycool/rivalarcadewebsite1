import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import Tracker from '@/components/Tracker';

const nunito = localFont({ src: './fonts/nunito.woff2', weight: '200 1000', variable: '--font-nunito', display: 'swap' });
const lilita = localFont({ src: './fonts/lilita-one.woff2', weight: '400', variable: '--font-lilita', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'RivalArcade — Free Competitive Skill Games in Your Browser', template: '%s | RivalArcade' },
  description: 'Free competitive 3D skill games in your browser: 1v1 duels on the exact same seed, live arenas, scheduled cups, the RivalRank ladder and Mythic cosmetics. No downloads, no pay-to-win.',
  applicationName: SITE_NAME,
  icons: { icon: [{ url: '/brand/icon.svg', type: 'image/svg+xml' }, { url: '/brand/icon-192.png', sizes: '192x192' }], apple: '/brand/apple-icon.png' },
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
  formatDetection: { telephone: false },
  category: 'games',
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#07070a', colorScheme: 'dark' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`bg-ink ${nunito.variable} ${lilita.variable}`}>
      <body className="min-h-dvh overflow-x-hidden bg-ink font-sans text-[#e9e9f1] antialiased">
        {children}
        <Tracker />
      </body>
    </html>
  );
}
