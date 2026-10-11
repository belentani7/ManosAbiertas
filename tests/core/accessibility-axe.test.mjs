// Accesibilidad automatizada con axe-core sobre componentes REALES renderizados
// (Fase B3). Complementa el verificador estático propio: valida WCAG en el
// HTML que genera React para los flujos críticos (contactos humanos, itinerarios).
// Nota: la regla `color-contrast` se desactiva porque jsdom no calcula layout;
// el contraste se valida en la revisión manual/Playwright (Fase H).
import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { registerHooks } from 'node:module';
import { extname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { transformSync } from 'esbuild';
import { JSDOM } from 'jsdom';

const SRC_ROOT = fileURLToPath(new URL('../../src/', import.meta.url));

// Hook de carga: transforma TS/TSX (incluye JSX) y resuelve el alias `@/`
// para poder renderizar componentes reales de la app en node:test.
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith('@/')) {
      const base = specifier.slice(2);
      for (const candidate of [base, `${base}.ts`, `${base}.tsx`, `${base}/index.ts`, `${base}/index.tsx`]) {
        const full = pathToFileURL(`${SRC_ROOT}${candidate}`);
        if (existsSync(fileURLToPath(full))) return nextResolve(full.href, context);
      }
    }
    if (context.parentURL?.endsWith('.ts') && specifier.startsWith('.') && !extname(specifier)) {
      const candidate = new URL(`${specifier}.ts`, context.parentURL);
      if (existsSync(fileURLToPath(candidate))) return nextResolve(candidate.href, context);
    }
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    if (url.endsWith('.tsx') || (url.endsWith('.ts') && url.includes('/src/'))) {
      const source = readFileSync(fileURLToPath(url), 'utf8');
      const { code } = transformSync(source, {
        loader: url.endsWith('.tsx') ? 'tsx' : 'ts',
        format: 'esm',
        jsx: 'automatic',
      });
      return { format: 'module', source: code, shortCircuit: true };
    }
    return nextLoad(url, context);
  },
});

// DOM global ANTES de importar los componentes (hidratación de stores/hooks).
const dom = new JSDOM('<!doctype html><html lang="es"><body><div id="root"></div></body></html>', {
  url: 'https://manos-abiertas.local/',
});
globalThis.window = dom.window;
globalThis.document = dom.window.document;
Object.defineProperty(globalThis, 'navigator', { value: dom.window.navigator, configurable: true });
globalThis.HTMLElement = dom.window.HTMLElement;
globalThis.Element = dom.window.Element;
globalThis.Node = dom.window.Node;
globalThis.getComputedStyle = dom.window.getComputedStyle;
globalThis.localStorage = dom.window.localStorage;
globalThis.CustomEvent = dom.window.CustomEvent;

const axe = (await import('axe-core')).default;
const React = (await import('react')).default;
const { renderToStaticMarkup } = await import('react-dom/server');
const { ContactsSection } = await import('../../src/components/manos-abiertas/contacts-section.tsx');
const { PersonalRoute } = await import('../../src/components/manos-abiertas/personal-route.tsx');

async function audit(component, name) {
  const html = renderToStaticMarkup(React.createElement(component));
  assert.ok(html.length > 200, `${name} debe renderizar contenido real`);
  const container = dom.window.document.createElement('div');
  container.innerHTML = html;
  dom.window.document.body.appendChild(container);

  const results = await axe.run(container, {
    rules: {
      // jsdom no calcula colores reales: el contraste se audita fuera.
      'color-contrast': { enabled: false },
    },
    resultTypes: ['violations'],
  });

  dom.window.document.body.removeChild(container);

  const details = results.violations
    .map((v) => `${v.id} (${v.impact}): ${v.help} → ${v.nodes.slice(0, 2).map((n) => n.target.join(' ')).join(' | ')}`)
    .join('\n');
  assert.equal(results.violations.length, 0, `Violaciones axe en ${name}:\n${details}`);
}

test('axe: la sección de contactos humanos no tiene violaciones WCAG', async () => {
  await audit(ContactsSection, 'ContactsSection');
});

test('axe: el selector de itinerarios (sin ruta activa) no tiene violaciones WCAG', async () => {
  dom.window.localStorage.removeItem('manos-abiertas-personal-route');
  await audit(PersonalRoute, 'PersonalRoute[selector]');
});

test('axe: una ruta activa con progreso no tiene violaciones WCAG', async () => {
  dom.window.localStorage.setItem(
    'manos-abiertas-personal-route',
    JSON.stringify({ goal: 'primer-cv', completed: ['cv-plantilla'] }),
  );
  await audit(PersonalRoute, 'PersonalRoute[ruta activa]');
  dom.window.localStorage.removeItem('manos-abiertas-personal-route');
});
