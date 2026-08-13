import { createWriteStream } from 'node:fs';
import { spawn } from 'node:child_process';

const log = createWriteStream('server.log', { flags: 'a' });
const server = spawn(process.execPath, ['.next/standalone/server.js'], {
  env: { ...process.env, NODE_ENV: 'production' },
  stdio: ['inherit', 'pipe', 'pipe'],
});

server.stdout.pipe(process.stdout);
server.stderr.pipe(process.stderr);
server.stdout.pipe(log);
server.stderr.pipe(log);

server.on('exit', (code, signal) => {
  log.end();
  process.exit(code ?? (signal ? 1 : 0));
});
