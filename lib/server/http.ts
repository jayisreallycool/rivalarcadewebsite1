import 'server-only';
import { NextResponse } from 'next/server';

export const json = (data: unknown, status = 200) => NextResponse.json(data, { status, headers: { 'Cache-Control': 'no-store' } });

/** Parse a JSON body (max 32 KB) from a same-origin request. Returns null on anything unexpected. */
export async function readJson(req: Request, maxBytes = 32_768): Promise<Record<string, unknown> | null> {
  const origin = req.headers.get('origin');
  const host = req.headers.get('x-forwarded-host') || req.headers.get('host');
  if (origin && host && new URL(origin).host !== host) return null;
  const text = await req.text();
  if (text.length > maxBytes) return null;
  try {
    const v = JSON.parse(text);
    return v && typeof v === 'object' && !Array.isArray(v) ? v : null;
  } catch {
    return null;
  }
}
