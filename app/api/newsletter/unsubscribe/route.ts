import { hasDb } from '@/lib/server/db';
import { unsubscribe } from '@/lib/server/newsletter';

/** RFC 8058 one-click unsubscribe target (mail clients POST here from the List-Unsubscribe header). */
export async function POST(req: Request) {
  const token = new URL(req.url).searchParams.get('token') || '';
  if (!hasDb() || !token || token.length > 100) return new Response('Bad request', { status: 400 });
  await unsubscribe(token);
  return new Response('Unsubscribed', { status: 200 });
}
