import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'RivalArcade',
    short_name: 'RivalArcade',
    description: 'Free competitive skill games in your browser.',
    start_url: '/',
    display: 'standalone',
    background_color: '#07070a',
    theme_color: '#07070a',
    icons: [{ src: '/brand/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/brand/icon-512.png', sizes: '512x512', type: 'image/png' }, { src: '/brand/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
