import {test} from 'node:test';
import assert from 'node:assert/strict';
import {lstatSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname,resolve,join} from 'node:path';
import {publicCampusPaths} from '../../scripts/prepare-public-campus.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'../..');
test('Next campus staging uses an explicit complete, unique whitelist',()=>{
 const paths=publicCampusPaths();
 assert.equal(paths.length,33);
 assert.equal(new Set(paths).size,paths.length);
 for(const path of paths){
  assert.doesNotMatch(path,/(^\/|\/\.\.|\.env|\.key|\.pem|private)/i);
  const stat=lstatSync(join(root,'campus',path));
  assert.ok(stat.isFile()&&!stat.isSymbolicLink()&&stat.size<16*1024*1024,path);
 }
 for(const required of ['escudo/index.html','escudo/core.mjs','escudo/recovery.mjs','index.html','sw.js','voces/pt/bienvenida.mp3'])assert.ok(paths.includes(required));
});
