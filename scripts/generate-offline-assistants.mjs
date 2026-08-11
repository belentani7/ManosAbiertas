import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const outputRoot = path.join(process.cwd(), 'public', 'offline-assistants');
const topics = {
  cv: ['curriculum', 'cv', 'resume', 'experiencia', 'skills', 'habilidades', 'foto', 'plantilla'],
  courses: ['curso', 'courses', 'aprender', 'leccion', 'lesson', 'certificado', 'estudiar'],
  ai: ['ia', 'ai', 'prompt', 'chatgpt', 'gemini', 'copilot', 'modelo'],
  rights: ['derechos', 'rights', 'papeles', 'nie', 'residencia', 'contrato', 'tramite'],
  digital: ['windows', 'linux', 'mac', 'archivo', 'file', 'carpeta', 'navegador', 'seguridad'],
};

const languages = {
  es: {
    label: 'Espanol', locale: 'es-ES', title: 'Asistente local', placeholder: 'Escribe una duda breve', send: 'Preguntar', speak: 'Escuchar',
    fallback: 'Puedo resolver dudas pequenas sobre este tema. Prueba una pregunta mas concreta y menciona tu objetivo.',
    replies: {
      cv: 'Para un CV claro: indica el trabajo que buscas, resume tu experiencia con verbos de accion, anade habilidades demostrables y adapta el texto a la oferta.',
      courses: 'Empieza por una leccion corta, completa el ejercicio y guarda una evidencia practica. Todo el contenido educativo de Manos Abiertas es gratuito.',
      ai: 'Escribe un objetivo, contexto y formato esperado. Revisa datos, privacidad y fuentes antes de usar la respuesta.',
      rights: 'Identifica el tramite exacto y comprueba requisitos en una fuente oficial. Guarda copias y pide ayuda profesional si hay riesgo legal.',
      digital: 'Describe sistema, programa y mensaje de error. Haz una copia antes de cambiar archivos y ejecuta un paso cada vez.',
    },
  },
  en: {
    label: 'English', locale: 'en-GB', title: 'Local assistant', placeholder: 'Ask a short question', send: 'Ask', speak: 'Listen',
    fallback: 'I can answer small questions about this topic. Try a more specific question and include your goal.',
    replies: {
      cv: 'For a clear CV, name the job you want, describe experience with action verbs, add demonstrable skills, and adapt the text to the vacancy.',
      courses: 'Start with one short lesson, finish the exercise, and save practical evidence. All Manos Abiertas educational content is free.',
      ai: 'State the goal, context, and expected format. Check facts, privacy, and sources before using the answer.',
      rights: 'Identify the exact procedure and verify requirements on an official source. Keep copies and seek professional help when legal risk is involved.',
      digital: 'Name the operating system, program, and exact error. Back up files before changes and apply one step at a time.',
    },
  },
  pt: {
    label: 'Portugues', locale: 'pt-BR', title: 'Assistente local', placeholder: 'Escreva uma pergunta curta', send: 'Perguntar', speak: 'Ouvir',
    fallback: 'Posso responder duvidas pequenas sobre este tema. Tente uma pergunta mais concreta e diga seu objetivo.',
    replies: {
      cv: 'Para um curriculo claro, indique a vaga desejada, descreva a experiencia com verbos de acao, adicione habilidades comprovaveis e adapte o texto.',
      courses: 'Comece com uma licao curta, conclua o exercicio e guarde uma evidencia pratica. Todo o conteudo educativo do Manos Abiertas e gratuito.',
      ai: 'Informe objetivo, contexto e formato esperado. Verifique fatos, privacidade e fontes antes de usar a resposta.',
      rights: 'Identifique o procedimento exato e confirme requisitos em uma fonte oficial. Guarde copias e procure ajuda profissional em caso de risco juridico.',
      digital: 'Informe sistema, programa e mensagem de erro. Faca backup antes de alterar arquivos e execute um passo por vez.',
    },
  },
  fr: {
    label: 'Francais', locale: 'fr-FR', title: 'Assistant local', placeholder: 'Ecrivez une question courte', send: 'Demander', speak: 'Ecouter',
    fallback: 'Je peux repondre a de petites questions sur ce sujet. Precisez votre question et votre objectif.',
    replies: {
      cv: 'Pour un CV clair, indiquez le poste vise, decrivez votre experience avec des verbes d action, ajoutez des competences verifiables et adaptez le texte.',
      courses: 'Commencez par une courte lecon, terminez l exercice et gardez une preuve pratique. Tout le contenu educatif de Manos Abiertas est gratuit.',
      ai: 'Indiquez objectif, contexte et format attendu. Verifiez les faits, la confidentialite et les sources avant utilisation.',
      rights: 'Identifiez la demarche exacte et verifiez les conditions sur une source officielle. Gardez des copies et consultez un professionnel en cas de risque juridique.',
      digital: 'Indiquez le systeme, le programme et le message d erreur. Sauvegardez les fichiers et appliquez une etape a la fois.',
    },
  },
};

