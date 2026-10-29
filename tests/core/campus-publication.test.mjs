import test from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { publishCampus, CAMPUS_FILES, CAMPUS_DIRECTORIES } from '../../scripts/publish-campus.mjs';

const project = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

test('campus publication generates the complete, canonical browser assets without committed duplicates', (t) => {
  const temp = mkdtempSync(join(tmpdir(), 'manos-campus-publish-'));
  t.after(() => rmSync(temp, { recursive: true, force: true }));
  cpSync(join(project, 'campus'), join(temp, 'campus'), { recursive: true });

  const stale = join(temp, 'public', 'campus', 'cursos', 'office-sin-miedo', 'syllabus.md');
  mkdirSync(dirname(stale), { recursive: true });
  writeFileSync(stale, 'STALE COPY');
  publishCampus(temp);
  for (const file of CAMPUS_FILES) {
    assert.deepEqual(readFileSync(join(temp, 'public/campus', file)), readFileSync(join(project, 'campus', file)), file);
  }
  for (const dir of CAMPUS_DIRECTORIES) assert.ok(existsSync(join(temp, 'public/campus', dir)), dir);
  assert.deepEqual(readFileSync(stale), readFileSync(join(project, 'campus/cursos/office-sin-miedo/syllabus.md')));

  for (const slug of ['alfabetizacion-ia', 'office-sin-miedo', 'falsos-amigos-pt-es']) {
    for (const file of ['syllabus.md', 'quiz.json', 'recursos.md', 'semana-01.md']) {
      const relative = 'cursos/' + slug + '/' + file;
      assert.deepEqual(readFileSync(join(temp, 'public/campus', relative)), readFileSync(join(project, 'campus', relative)), relative);
    }
  }
  for (const locale of ['es', 'pt', 'en', 'ca']) {
    const relative = 'voces/' + locale + '/bienvenida.mp3';
    assert.deepEqual(readFileSync(join(temp, 'public/campus', relative)), readFileSync(join(project, 'campus', relative)), relative);
  }
  assert.equal(existsSync(join(temp, 'public/campus/agente')), false, 'Do not export agent internals');
});

test('Next.js production builds the campus and redirects the campus entry to its own reader', () => {
  const pkg = JSON.parse(readFileSync(join(project, 'package.json'), 'utf8'));
  assert.ok(pkg.scripts.build.includes('node scripts/publish-campus.mjs && prisma generate && next build'));
  const route = readFileSync(join(project, 'src/app/campus/route.ts'), 'utf8');
  assert.ok(route.includes("new URL('/campus/index.html'"));
  const manifest = JSON.parse(readFileSync(join(project, 'campus/manifest.webmanifest'), 'utf8'));
  assert.equal(manifest.start_url, './index.html');
});
