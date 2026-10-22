import {parseCourseMarkdown,linkTokens} from './course-core.mjs';

const root=new URL('./',import.meta.url);
const catalogs={
  'alfabetizacion-ia':{name:'Alfabetización en IA',weeks:3},
  'office-sin-miedo':{name:'Office sin Miedo',weeks:3},
  'falsos-amigos-pt-es':{name:'Puente PT–ES',weeks:4}
};
const section=document.getElementById('lector');
const title=document.getElementById('lector-title');
const info=document.getElementById('lector-status');
const menu=document.getElementById('lector-nav');
const output=document.getElementById('lector-content');
let activeController=null;
function destination(path){
  const match=path.match(/^cursos\/([a-z0-9-]+)\/(syllabus|semana-\d{2}|recursos)\.md$/);
  if(!match||!Object.prototype.hasOwnProperty.call(catalogs,match[1]))throw Error('Ruta de curso desconocida');
  const url=new URL(path,root);
  if(url.origin!==root.origin||!url.pathname.startsWith(new URL('cursos/',root).pathname))
    throw Error('Origen de curso no permitido');
  return {url,slug:match[1]};
}
function inline(parent,text,url){
  for(const item of linkTokens(text)){
    if(item.kind==='text'){parent.append(document.createTextNode(item.text));continue}
    let resolved;
    try{resolved=new URL(item.href,url)}catch{resolved=null}
    if(!resolved||!['http:','https:'].includes(resolved.protocol)){
      parent.append(document.createTextNode(item.text));continue;
    }
    const a=document.createElement('a');
    a.href=resolved.href;a.textContent=item.text;
    if(resolved.origin!==root.origin){a.target='_blank';a.rel='noopener noreferrer'}
    parent.append(a);
  }
}
function display(markdown,url){
  output.replaceChildren();
  let list=null;
  for(const block of parseCourseMarkdown(markdown)){
    if(block.kind==='item'){
      if(!list){list=document.createElement('ul');output.append(list)}
      const li=document.createElement('li');inline(li,block.text,url);list.append(li);continue;
    }
    list=null;
    const tag=block.kind==='heading'?'h'+Math.min(6,block.level+1):block.kind==='quote'?'blockquote':'p';
    const el=document.createElement(tag);inline(el,block.text,url);output.append(el);
  }
}
function navigation(slug,current){
  menu.replaceChildren();
  const units=[['syllabus.md','Programa'],...Array.from({length:catalogs[slug].weeks},(_,n)=>[
    'semana-'+String(n+1).padStart(2,'0')+'.md','Semana '+(n+1)]),['recursos.md','Recursos']];
  for(const [file,label] of units){
    const href='cursos/'+slug+'/'+file;
    const a=document.createElement('a');a.href=href;a.textContent=label;
    if(href===current)a.setAttribute('aria-current','page');menu.append(a);
  }
  const quiz=document.createElement('a');quiz.href='#quiz';quiz.textContent='Cuestionario';
  quiz.addEventListener('click',()=>{
    const select=document.getElementById('quizCurso');
    if(select){select.value='cursos/'+slug+'/quiz.json';select.dispatchEvent(new Event('change'))}
  });
  menu.append(quiz);
}
export async function openCourse(path){
  const {url,slug}=destination(path);
  if(activeController)activeController.abort();
  const controller=new AbortController();activeController=controller;
  section.hidden=false;title.textContent=catalogs[slug].name;
  info.textContent='Cargando lección…';
  output.replaceChildren();navigation(slug,path);
  section.scrollIntoView({behavior:'auto',block:'start'});title.focus();
  try{
    const response=await fetch(url.href,{signal:controller.signal});
    if(!response.ok)throw Error('HTTP '+response.status);
    const content=await response.text();
    if(controller.signal.aborted)return;
    display(content,url);
    info.textContent='Material real del curso. La lectura y el quiz no otorgan certificación.';
  }catch{
    if(controller.signal.aborted)return;
    info.textContent='No se pudo cargar esta lección. Comprueba la conexión o el modo offline.';
  }
}
document.addEventListener('click',event=>{
  const a=event.target.closest?.('a[href]');
  if(!a)return;
  const raw=a.getAttribute('href');
  if(!raw)return;
  let target;
  try{target=new URL(raw,root)}catch{return}
  const prefix=new URL('cursos/',root).pathname;
  if(target.origin!==root.origin||!target.pathname.startsWith(prefix)||!target.pathname.endsWith('.md'))return;
  event.preventDefault();
  const relative='cursos/'+target.pathname.slice(prefix.length);
  openCourse(relative).catch(()=>{
    info.textContent='La ruta solicitada no está disponible.';
  });
});
