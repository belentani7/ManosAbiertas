/**
 * Browser-level CSRF guard for same-origin educational API mutations.
 * Non-browser API clients without Origin/Fetch-Metadata remain allowed;
 * authentication, schema validation and rate limits still apply separately.
 */
export function isTrustedStateChangeRequest(request: Request): boolean {
  if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method.toUpperCase())) return true;

  // Cross-site form submissions are rejected even when Origin is unavailable.
  const site = request.headers.get('sec-fetch-site')?.toLowerCase();
  if (site === 'cross-site' || (site && !['same-origin', 'none'].includes(site))) {
    return false;
  }

  const origin = request.headers.get('origin');
  if (origin !== null) {
    try {
      const actual = new URL(origin);
      const expected = new URL(request.url);
      return actual.origin === expected.origin && ['https:', 'http:'].includes(actual.protocol);
    } catch {
      return false; // Includes opaque Origin: null
    }
  }

  return true;
}
