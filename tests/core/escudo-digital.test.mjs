import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { SCENARIOS, LANGUAGES, LABELS, evaluate, isValidScenario } from '../../campus/escudo/core.mjs';
test('Escudo Digital has substantive, translated, unique and answerable cases',()=>{
 assert.equal(SCENARIOS.length,6);
 assert.equal(new Set(SCENARIOS.map(x=>x.id)).size,SCENARIOS.length);
 for(const scenario of SCENARIOS){
   assert.equal(isValidScenario(scenario),true,scenario.id);
   assert.equal(evaluate(scenario,scenario.correct),true);
   for(let i=0;i<3;i++)if(i!==scenario.correct)assert.equal(evaluate(scenario,i),false);
   for(const l of LANGUAGES)assert.ok(scenario.explanation[l].length>=40);
 }
 for(const l of LANGUAGES)for(const k of ['title','subtitle','progress','check','next','again','note'])assert.ok(LABELS[l]?.[k]);
 assert.throws(()=>evaluate(SCENARIOS[0],999),RangeError);
});
test('Escudo Digital is standalone, accessible, without collection or external dependencies',()=>{
 const html=readFileSync(new URL('../../campus/escudo/index.html',import.meta.url),'utf8');
 for(const snippet of ['<main>','aria-live="polite"','<fieldset','type="module"','core.mjs','<select id="language"','prefers-reduced-motion'])assert.ok(html.includes(snippet),snippet);
 assert.doesNotMatch(html,/fetch\s*\(|XMLHttpRequest|navigator\.sendBeacon|localStorage|innerHTML|<script[^>]*src="https?:/i);
});
