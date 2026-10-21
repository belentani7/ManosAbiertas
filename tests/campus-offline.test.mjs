import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {Script,runInNewContext} from 'node:vm';
import {parseCourseMarkdown,linkTokens} from '../campus/course-core.mjs';
const root=new URL('../',import.meta.url);
const read=p=>readFileSync(new URL(p,root),'utf8');
const coursePaths=[['alfabetizacion-ia',3],['office-sin-miedo',3],['falsos-amigos-pt-es',4]];
test('original lessons are nonempty and structurally readable',()=>{
  for(const [slug,weeks] of coursePaths){
    const files=['syllabus.md','recursos.md',...Array.from({length:weeks},(_,i)=>'semana-'+String(i+1).padStart(2,'0')+'.md')];
    for(const name of files){
      const content=read('campus/cursos/'+slug+'/'+name);
      assert.ok(content.length>150,slug+'/'+name+' is empty');
      assert.ok(parseCourseMarkdown(content).some(block=>block.kind==='heading'));
    }
    const quiz=JSON.parse(read('campus/cursos/'+slug+'/quiz.json'));
    assert.ok(Array.isArray(quiz)&&quiz.length>=3);
    for(const q of quiz){
      assert.equal(typeof q.pregunta,'string');
      assert.ok(Array.isArray(q.opciones)&&q.opciones.length>=2);
      assert.ok(Number.isInteger(q.correcta)&&q.correcta>=0&&q.correcta<q.opciones.length);
      assert.equal(typeof q.explicacion,'string');
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
  assert.equal(files.length,29); // 6 core + 19 course resources + 4 voice files
  for(const name of files)assert.ok(existsSync(new URL(name,new URL('campus/',root))),'Missing '+name);
  assert.ok(listeners.install&&listeners.activate&&listeners.fetch);
  assert.match(read('campus/sw.js'),/target\.origin!==self\.location\.origin/);
  assert.match(read('campus/sw.js'),/Response\.error\(\)/);
  assert.match(read('campus/sw.js'),/key\.startsWith\('campus-v'\)/);
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
