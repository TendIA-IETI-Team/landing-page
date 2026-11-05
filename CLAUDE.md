# TendIA landing page

Public landing page for TendIA (https://github.com/TendIA-IETI-Team/tendia). Spanish (es-CO) content, Next.js 15 + Tailwind 3 on Vercel.

## Before writing any code

1. Read `docs/design-system/landing-spec.md`. It is the brief: stack, page structure, links, assets, SEO, accessibility, performance budget, acceptance criteria and the work plan. Follow its steps in order.
2. Read `docs/design-system/README.md`, the brand book: voice, color, type, spacing and logo rules.
3. For each section you build, read `docs/design-system/components/<Name>/README.md` and reproduce `preview.html` together with the rules in `components/bundle.css`. The previews are the visual reference; open them in a browser to compare.
4. Take token values only from `docs/design-system/tokens.json`.

The same design system is published at https://claude.ai/artifact/PbSgsr6WnFbNhKWJC6USns (private to the team). `docs/design-system/` is the copy in this repo and is what you should read. If the two differ, ask which one wins.

## Rules that must never break

- Never put white text on `orange500` (2.4:1). Text on orange is `indigo900`.
- Orange never means "bad". Score bands use the status colors, always with their name written.
- Never use color as the only signal. Every state or value carries a word or sign.
- Show "TendIA no presta dinero" in the hero and in the footer.
- Use "tú", plain Spanish, sentence case, no emoji, and Colombian number format ("9,6 %", "20.488"). Every statistic shows its source.
- Use only the real screenshots in `public/screens/` and the logo in `public/logo.png`. Never mock a screen or redraw the logo.
- Don't hard-code hex values outside `src/styles/tokens.css` and `tailwind.config.ts`.
- Don't add a UI kit, an animation library or tracking beyond Vercel Web Analytics.

## Open questions (ask, don't guess)

- The contact email for "Quiero ser aliado" (`NEXT_PUBLIC_CONTACT_EMAIL`)
- The production domain (`NEXT_PUBLIC_SITE_URL`)
- Whether the legal pages are rendered here or linked to the main repo

## Workflow

Use a branch per step group and a PR to `main` with screenshots at 375px and 1280px. Run `pnpm lint`, `pnpm typecheck`, `pnpm build` and `pnpm test` before opening the PR.
