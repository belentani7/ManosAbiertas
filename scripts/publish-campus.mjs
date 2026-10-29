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
  console.log('Campus ready: /campus/index.html (lessons, quizzes, offline assets, voices)');
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  publishCampus();
}
