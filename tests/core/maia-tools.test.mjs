import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { registerHooks } from 'node:module';
import { extname } from 'node:path';
import { fileURLToPath } from 'node:url';

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (context.parentURL?.endsWith('.ts') && specifier.startsWith('.') && !extname(specifier)) {
      const candidate = new URL(`${specifier}.ts`, context.parentURL);
      if (existsSync(fileURLToPath(candidate))) return nextResolve(candidate.href, context);
    }
    return nextResolve(specifier, context);
  },
});

const {
  MAIA_TOOL_NAMES, MAIA_TOOL_TIMEOUT_MS,
  executeMaiaTool, maiaToolDefinitions, maiaToolExecutor, takeToolAudit, withTimeout,
} = await import('../../src/lib/maia-tools.ts');
const { RESOURCES } = await import('../../src/data/resources.ts');
const { JOURNEYS } = await import('../../src/data/journeys.ts');

const CATALOG_URLS = new Set(RESOURCES.map((r) => r.url));

test('allowlist: definiciones con JSON Schema válido y nombres únicos', () => {
  assert.ok(MAIA_TOOL_NAMES.length >= 5);
  assert.equal(new Set(MAIA_TOOL_NAMES).size, MAIA_TOOL_NAMES.length);
  const defs = maiaToolDefinitions();
  assert.equal(defs.length, MAIA_TOOL_NAMES.length);
  for (const def of defs) {
    assert.equal(def.type, 'function');
    assert.ok(def.function.name && def.function.description, `${def.function.name} sin descripción`);
    assert.equal(def.function.parameters.type, 'object');
    assert.ok(def.function.parameters.properties !== undefined);
    assert.equal(def.function.parameters.additionalProperties, false, `${def.function.name} debe ser un schema cerrado`);
  }
  // Restringir por nombres solo devuelve herramientas del allowlist.
  const restricted = maiaToolDefinitions(['search_verified_resources', 'shell', 'rm -rf']);
  assert.deepEqual(restricted.map((d) => d.function.name), ['search_verified_resources']);
});

test('search_verified_resources: resultados reales del catálogo, nunca inventados', async () => {
  const execution = await executeMaiaTool('search_verified_resources', JSON.stringify({ query: 'empadronamiento ayuntamiento', limit: 3 }));
  assert.equal(execution.ok, true);
  const { sources } = execution.result;
  assert.ok(Array.isArray(sources) && sources.length > 0);
  assert.ok(sources.length <= 3);
  for (const s of sources) assert.ok(CATALOG_URLS.has(s.url), `URL fuera del catálogo: ${s.url}`);
});

test('find_courses y list_journeys devuelven el catálogo educativo real', async () => {
  const courses = await executeMaiaTool('find_courses', JSON.stringify({ topic: 'excel' }));
  assert.equal(courses.ok, true);
  assert.ok(courses.result.courses.length > 0, 'debe encontrar cursos de Excel/Office');
  for (const c of courses.result.courses) assert.ok(c.title && c.kind && c.section);

  const journeys = await executeMaiaTool('list_journeys', '{}');
  assert.equal(journeys.ok, true);
  assert.equal(journeys.result.journeys.length, JOURNEYS.length);
});

test('get_journey devuelve el detalle del itinerario o un error honesto', async () => {
  const ok = await executeMaiaTool('get_journey', JSON.stringify({ journeyId: 'primeras-24h' }));
  assert.equal(ok.ok, true);
  assert.equal(ok.result.journey.id, 'primeras-24h');
  assert.ok(ok.result.journey.activities.length >= 3);
  assert.ok(ok.result.journey.outcome.length > 0);

  const missing = await executeMaiaTool('get_journey', JSON.stringify({ journeyId: 'no-existe' }));
  assert.equal(missing.ok, true, 'la herramienta resuelve; el error está en el payload');
  assert.equal(missing.result.error, 'JOURNEY_NOT_FOUND');
});

test('list_emergency_contacts expone los teléfonos humanos esenciales', async () => {
  const execution = await executeMaiaTool('list_emergency_contacts', '{}');
  assert.equal(execution.ok, true);
  const { contacts } = execution.result;
  assert.equal(contacts.length, 8);
  assert.ok(contacts.some((c) => c.phone === '112'), 'el 112 debe estar siempre');
  for (const c of contacts) assert.match(c.tel, /^tel:\+?[\d]+$/);
});

test('seguridad: fuera del allowlist, JSON inválido y argumentos maliciosos se rechazan', async () => {
  takeToolAudit(); // drenar registros de tests anteriores

  const denied = await executeMaiaTool('exec_shell', '{"cmd":"rm -rf /"}');
  assert.equal(denied.ok, false);
  assert.equal(denied.error, 'TOOL_NOT_ALLOWED');

  const badJson = await executeMaiaTool('search_verified_resources', '{oops');
  assert.equal(badJson.ok, false);
  assert.equal(badJson.error, 'INVALID_JSON_ARGUMENTS');

  const shortQuery = await executeMaiaTool('search_verified_resources', '{"query":"a"}');
  assert.equal(shortQuery.ok, false);
  assert.equal(shortQuery.error, 'VALIDATION_ERROR');

  const oversized = await executeMaiaTool('search_verified_resources', JSON.stringify({ query: 'x'.repeat(500) }));
  assert.equal(oversized.ok, false);
  assert.equal(oversized.error, 'VALIDATION_ERROR');

  const extraKeys = await executeMaiaTool('list_journeys', '{"evil":"payload"}');
  assert.equal(extraKeys.ok, false, 'los schemas son estrictos (additionalProperties:false)');
  assert.equal(extraKeys.error, 'VALIDATION_ERROR');
});

test('auditoría: cada invocación queda registrada y takeToolAudit la drena', async () => {
  takeToolAudit();
  await executeMaiaTool('list_journeys', '{}');
  await executeMaiaTool('denied_tool', '{}');
  const audit = takeToolAudit();
  assert.equal(audit.length, 2);
  assert.equal(audit[0].tool, 'list_journeys');
  assert.equal(audit[0].ok, true);
  assert.equal(audit[1].ok, false);
  for (const entry of audit) {
    assert.ok(!Number.isNaN(Date.parse(entry.at)));
    assert.ok(entry.durationMs >= 0);
  }
  assert.deepEqual(takeToolAudit(), [], 'takeToolAudit vacía el buffer');
});

test('withTimeout acota la ejecución de herramientas', async () => {
  const fast = await withTimeout(Promise.resolve(42), MAIA_TOOL_TIMEOUT_MS, 'fast');
  assert.equal(fast, 42);
  await assert.rejects(
    withTimeout(new Promise((resolve) => setTimeout(resolve, 5_000)), 20, 'slow'),
    /TOOL_TIMEOUT: slow/,
  );
});

test('maiaToolExecutor devuelve siempre JSON con ok/result o ok/error', async () => {
  const good = JSON.parse(await maiaToolExecutor('list_journeys', '{}'));
  assert.equal(good.ok, true);
  assert.ok(Array.isArray(good.result.journeys));
  const bad = JSON.parse(await maiaToolExecutor('list_journeys', '{"x":1}'));
  assert.equal(bad.ok, false);
  assert.equal(bad.error, 'VALIDATION_ERROR');
});
