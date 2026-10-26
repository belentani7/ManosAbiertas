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

type SpeechVoiceSource = Pick<
  SpeechSynthesis,
  'getVoices' | 'addEventListener' | 'removeEventListener'
>;

/**
 * Browser voices may arrive asynchronously after the first getVoices() call.
 * Wait briefly for voiceschanged before reporting that an exact locale is absent.
 */
export function waitForSpeechVoice(
  source: SpeechVoiceSource,
  locale: string,
  timeoutMs = 1000,
): Promise<SpeechSynthesisVoice | undefined> {
  const immediate = selectSpeechVoice(source.getVoices(), locale);
  if (immediate || !locale || locale === 'und') return Promise.resolve(immediate);

  return new Promise((resolve) => {
    let timer: ReturnType<typeof setTimeout>;
    const finish = () => {
      const voice = selectSpeechVoice(source.getVoices(), locale);
      // Some browsers announce several voice batches. An unrelated batch
      // must not make a valid lesson voice appear unavailable prematurely.
      if (!voice) return;
      clearTimeout(timer);
      source.removeEventListener('voiceschanged', finish);
      resolve(voice);
    };
    timer = setTimeout(() => {
      source.removeEventListener('voiceschanged', finish);
      resolve(selectSpeechVoice(source.getVoices(), locale));
    }, timeoutMs);
    source.addEventListener('voiceschanged', finish);
    // Cover voices arriving between the initial getVoices and listener setup.
    finish();
  });
}

export type SpeechPlaybackAction = 'start' | 'pause' | 'resume';

export function getSpeechPlaybackAction(speaking: boolean, paused: boolean): SpeechPlaybackAction {
  if (!speaking) return 'start';
  return paused ? 'resume' : 'pause';
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
