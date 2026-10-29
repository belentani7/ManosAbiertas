import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'../..');
const read=(path)=>readFileSync(resolve(root,path),'utf8');
const pages=['index.html','orientacion.html','programas.html','empleo.html','recursos.html','proyecto.html'];
const additional=['assets/brand.css','assets/site.js','assets/manos-symbol.svg','assets/plantilla-cv.txt','campus/cursos/alfabetizacion-ia/syllabus.md','campus/cursos/office-sin-miedo/syllabus.md','campus/cursos/falsos-amigos-pt-es/syllabus.md'];
for(const path of [...pages,...additional]) {
  test('Vercel bundles the same published source: '+path,()=>{
    assert.equal(read(path),read('public/'+path));
  });
}
test('Next.js root serves the actual institutional entry via browser redirect',()=>{
 const rootPage=read('src/app/page.tsx');
 assert.match(rootPage,/redirect\('\/index\.html'\)/);
 assert.ok(existsSync(resolve(root,'public/index.html')));
});
test('all institutional public URLs remain valid on Vercel',()=>{
 for(const page of pages){
  const html=read('public/'+page);
  for(const match of html.matchAll(/\b(?:src|href)="(\.[^"]+)"/g)){
    const target=decodeURIComponent(match[1].split(/[?#]/)[0].slice(2));
    assert.ok(!target.includes('..'),page+': unsafe target: '+target);
    const full=resolve(root,'public',target);
    if(target==='campus/'){
      assert.match(read('src/app/campus/route.ts'),/es\/cursos/);
      continue;
    }
    assert.ok(existsSync(full),page+': broken Vercel target '+target);
  }
 }
});
