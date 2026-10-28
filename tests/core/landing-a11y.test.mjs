import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { URL } from "node:url";

const read = (path) => readFileSync(new URL("../../" + path, import.meta.url), "utf8");

for (const file of ["index.html", "orientacion.html"]) {
  test(file + ": keyboard users can skip directly to a focusable main", () => {
    const html = read(file);
    assert.match(html, /<html lang="es">/);
    assert.match(html, /<a class="skip-link" href="#contenido">Saltar al contenido<\/a>/);
    assert.match(html, /<main\b[^>]*id="contenido"[^>]*tabindex="-1"/);
    assert.match(html, /href="\.\/campus\/"/);
  });
}

test("landing uses scoped Portuguese language metadata for long Portuguese passages", () => {
  const html = read("index.html");
  for (const phrase of ["Quem somos:", "Cada curso tem semanas", "Parte do ecossistema educativo"]) {
    assert.match(html, new RegExp('<p\\b[^>]*lang="pt"[^>]*>' + phrase));
  }
  assert.match(html, /<title>Manos Abiertas — Formación gratuita para quienes llegan<\/title>/);
});

test("landing maintains one H1 and nested course heading hierarchy", () => {
  const html = read("index.html");
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.equal((html.match(/<h3>/g) || []).length, 3);
  assert.match(html, />Cursos<\/h2>/);
  assert.match(html, /\.card h3\{/);
  assert.ok(!/<h2>Alfabetizacion en IA<\/h2>/.test(html));
});
