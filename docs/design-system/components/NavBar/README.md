# NavBar

The landing's sticky top bar: logo + wordmark, four anchor links, and two CTAs (landing addition).

- **Consumer provides:** the section anchors and the two URLs: portal `https://tendia-app.vercel.app` (secondary) and app `https://tendia-app.vercel.app/app` (primary, so the hero keeps the one accent of the first screen).
- Height `nav-height` (72px), ground `indigo50`, bottom hairline `neutral300`. Under 900px the links collapse into a menu button (a `<details>` disclosure is enough); keep the app CTA visible.
- Logo: `assets/Logos/tendia-logo.png` at 40px with `alt=""` because the wordmark next to it says "TendIA".
- The phone menu is the page's only client component: a native `<details>` that also closes itself when one of its links is tapped (`src/components/MobileMenu.tsx`), so the panel never stays open over the section you jumped to.
- Anchor jumps are instant, not smooth, and land right under the bar through `scroll-padding-top: var(--nav-height)`. Never put `content-visibility: auto` on a link target or on the section directly above one: Chrome then ignores the scroll padding and the section ends up under the bar.
