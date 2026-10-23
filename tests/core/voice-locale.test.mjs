import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getSpeechLang, selectSpeechVoice, waitForSpeechVoice } from '../../src/lib/speech-locale.ts';

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
