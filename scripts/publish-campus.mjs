/**
 * Make the existing campus available to Next.js as /campus/index.html.
 * GitHub Pages continues using campus/ directly. No duplicate curriculum source
 * is committed: public/campus/ is produced at build time.
 */
import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const CAMPUS_FILES = Object.freeze([
  'index.html', 'tokens.css', 'app.js', 'course-core.mjs',
  'course-viewer.mjs', 'sw.js', 'manifest.webmanifest',
]);
export const CAMPUS_DIRECTORIES = Object.freeze(['cursos', 'voces']);

//
// Publish only the educational pages with real, reviewed content.
// The other architectural HTML drafts are intentionally excluded: they must not
// be presented as functioning enrollment, payments or administration screens.
//
export const RELEASED_PLATFORM_PAGES = Object.freeze([
  '01-home.html', '09-accessibility.html', '11-help.html',
  '16-privacy.html', '18-safety.html', '21-courses.html',
  '25-category-legal.html', '28-course-detail.html',
  '41-login.html', '42-register.html', '60-dashboard.html',
  '80-lesson.html', '84-quiz.html',
  'platform.css',
]);

export function publishPlatformPages(root = resolve(dirname(fileURLToPath(import.meta.url)), '..')) {
  const source = join(root, 'platform-pages');
  const target = join(root, 'public', 'platform-pages');
  for (const file of RELEASED_PLATFORM_PAGES) {
    const from = join(source, file);
    if (!existsSync(from)) throw Error('Missing reviewed institutional page: ' + file);
    mkdirSync(target, { recursive: true });
    cpSync(from, join(target, file), { force: true });
  }
  console.log('Reviewed educational pages ready: /platform-pages/ (draft-only screens excluded)');
}

export function publishCampus(root = resolve(dirname(fileURLToPath(import.meta.url)), '..')) {
  const source = join(root, 'campus');
  const target = join(root, 'public', 'campus');
  for (const file of CAMPUS_FILES) {
    const from = join(source, file);
    if (!existsSync(from)) throw Error('Missing required campus asset: ' + file);
    mkdirSync(dirname(join(target, file)), { recursive: true });
    cpSync(from, join(target, file), { force: true });
  }
  for (const dir of CAMPUS_DIRECTORIES) {
    const from = join(source, dir);
    if (!existsSync(from)) throw Error('Missing required campus directory: ' + dir);
    cpSync(from, join(target, dir), { recursive: true, force: true });
  }
  publishPlatformPages(root);
  console.log('Campus ready: /campus/index.html (lessons, quizzes, offline assets, voices)');
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  publishCampus();
}
