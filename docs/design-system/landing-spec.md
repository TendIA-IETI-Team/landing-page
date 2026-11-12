# Landing page spec

Implementation brief for Claude Code. Target repository: `https://github.com/TendIA-IETI-Team/landing-page`. Build exactly what this section and the components describe; when something is not covered here, follow the brand book above and ask instead of inventing.

## Goal

One public, Spanish (es-CO) page that explains TendIA in under a minute and sends each visitor down one of two paths:

| Visitor | Primary action | URL |
| --- | --- | --- |
| Shopkeeper (tendero), on a phone | **Ver mi puntaje** / **Abrir la app** (accent button) | `https://tendia-app.vercel.app/app` |
| Entity (banco, fintech, microfinanciera, distribuidor) | **Ver el portal del aliado** (primary button) | `https://tendia-app.vercel.app` |
| Developer at an entity | **Ver la API** (secondary) | `https://tendia-app.vercel.app/api/docs` |
| Anyone | Código en GitHub | `https://github.com/TendIA-IETI-Team/tendia` |

Keep these four URLs in one `src/config/links.ts`, overridable by `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_PORTAL_URL`, `NEXT_PUBLIC_API_DOCS_URL`, `NEXT_PUBLIC_REPO_URL`.

## Stack

- **Next.js 15 (App Router) + TypeScript + Tailwind CSS 3**, the same stack as `apps/portal`, statically rendered (no server code needed). Deploy on Vercel, Git-connected, `main` → production, PRs → previews.
- **Fonts:** `next/font/google` Nunito, weights 400/600/700/800, `display: 'swap'`, exposed as `--font-nunito` and mapped to `--font-sans`.
- **Tokens:** copy this system's `tokens.json` values into `src/styles/tokens.css` as CSS custom properties with the same names (`--indigo700`, `--space-lg`, `--radius-md`, …), and mirror them in `tailwind.config.ts` (`brand.900/700/500/300/100/50`, `accent.500/700/100`, `ink`, `ink-muted`, `line`, `success|warning|danger` + `bg`, `dark`) exactly as `apps/portal/tailwind.config.ts` does. Never hard-code a hex outside those two files.
- **Components:** one React component per landing component in this system, under `src/components/`, reproducing each `preview.html` markup and `bundle.css` rules (with Tailwind utilities or a CSS module; either is fine, but the rendered result must match the previews).
- No UI kit, no animation library, no analytics beyond **Vercel Web Analytics** (cookieless, so no consent banner).
- Package manager pnpm, Node 22 (same as `apps/portal`). Scripts: `dev`, `build`, `lint`, `typecheck`, `test` (Playwright + axe).

## Page structure (`src/app/page.tsx`)

Render in this order. IDs are the nav anchors. Section grounds alternate as listed so two neighbours never share one.

