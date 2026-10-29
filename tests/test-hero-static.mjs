import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
const root = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const bundled = readFileSync(new URL('../public/index.html', import.meta.url), 'utf8');
test('GitHub Pages and Next.js publish the same front page', () => {
  assert.equal(root, bundled);
});
test('front page is a hero-only experience with native navigational links', () => {
  assert.equal((root.match(/<main\b/g) ?? []).length, 1);
  assert.equal((root.match(/<section\b/g) ?? []).length, 1);
  assert.equal((root.match(/<h1\b/g) ?? []).length, 1);
  assert.match(root, /aria-label="Navegación principal"/);
  assert.match(root, /id="contenido"/);
  assert.match(root, /prefers-reduced-motion:reduce/);
  for (const area of ['orientacion.html', 'programas.html', 'empleo.html', 'recursos.html', 'proyecto.html']) {
    assert.ok(existsSync(new URL('../' + area, import.meta.url)), area + ' must exist independently');
    assert.match(root, new RegExp('href="\\./' + area.replace('.', '\\.') + '"'));
  }
  assert.ok(existsSync(new URL('../campus/index.html', import.meta.url)));
});
test('editorial area styles are bundled with the site', () => {
  const css = readFileSync(new URL('../assets/brand.css', import.meta.url), 'utf8');
  const publicCss = readFileSync(new URL('../public/assets/brand.css', import.meta.url), 'utf8');
  assert.equal(css, publicCss);
  assert.match(css, /\.page-hero\{[^}]*min-height:/);
  assert.match(css, /@media \(prefers-reduced-motion:reduce\)/);
});
