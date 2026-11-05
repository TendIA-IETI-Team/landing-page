# Button

The one call-to-action control: a link or button styled `td-btn` plus one variant, ported from the portal's `Button` (`apps/portal/src/components/ui.tsx`).

- **Consumer provides:** the element (`<a>` for navigation, `<button>` for actions), the label, and one variant class: `td-btn--primary`, `--secondary`, `--accent`, `--danger`, or `--ondark` (landing addition for `dark-bg` sections). Add `td-btn--lg` in the hero and the CTA band.
- **Primary** = `indigo700` with white text. **Accent** = `orange500` with `indigo900` text — never white on orange (2.4:1). At most ONE accent button per view: it is the shopkeeper's path.
- Labels are verbs in plain Spanish: first person for the shopkeeper ("Ver mi puntaje"), plain for entities ("Ver el portal del aliado").
- Minimum height `tap-min` (44px); the portal's 40px is for dense tables only.
- Don't: icon-only buttons, two accents side by side, `danger` on the landing (it exists for revoking consents in the product).
