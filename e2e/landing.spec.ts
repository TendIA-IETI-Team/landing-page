import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const APP = 'https://tendia-app.vercel.app/app';
const PORTAL = 'https://tendia-app.vercel.app';
const API = 'https://tendia-app.vercel.app/api/docs';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('cero violaciones de accesibilidad (WCAG 2.2 AA)', async ({ page }) => {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
    .analyze();
  expect(results.violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
});

test('un solo h1 y los landmarks', async ({ page }) => {
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('header')).toHaveCount(1);
  await expect(page.locator('main')).toHaveCount(1);
  await expect(page.locator('footer')).toHaveCount(1);
});

test('"TendIA no presta dinero" en el hero y en el footer', async ({ page }) => {
  await expect(page.locator('.td-hero')).toContainText('TendIA no presta dinero');
  await expect(page.locator('footer')).toContainText('TendIA no presta dinero');
});

test('los CTA llevan a la app, el portal y la API', async ({ page }) => {
  await expect(page.getByRole('link', { name: 'Ver mi puntaje' })).toHaveAttribute('href', APP);
  await expect(page.getByRole('link', { name: 'Ver el portal del aliado' })).toHaveAttribute(
    'href',
    PORTAL,
  );
  await expect(page.getByRole('link', { name: 'Ver la API' })).toHaveAttribute('href', API);
  await page.getByRole('link', { name: 'Soy una entidad' }).click();
  await expect(page).toHaveURL(/#aliados$/);
});

test('un solo botón de acento en la primera pantalla', async ({ page }) => {
  const visibles = await page.locator('.td-btn--accent').evaluateAll(
    (els) =>
      els.filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.top < window.innerHeight && r.bottom > 0;
      }).length,
  );
  expect(visibles).toBe(1);
});

test('cada cifra lleva su fuente', async ({ page }) => {
  const stats = page.locator('.td-stat');
  await expect(stats).toHaveCount(3);
  for (const stat of await stats.all()) {
    await expect(stat.locator('.td-stat__src')).not.toBeEmpty();
  }
});

test('sin scroll horizontal', async ({ page }) => {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

test('metadatos y archivos SEO', async ({ page, request }) => {
  await expect(page).toHaveTitle('TendIA · Crédito basado en tu negocio');
  await expect(page.locator('html')).toHaveAttribute('lang', 'es-CO');
  await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
  expect((await request.get('/robots.txt')).ok()).toBe(true);
  expect((await request.get('/sitemap.xml')).ok()).toBe(true);
  const og = await request.get('/opengraph-image');
  expect(og.headers()['content-type']).toContain('image/png');
});
