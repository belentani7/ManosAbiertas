import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getSpeechLang, selectSpeechVoice, waitForSpeechVoice, getSpeechPlaybackAction } from '../../src/lib/speech-locale.ts';

test('regional language mapping never silently falls back to Spanish', () => {
  const expected = {
    es:'es-ES', ca:'ca-ES', 'pt-BR':'pt-BR', pt:'pt-PT',
    en:'en-US', bg:'bg-BG', nl:'nl-NL', sv:'sv-SE',
    da:'da-DK', fi:'fi-FI', no:'nb-NO', el:'el-GR',
  };
  for (const [language, locale] of Object.entries(expected))
    assert.equal(getSpeechLang(language), locale, language);
  for (const unknown of ['unknown', 'en-GB', 'pt-AO', '', 'es-MX'])
    assert.equal(getSpeechLang(unknown), 'und', unknown);
});

test('a premium voice in the wrong region never overrides an exact locale', () => {
  const voices = [
    {lang:'es-MX',name:'Natural México'},
    {lang:'en-US',name:'Natural English'},
    {lang:'es-ES',name:'Español España'},
  ];
  assert.equal(selectSpeechVoice(voices, 'es-ES'), voices[2]);
  assert.equal(selectSpeechVoice(voices, 'pt-BR'), undefined);
  assert.equal(selectSpeechVoice(voices, 'und'), undefined);
});

test('enhanced voice wins only among same-locale voices', () => {
  const voices = [
    {lang:'ca-ES',name:'Joana'},
    {lang:'ca_ES',name:'Joana Neural'},
    {lang:'es-ES',name:'Español Neural'},
  ];
  assert.equal(selectSpeechVoice(voices,'ca-ES'),voices[1]);
});

test('waits for delayed browser voices before reporting unavailable', async () => {
  const voice = {lang:'pt-BR',name:'Português Brasil'};
  let voices = [];
  let changed;
  const source = {
    getVoices: () => voices,
    addEventListener: (event, listener) => {
      assert.equal(event, 'voiceschanged');
      changed = listener;
    },
    removeEventListener: (event, listener) => {
      assert.equal(event, 'voiceschanged');
      assert.equal(listener, changed);
      changed = undefined;
    },
  };
  const pending = waitForSpeechVoice(source, 'pt-BR', 100);
  setTimeout(() => {
    voices = [voice];
    changed?.();
  }, 0);
  assert.equal(await pending, voice);
  assert.equal(changed, undefined);
});

test('voice batches do not abort before the requested lesson locale arrives', async () => {
  let voices = [];
  const listeners = new Set();
  const source = {
    getVoices: () => voices,
    addEventListener: (event, listener) => {
      assert.equal(event, 'voiceschanged');
      listeners.add(listener);
    },
    removeEventListener: (event, listener) => {
      assert.equal(event, 'voiceschanged');
      listeners.delete(listener);
    },
  };
  const pending = waitForSpeechVoice(source, 'pt-BR', 100);
  voices = [{ lang: 'en-US', name: 'English' }];
  for (const listener of listeners) listener();
  assert.equal(listeners.size, 1, 'unrelated voice event must keep waiting');
  const expected = { lang: 'pt-BR', name: 'Português brasileiro' };
  voices.push(expected);
  for (const listener of listeners) listener();
  assert.equal(await pending, expected);
  assert.equal(listeners.size, 0);
});

test('voice wait times out cleanly without inventing a voice', async () => {
  const listeners = new Set();
  const source = {
    getVoices: () => [{ lang: 'es-ES', name: 'Español' }],
    addEventListener: (_event, listener) => listeners.add(listener),
    removeEventListener: (_event, listener) => listeners.delete(listener),
  };
  assert.equal(await waitForSpeechVoice(source, 'ca-ES', 5), undefined);
  assert.equal(listeners.size, 0);
});

test('player always maps its visible pause/resume control to an action', () => {
  assert.equal(getSpeechPlaybackAction(false, false), 'start');
  assert.equal(getSpeechPlaybackAction(false, true), 'start');
  assert.equal(getSpeechPlaybackAction(true, false), 'pause');
  assert.equal(getSpeechPlaybackAction(true, true), 'resume');
});
