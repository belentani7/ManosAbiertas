// Read-only educational offline shell + real course documents (no user account data).
const SCOPE=new URL(self.registration.scope);
const PREFIX='manos-abiertas-campus:'+SCOPE.pathname+':';
const CACHE=PREFIX+'v4-review';
const CORE=['./','./index.html','./tokens.css','./app.js','./course-core.mjs','./course-viewer.mjs'];
for(const [slug,weeks] of [['alfabetizacion-ia',3],['office-sin-miedo',3],['falsos-amigos-pt-es',4]]){
  CORE.push('./cursos/'+slug+'/syllabus.md');
  CORE.push('./cursos/'+slug+'/recursos.md');
  CORE.push('./cursos/'+slug+'/quiz.json');
  for(let number=1;number<=weeks;number++){
    CORE.push('./cursos/'+slug+'/semana-'+String(number).padStart(2,'0')+'.md');
  }
}
for(const lang of ['pt','es','en','ca'])CORE.push('./voces/'+lang+'/bienvenida.mp3');
const ALLOWED=new Set(CORE.map(path=>new URL(path,self.registration.scope).pathname));
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)));
  self.skipWaiting();
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(
    keys.filter(key=>key.startsWith(PREFIX)&&key!==CACHE).map(key=>caches.delete(key))
  )));
  self.clients.claim();
});
self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return;
  const target=new URL(request.url);
  if(target.origin!==self.location.origin||!ALLOWED.has(target.pathname))return;
  event.respondWith((async()=>{
    try{
      const response=await fetch(request);
      if(response.ok&&response.type==='basic'){
        // Only the preapproved, public teaching resources can enter this cache.
        event.waitUntil(caches.open(CACHE).then(cache=>cache.put(request,response.clone())).catch(()=>{}));
      }
      return response;
    }catch{
      const cache=await caches.open(CACHE);
      const cached=await cache.match(request);
      if(cached)return cached;
      if(request.mode==='navigate'){
        const home=await cache.match(new URL('./index.html',self.registration.scope).href);
        if(home)return home;
      }
      return Response.error(); // Do not serve index.html as invalid JS, JSON or MP3.
    }
  })());
});

