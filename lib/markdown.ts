import { Marked, type Tokens } from 'marked';

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
const safeUrl = (u: string) => (/^(https?:|mailto:|\/|#)/i.test(u.trim()) ? u.trim() : '#');
const APP = 'rivalarcade.vercel.app';

/**
 * Markdown → HTML for posts, landing pages and newsletters. Raw HTML in the source is escaped,
 * links are restricted to http(s)/mailto/relative, and outbound links get rel attributes. Links to
 * the game carry data-app-link so the click tracker can count them.
 */
const md = new Marked({ gfm: true, breaks: false });
md.use({
  renderer: {
    html(token: Tokens.HTML | Tokens.Tag) {
      return esc(token.text);
    },
    link(token: Tokens.Link) {
      const href = safeUrl(token.href);
      const text = this.parser.parseInline(token.tokens);
      const ext = /^https?:/i.test(href);
      const app = href.includes(APP);
      return `<a href="${esc(href)}"${ext ? ' target="_blank" rel="noopener"' : ''}${app ? ' data-app-link="article"' : ''}>${text}</a>`;
    },
    image(token: Tokens.Image) {
      return `<img src="${esc(safeUrl(token.href))}" alt="${esc(token.text || '')}" loading="lazy" decoding="async">`;
    },
    heading(token: Tokens.Heading) {
      const text = this.parser.parseInline(token.tokens);
      const id = token.text.toLowerCase().replace(/[^\w]+/g, '-').replace(/^-|-$/g, '');
      const level = Math.min(Math.max(token.depth, 2), 4);
      return `<h${level} id="${id}">${text}</h${level}>`;
    },
    table(token: Tokens.Table) {
      const head = token.header.map((c) => `<th>${this.parser.parseInline(c.tokens)}</th>`).join('');
      const rows = token.rows.map((r) => `<tr>${r.map((c) => `<td>${this.parser.parseInline(c.tokens)}</td>`).join('')}</tr>`).join('');
      return `<div class="table-wrap"><table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>`;
    },
  },
});

export const renderMarkdown = (src: string) => md.parse(src || '', { async: false }) as string;

export function readingMinutes(src: string) {
  return Math.max(1, Math.round((src || '').split(/\s+/).length / 220));
}

export function headingsOf(src: string) {
  return [...(src || '').matchAll(/^##\s+(.+)$/gm)].map((m) => ({ text: m[1].replace(/[*_`]/g, ''), id: m[1].replace(/[*_`]/g, '').toLowerCase().replace(/[^\w]+/g, '-').replace(/^-|-$/g, '') }));
}
