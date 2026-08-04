import { cpSync, existsSync, mkdirSync } from 'node:fs';

const staticSource = '.next/static';
const staticTarget = '.next/standalone/.next/static';
const publicSource = 'public';
const publicTarget = '.next/standalone/public';

if (!existsSync('.next/standalone')) {
  console.log('Default Next.js output detected; standalone asset copy skipped');
  process.exit(0);
}

mkdirSync('.next/standalone/.next', { recursive: true });
cpSync(staticSource, staticTarget, { recursive: true });
cpSync(publicSource, publicTarget, { recursive: true });

console.log('Standalone assets copied');
