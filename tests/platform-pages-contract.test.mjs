import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pages = [
  '01-home.html', '09-accessibility.html', '11-help.html',
  '16-privacy.html', '18-safety.html', '21-courses.html',
  '25-category-legal.html', '28-course-detail.html',
  '41-login.html', '42-register.html', '60-dashboard.html',
  '80-lesson.html', '84-quiz.html',
];
const knownSlugs = ['alfabetizacion-ia', 'office-sin-miedo', 'falsos-amigos-pt-es'];
const read = (path) => readFileSync(join(root, path), 'utf8');

test('the home is an accessible immersive hero, not a repeated multi-card placeholder', () => {
  const home = read('platform-pages/01-home.html');
  assert.match(home, /<main id="contenido">/);
  assert.match(home, /href="#contenido"/);
  assert.match(home, /class="hero hero-home"/);
  assert.equal((home.match(/<section\b/g) || []).length, 1);
  assert.match(home, /campus\/index\.html#cursos/);
  assert.doesNotMatch(home, /Qué encontrarás aquí/);
});

test('thirteen high-priority pages have unique content, real destinations and a single page heading', () => {
  const bodies = [];
  for (const page of pages) {
    const html = read('platform-pages/' + page);
    assert.match(html, /<html lang="es">/);
    assert.match(html, /<meta name="description"/);
    assert.match(html, /href="#contenido"/);
    assert.match(html, /<main id="contenido">/);
    assert.equal((html.match(/<h1\b/g) || []).length, 1, page);
    assert.match(html, /platform\.css/);
    const mainContent = html.split('<main id="contenido">')[1]?.split('</main>')[0];
    assert.ok(mainContent && mainContent.length > 450, 'real content: ' + page);
    bodies.push(mainContent);
    for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
      if (href.startsWith('#') || /^[a-z]+:/i.test(href)) continue;
      const url = new URL(href, 'https://example.org/platform-pages/' + page);
      assert.equal(url.origin, 'https://example.org', 'same-origin link: ' + page);
      assert.ok(existsSync(join(root, decodeURIComponent(url.pathname).slice(1))), 'broken link: ' + page + ' => ' + href);
    }
  }
  assert.equal(new Set(bodies).size, bodies.length, 'no identical pages');
});

test('course catalogue links to all three real curricula and a safe validated reader', () => {
  const catalogue = read('platform-pages/21-courses.html');
  const reader = read('campus/course-viewer.mjs');
  assert.match(reader, /new URLSearchParams\(window\.location\.search\)\.get\('curso'\)/);
  assert.match(reader, /Object\.prototype\.hasOwnProperty\.call\(catalogs, selectedCourse\)/);
  for (const slug of knownSlugs) {
    assert.ok(catalogue.includes('curso=' + slug), 'missing deep link: ' + slug);
    assert.ok(existsSync(join(root, 'campus/cursos', slug, 'syllabus.md')), 'missing syllabus: ' + slug);
    assert.ok(existsSync(join(root, 'campus/cursos', slug, 'quiz.json')), 'missing practice: ' + slug);
  }
});

test('account and assessment pages do not present fabricated authentication or certification', () => {
  for (const page of ['41-login.html', '42-register.html']) {
    const html = read('platform-pages/' + page);
    assert.doesNotMatch(html, /<input[^>]+type="password"/);
    assert.doesNotMatch(html, /<form\b/);
    assert.match(html, /sin (cuenta|registrarte|crear una cuenta|registro)/i);
  }
  const quiz = read('platform-pages/84-quiz.html');
  assert.match(quiz, /campus\/index\.html#quiz/);
  assert.match(quiz, /no crean certificados|no crea certificados|no crean certificados/i);
});

test('shared design supports accessible focus, reduced motion and narrow viewports', () => {
  const css = read('platform-pages/platform.css');
  for (const token of [':focus-visible', '.skip-link:focus', '@media(prefers-reduced-motion:reduce)', '@media(max-width:800px)']) {
    assert.ok(css.includes(token), 'missing ' + token);
  }
});

test('official-resource guidance discloses its scope and avoids fictional services', () => {
  const legal = read('platform-pages/25-category-legal.html');
  const privacy = read('platform-pages/16-privacy.html');
  const access = read('platform-pages/09-accessibility.html');
  const safety = read('platform-pages/18-safety.html');
  assert.match(legal, /inclusion\.gob\.es/);
  assert.match(privacy, /aepd\.es/);
  assert.match(privacy, /No constituye una política de privacidad completa/);
  assert.match(access, /WCAG 2\.2 AA/);
  assert.match(safety, /portal oficial de Migraciones/);
});
