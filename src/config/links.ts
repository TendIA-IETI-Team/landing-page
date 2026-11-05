/** Every outbound link of the landing (docs/design-system/landing-spec.md → Goal). */
export const links = {
  app: process.env.NEXT_PUBLIC_APP_URL ?? 'https://tendia-app.vercel.app/app',
  portal: process.env.NEXT_PUBLIC_PORTAL_URL ?? 'https://tendia-app.vercel.app',
  apiDocs: process.env.NEXT_PUBLIC_API_DOCS_URL ?? 'https://tendia-app.vercel.app/api/docs',
  repo: process.env.NEXT_PUBLIC_REPO_URL ?? 'https://github.com/TendIA-IETI-Team/tendia',
} as const;

const repo = links.repo.replace(/\/$/, '');

export const legal = {
  privacidad: `${repo}/blob/main/docs/legal/aviso-privacidad.md`,
  tratamiento: `${repo}/blob/main/docs/legal/politica-tratamiento-datos.md`,
  equipo: `${repo}#-equipo`,
} as const;

/** "Quiero ser aliado" only renders when a contact email is configured. */
export const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || null;

/** Canonical origin: NEXT_PUBLIC_SITE_URL, else Vercel's production domain, else local dev. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3100');
