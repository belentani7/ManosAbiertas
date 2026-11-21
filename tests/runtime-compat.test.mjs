import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const root = new URL("../", import.meta.url);
const pkg = JSON.parse(readFileSync(new URL("package.json", root), "utf8"));
const lock = JSON.parse(readFileSync(new URL("package-lock.json", root), "utf8"));
const readme = readFileSync(new URL("README.md", root), "utf8");

test("ManosAbiertas documents the supported Next 16 Node runtime", () => {
  assert.match(pkg.dependencies.next, /16\./);
  assert.equal(pkg.engines.node, ">=20.9.0");
  assert.equal(lock.packages[""].engines.node, pkg.engines.node);
  assert.match(readme, /Node\.js 20\.9\+/);
});
