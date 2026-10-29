import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const source=readFileSync(new URL('../campus/app.js',import.meta.url),'utf8');
const html=readFileSync(new URL('../campus/index.html',import.meta.url),'utf8');
const quizUrl='cursos/alfabetizacion-ia/quiz.json';
function element(){
  return {textContent:'',hidden:false,disabled:false,checked:false,children:[],handlers:{},
    classList:{add(){}},
    replaceChildren(){this.children=[]},
    append(node){this.children.push(node)},
    addEventListener(name,callback){this.handlers[name]=callback},
  };
}
function browser({blocked=false}={}){
  const nodes=Object.fromEntries(['.quiz-titulo','.opciones','.feedback','.marcador','.quiz-siguiente'].map(x=>[x,element()]));
  const box={querySelector(selector){return nodes[selector]}};
  const select=element();select.value=quizUrl;
  const remember=element(),clear=element(),status=element();
  const store=new Map();
  const storage={
    setItem(key,value){if(blocked)throw new Error('Storage disabled');store.set(key,value)},
    removeItem(key){if(blocked)throw new Error('Storage disabled');store.delete(key)},
  };
  const doc={
    documentElement:{classList:{add(){}}},
    querySelector(selector){return selector==='.quiz-box'?box:null},
    querySelectorAll(){return []},
    getElementById(id){return {quizCurso:select,quizRemember:remember,quizClear:clear,quizStorageStatus:status}[id]??null},
    createElement(){return element()},
    head:{append(){}},
  };
  runInNewContext(source,{
    document:doc,window:{},navigator:{},AbortController,localStorage:storage,
    matchMedia(){return {matches:true}},
    fetch:async()=>({ok:true,json:async()=>[{pregunta:'¿Qué ocurre con tus datos?',opciones:['Permanecen aquí','Se suben'],correcta:0,explicacion:'Tu decisión es opcional.'}]}),
  },{filename:'campus/app.js'});
  return {nodes,select,remember,clear,status,store,
    async complete(){
      await new Promise(resolve=>setImmediate(resolve));
      const answer=nodes['.opciones'].children[0];assert.ok(answer,'Question must load');
      answer.handlers.click();
      nodes['.quiz-siguiente'].onclick();
      return nodes['.quiz-titulo'].textContent;
    }};
}
test('privacy controls are accessible and default to no persistence',async()=>{
  assert.match(html,/<label[^>]+for="quizRemember"/);
  assert.match(html,/<input id="quizRemember" type="checkbox">/);
  assert.match(html,/<button id="quizClear"[^>]*type="button"|<button id="quizClear" type="button"/);
  assert.match(html,/id="quizStorageStatus" role="status"/);
  const ui=browser();
  assert.equal(ui.remember.checked,false);
  assert.match(await ui.complete(),/Práctica finalizada: 1\/1/);
  assert.equal(ui.store.size,0,'No score or consent should be stored by default');
  assert.match(ui.status.textContent,/no guardado/i);
});
test('explicit opt-in stores only score, total and completion date',async()=>{
  const ui=browser();ui.remember.checked=true;ui.remember.handlers.change();
  await ui.complete();
  assert.deepEqual([...ui.store.keys()],['campus:quiz:'+quizUrl]);
  const item=JSON.parse(ui.store.get('campus:quiz:'+quizUrl));
  assert.deepEqual(Object.keys(item),['score','total','completedAt']);
  assert.equal(item.score,1);assert.equal(item.total,1);
  assert.ok(!Number.isNaN(Date.parse(item.completedAt)));
  assert.match(ui.status.textContent,/guardado únicamente/);
});
test('clear results deletes all known course keys and disables future storage',async()=>{
  const ui=browser();ui.remember.checked=true;
  await ui.complete();
  ui.store.set('campus:quiz:cursos/office-sin-miedo/quiz.json','old');
  ui.store.set('campus:quiz:cursos/falsos-amigos-pt-es/quiz.json','old');
  ui.store.set('unrelated:note','retain');
  ui.clear.handlers.click();
  assert.equal(ui.remember.checked,false);
  assert.deepEqual([...ui.store.keys()],['unrelated:note']);
  assert.match(ui.status.textContent,/borrados/);
});
test('blocked storage cannot interrupt or falsify completed quiz',async()=>{
  const ui=browser({blocked:true});ui.remember.checked=true;
  assert.match(await ui.complete(),/Práctica finalizada: 1\/1/);
  assert.equal(ui.store.size,0);
  assert.match(ui.status.textContent,/No se pudo guardar/);
  ui.clear.handlers.click();
  assert.match(ui.status.textContent,/No se pudo acceder/);
});
