/** Pure locale/voice routing used by educational synthesis and recognition. */
/** Locale fidelity is mandatory. A browser "natural" voice in another
 * language/region must never outrank the intended lesson locale.
 */
export function selectSpeechVoice(
  voices: ReadonlyArray<SpeechSynthesisVoice>,
  locale: string,
): SpeechSynthesisVoice | undefined {
  if (!locale || locale === 'und') return undefined;
  const requested = locale.replace(/_/g, '-').toLowerCase();
  const matching = voices.filter(
    (voice) => voice.lang.replace(/_/g, '-').toLowerCase() === requested,
  );
  return matching.find((voice) => /natural|premium|neural|enhanced/i.test(voice.name))
    || matching[0];
}

// Map app language codes to BCP-47 speech language codes
export function getSpeechLang(lang: string): string {
  const map: Record<string, string> = {
    es: 'es-ES',
    en: 'en-US',
    ca: 'ca-ES',
    'pt-BR': 'pt-BR',
    pt: 'pt-PT',
    fr: 'fr-FR',
    ar: 'ar-SA',
    zh: 'zh-CN',
    hi: 'hi-IN',
    ro: 'ro-RO',
    bg: 'bg-BG',
    nl: 'nl-NL',
    sv: 'sv-SE',
    da: 'da-DK',
    fi: 'fi-FI',
    no: 'nb-NO',
    el: 'el-GR',
    qu: 'qu-PE',
    ber: 'zgh-MA',
    uk: 'uk-UA',
    ru: 'ru-RU',
    de: 'de-DE',
    it: 'it-IT',
    pl: 'pl-PL',
    tr: 'tr-TR',
    ur: 'ur-PK',
    fa: 'fa-IR',
    bn: 'bn-IN',
    pa: 'pa-IN',
    ta: 'ta-IN',
    te: 'te-IN',
    mr: 'mr-IN',
    gu: 'gu-IN',
    sw: 'sw-KE',
    am: 'am-ET',
    tl: 'fil-PH',
    vi: 'vi-VN',
    ja: 'ja-JP',
    ko: 'ko-KR',
  };
  // Unknown language codes must not be pronounced as Spanish by default.
  // 'und' is intentionally unvoiced until a real regional voice is configured.
  return map[lang] || 'und';
}