function escapeJson(value) {
  return JSON.stringify(value).replaceAll('<', '\\u003c');
}

function page(languageKey, language, topic) {
  const data = { locale: language.locale, fallback: language.fallback, reply: language.replies[topic], keywords: topics[topic] };
  return `<!doctype html>
<html lang="${languageKey}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${language.title}: ${topic}</title><style>
*{box-sizing:border-box}body{margin:0;background:#eef2f3;color:#172126;font:16px/1.5 system-ui,sans-serif}.app{width:min(720px,calc(100% - 24px));margin:24px auto;background:#fff;border:1px solid #cad4d8}.head{padding:20px;background:#173f4f;color:#fff}.head h1{margin:0;font-size:22px}.head p{margin:4px 0 0;color:#c9dde5}.log{min-height:320px;padding:20px;display:grid;align-content:start;gap:10px}.msg{max-width:85%;padding:10px 12px;border-radius:6px;background:#edf2f4}.user{margin-left:auto;background:#d8eee7}.form{display:grid;grid-template-columns:1fr auto;gap:8px;border-top:1px solid #cad4d8;padding:12px}input,button{min-height:44px;border:1px solid #9eb0b8;border-radius:4px;font:inherit}input{padding:0 12px}button{padding:0 14px;background:#0c725f;color:#fff;cursor:pointer}.speak{background:#314c57}@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important}}@media(max-width:520px){.form{grid-template-columns:1fr}.msg{max-width:95%}}
</style></head><body><main class="app"><header class="head"><h1>${language.title}</h1><p>${language.label} / ${topic} / offline</p></header><section id="log" class="log" aria-live="polite"><div class="msg">${language.replies[topic]}</div></section><form id="form" class="form"><input id="q" aria-label="${language.placeholder}" placeholder="${language.placeholder}" autocomplete="off"><button>${language.send}</button><button type="button" id="speak" class="speak">${language.speak}</button></form></main><script>
const DATA=${escapeJson(data)};const log=document.querySelector('#log');const q=document.querySelector('#q');let last=DATA.reply;
const norm=s=>s.toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').replace(/[^a-z0-9 ]/g,' ');
function score(text){const tokens=new Set(norm(text).split(/\\s+/).filter(Boolean));return DATA.keywords.reduce((n,k)=>n+(tokens.has(norm(k))?2:0),0)}
function answer(text){if(norm(text).split(/\\s+/).length<2)return DATA.fallback;return score(text)>0?DATA.reply:DATA.fallback}
function add(text,kind){const el=document.createElement('div');el.className='msg '+kind;el.textContent=text;log.append(el);el.scrollIntoView({block:'end'});}
document.querySelector('#form').addEventListener('submit',e=>{e.preventDefault();const text=q.value.trim();if(!text)return;add(text,'user');last=answer(text);add(last,'bot');q.value='';q.focus();});
document.querySelector('#speak').addEventListener('click',()=>{if(!('speechSynthesis'in window))return;const u=new SpeechSynthesisUtterance(last);u.lang=DATA.locale;speechSynthesis.cancel();speechSynthesis.speak(u);});
</script></body></html>`;
}

await mkdir(outputRoot, { recursive: true });
const manifest = [];
for (const [languageKey, language] of Object.entries(languages)) {
  const languageDir = path.join(outputRoot, languageKey);
  await mkdir(languageDir, { recursive: true });
  for (const topic of Object.keys(topics)) {
    const file = path.join(languageDir, `${topic}.html`);
    await writeFile(file, page(languageKey, language, topic), 'utf8');
    manifest.push({ language: languageKey, topic, url: `/offline-assistants/${languageKey}/${topic}.html` });
  }
}
await writeFile(path.join(outputRoot, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
console.log(`Generated ${manifest.length} offline assistants.`);
