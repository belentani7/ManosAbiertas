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
  await expect(page.locator('[data-plan-link]')).toHaveAttribute('href', './taller-documentos.html');
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

test('programmes link to real published learning material', async ({ page }) => {
  await page.goto('/index.html');
  await page.getByRole('link', { name: 'Explorar programas' }).click();
  await expect(page).toHaveURL(/\/programas\.html$/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const workshop = page.getByRole('link', { name: /Iniciar taller/ }).first();
  await expect(workshop).toHaveAttribute('href', './taller-documentos.html');
  await workshop.click();
  await expect(page).toHaveURL(/\/taller-documentos\.html$/);
  await expect(page.getByRole('heading', { level: 1, name: /Documentos que abren puertas/i })).toBeVisible();
  // The learner sees the guided HTML workshop, not a raw Markdown syllabus.
});

test('orientation leads to verified public resources without saving personal data', async ({ page }) => {
  await page.goto('/orientacion.html');
  await page.getByRole('radio', { name: /Resolver trámites y encontrar apoyo/i }).check();
  await expect(page.locator('[data-plan-link]')).toHaveAttribute('href', './recursos.html');
  await page.locator('[data-plan-link]').click();
  await expect(page).toHaveURL(/\/recursos\.html$/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('manosabiertas:orientacion:v1'))).toBeNull();
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

test('campus entry opens the real reader, lessons and working quiz on the published assets', async ({ page }) => {
  await page.goto('/campus/index.html');
  await expect(page.getByRole('heading', { level: 1, name: /Educación abierta, sin barreras/i })).toBeVisible();
  const firstCourse = page.locator('a[href="cursos/office-sin-miedo/syllabus.md"]').first();
  await firstCourse.click();
  await expect(page.locator('#lector')).toBeVisible();
  await expect(page.locator('#lector-status')).toContainText('Material real del curso');
  await expect(page.locator('#lector-content')).not.toBeEmpty();
  await expect(page.locator('#quizCurso')).toBeVisible();
  await page.locator('#quizCurso').selectOption('cursos/office-sin-miedo/quiz.json');
  await expect(page.locator('.quiz-titulo')).not.toContainText('Cargando');
  await expect(page.locator('.quiz-box .opciones button').first()).toBeVisible();
  const audio = page.locator('#audio-src');
  await expect(audio).toHaveAttribute('src', 'voces/pt/bienvenida.mp3');
  const audioResponse = await page.request.get('/campus/voces/pt/bienvenida.mp3');
  expect(audioResponse.ok()).toBeTruthy();
});
