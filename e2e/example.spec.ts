import { test, expect } from '@playwright/test';

// End-to-end journeys for the REAL institutional site in public/.
// No placeholder Vite counter, invented backend or external network dependency.
test('institutional homepage offers a working first step and keyboard entry', async ({ page }) => {
  await page.goto('/index.html');
  await expect(page).toHaveTitle(/Educación gratuita para avanzar/);
  await expect(page.getByRole('heading', { level: 1, name: /El futuro se construye paso a paso/i })).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Saltar al contenido' })).toBeFocused();
  await page.getByRole('link', { name: /Encuentra tu primer paso/ }).click();
  await expect(page).toHaveURL(/\/orientacion\.html$/);
  await expect(page.getByRole('heading', { level: 1, name: /Una dirección clara/i })).toBeVisible();
});

test('orientation changes the plan but only remembers it with consent', async ({ page }) => {
  await page.goto('/orientacion.html');
  await page.getByRole('radio', { name: /Aprender herramientas digitales/i }).check();
  await expect(page.locator('[data-plan-title]')).toHaveText('Tu primera ruta de autonomía digital');
  await expect(page.locator('[data-plan-link]')).toHaveAttribute('href', './campus/');
  const key = 'manosabiertas:orientacion:v1';
  expect(await page.evaluate(keyName => localStorage.getItem(keyName), key)).toBeNull();

  const remember = page.getByRole('checkbox', { name: /Recordar mi elección/i });
  await remember.check();
  expect(await page.evaluate(keyName => localStorage.getItem(keyName), key)).toBe('digital');
  await page.reload();
  await expect(page.getByRole('radio', { name: /Aprender herramientas digitales/i })).toBeChecked();
  await remember.uncheck();
  expect(await page.evaluate(keyName => localStorage.getItem(keyName), key)).toBeNull();
});

test('programmes and campus entry points load real content', async ({ page }) => {
  await page.goto('/index.html');
  await page.getByRole('link', { name: 'Explorar programas' }).click();
  await expect(page).toHaveURL(/\/programas\.html$/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.getByRole('navigation', { name: 'Navegación principal' })
    .getByRole('link', { name: /Abrir campus/ }).click();
  await expect(page).toHaveURL(/\/campus\/?$/);
  await expect(page.locator('main, #main, #contenido').first()).toBeVisible();
});

test('resource filters update their visible count', async ({ page }) => {
  await page.goto('/recursos.html');
  const filter = page.locator('[data-resource-filter]');
  await expect(filter).toBeVisible();
  await filter.selectOption('empleo');
  const visible = await page.locator('[data-resource-kind]:visible').count();
  expect(visible).toBeGreaterThan(0);
  await expect(page.locator('[data-resource-count]')).toHaveText(visible + ' recursos visibles');
  await filter.selectOption('todos');
  const all = await page.locator('[data-resource-kind]:visible').count();
  expect(all).toBeGreaterThanOrEqual(visible);
});

test('mobile menu exposes navigation and closes after choosing a destination', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chromium', 'Mobile-only interaction');
  await page.goto('/index.html');
  const menu = page.getByRole('button', { name: /Menú/ });
  const nav = page.getByRole('navigation', { name: 'Navegación principal' });
  await expect(menu).toBeVisible();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await expect(nav).toBeVisible();
  await nav.getByRole('link', { name: 'Recursos', exact: true }).click();
  await expect(page).toHaveURL(/\/recursos\.html$/);
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
});
