import Link from 'next/link';
import { Mark } from '@/components/Brand';
import { appLink } from '@/lib/site';

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <Mark size={80} id="nf" />
      <p className="kicker mt-6 justify-center">404</p>
      <h1 className="mt-2 font-display text-5xl text-white">Missed the shot.</h1>
      <p className="mt-3 max-w-md text-mist">That page doesn’t exist. Try the homepage, or go straight to the game.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a href={appLink('404')} data-app-link="404" className="btn btn-gold">Play RivalArcade</a>
        <Link href="/" className="btn btn-ghost">Home</Link>
      </div>
    </main>
  );
}
