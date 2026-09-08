import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const nextBin = ['node_modules', 'next', 'dist', 'bin', 'next'].join('/');

function run(args) {
  const result = spawnSync(process.execPath, args, {
    stdio: 'inherit',
    env: process.env,
  });
  if (result.status !== 0) {
    console.error(`build: paso falló (${args.join(' ')}) con código ${result.status}`);
    process.exit(result.status ?? 1);
  }
}

run(['scripts/generate-pwa-icons.mjs']);
run(['scripts/generate-offline-assistants.mjs']);

if (!existsSync(nextBin)) {
  console.error('build: no se encontró next en node_modules');
  process.exit(1);
}
run([nextBin, 'build', '--webpack']);

run(['scripts/copy-build.mjs']);
