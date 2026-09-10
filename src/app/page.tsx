import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { isLanguageCode, LANGUAGES, type LanguageCode } from "@/i18n/languages";

const DEFAULT_LOCALE: LanguageCode = "es";

// Mirrors the old middleware locale detection, but runs in the Node runtime
// (no edge function, so Vercel's edge bundle cannot crash on __dirname).
function localeFromAcceptLanguage(value: string): LanguageCode {
  const tokens = value
    .split(",")
    .map((part) => part.split(";")[0].trim())
    .filter(Boolean);

  for (const token of tokens) {
    const lowered = token.toLowerCase();
    const exact = LANGUAGES.find((language) => language.code.toLowerCase() === lowered);
    if (exact) return exact.code;
  }
  for (const token of tokens) {
    const base = token.toLowerCase().split("-")[0];
    const byBase = LANGUAGES.find(
      (language) => language.code.toLowerCase().split("-")[0] === base,
    );
    if (byBase) return byBase.code;
  }
  return DEFAULT_LOCALE;
}

export default async function RootPage() {
  const headerStore = await headers();
  const cookieLocale = headerStore
    .get("cookie")
    ?.split(";")
    .map((pair) => pair.trim())
    .find((pair) => pair.startsWith("NEXT_LOCALE="))
    ?.slice("NEXT_LOCALE=".length);
  const locale =
    cookieLocale && isLanguageCode(cookieLocale)
      ? (cookieLocale as LanguageCode)
      : localeFromAcceptLanguage(headerStore.get("accept-language") ?? "");
  redirect(`/${locale}`);
}
