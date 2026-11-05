TendIA turns a neighborhood shop's real activity (card-terminal sales, payments to distributors, the paper notebook) into a **Puntaje TendIA from 0 to 1000, explained in plain words**. TendIA does not lend money: it sells the risk evaluation to banks, fintechs, microlenders and distributors (B2B2C). This system is the brand of the app and portal, extended with the sections a public landing page needs. The implementation brief for the landing is the **Landing page spec** section.

## Content fundamentals

- **Spanish (es-CO), tú everywhere.** The app and portal both say "tú": "Ingresa a tu cuenta", "Tu Puntaje TendIA". Use it with shopkeepers and with entities alike.
- **Plain words, tested with doña Gloria.** Write "ventas con datáfono", not "POS"; "cuentas del banco", not "open finance"; "respaldo del Fondo Nacional de Garantías", not "aval FNG"; "Bajo / Medio / Bueno", and "En construcción" when talking to a shopkeeper about a low score.
- **Always say TendIA does not lend.** Every page carries "TendIA no presta dinero" in the first screen and in the footer. Never write "aprobado", "préstamo garantizado" or "DataCrédito" as a promise.
- **Sentence case** for headings and buttons ("Ver mi puntaje", "Cómo funciona"). Eyebrows are the only uppercase text.
- **Numbers in Colombian format**: decimal comma and dot thousands ("9,6 %", "20.488", "0,741"), a space before "%". Every statistic carries its source ("DANE · EMICRON 2024").
- **No emoji in the interface.** The repo's README uses them as section markers; the product and landing do not.
- Real copy to reuse: "Crédito basado en tu negocio, no en tu pasado bancario." · "Un Puntaje TendIA de 0 a 1000, explicado en lenguaje sencillo, para las tiendas de barrio de Colombia." · "Justifica un mes malo con una foto, y el puntaje se recalcula."

## Visual foundations

**Color.** The palette comes from the logo: `indigo700` is the house, `orange500` the spark.
- Page ground `indigo50`; cards `white` with a `neutral300` hairline; alternating sections `indigo100` (tint) and `white`; data band and footer `dark-bg`.
- Text: `indigo900` on light grounds, `neutral600` for secondary text; white, `indigo300` or `orange500` on `dark-bg` and `indigo700`.
- `orange500` is for ONE featured CTA per view and for achievements. Text on it is always `indigo900` (6.6:1); **never white on orange** (2.4:1). For orange text use `orange700`, on `white` or `indigo50` only: on `indigo100` (4.35:1) and `orange100` (4.48:1) it misses AA, so eyebrows on tint sections turn `indigo700` and the accent badge sets `indigo900` on `orange100`.
- **Orange never means bad.** Score bands use `danger` / `warning` / `success` with their `-bg` tints and their names written. **Never color alone**: every state, bar and chart value carries a word or sign.
- Charts use `chart-primary`, `chart-highlight`, `chart-negative` on `chart-grid`, always labelled.
- One light theme: the product has no dark mode. `dark-bg` is a section ground, not a theme.

**Type.** Nunito only (Google Fonts, weights 400/600/700/800), loaded with `display: swap`. Hero headline `display` (56/60, 800; 40/44 on phones); section titles `h2`; card titles `h3`; intros `lead`; shopkeeper-facing copy `body-lg` (18px, as in the app, for older readers); entity-facing copy `body` (16px, as in the portal); buttons and labels `label`; badges and sources `caption`. Scores and amounts use tabular numerals (`font-variant-numeric: tabular-nums`) and `score-numeral`.

**Space and layout.** Content max width `container-max` (1120px), gutters `space-md` on phones and `space-2xl` from 768px. Sections pad `space-3xl` (mobile) / `space-4xl` (desktop). Card padding `space-lg`; title-to-content gap `space-xl`. Mobile-first: most shopkeepers will open the landing on an Android phone.

**Shape.** `radius-sm` for buttons, inputs and alerts; `radius-md` for cards; `radius-lg` for showcase panels and the CTA band; `radius-pill` for badges and score-bar ends.

**Borders and shadows.** Borders, not shadows: a `neutral300` hairline separates. `shadow-sm` is the single shadow, for floating panels only.

**Focus and states.** Focus ring: 2px solid `indigo500`, offset 2px (≥3:1 on `indigo50`, `white` and `indigo100`). Hover: primary darkens to `indigo900`; secondary fills `indigo50`; accent `brightness(.95)`. Disabled: 50% opacity, `not-allowed` cursor. Tappable controls ≥ `tap-min` (44px).

**Imagery.** Real product screenshots only (`assets/Screenshots/`), in the phone or browser frames of PhoneShowcase. No stock photos, no illustrations of money, no mascots, no gradients.

**Motion.** Minimal: 150ms color transitions on controls. Respect `prefers-reduced-motion`; no scroll-jacking or parallax.

## Iconography

The product has no icon library: it uses text glyphs (✓ in check lists, · as a separator) and the logo. Keep it that way on the landing; a check list uses `td-checks`. If an icon set becomes necessary, flag it to UX/UI first: none is approved.

## Logo

`assets/Logos/tendia-logo.png` (400×400, transparent): the indigo house with an awning and an orange spark. Show it at 40px in the nav and footer next to the wordmark "TendIA" set in Nunito 800, `indigo700` on light grounds, white on `dark-bg`. Never recolor, redraw or crop the mark. On `dark-bg` the indigo house loses contrast, so place it on a `white` tile with `radius-sm` and 4px padding. There is no SVG version of the mark yet.

## Components

Ported from the portal (`apps/portal/src/components/ui.tsx`): Button, Badge (incl. FranjaBadge), Card, Alerta, Field, ScoreHero.

Intentional additions for the landing, built only from the tokens above: NavBar, Hero, PhoneShowcase, AudienceSplit, HowItWorks, DataStats, TrustList, CtaBand, Footer. Classes live in `components/bundle.css` with the `td-` prefix; each component's README says what the consumer provides.
