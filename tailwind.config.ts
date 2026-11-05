import type { Config } from 'tailwindcss';

// Mirrors docs/design-system/tokens.json through the CSS variables in src/styles/tokens.css,
// with the same names as apps/portal/tailwind.config.ts in the main repo.
const v = (name: string) => `var(--${name})`;

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          900: v('indigo900'),
          700: v('indigo700'),
          500: v('indigo500'),
          300: v('indigo300'),
          100: v('indigo100'),
          50: v('indigo50'),
        },
        accent: { 500: v('orange500'), 700: v('orange700'), 100: v('orange100') },
        ink: { DEFAULT: v('indigo900'), muted: v('neutral600') },
        line: v('neutral300'),
        success: { DEFAULT: v('success'), bg: v('success-bg') },
        warning: { DEFAULT: v('warning'), bg: v('warning-bg') },
        danger: { DEFAULT: v('danger'), bg: v('danger-bg') },
        dark: v('dark-bg'),
      },
      fontFamily: { sans: [v('font-sans')] },
      spacing: {
        '2xl': v('space-2xl'),
        '3xl': v('space-3xl'),
        '4xl': v('space-4xl'),
      },
      borderRadius: {
        sm: v('radius-sm'),
        card: v('radius-md'),
        lg: v('radius-lg'),
        pill: v('radius-pill'),
      },
      maxWidth: { container: v('container-max') },
      minHeight: { tap: v('tap-min') },
      height: { nav: v('nav-height') },
    },
  },
  plugins: [],
} satisfies Config;
