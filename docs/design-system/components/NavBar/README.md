# NavBar

The landing's sticky top bar: logo + wordmark, four anchor links, and two CTAs (landing addition).

- **Consumer provides:** the section anchors and the two URLs: portal `https://tendia-app.vercel.app` (secondary) and app `https://tendia-app.vercel.app/app` (primary, so the hero keeps the one accent of the first screen).
- Height `nav-height` (72px), ground `indigo50`, bottom hairline `neutral300`. Under 900px the links collapse into a menu button (a `<details>` disclosure is enough); keep the app CTA visible.
- Logo: `assets/Logos/tendia-logo.png` at 40px with `alt=""` because the wordmark next to it says "TendIA".
