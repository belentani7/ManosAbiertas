/**
 * Exercise the built Next.js app, not merely the static Playwright server.
 * No credentials, external calls, database writes or fixtures are required.
 * Run after `pnpm build` with `PORT=3000 pnpm start` listening locally.
 */
import assert from 'node:assert/strict';

const ORIGIN = process.env.SMOKE_ORIGIN || 'http://127.0.0.1:3000';
const checks = [
  { path: '/', redirect: '/index.html' },
  { path: '/campus/', redirect: '/campus/index.html' },
  { path: '/index.html', marker: 'MANOS' },
  { path: '/orientacion.html', marker: 'Orientación' },
  { path: '/programas.html', marker: 'Programas' },
  { path: '/taller-documentos.html', marker: 'documentos' },
  { path: '/es', marker: '<html' },
  { path: '/pt', marker: '<html' },
  { path: '/es/cursos', marker: '<html' },
  { path: '/campus/index.html', marker: 'id="lector"' },
  { path: '/campus/course-viewer.mjs', marker: 'function' },
  { path: '/campus/cursos/office-sin-miedo/syllabus.md', marker: '#' },
  { path: '/sitemap.xml', marker: '/es' },
  { path: '/robots.txt', marker: '/sitemap.xml' },
];

async function request(path, options = {}) {
  const url = new URL(path, ORIGIN);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    return await fetch(url, { redirect: 'manual', cache: 'no-store', signal: controller.signal, ...options });
  } finally {
    clearTimeout(timeout);
  }
}

for (const check of checks) {
  if (check.redirect) {
    // Next.js first normalizes trailing slashes (308) and the route then
    // redirects (307). Verify the actual learner destination, not just hop 1.
    let path = check.path;
    let redirects = 0;
    while (redirects < 4) {
      const response = await request(path);
      if (response.status < 300 || response.status >= 400) {
        assert.equal(response.status, 200, path + ' returned HTTP ' + response.status);
        break;
      }
      const location = response.headers.get('location');
      assert.ok(location, 'missing Location header for ' + path);
      const target = new URL(location, ORIGIN);
      const expectedOrigin = new URL(ORIGIN);
      const localHosts = new Set(['127.0.0.1', 'localhost', '0.0.0.0']);
      assert.ok(
        target.protocol === expectedOrigin.protocol &&
        target.port === expectedOrigin.port &&
        localHosts.has(target.hostname) &&
        localHosts.has(expectedOrigin.hostname),
        'redirect must remain on the same local production test server'
      );
      path = target.pathname;
      redirects += 1;
    }
    assert.ok(redirects >= 1 && redirects < 4, check.path + ' must terminate after a bounded redirect chain');
    assert.equal(path, check.redirect, check.path + ' final learner destination');
  } else {
    const response = await request(check.path);
    assert.equal(response.status, 200, check.path + ' returned HTTP ' + response.status);
    const text = await response.text();
    assert.ok(text.includes(check.marker), check.path + ' missing expected page content ' + check.marker);
  }
  console.log('PASS', check.path);
}

const quiz = await request('/campus/cursos/office-sin-miedo/quiz.json');
assert.equal(quiz.status, 200, 'quiz must be served from the actual Next deployment');
const questions = await quiz.json();
assert.ok(Array.isArray(questions) && questions.length >= 3, 'published quiz needs real questions');
const audio = await request('/campus/voces/pt/bienvenida.mp3');
assert.equal(audio.status, 200, 'Portuguese welcome audio unavailable');
assert.ok((await audio.arrayBuffer()).byteLength > 200, 'audio cannot be empty');
console.log('PASS quiz JSON and Portuguese MP3');

const robots = await (await request('/robots.txt')).text();
const sitemap = await (await request('/sitemap.xml')).text();
assert.ok(robots.includes('sitemap.xml'));
assert.ok(sitemap.includes('/pt') && sitemap.includes('/es'));
console.log('Production smoke checks passed:', checks.length + 2);
