import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { fileURLToPath } from 'node:url';

const script=readFileSync(new URL('../../assets/site.js',import.meta.url),'utf8');
function emitter(extra={}){
 const events={};const attrs={};const classes=new Set();
 return {...extra,events,attrs,classList:{add(c){classes.add(c)},remove(c){classes.delete(c)},toggle(c,v){if(v)classes.add(c);else classes.delete(c)},contains(c){return classes.has(c)}},
 addEventListener(name,cb){events[name]=cb},getAttribute(name){return attrs[name]},setAttribute(name,value){attrs[name]=value}};
}
test('menu opens, closes and preserves semantic expanded state',()=>{
 const toggle=emitter();toggle.setAttribute('aria-expanded','false');
 const nav=emitter();
 const doc={documentElement:emitter(),querySelector(q){return {'[data-nav-toggle]':toggle,'[data-nav]':nav}[q]??null}};
 runInNewContext(script,{document:doc,localStorage:{}});
 assert.equal(doc.documentElement.classList.contains('js'),true);
 toggle.events.click();
 assert.equal(toggle.getAttribute('aria-expanded'),'true');
 assert.equal(nav.classList.contains('is-open'),true);
 nav.events.click({target:{closest(){return true}}});
 assert.equal(toggle.getAttribute('aria-expanded'),'false');
 assert.equal(nav.classList.contains('is-open'),false);
});
test('route changes real destinations and only saves with opt-in',()=>{
 const saved=new Map();const localStorage={getItem(k){return saved.get(k)??null},setItem(k,v){saved.set(k,v)},removeItem(k){saved.delete(k)}};
 const save={checked:false};const radios=[{value:'empleo',checked:true},{value:'digital',checked:false},{value:'idioma',checked:false},{value:'tramites',checked:false}];
 const form=emitter({querySelector(k){return k==='[name=guardar]'?save:null},querySelectorAll(){return radios}});
 const title={textContent:''};const list={children:[],replaceChildren(...items){this.children=items}};
 const link={href:'',textContent:''};const panel=emitter({querySelector(k){return {'[data-plan-title]':title,'[data-plan-steps]':list,'[data-plan-link]':link}[k]}});
 const doc={documentElement:emitter(),querySelector(k){return {'[data-route-form]':form,'[data-route-result]':panel}[k]??null},createElement(){return {textContent:''}}};
 runInNewContext(script,{document:doc,localStorage});
 assert.equal(saved.size,0);
 assert.equal(link.href,'./empleo.html');
 radios[0].checked=false;radios[1].checked=true;save.checked=true;form.events.change();
 assert.equal(link.href,'./taller-documentos.html');
 assert.equal(list.children.length,3);
 assert.equal(saved.get('manosabiertas:orientacion:v1'),'digital');
 radios[1].checked=false;radios[2].checked=true;save.checked=false;form.events.change();
 assert.equal(link.href,'./taller-puente-pt-es.html');
 assert.equal(saved.size,0);
 radios[2].checked=false;radios[3].checked=true;form.events.change();
 assert.equal(link.href,'./recursos.html');
 assert.equal(list.children.length,3);
 assert.equal(saved.size,0);
});
test('resource filter leaves only selected category visible',()=>{
 const cards=['acogida','empleo','empleo','formacion','formacion'].map(k=>({dataset:{resourceKind:k},hidden:false}));
 const filter=emitter({value:'todos'});const count={textContent:''};
 const doc={documentElement:emitter(),querySelector(k){return {'[data-resource-filter]':filter,'[data-resource-count]':count}[k]??null},querySelectorAll(k){return k==='[data-resource-kind]'?cards:[]}};
 runInNewContext(script,{document:doc,localStorage:{}});
 assert.equal(count.textContent,'5 recursos visibles');
 filter.value='empleo';filter.events.change();
 assert.equal(count.textContent,'2 recursos visibles');
 assert.deepEqual(cards.map(c=>c.hidden),[true,false,false,true,true]);
});
