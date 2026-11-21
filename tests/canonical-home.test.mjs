import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const read = (p) => readFileSync(new URL("../"+p, import.meta.url),"utf8");
test("the root and published landing are the Manos Abiertas institution, not an unrelated JUDAS template",()=>{
 const html=read("index.html");
 assert.equal(html,read("public/index.html"));
 assert.match(html,/Manos Abiertas — Aprender abre caminos/);
 assert.doesNotMatch(html,/BELENTANI\s*\/\/\s*JUDAS|Neural Terminal OS|Red Glossy Studio/);
 assert.match(html,/href="\.\/curriculum-html\/index\.html"/);
 assert.doesNotMatch(html,/href="\.\/public\/curriculum-html/);
});
