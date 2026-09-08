import { readdirSync, statSync } from 'node:fs';
import { join, relative, extname } from 'node:path';

const PUBLIC_DIR = join(process.cwd(), 'public');

const LIMITS = {
  '.png': 300 * 1024,
  '.jpg': 300 * 1024,
  '.jpeg': 300 * 1024,
  '.webp': 300 * 1024,
  '.svg': 100 * 1024,
  '.ico': 150 * 1024,
};

const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const IMAGE_EXTS = new Set(Object.keys(LIMITS));

const errors = [];
const warnings = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      walk(full);
      continue;
    }
    const ext = extname(entry).toLowerCase();
    if (!IMAGE_EXTS.has(ext)) continue;

    const rel = relative(PUBLIC_DIR, full);
    const base = entry.slice(0, -ext.length);

    if (!KEBAB.test(base)) {
      warnings.push(`naming (no kebab-case): ${rel}`);
    }
    if (st.size > LIMITS[ext]) {
      errors.push(`too big (${(st.size / 1024).toFixed(0)} KB > ${LIMITS[ext] / 1024} KB): ${rel}`);
    } else if (st.size > 150 * 1024 && ext !== '.svg') {
      warnings.push(`heavy (${(st.size / 1024).toFixed(0)} KB): ${rel}`);
    }
  }
}

walk(PUBLIC_DIR);

for (const w of warnings) console.warn(`WARN  ${w}`);
for (const e of errors) console.error(`ERROR ${e}`);

console.log(`\nlint-assets: ${errors.length} errores, ${warnings.length} avisos`);
if (errors.length > 0) process.exit(1);
