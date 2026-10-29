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
  const response = await request(check.path);
  if (check.redirect) {
    assert.ok(response.status >= 300 && response.status < 400, check.path + ' must redirect, got ' + response.status);
    const redirect = response.headers.get('location');
    assert.equal(new URL(redirect, ORIGIN).pathname, check.redirect, check.path + ' redirect destination');
  } else {
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
