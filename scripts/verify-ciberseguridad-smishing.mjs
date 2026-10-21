import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const file = resolve(root, "src/data/generated-courses/ciberseguridad.ts");
const source = readFileSync(file, "utf8");
const lessonStart = source.indexOf('id: "cib-02"');
const lessonEnd = source.indexOf('id: "cib-03"');
assert.ok(lessonStart >= 0 && lessonEnd > lessonStart, "smishing lesson must exist");
const lesson = source.slice(lessonStart, lessonEnd);

assert.match(lesson, /INCIBE/, "smishing lesson needs independent security reference");
assert.match(lesson, /www\.correos\.es\//, "smishing lesson needs official operator verification source");
assert.match(lesson, /017/, "smishing lesson must include the official help number");
assert.match(lesson, /número de seguimiento/, "learner must be told how to check delivery status");
assert.match(lesson, /puede falsificar/, "must warn about spoofed sender names");
assert.match(lesson, /sin faltas también puede ser falso/i, "absence of typos is not proof");
assert.doesNotMatch(lesson, /Las empresas de correo no piden dinero por SMS/, "avoid blanket claims about couriers");
assert.match(lesson, /No pulso el enlace y verifico el envío desde la web oficial/, "quiz must teach safe independent verification");
const correctAnswers = [...lesson.matchAll(/correct:\s*(\d+)/g)].map((m) => Number(m[1]));
assert.equal(correctAnswers.length, 3, "smishing lesson must have all 3 quiz answers");
assert.deepEqual(correctAnswers, [2, 0, 1], "correct quiz positions must be preserved");
console.log("Smishing lesson integrity OK: content, sources, recovery and 3 quiz answers");
