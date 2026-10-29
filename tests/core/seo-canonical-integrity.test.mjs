import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import { SITE_URL, DEFAULT_SITE_URL, resolveSiteUrl } from '../../src/lib/site-url.ts';
import { LANGUAGES, LANGUAGE_COUNT } from '../../src/i18n/languages.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');

test('canonical metadata uses the verified production domain unless a valid origin is configured', () => {
  assert.equal(DEFAULT_SITE_URL, 'https://manos-abiertas-rho.vercel.app');
  assert.equal(resolveSiteUrl(''), DEFAULT_SITE_URL);
  assert.equal(resolveSiteUrl(undefined), SITE_URL);
  assert.equal(resolveSiteUrl('https://campus.example.org/path?x=1#fragment'), 'https://campus.example.org');
  assert.equal(resolveSiteUrl('https://u:p@example.org'), DEFAULT_SITE_URL);
  assert.equal(resolveSiteUrl('javascript:alert(1)'), DEFAULT_SITE_URL);
  assert.equal(resolveSiteUrl('http://example.org'), DEFAULT_SITE_URL);
  assert.equal(resolveSiteUrl('not-a-url'), DEFAULT_SITE_URL);
});

test('metadata, robots, sitemap and localized homes share one canonical source', () => {
  for (const path of ['src/app/layout.tsx', 'src/app/sitemap.ts', 'src/app/robots.ts', 'src/app/[locale]/page.tsx']) {
    const source = read(path);
    assert.match(source, /import \{ SITE_URL \} from ['"]@\/lib\/site-url['"]/);
    assert.doesNotMatch(source, /manosabiertas\.space-z\.ai/);
  }
  const sitemap = read('src/app/sitemap.ts');
  assert.match(sitemap, /LANGUAGES\.map\(\(language\) => language\.code\)/);
  for (const page of ['index.html', 'orientacion.html', 'programas.html', 'empleo.html', 'recursos.html', 'proyecto.html', 'taller-documentos.html', 'taller-criterio-ia.html', 'taller-puente-pt-es.html', 'campus/index.html']) {
    assert.ok(sitemap.includes('"' + page + '"'), 'Missing published page from sitemap: ' + page);
    assert.ok(existsSync(resolve(root, 'public', page)) || page === 'campus/index.html', 'Missing published page: ' + page);
  }
});

test('site identity reuses the real institutional symbol and accurately counts supported locales', () => {
  assert.equal(LANGUAGE_COUNT, LANGUAGES.length);
  assert.equal(new Set(LANGUAGES.map((l) => l.code)).size, LANGUAGE_COUNT);
  assert.ok(LANGUAGE_COUNT >= 35);
  const layout = read('src/app/layout.tsx');
  assert.match(layout, /LANGUAGE_COUNT/);
  assert.match(layout, /LANGUAGES\.map\(\(language\) => language\.code\)/);
  assert.match(layout, /assets\/manos-symbol\.svg/);
  assert.ok(existsSync(resolve(root, 'public/assets/manos-symbol.svg')));
  assert.doesNotMatch(layout, /\b35 idiomas\b/);
  assert.doesNotMatch(layout, /#ff6a1f/);
});
