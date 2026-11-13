import { expect, test } from '@playwright/test';

// Content added from the final main repo: every figure must stay consistent and sourced.

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('el desglose del puntaje suma exacto', async ({ page }) => {
  // textContent, not innerText: content-visibility leaves off-screen sections unrendered.
  const filas = page.locator('.td-breakdown tbody tr');
  const puntos = await filas.locator('.td-breakdown__pts').allTextContents();
  const n = puntos.map((t) => Number(t.replace('−', '-').replace('+', '').replace(',', '.')));
  const suma = n.reduce((a, b) => a + b, 0);
  const total = Number(await page.locator('.td-breakdown tfoot .td-breakdown__pts').textContent());
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

test('cada persona del equipo tiene su foto', async ({ page }) => {
  const fotos = page.locator('#equipo img.td-person__photo');
  await expect(fotos).toHaveCount(6);
  await page.locator('#equipo').scrollIntoViewIfNeeded();
  for (const img of await fotos.all()) {
    await expect
      // The image optimizer's first (cold) request can take a few seconds.
      .poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0), {
        timeout: 15_000,
      })
      .toBe(true);
  }
});

// The sections use content-visibility: an anchor jump must still land right under the 72px bar.
test('los enlaces del menú dejan la sección justo debajo de la barra', async ({ page }) => {
  // Like a visitor: the page and its font have loaded before the first tap.
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => document.fonts.ready);
  const menu = page.locator('.td-nav__menu');
  for (const id of ['puntaje', 'precios', 'pruebalo', 'preguntas']) {
    await page.evaluate(() => window.scrollTo(0, 0));
    if (await menu.isVisible()) {
      await menu.locator('summary').click();
      await menu.locator(`a[href="/#${id}"]`).click();
    } else {
      await page.locator(`nav[aria-label="Principal"] a[href="/#${id}"]`).click();
    }
    await expect
      .poll(
        () =>
          page.evaluate(
            (id) => Math.round(document.getElementById(id)!.getBoundingClientRect().top),
            id,
          ),
        { message: `#${id}` },
      )
      .toBe(72);
  }
});

test('el menú del celular se cierra al tocar un enlace', async ({ page }) => {
  const menu = page.locator('.td-nav__menu');
  test.skip(!(await menu.isVisible()), 'Solo en pantallas angostas');
  await menu.locator('summary').click();
  await menu.locator('a[href="/#precios"]').click();
  await expect(menu).not.toHaveAttribute('open', '');
  await expect(menu.locator('.td-menu__panel')).toBeHidden();
});
