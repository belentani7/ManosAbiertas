/** Canonical origin for public metadata. A configured verified domain overrides the default. */
export const DEFAULT_SITE_URL = 'https://manos-abiertas-rho.vercel.app';

export function resolveSiteUrl(value: string | undefined = process.env.NEXT_PUBLIC_SITE_URL): string {
  const candidate = value?.trim();
  if (!candidate) return DEFAULT_SITE_URL;
  try {
    const url = new URL(candidate);
    const isLocal = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
    if (!(url.protocol === 'https:' || (isLocal && url.protocol === 'http:'))) return DEFAULT_SITE_URL;
    if (url.username || url.password) return DEFAULT_SITE_URL;
    return url.origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const SITE_URL = resolveSiteUrl();
