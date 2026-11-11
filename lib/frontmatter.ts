/** Tiny frontmatter parser for the bundled seed posts (key: value, [a, b] lists, quoted strings). */
export function parseFrontmatter(src: string): { data: Record<string, string | string[] | boolean>; body: string } {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: src };
  const data: Record<string, string | string[] | boolean> = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i < 0) continue;
    const k = line.slice(0, i).trim();
    let v = line.slice(i + 1).trim();
    if (v.startsWith('[') && v.endsWith(']')) data[k] = v.slice(1, -1).split(',').map((s) => s.trim()).filter(Boolean);
    else if (v === 'true' || v === 'false') data[k] = v === 'true';
    else {
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
      data[k] = v;
    }
  }
  return { data, body: m[2].trim() };
}
