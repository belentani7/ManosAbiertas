import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'../..');
const pages=['index.html','orientacion.html','programas.html','empleo.html','recursos.html','proyecto.html'];
function read(path){return readFileSync(resolve(root,path),'utf8')}
for(const page of pages){
 test(page+' has semantic metadata and accessible navigation',()=>{
  const html=read(page);
  assert.match(html,/<html lang="es">/);
  assert.match(html,/<a class="skip-link" href="#contenido">Saltar al contenido<\/a>/);
  assert.match(html,/<main\b[^>]*id="contenido"[^>]*tabindex="-1"/);
  assert.equal((html.match(/<h1\b/g)||[]).length,1);
  assert.match(html,/<nav\b[^>]*aria-label="Navegación principal"/);
  assert.match(html,/<meta name="description" content="[^"]+"/);
  assert.match(html,/href="\.\/campus\/"/);
 });
 test(page+' uses real internal links',()=>{
  const html=read(page);
  for(const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)){
   const href=match[1];
   if(href.startsWith('#')){assert.ok(html.includes('id="'+href.slice(1)+'"'),page+': missing fragment '+href);continue}
   if(!href.startsWith('./'))continue;
   const path=decodeURIComponent(href.split(/[?#]/)[0].slice(2));
   const target=resolve(root,path);
   assert.ok(target.startsWith(root+'/'),page+': unsafe target '+href);
   assert.ok(existsSync(target),page+': missing '+href);
   if(href.endsWith('/'))assert.ok(existsSync(resolve(target,'index.html')),page+': missing index for '+href);
  }
 });
}
test('route script does not send personal data',()=>{
 const js=read('assets/site.js');
 assert.doesNotMatch(js,/\bfetch\s*\(|XMLHttpRequest|sendBeacon/);
 assert.match(js,/localStorage\.setItem\(key,selected\)/);
 assert.match(js,/save\.checked/);
});
test('primary content and CV template are available',()=>{
 for(const path of ['assets/brand.css','assets/manos-symbol.svg','assets/plantilla-cv.txt'])assert.ok(statSync(resolve(root,path)).size>50);
 assert.match(read('empleo.html'),/download/);
});