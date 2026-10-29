// campus app: quiz player + stagger + audit (sin dependencias)
document.documentElement.classList.add('js');

const $ = (sel, root = document) => root.querySelector(sel);
let activeQuizController=null;

function loadQuiz(url,box) {
  if(activeQuizController)activeQuizController.abort();
  if(!box)return;
  const controller=new AbortController();
  activeQuizController=controller;
  const titulo=$('.quiz-titulo',box),opciones=$('.opciones',box);
  const feedback=$('.feedback',box),marcador=$('.marcador',box);
  const button=$('.quiz-siguiente',box);
  // A rejected or failed request must not show questions, scores or feedback
  // belonging to a previously selected course.
  opciones.replaceChildren();
  feedback.textContent='';
  marcador.textContent='';
  button.hidden=true;
  button.onclick=null;
  if(!/^cursos\/(?:alfabetizacion-ia|office-sin-miedo|falsos-amigos-pt-es)\/quiz\.json$/.test(url)){
    titulo.textContent='Ruta del cuestionario no permitida';return;
  }
  titulo.textContent='Cargando preguntas reales…';
  fetch(url,{signal:controller.signal}).then(response=>{
    if(!response.ok)throw Error('Quiz HTTP '+response.status);
    return response.json();
  }).then(items=>{
    if(controller.signal.aborted)return;
    if(!Array.isArray(items)||!items.length||items.length>50||items.some(q=>
      !q||typeof q!=='object'||Array.isArray(q)||
      typeof q.pregunta!=='string'||!q.pregunta.trim()||
      !Array.isArray(q.opciones)||q.opciones.length<2||
      q.opciones.length>6||!q.opciones.every(s=>typeof s==='string'&&s.trim())||
      !Number.isInteger(q.correcta)||q.correcta<0||q.correcta>=q.opciones.length||
      typeof q.explicacion!=='string'||!q.explicacion.trim()))throw Error('Quiz structure invalid');
    let index=0,score=0,answered=false;
    const render=()=>{
      answered=false;
      const q=items[index];titulo.textContent=(index+1)+'/'+items.length+' · '+q.pregunta;
      opciones.replaceChildren();feedback.textContent='';
      marcador.textContent='Aciertos: '+score;button.hidden=true;button.textContent='Siguiente';
      q.opciones.forEach((option,i)=>{
        const choice=document.createElement('button');
        choice.className='opcion';choice.type='button';choice.textContent=option;
        choice.addEventListener('click',()=>{
          // Score only the first real choice; DOM disabled is not a state guard.
          if(answered||controller.signal.aborted)return;
          answered=true;
          for(const [j,el] of [...opciones.children].entries()){
            el.classList.add(j===q.correcta?'correcta':'fallo');el.disabled=true;
          }
          if(i===q.correcta)score++;
          feedback.textContent=(i===q.correcta?'Correcto. ':('Incorrecto. Respuesta correcta: '+q.opciones[q.correcta]+'. '))+q.explicacion;
          marcador.textContent='Aciertos: '+score;button.hidden=false;
          button.textContent=index===items.length-1?'Finalizar':'Siguiente';
        },{once:true});
        opciones.append(choice);
      });
    };
    button.onclick=()=>{
      if(controller.signal.aborted||!answered)return;
      if(index===items.length){
        index=0;score=0;render();return;
      }
      index++;
      if(index<items.length){render();return;}
      titulo.textContent='Práctica finalizada: '+score+'/'+items.length;
      opciones.replaceChildren();
      feedback.textContent='Esta actividad no acredita niveles. Revisa las respuestas y repítela cuando quieras.';
      marcador.textContent='Resultado: '+Math.round(100*score/items.length)+'%';
      button.hidden=false;button.textContent='Repetir';
      storeQuizResult(url,score,items.length);
    };
    render();
  }).catch(()=>{
    if(controller.signal.aborted)return;
    titulo.textContent='No se pudo cargar este cuestionario.';
    opciones.replaceChildren();
    marcador.textContent='';
    button.hidden=true;
    button.onclick=null;
    feedback.textContent='Comprueba la conexión o vuelve a abrir el campus online para activar el modo offline.';
  });
}


// Quiz progress is private by default. Never persist a learner's score unless
// the learner explicitly opts in on this visit. Do not store the checkbox state.
const QUIZ_PATHS=['alfabetizacion-ia','office-sin-miedo','falsos-amigos-pt-es']
  .map(slug=>'cursos/'+slug+'/quiz.json');
function quizStorageMessage(message){
  const status=document.getElementById('quizStorageStatus');
  if(status)status.textContent=message;
}
function storeQuizResult(url,score,total){
  const choice=document.getElementById('quizRemember');
  if(!choice?.checked){
    quizStorageMessage('Resultado no guardado. Puedes repetir la práctica sin crear una cuenta.');
    return;
  }
  if(!QUIZ_PATHS.includes(url))return;
  try{
    localStorage.setItem('campus:quiz:'+url,JSON.stringify({
      score,total,completedAt:new Date().toISOString()
    }));
    quizStorageMessage('Resultado guardado únicamente en este navegador. Puedes borrarlo aquí cuando quieras.');
  }catch{
    quizStorageMessage('No se pudo guardar en este navegador. Tu resultado sigue visible hasta que salgas.');
  }
}
const quizRemember=document.getElementById('quizRemember');
if(quizRemember)quizRemember.addEventListener('change',()=>{
  quizStorageMessage(quizRemember.checked
    ?'Al finalizar, podrás guardar tu puntuación solo en este navegador.'
    :'No se guardarán nuevos resultados. Usa «Borrar resultados guardados» para eliminar los anteriores.');
});
const quizClear=document.getElementById('quizClear');
if(quizClear)quizClear.addEventListener('click',()=>{
  try{
    for(const path of QUIZ_PATHS)localStorage.removeItem('campus:quiz:'+path);
    if(quizRemember)quizRemember.checked=false;
    quizStorageMessage('Resultados guardados borrados de este navegador. La práctica actual no se reinicia.');
  }catch{
    quizStorageMessage('No se pudo acceder al almacenamiento. Revisa los permisos de este navegador.');
  }
});

// stagger sutil de tarjetas (respeta reduced-motion)
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduced) {
  document.querySelectorAll('.card').forEach((el, i) => {
    el.style.animation = 'rise var(--dur-slow) var(--ease-out) both';
    el.style.animationDelay = `${Math.min(i * 60, 300)}ms`;
  });
  const st = document.createElement('style');
  st.textContent = '@keyframes rise{from{opacity:0;transform:translateY(8px)}}';
  document.head.appendChild(st);
}

// auditoria rapida de accesibilidad (consola)
window.uiAudit = () => {
  const issues = [];
  document.querySelectorAll('img:not([alt])').forEach(() =>
    issues.push('img sin alt'));
  document.querySelectorAll('a, button').forEach(el => {
    const r = el.getBoundingClientRect();
    if ((r.width < 44 || r.height < 44) && !el.disabled)
      issues.push(`Target pequeno: ${el.tagName}`);
  });
  return issues;
};

// registro offline
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}

const quizSelect=document.getElementById('quizCurso');
const quizBox=$('.quiz-box');
if(quizSelect && quizBox) {
  quizSelect.addEventListener('change',()=>loadQuiz(quizSelect.value,quizBox));
  loadQuiz(quizSelect.value,quizBox);
}
