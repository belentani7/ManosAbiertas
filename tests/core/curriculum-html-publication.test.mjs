import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { renderCurriculumMarkdown } from '../../scripts/generate-curriculum-html.mjs';

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const HTML_ROOT = join(PROJECT_ROOT, 'public/curriculum-html');
const LANGUAGE_TAGS = { ES: 'es', PT: 'pt', CA: 'ca', EN: 'en' };

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

test('publishes 832 complete lesson pages from the existing translated curriculum', () => {
  assert.ok(existsSync(HTML_ROOT), 'CI must publish the curriculum before running core tests');
  assert.ok(existsSync(join(HTML_ROOT, 'curriculum-pages.css')), 'shared page stylesheet is published');

  const moduleDirectories = readdirSync(HTML_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => existsSync(join(HTML_ROOT, name, 'index-ES.html')));
  assert.equal(moduleDirectories.length, 8, 'all eight existing modules have a language index');

  const lessonPages = moduleDirectories
    .flatMap((moduleDir) => walk(join(HTML_ROOT, moduleDir)))
    .filter((path) => /^nivel-\d{2}-\b(?:ES|PT|CA|EN)\.html$/.test(path.split('/').at(-1)));
  assert.equal(lessonPages.length, 8 * 26 * 4);

  const uniqueBodies = new Set();
  for (const path of lessonPages) {
    const name = path.split('/').at(-1);
    const language = name.match(/-(ES|PT|CA|EN)\.html$/)?.[1];
    const html = readFileSync(path, 'utf8');
    const plainText = html.replace(/<[^>]*>/g, ' ').replace(/&(?:amp|lt|gt|quot|#39);/g, ' ').replace(/\s+/g, ' ').trim();

    assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, name);
    assert.match(html, new RegExp('<html lang="' + LANGUAGE_TAGS[language] + '"'), name);
    assert.match(html, /<meta name="viewport"/, name);
    assert.match(html, /class="skip-link"/, name);
    assert.match(html, /<main id="contenido"/, name);
    assert.match(html, /<div class="lesson-content">[\s\S]*<h[2-6][ >]/, name);
    assert.ok(plainText.length > 500, `${name} must contain a complete lesson, not a placeholder`);
    assert.doesNotMatch(html, /<script\b/i, `${name} must not execute source HTML`);
    assert.match(html, /curriculum-pages\.css/, name);
    uniqueBodies.add(html);

    for (const [, href] of html.matchAll(/\bhref="([^"]+)"/g)) {
      if (/^(?:https?:|mailto:|#|\/)/i.test(href)) {
        if (/^https?:/i.test(href)) {
          assert.match(html, new RegExp('href="' + href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '" target="_blank" rel="noopener noreferrer"'));
        }
        continue;
      }
      const localTarget = resolve(dirname(path), href.split('#', 1)[0]);
      assert.ok(localTarget.startsWith(HTML_ROOT), `${relative(HTML_ROOT, path)} escapes the HTML publication: ${href}`);
      assert.ok(existsSync(localTarget), `${relative(HTML_ROOT, path)} has a broken local link: ${href}`);
    }
  }
  assert.equal(uniqueBodies.size, 832, 'translated lessons remain distinct and do not collapse into duplicate pages');
});

test('publishes navigable module, language and default indexes', () => {
  for (const language of Object.keys(LANGUAGE_TAGS)) {
    const catalog = join(HTML_ROOT, `index-${language}.html`);
    const html = readFileSync(catalog, 'utf8');
    assert.match(html, new RegExp('<html lang="' + LANGUAGE_TAGS[language] + '"'));
    assert.equal((html.match(/<li><a href="[^"]+\/index-[A-Z]{2}\.html"/g) ?? []).length, 8);

    for (const moduleDir of readdirSync(HTML_ROOT, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name)) {
      const moduleIndex = readFileSync(join(HTML_ROOT, moduleDir, `index-${language}.html`), 'utf8');
      const levelNavigation = moduleIndex.match(/<ol class="module-levels">([\s\S]*?)<\/ol>/)?.[1] ?? '';
      assert.equal((levelNavigation.match(/<li><a href="nivel-\d{2}\/nivel-\d{2}-[A-Z]{2}\.html"/g) ?? []).length, 26);
    }
  }

  const defaultIndex = readFileSync(join(HTML_ROOT, 'index.html'), 'utf8');
  assert.match(defaultIndex, /Elige una edición/);
  assert.equal((defaultIndex.match(/href="index-(?:ES|PT|CA|EN)\.html"/g) ?? []).length, 4);
});

test('escapes raw HTML and refuses executable Markdown links', () => {
  const rendered = renderCurriculumMarkdown('<script>alert(1)</script>\n\n[enlace](javascript:alert(1))');
  assert.match(rendered, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.match(rendered, /<p>enlace<\/p>/);
  assert.doesNotMatch(rendered, /<script\b|href="javascript:/i);
});
