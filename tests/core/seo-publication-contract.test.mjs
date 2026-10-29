import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Runs in the existing offline, mandatory core test suite.
const root = fileURLToPath(new URL('../../', import.meta.url));
const read = path => readFileSync(join(root, path), 'utf8');

test('robots points to the same configured Next.js origin as sitemap, not historical Pages', () => {
  const robots = read('src/app/robots.ts');
  const sitemap = read('src/app/sitemap.ts');
  assert.match(robots, /import \{ SITE_URL \} from ["']@\/lib\/site-url["']/);
  assert.match(sitemap, /import \{ SITE_URL \} from ["']@\/lib\/site-url["']/);
  assert.match(robots, /new URL\("\/sitemap\.xml", SITE_URL\)/);
  assert.doesNotMatch(robots, /github\.io|\/_next\/|\/static\//);
  assert.match(robots, /disallow: \["\/api\/"\]/);
});

test('localized home owns canonical and hreflang; subroutes do not inherit home metadata', () => {
  const home = read('src/app/[locale]/page.tsx');
  const localeLayout = read('src/app/[locale]/layout.tsx');
  const globalLayout = read('src/app/layout.tsx');
  assert.match(home, /canonical:\s*`/);
  assert.match(home, /languages:\s*Object\.fromEntries\(/);
  assert.match(home, /url:\s*`\$\{SITE_URL\}/);
  assert.match(home, /import \{ SITE_URL \} from ["']@\/lib\/site-url["']/);
  assert.doesNotMatch(localeLayout, /alternates:/);
  assert.doesNotMatch(globalLayout, /canonical:\s*["']\/["']/);
  assert.doesNotMatch(globalLayout, /SearchAction|search_term_string/);
  assert.doesNotMatch(globalLayout, /url:\s*SITE_URL,\s*siteName:/);
});

test('every advertised sitemap section has a real Next.js localized page route', () => {
  const source = read('src/app/sitemap.ts');
  const sections = [...source.matchAll(/\{\s*path:\s*"([^"]*)"/g)].map(match => match[1]);
  assert.equal(sections.length, 11, 'all 11 verified site sections must be listed');
  assert.equal(new Set(sections).size, sections.length, 'no duplicate sections');
  for (const section of sections) {
    const name = section.replace(/^\//, '');
    if (!name) {
      assert.ok(existsSync(join(root, 'src/app/[locale]/page.tsx')));
    } else {
      assert.ok(
        existsSync(join(root, 'src/app/[locale]/(sections)', name, 'page.tsx')) ||
        existsSync(join(root, 'src/app/[locale]', name, 'page.tsx')),
        `Sitemap would publish a nonexistent route: /[locale]${section}`
      );
    }
  }
  assert.doesNotMatch(source, /lastModified:\s*new Date\(/);
});

test('sitemap derives all supported locales from the canonical language registry', () => {
  const sitemap = read('src/app/sitemap.ts');
  const languages = read('src/i18n/languages.ts');
  assert.match(sitemap, /import \{ LANGUAGES \} from ['"]@\/i18n\/languages['"]/);
  assert.match(sitemap, /const LOCALES = LANGUAGES\.map\(\(language\) => language\.code\)/);
  assert.match(languages, /export const LANGUAGE_COUNT = LANGUAGES\.length/);
  assert.doesNotMatch(sitemap, /const LOCALES = \[/, 'locale lists must not go stale');
});
