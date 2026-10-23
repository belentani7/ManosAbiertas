import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {Script,runInNewContext} from 'node:vm';
import {parseCourseMarkdown,linkTokens} from '../campus/course-core.mjs';
import {publicCampusPaths} from '../scripts/prepare-public-campus.mjs';
const root=new URL('../',import.meta.url);
const read=p=>readFileSync(new URL(p,root),'utf8');
const coursePaths=[['alfabetizacion-ia',3],['office-sin-miedo',3],['falsos-amigos-pt-es',4]];
test('original lessons are nonempty and structurally readable',()=>{
  for(const [slug,weeks] of coursePaths){
    const files=['syllabus.md','recursos.md',...Array.from({length:weeks},(_,i)=>'semana-'+String(i+1).padStart(2,'0')+'.md')];
    for(const name of files){
      const content=read('campus/cursos/'+slug+'/'+name);
      const blocks = parseCourseMarkdown(content);
      assert.ok(content.length >= 500, slug+'/'+name+' is empty or skeletal');
      assert.ok(blocks.some(block => block.kind === 'heading'));
      // Practical depth is required for weekly lessons, not for compact
      // syllabi or bibliographic resource lists.
      if (name.startsWith('semana-')) {
        assert.ok(content.length >= 1800, slug+'/'+name+' still contains only a placeholder');
        assert.ok(blocks.filter(block => block.kind === 'heading').length >= 4,
          slug+'/'+name+' lacks a genuine guided learning structure');
        assert.match(content, /EJERCICIO|PRÁCTICA|TALLER|PROYECTO/i,
          slug+'/'+name+' needs real applied work');
        assert.match(content, /RÚBRICA|EVALUACI|CORRECCI|SOLUCION|AUTOEVALU|ENTREGA/i,
          slug+'/'+name+' needs criteria or correction');
      }
    }
    const quiz=JSON.parse(read('campus/cursos/'+slug+'/quiz.json'));
    assert.ok(Array.isArray(quiz)&&quiz.length>=3);
    if (slug === 'falsos-amigos-pt-es') {
      assert.equal(quiz.length, 40, 'the promised final exam requires forty real cases');
      assert.equal(new Set(quiz.map(question => question.pregunta)).size, 40,
        'each final-exam question must be distinct');
      assert.ok(quiz.every(question => question.opciones.length === 4 &&
        new Set(question.opciones).size === 4), 'all final-exam choices must be substantive');
    }
    for(const q of quiz){
      assert.equal(typeof q.pregunta,'string');
      assert.ok(Array.isArray(q.opciones)&&q.opciones.length>=2);
      assert.ok(Number.isInteger(q.correcta)&&q.correcta>=0&&q.correcta<q.opciones.length);
      assert.equal(typeof q.explicacion,'string');
    }
  }
});
test('all published course links resolve to a real tracked local document', () => {
  for (const [slug, weeks] of coursePaths) {
    const files = ['syllabus.md', 'recursos.md',
      ...Array.from({length: weeks}, (_, i) => 'semana-'+String(i+1).padStart(2,'0')+'.md')];
    for (const file of files) {
      const rel = 'campus/cursos/'+slug+'/'+file;
      const source = new URL(rel, root);
      const document = read(rel);
      for (const link of linkTokens(document)) {
        if (link.kind !== 'link') continue;
        const target = new URL(link.href, source);
        if (['https:', 'http:', 'mailto:'].includes(target.protocol)) continue;
        assert.equal(target.protocol, 'file:', rel+' contains a non-local unsafe scheme');
        assert.ok(target.href.startsWith(root.href), rel+' escapes campus root: '+link.href);
        assert.ok(existsSync(target), rel+' has a broken link to '+link.href);
      }
    }
  }
});

