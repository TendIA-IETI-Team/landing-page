import { expect, test } from '@playwright/test';

// Content added from the final main repo: every figure must stay consistent and sourced.

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('el desglose del puntaje suma exacto', async ({ page }) => {
  const filas = page.locator('.td-breakdown tbody tr');
  const puntos = await filas.locator('.td-breakdown__pts').allInnerTexts();
  const n = puntos.map((t) => Number(t.replace('−', '-').replace('+', '').replace(',', '.')));
  const suma = n.reduce((a, b) => a + b, 0);
  const total = Number(await page.locator('.td-breakdown tfoot .td-breakdown__pts').innerText());
  expect(Math.round(suma)).toBe(total);
  // The score card shows the same score.
  await expect(page.locator('#puntaje .td-score__num')).toHaveText(String(total));
});

test('la gráfica de tasas trae sus valores escritos y su fuente', async ({ page }) => {
  const grafica = page.locator('#problema figure');
  await expect(grafica).toContainText('61,9 %');
  await expect(grafica).toContainText('382 % a 666 %');
  await expect(grafica).toContainText('Entre 6 y 11 veces');
  await expect(grafica.getByRole('link', { name: 'Superintendencia Financiera' })).toBeVisible();
});

test('los precios dicen que el tendero nunca paga', async ({ page }) => {
  const precios = page.locator('#precios');
  await expect(precios).toContainText('El tendero nunca paga');
  await expect(precios).toContainText('$1.800.000');
  await expect(precios).toContainText('$3.500');
});

test('los celulares de demostración llevan a la app', async ({ page }) => {
  const seccion = page.locator('#pruebalo');
  await expect(seccion.locator('.td-phones li')).toHaveCount(4);
  await expect(seccion.getByRole('link', { name: 'Abrir la app' })).toHaveAttribute(
    'href',
    'https://tendia-app.vercel.app/app',
  );
});

test('las preguntas se abren y tienen datos estructurados', async ({ page }) => {
  const primera = page.locator('#preguntas details').first();
  await primera.locator('summary').click();
  await expect(primera.locator('p')).toBeVisible();
  const ld = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ?? '{}',
  );
  expect(ld['@type']).toBe('FAQPage');
  expect(ld.mainEntity.length).toBe(await page.locator('#preguntas details').count());
});

test('el equipo y el menú', async ({ page }) => {
  await expect(page.locator('#equipo li')).toHaveCount(6);
  for (const id of ['como-funciona', 'puntaje', 'precios', 'pruebalo', 'preguntas', 'equipo']) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
});
