import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const PAGINAS = [
  { path: '/privacidad', h1: 'Aviso de privacidad', texto: 'TendIA no presta dinero.' },
  {
    path: '/tratamiento-de-datos',
    h1: 'Política de tratamiento de datos personales',
    texto: 'Ley 1581 de 2012',
  },
];

for (const p of PAGINAS) {
  test.describe(p.path, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(p.path);
    });

    test('muestra el documento con su aviso de borrador', async ({ page }) => {
      await expect(page.locator('h1')).toHaveText(p.h1);
      await expect(page.locator('main')).toContainText(p.texto);
      await expect(page.locator('main blockquote')).toContainText(
        'Borrador para revisión jurídica',
      );
    });

    test('cero violaciones de accesibilidad', async ({ page }) => {
      const r = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
        .analyze();
      expect(r.violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
    });

    test('sin scroll horizontal', async ({ page }) => {
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  });
}

test('el footer lleva a las páginas legales y entre ellas se enlazan', async ({ page }) => {
  await page.goto('/');
  await page.locator('footer').getByRole('link', { name: 'Aviso de privacidad' }).click();
  await expect(page).toHaveURL(/\/privacidad$/);
  // The notice links to the full policy, which used to live on GitHub.
  await page
    .locator('main')
    .getByRole('link', { name: 'Política de tratamiento de datos personales' })
    .first()
    .click();
  await expect(page).toHaveURL(/\/tratamiento-de-datos$/);
  await expect(page.locator('h1')).toHaveText('Política de tratamiento de datos personales');
});

test('el menú de una página legal vuelve a las secciones de la portada', async ({ page }) => {
  await page.goto('/privacidad');
  await expect(page.locator('a[href="/#como-funciona"]').first()).toBeAttached();
});

test('las listas de la política conservan su numeración', async ({ page }) => {
  await page.goto('/tratamiento-de-datos');
  const estilo = await page
    .locator('main ol')
    .first()
    .evaluate((el) => getComputedStyle(el).listStyleType);
  expect(estilo).toBe('decimal');
});
