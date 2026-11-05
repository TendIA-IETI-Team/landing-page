import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { marked } from 'marked';

/**
 * Legal documents, copied verbatim from docs/legal/ in the main repo (TendIA-IETI-Team/tendia)
 * into content/legal/. Rendered at build time: the pages ship no JavaScript for this.
 */
export const LEGAL = {
  privacidad: {
    file: 'aviso-privacidad.md',
    path: '/privacidad',
    title: 'Aviso de privacidad',
    description: 'Cómo usa TendIA los datos de tu negocio que autorizas.',
  },
  tratamiento: {
    file: 'politica-tratamiento-datos.md',
    path: '/tratamiento-de-datos',
    title: 'Política de tratamiento de datos personales',
    description:
      'Qué datos trata TendIA, para qué, tus derechos y cómo ejercerlos (Ley 1581 de 2012).',
  },
} as const;

export type LegalDoc = keyof typeof LEGAL;

// Links inside the documents that point to the other document on GitHub now point to its page here.
const REPO_DOCS = 'https://github.com/TendIA-IETI-Team/tendia/blob/main/docs/legal/';

export async function renderLegal(doc: LegalDoc): Promise<string> {
  const md = await readFile(join(process.cwd(), 'content/legal', LEGAL[doc].file), 'utf8');
  // The page renders its own h1, so the document's first heading is dropped.
  const body = md.replace(/^# .*\n+/, '');
  let html = await marked.parse(body, { gfm: true, async: true });
  for (const d of Object.values(LEGAL)) {
    const escaped = `${REPO_DOCS}${d.file}`.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
    html = html.replace(
      new RegExp(`<a href="${escaped}">[^<]*</a>`, 'g'),
      `<a href="${d.path}">${d.title}</a>`,
    );
  }
  // Table wrappers so wide tables scroll on phones instead of the page.
  return html
    .replaceAll('<table>', '<div class="td-prose__table"><table>')
    .replaceAll('</table>', '</table></div>');
}
