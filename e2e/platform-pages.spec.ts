import { test, expect } from '@playwright/test';

// These checks exercise files actually served from public/ in four browser profiles.
test('the established institutional homepage leads to reviewed learning routes', async ({ page }) => {
  await page.goto('/index.html');
  await page.getByRole('navigation', { name: 'Navegación principal' })
    .getByRole('link', { name: 'Rutas abiertas' }).click();
  await expect(page).toHaveURL(/\/platform-pages\/21-courses\.html$/);
  await expect(page.getByRole('heading', { level: 1, name: /Tres caminos/i })).toBeVisible();
});

test('reviewed educational home has a single hero and working course navigation', async ({ page }) => {
  await page.goto('/platform-pages/01-home.html');
  await expect(page.getByRole('heading', { level: 1, name: /Aprender abre camino/i })).toBeVisible();
  await expect(page.locator('main section')).toHaveCount(1);
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Saltar al contenido' })).toBeFocused();
  await page.getByRole('link', { name: /Ver los tres cursos disponibles/i }).click();
  await expect(page).toHaveURL(/\/platform-pages\/21-courses\.html$/);
  await expect(page.getByRole('heading', { level: 1, name: /Tres caminos/i })).toBeVisible();
});

test('catalogue deep-link loads a real published course and practice controls', async ({ page }) => {
  await page.goto('/platform-pages/21-courses.html');
  await page.getByRole('link', { name: /Comenzar Office/i }).click();
  await expect(page).toHaveURL(/\/campus\/index\.html\?curso=office-sin-miedo$/);
  await expect(page.locator('#lector')).toBeVisible();
  await expect(page.locator('#lector-status')).toContainText('Material real del curso');
  await expect(page.locator('#lector-content')).not.toBeEmpty();
  await expect(page.locator('#lector-nav a[aria-current="page"]')).toHaveText('Programa');
  await page.locator('#lector-nav a').filter({ hasText: 'Cuestionario' }).click();
  await expect(page.locator('#quizCurso')).toHaveValue('cursos/office-sin-miedo/quiz.json');
});

test('unimplemented payment screens are not deployed under the public institutional path', async ({ request }) => {
  const released = await request.get('/platform-pages/84-quiz.html');
  expect(released.ok()).toBeTruthy();
  const fictional = await request.get('/platform-pages/57-payments.html');
  expect(fictional.status()).toBe(404);
});