test('course parser treats HTML as plain text and limits oversized data',()=>{
  const blocks=parseCourseMarkdown('# Title\n- Example\n<script>alert(1)</script>');
  assert.equal(blocks[0].kind,'heading');
  assert.equal(blocks[1].kind,'item');
  assert.equal(blocks[2].text,'<script>alert(1)</script>');
  assert.throws(()=>parseCourseMarkdown('x'.repeat(131073)));
  assert.deepEqual(linkTokens('Ver [programa](syllabus.md)')[1],
    {kind:'link',text:'programa',href:'syllabus.md'});
});
test('the offline precache includes all advertised course units, quizzes and audio',()=>{
  const listeners={};
  const scope='https://example.org/campus/';
  const ctx={URL,Response,console,self:{
    registration:{scope},location:{origin:'https://example.org'},clients:{claim(){}},
    skipWaiting(){},addEventListener:(name,handler)=>{listeners[name]=handler}
  },caches:{}};
  runInNewContext(read('campus/sw.js')+'\nglobalThis.__offlineFiles=CORE;',ctx);
  const files=Array.from(ctx.__offlineFiles);
  assert.equal(new Set(files).size,files.length);
  assert.equal(files.length,32); // 9 core (including Escudo) + 19 course resources + 4 voice files
  for(const name of ['./escudo/index.html','./escudo/core.mjs','./escudo/recovery.mjs'])assert.ok(files.includes(name),name);
  // The Next.js publication and PWA manifests must contain the same learning assets.
  const published=new Set(publicCampusPaths());
  for(const path of files){
    if(path==='./')continue;
    assert.ok(published.has(path.replace(/^\.\//,'')), 'Offline asset not in Next release: '+path);
  }
  assert.ok(published.has('sw.js')&&published.has('manifest.webmanifest'));
  assert.equal(published.size,files.length+1); // SW + manifest, minus the alias "./".

  for(const name of files)assert.ok(existsSync(new URL(name,new URL('campus/',root))),'Missing '+name);
  assert.ok(listeners.install&&listeners.activate&&listeners.fetch);
  assert.match(read('campus/sw.js'),/target\.origin!==self\.location\.origin/);
  assert.match(read('campus/sw.js'),/Response\.error\(\)/);
  assert.match(read('campus/sw.js'),/key\.startsWith\(PREFIX\)/);
});

test('offline recovery is isolated to this campus scope', async () => {
  const listeners = {};
  const scope = 'https://example.org/campus/';
  const deleted = [];
  const keys = ['campus-v4-legacy', 'manos-abiertas-campus:/other/:v1'];
  const campusCache = {
    match: async () => new Response('current campus response'),
  };
  const context = {
    URL,
    Response,
    console,
    self: {
      registration: { scope },
      location: { origin: 'https://example.org' },
      clients: { claim() {} },
      skipWaiting() {},
      addEventListener: (name, handler) => { listeners[name] = handler; },
    },
    caches: {
      keys: async () => keys,
      delete: async key => { deleted.push(key); },
      open: async name => { context.opened = name; return campusCache; },
      match: async () => new Response('foreign application response'),
    },
    fetch: async () => { throw new Error('offline'); },
  };
  runInNewContext(read('campus/sw.js') + '\nglobalThis.__cacheName = CACHE;', context);
  keys.push('manos-abiertas-campus:/campus/:old', context.__cacheName);

  let activation;
  listeners.activate({ waitUntil: promise => { activation = promise; } });
  await activation;
  assert.deepEqual(deleted, ['manos-abiertas-campus:/campus/:old']);

  let responsePromise;
  listeners.fetch({
    request: { url: scope + 'index.html', method: 'GET', mode: 'navigate' },
    respondWith: value => { responsePromise = value; },
    waitUntil() {},
  });
  assert.equal(await (await responsePromise).text(), 'current campus response');
  assert.equal(context.opened, context.__cacheName);
});

test('campus UI has real course navigation and local quiz choice',()=>{
  const page=read('campus/index.html');
  assert.match(page,/id="lector"/);
  assert.match(page,/id="lector-nav"/);
  assert.match(page,/id="quizCurso"/);
  assert.match(page,/course-viewer\.mjs/);
  assert.doesNotMatch(page,/estilo Harvard\/Coursera/);
  new Script(read('campus/app.js'));
});
