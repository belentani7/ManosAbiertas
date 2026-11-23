/* Uses only the module names and published paths present in Manos Abiertas. */
"use strict";
(()=>{
const modules=[
["m01-introduccion-ia","Introducción a la IA","Primeros pasos con la inteligencia artificial, sus posibilidades y límites."],
["m02-herramientas-sin-codigo","Herramientas sin código","Ideas para crear soluciones digitales sin programar."],
["m03-ia-datos","IA y datos","Comprender, ordenar y evaluar información."],
["m04-generacion-contenido","Generación de contenido","Aplicaciones de IA a la creación y la comunicación."],
["m05-automatizacion","Automatización","Conectar tareas y mantener el control de los procesos."],
["m06-educacion-ia","Educación e IA","Aprendizaje y enseñanza con herramientas digitales."],
["m07-proyectos-comunitarios","Proyectos comunitarios","Aplicar la tecnología a necesidades reales."],
["m08-etica-futuro","Ética y futuro","Derechos, responsabilidad y pensamiento crítico."]
];
const byId=id=>document.getElementById(id);
const idioma=byId("idioma"),search=byId("busqueda"),host=byId("catalogo"),status=byId("estado");
function src(dir,level){const n=String(level).padStart(2,"0");return "./curriculum-html/"+dir+"/nivel-"+n+"/nivel-"+n+"-"+idioma.value+".html";}
function refreshLinks(){for(const a of host.querySelectorAll("a[data-dir]"))a.href=src(a.dataset.dir,Number(a.dataset.level));}
function filter(){const q=String(search.value||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();let visible=0;
for(const x of host.querySelectorAll(".module")){const target=String(x.dataset.search).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();x.hidden=!!q&&!target.includes(q);if(!x.hidden)visible++;}
status.textContent=visible+" de "+modules.length+" módulos visibles";
}
for(const [dir,title,description] of modules){
const section=document.createElement("details");section.className="module";section.dataset.search=title+" "+description;
const summary=document.createElement("summary");summary.textContent=title+" · 26 niveles";section.append(summary);
const p=document.createElement("p");p.textContent=description;section.append(p);
const grid=document.createElement("div");grid.className="levels";
for(let level=0;level<26;level++){const a=document.createElement("a");a.dataset.dir=dir;a.dataset.level=String(level);a.textContent=String(level).padStart(2,"0");a.href=src(dir,level);a.setAttribute("aria-label",title+", nivel "+level);grid.append(a);}
section.append(grid);host.append(section);
}
idioma.addEventListener("change",refreshLinks);search.addEventListener("input",filter);filter();
})();