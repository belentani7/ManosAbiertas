import { spawn } from 'node:child_process';
import { access } from 'node:fs/promises';
import { createServer } from 'node:net';
import path from 'node:path';

const host = '127.0.0.1';
const serverEntry = path.join(process.cwd(), '.next', 'standalone', 'server.js');
const routes = [
  { path: '/es', type: 'text/html', contains: 'Manos Abiertas' },
  { path: '/es/cv', type: 'text/html' },
  { path: '/es/cursos', type: 'text/html' },
  { path: '/es/ia', type: 'text/html' },
  { path: '/academy', type: 'text/html', contains: 'Academia Abierta' },
  { path: '/api/health', type: 'application/json', contains: '"ok":true' },
  { path: '/manifest.json', type: 'application/json', contains: 'Manos Abiertas' },
  { path: '/sw.js', type: 'javascript', contains: 'CACHE_NAME' },
  { path: '/ecosystem.html', type: 'text/html', contains: 'NOIACORE / BELENTANI' },
  { path: '/offline-assistants/es/cv.html', type: 'text/html', contains: 'Asistente local' },
];

function openPort() {
  return new Promise((resolve, reject) => {
    const probe = createServer();
    probe.unref();
    probe.once('error', reject);
    probe.listen(0, host, () => {
      const address = probe.address();
      if (!address || typeof address === 'string') {
        probe.close();
        reject(new Error('No se pudo asignar un puerto para el smoke test.'));
        return;
      }
      probe.close((error) => error ? reject(error) : resolve(address.port));
    });
  });
}

function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function request(url, timeout = 10_000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    return await fetch(url, { signal: controller.signal, redirect: 'error' });
  } finally {
    clearTimeout(timer);
  }
}

async function stop(child) {
  if (child.exitCode !== null || child.signalCode !== null) return;
  child.kill('SIGTERM');
  const exited = new Promise((resolve) => child.once('exit', resolve));
  const timedOut = await Promise.race([
    exited.then(() => false),
    delay(5_000).then(() => true),
  ]);
  if (timedOut && child.exitCode === null) {
    child.kill('SIGKILL');
    await exited;
  }
}

await access(serverEntry);
const port = await openPort();
const baseUrl = `http://${host}:${port}`;
let serverOutput = '';
const child = spawn(process.execPath, [serverEntry], {
  cwd: process.cwd(),
  env: { ...process.env, HOSTNAME: host, NODE_ENV: 'production', PORT: String(port) },
  stdio: ['ignore', 'pipe', 'pipe'],
  windowsHide: true,
});

for (const stream of [child.stdout, child.stderr]) {
  stream.on('data', (chunk) => {
    serverOutput = `${serverOutput}${chunk}`.slice(-8_000);
  });
}

try {
  const deadline = Date.now() + 45_000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`El servidor termino antes del smoke test.\n${serverOutput}`);
    }
    try {
      const response = await request(`${baseUrl}/es`, 2_000);
      if (response.ok) break;
    } catch {
      // The production server is still starting.
    }
    await delay(250);
  }

  if (Date.now() >= deadline) {
    throw new Error(`El servidor no quedo listo en 45 segundos.\n${serverOutput}`);
  }

  for (const route of routes) {
    const response = await request(`${baseUrl}${route.path}`);
    const contentType = response.headers.get('content-type')?.toLowerCase() ?? '';
    const body = await response.text();
    if (!response.ok) {
      throw new Error(`${route.path}: HTTP ${response.status}`);
    }
    if (!contentType.includes(route.type)) {
      throw new Error(`${route.path}: Content-Type ${contentType || '(vacio)'}`);
    }
    if (route.contains && !body.includes(route.contains)) {
      throw new Error(`${route.path}: falta contenido esperado: ${route.contains}`);
    }
    console.log(`SMOKE_OK ${response.status} ${contentType} ${route.path}`);
  }
} finally {
  await stop(child);
}
