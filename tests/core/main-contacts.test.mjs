import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { registerHooks } from 'node:module';
import { extname } from 'node:path';
import { fileURLToPath } from 'node:url';

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (context.parentURL?.endsWith('.ts') && specifier.startsWith('.') && !extname(specifier)) {
      const candidate = new URL(`${specifier}.ts`, context.parentURL);
      if (existsSync(fileURLToPath(candidate))) return nextResolve(candidate.href, context);
    }
    return nextResolve(specifier, context);
  },
});

const {
  EMBASSY_CONTACTS,
  MAIN_EMERGENCY_CONTACTS,
  MAIN_EMERGENCY_IDS,
  NGO_CONTACTS,
  contactLabel,
  toTelHref,
} = await import('../../src/data/main-contacts.ts');
const { EMERGENCY_CONTACTS } = await import('../../src/data/rights-guide.ts');

const PHONE_RE = /^\+?[\d\s]+$/;

test('los 8 contactos de emergencia principales existen en el catálogo verificado', () => {
  assert.equal(MAIN_EMERGENCY_IDS.length, 8);
  assert.equal(new Set(MAIN_EMERGENCY_IDS).size, 8, 'los ids principales no se repiten');
  assert.equal(MAIN_EMERGENCY_CONTACTS.length, 8, 'ningún contacto principal puede faltar');
  for (const id of MAIN_EMERGENCY_IDS) {
    assert.ok(
      EMERGENCY_CONTACTS.some((c) => c.id === id),
      `el id ${id} debe existir en EMERGENCY_CONTACTS`,
    );
  }
});

test('el 112 está siempre disponible como emergencia universal', () => {
  const emergency = MAIN_EMERGENCY_CONTACTS.find((c) => c.id === 'emergencias-112');
  assert.ok(emergency, 'el 112 no puede desaparecer del acceso principal');
  assert.equal(emergency.phone, '112');
  assert.equal(emergency.available24h, true);
});

test('todos los contactos principales tienen teléfono estático utilizable', () => {
  for (const contact of MAIN_EMERGENCY_CONTACTS) {
    assert.match(contact.phone, PHONE_RE, `${contact.id} sin teléfono válido`);
    assert.match(toTelHref(contact.phone), /^tel:\+?[\d]+$/, `${contact.id} sin enlace tel: válido`);
    assert.ok(contactLabel(contact).length > 0);
  }
});

test('las ONGs exponen teléfono y web oficiales estáticos', () => {
  assert.ok(NGO_CONTACTS.length >= 8);
  for (const ngo of NGO_CONTACTS) {
    assert.match(ngo.phone, PHONE_RE, `${ngo.name} sin teléfono válido`);
    assert.match(toTelHref(ngo.phone), /^tel:\+?[\d]+$/, `${ngo.name} sin enlace tel: válido`);
    assert.match(ngo.url, /^https:\/\//, `${ngo.name} debe enlazar https oficial`);
  }
});

test('las embajadas exponen teléfono y web oficiales estáticos', () => {
  assert.ok(EMBASSY_CONTACTS.length >= 12);
  assert.equal(new Set(EMBASSY_CONTACTS.map((e) => e.country)).size, EMBASSY_CONTACTS.length);
  for (const emb of EMBASSY_CONTACTS) {
    assert.match(emb.phone, PHONE_RE, `${emb.country} sin teléfono válido`);
    assert.match(toTelHref(emb.phone), /^tel:\+?[\d]+$/, `${emb.country} sin enlace tel: válido`);
    assert.match(emb.url, /^https?:\/\//, `${emb.country} sin web oficial`);
  }
});

test('toTelHref y contactLabel son puros y deterministas', () => {
  assert.equal(toTelHref('900 222 100'), 'tel:900222100');
  assert.equal(toTelHref('+34 913 191 999'), 'tel:+34913191999');
  assert.equal(contactLabel({ name: '016 — Violencia de género', phone: '016' }), 'Violencia de género');
  assert.equal(contactLabel({ name: '112 Emergencias', phone: '112' }), 'Emergencias');
  assert.equal(contactLabel({ name: '061', phone: '061' }), '061', 'sin etiqueta, se conserva el nombre');
});