1. **NavBar** — logo + "TendIA", links Cómo funciona `/#como-funciona`, Tu puntaje `/#puntaje`, Para entidades `/#precios`, Pruébalo `/#pruebalo`, Preguntas `/#preguntas` (with `/` so they work from the legal pages); buttons Portal del aliado (secondary) and Abrir la app (primary: the hero's "Ver mi puntaje" is the one accent of the first screen). Under 900px: links in a `<details>` menu, the app CTA stays visible.
2. **Hero** — copy exactly as in the Hero preview; phone frame with `app-puntaje.png`. This is the LCP element: load the image with `priority`.
3. **Problema** `#problema` (white) — the 9,6 % figure and the **RateChart**: formal credit (median 61,9 % E.A., p25–p75 box 48,8–65,5 %, 5.992 Superfinanciera credits) against the loan shark (382–666 %), on one 0–700 % axis.
4. **HowItWorks** `#como-funciona` (tint) — the four steps: Autorizas, Anotas, Ves tu puntaje, Decides.
5. **PuntajeExplicado** `#puntaje` (white) — ScoreHero with 600 and the **ScoreBreakdown** table: a real `tendia-v2` output for a simulated traditional shop, 615 base, five factors and "otros 6", points with one decimal so the sum is exact. Plus the "La IA no calcula tu puntaje" alert.
6. **AudienceSplit** `#tenderos` / `#aliados` (tint) — the two cards from the preview.
7. **Cuaderno** `#cuaderno` (white) — the notebook photo, the table Claude read from it, and the Tendi recording in a phone frame.
8. **DataStats** (dark) — 5.992 créditos (Superfinanciera), 20.488 micronegocios (EMICRON), AUC 0,741 (UCI #350).
9. **Precios** `#precios` (tint) — $1.800.000 a month with 500 scores, $3.500 per extra score, "El tendero nunca paga", and the portal inbox in the browser frame.
10. **Usabilidad** `#tenderos-reales` (white) — doña Gloria's three changes, the before/after of the guarantee screen and the evaluation figures, labelled as an evaluation without users.
11. **TrustList** `#seguridad` (tint) — the three cards.
12. **Pruebalo** `#pruebalo` (white) — the four demo phones (300 000 0001–0004); portal demo accounts by email request, never the password on the page.
13. **Preguntas** `#preguntas` (tint) — eight `<details>` and a `FAQPage` JSON-LD built from the same list.
14. **Equipo** `#equipo` — six people with initials, role and GitHub.
15. **CtaBand** — "¿Tu entidad le presta a tiendas de barrio?"; Quiero ser aliado → `mailto:${NEXT_PUBLIC_CONTACT_EMAIL}` (falls back to Probar el portal if unset), Ver la API.
16. **Footer** — as in the preview; legal links to `/privacidad` and `/tratamiento-de-datos`; Equipo to `/#equipo`.

**Legal pages:** `/privacidad` and `/tratamiento-de-datos`, rendered at build time from `content/legal/` (a verbatim copy of the main repo's `docs/legal/`), with `td-prose` styles.

## Assets

Copy from the main repo (`TendIA-IETI-Team/tendia`) into `public/`; do not fetch them from this design system at runtime.

| Main repo path | Landing path | Use |
| --- | --- | --- |
| `docs/brand/tendia-logo.png` | `public/logo.png` | Nav, footer (on a white `radius-sm` tile on `dark-bg`), favicon, OG image |
| `docs/img/app-puntaje.png` | `public/screens/app-puntaje.png` | Hero |
| `docs/img/portal-bandeja.png` | `public/screens/portal-bandeja.png` | Precios |
| `docs/img/cuaderno-ejemplo.jpg` | `public/media/cuaderno-ejemplo.jpg` | Cuaderno |
| `docs/img/gifs/app-tendi-cuaderno.gif` | `public/media/app-tendi-cuaderno.gif` | Cuaderno (served `unoptimized`, lazy) |
| `docs/img/usabilidad/antes-garantia.png`, `despues-garantia.png` | `public/media/` | Usabilidad |

Use `next/image` with explicit `width`/`height`; alt texts as in the previews.

## SEO and metadata

- `<html lang="es-CO">`; title "TendIA · Crédito basado en tu negocio"; description "Un Puntaje TendIA de 0 a 1000, explicado en lenguaje sencillo, para las tiendas de barrio de Colombia. TendIA no presta dinero."
- Open Graph + Twitter card: a 1200×630 image generated with `next/og` (`indigo50` ground, logo, the headline in Nunito 800 `indigo900`, an `orange500` block). Favicon and apple-touch icon from the logo.
- `sitemap.ts`, `robots.ts`, canonical URL from `NEXT_PUBLIC_SITE_URL`.

## Accessibility (blocking)

- WCAG 2.2 AA. Every text pair in this system already passes 4.5:1; do not introduce new pairs. Never white text on `orange500`.
- One `h1` (the hero). Landmarks: `header`, `nav`, `main`, `footer`. A "Saltar al contenido" skip link as the first focusable element.
- Visible focus ring everywhere (2px `indigo500`, offset 2px). Tap targets ≥ 44px.
- Score bar is decorative (`aria-hidden`); its value is in text.
- `prefers-reduced-motion`: no transitions.

## Performance budget (blocking)

Lighthouse mobile ≥ 95 in Performance, Accessibility, Best Practices and SEO; LCP < 2.5 s, CLS < 0.05, first-load JS ≤ 110 KB gzipped (the Next.js + React baseline is about 102 KB). The page should be a Server Component; only the mobile menu may be a client component (or none, with `<details>`).

## Acceptance criteria

1. The page matches each component preview of this system at 375px, 768px and 1280px.
2. All four links in `links.ts` resolve; the accent CTA appears at most once per viewport.
3. "TendIA no presta dinero" appears in the hero and in the footer.
4. Every statistic shows its source; numbers use Colombian format.
5. `pnpm lint`, `pnpm typecheck`, `pnpm build` and `pnpm test` pass in CI (GitHub Actions), including an axe check with zero violations and a Playwright test that clicks each CTA and checks its `href`.
6. Vercel preview deploy on each PR; production on `main`.
7. A `README.md` (Spanish, like the main repo) with how to run, deploy and where the design system lives, and a `CLAUDE.md` that points to this design system.

## Work plan for Claude Code

1. Scaffold Next.js 15 + Tailwind 3 + TS with pnpm; add ESLint, Prettier (copy `.prettierrc.json` from the main repo), Playwright, `@axe-core/playwright`.
2. Add `tokens.css` + `tailwind.config.ts` from `tokens.json`; Nunito via `next/font`; global styles (`indigo50` body, `indigo900` text, focus ring).
3. Build primitives: Button, Badge, Card, Alerta, ScoreHero (ported from `apps/portal/src/components/ui.tsx`).
4. Build landing sections in page order, each against its preview.
5. Copy assets, metadata, OG image, sitemap, robots.
6. Tests + CI workflow; Vercel project linked to the repo.
7. Open one PR per step group (scaffold+tokens, components, sections, SEO+tests), each with a screenshot at 375px and 1280px.

## Decisions taken

- Contact email: set in Vercel as `NEXT_PUBLIC_CONTACT_EMAIL` (production and preview).
- Domain: `tendia-landing.vercel.app`.
- Legal pages: rendered on the landing. Their texts are still drafts with blanks in brackets; they are completed in the main repo's `docs/legal/` and copied verbatim.
