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


test('each educational subject has an independently deployable HTML document', () => {
  const catalog = readFileSync(new URL('../programas.html', import.meta.url), 'utf8');
  assert.equal(catalog, readFileSync(new URL('../public/programas.html', import.meta.url), 'utf8'));
  const pages = [
    ['ofimatica.html', 'taller-documentos.html'],
    ['inteligencia-artificial.html', 'taller-criterio-ia.html'],
    ['idiomas.html', 'taller-puente-pt-es.html'],
  ];
  for (const [name, workshop] of pages) {
    const file = new URL('../' + name, import.meta.url);
    assert.ok(existsSync(file), name);
    const html = readFileSync(file, 'utf8');
    assert.equal(html, readFileSync(new URL('../public/' + name, import.meta.url), 'utf8'));
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
    assert.match(html, /<main id="contenido" tabindex="-1">/);
    assert.match(html, /class="skip-link" href="#contenido"/);
    assert.match(html, /<details><summary>/);
    assert.match(html, new RegExp(workshop.replace('.', '\\.')));
    assert.match(catalog, new RegExp('href="\\./' + name.replace('.', '\\.') + '"'));
  }
});
