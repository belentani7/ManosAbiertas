/**
 * Static (non-evaluating) integrity check of educational TS data modules.
 * The checker parses source files but never executes course code.
 * Content-length checks are minimum hygiene gates, not editorial certification.
 */
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import ts from "typescript";

const directory = resolve("src/data/generated-courses");
const files = readdirSync(directory).filter((name) => name.endsWith(".ts")).sort();
assert.ok(files.length >= 5, "expected the five educational course data modules");
const issues = [];
const allIds = new Set();
let totalLessons = 0;
let totalQuestions = 0;

function bad(path, problem) { issues.push(path + ": " + problem); }
function unwrap(node) {
  let item = node;
  while (item && (ts.isAsExpression(item) || ts.isParenthesizedExpression(item) || ts.isSatisfiesExpression(item))) item = item.expression;
  return item;
}
function prop(node, key) {
  const obj = unwrap(node);
  if (!obj || !ts.isObjectLiteralExpression(obj)) return undefined;
  for (const item of obj.properties) {
    if (!ts.isPropertyAssignment(item)) continue;
    if (ts.isIdentifier(item.name) || ts.isStringLiteral(item.name)) {
      if (item.name.text === key) return unwrap(item.initializer);
    }
  }
}
function text(node) {
  const item = unwrap(node);
  if (!item) return "";
  if (ts.isStringLiteral(item) || ts.isNoSubstitutionTemplateLiteral(item)) return item.text;
  if (ts.isBinaryExpression(item) && item.operatorToken.kind === ts.SyntaxKind.PlusToken)
    return text(item.left) + text(item.right);
  return "";
}
function num(node) {
  const item = unwrap(node);
  return item && ts.isNumericLiteral(item) ? Number(item.text) : NaN;
}
function array(node) {
  const item = unwrap(node);
  return item && ts.isArrayLiteralExpression(item) ? [...item.elements] : [];
}
function courseDefinition(file) {
  const source = readFileSync(join(directory, file), "utf8");
  const parsed = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  if (parsed.parseDiagnostics.length) bad(file, "TypeScript source syntax is not parseable");
  for (const stmt of parsed.statements) {
    if (!ts.isVariableStatement(stmt)) continue;
    for (const decl of stmt.declarationList.declarations) {
      const typeName = decl.type && ts.isTypeReferenceNode(decl.type) &&
        ts.isIdentifier(decl.type.typeName) ? decl.type.typeName.text : "";
      if (typeName === "GeneratedCourse") return decl.initializer;
    }
  }
  bad(file, "missing typed GeneratedCourse export");
}

for (const file of files) {
  const node = courseDefinition(file);
  const id = text(prop(node, "id"));
  const title = text(prop(node, "title"));
  const context = id || file;
  if (!id || allIds.has(id)) bad(file, "course id missing or duplicated");
  allIds.add(id);
  if (title.length < 5) bad(file, "course title too short");
  if (text(prop(node, "description")).length < 60) bad(file, "course description too short");
  if (array(prop(node, "objectives")).length < 2) bad(file, "expected at least 2 learning objectives");
  const lessons = array(prop(node, "lessons"));
  if (lessons.length < 3) bad(file, "fewer than 3 complete lessons");
  const lessonIds = new Set();
  for (const lesson of lessons) {
    totalLessons++;
    const lessonId = text(prop(lesson, "id"));
    const label = context + "/" + (lessonId || "missing-id");
    if (!lessonId || lessonIds.has(lessonId)) bad(label, "lesson id missing or duplicated");
    lessonIds.add(lessonId);
    if (text(prop(lesson, "courseId")) !== id) bad(label, "courseId disagrees with parent");
    if (text(prop(lesson, "title")).length < 5) bad(label, "lesson title missing");
    if (text(prop(lesson, "summary")).length < 30) bad(label, "lesson summary too short");
    const content = text(prop(lesson, "content")).trim();
    if (content.length < 180) bad(label, "lesson has fewer than 180 characters of content");
    if (/(?:lorem ipsum|coming soon|pendiente de redactar)/i.test(content) || /\bTODO\b/.test(content))
      bad(label, "unfinished placeholder content");
    const sources = array(prop(lesson, "sources"));
    if (!sources.length) bad(label, "no source citation");
    for (const entry of sources) {
      const url = text(prop(entry, "url"));
      if (!/^https:\/\/[a-z0-9.-]+(?:\/|$)/i.test(url)) bad(label, "source URL must be HTTPS");
      if (text(prop(entry, "title")).length < 5) bad(label, "source title missing");
    }
    const questions = array(prop(lesson, "quiz"));
    if (!questions.length) bad(label, "no knowledge-check questions");
    for (const question of questions) {
      totalQuestions++;
      const options = array(prop(question, "options"));
      const correct = num(prop(question, "correct"));
      if (text(prop(question, "q")).length < 12) bad(label, "quiz question too short");
      if (options.length < 2 || options.some((option) => !text(option).trim()))
        bad(label, "quiz needs substantive answer options");
      if (!Number.isInteger(correct) || correct < 0 || correct >= options.length)
        bad(label, "quiz correct index out of bounds");
      if (text(prop(question, "explain")).length < 25)
        bad(label, "quiz explanation missing");
    }
  }
}
console.log("Course hygiene:", files.length, "courses;", totalLessons, "lessons;", totalQuestions, "quiz questions");
if (issues.length) {
  for (const item of issues) console.error("FAIL:", item);
  process.exitCode = 1;
} else {
  console.log("PASS: no missing lessons, empty lesson text, duplicate IDs, invalid quiz indexes or missing sources found");
}
