import { serializeSavedRoute, type SavedRoute } from '../data/journeys.ts';

export const PERSONAL_ROUTE_STORAGE_KEY = 'manos-abiertas-personal-route';

type RouteStorage = Pick<Storage, 'setItem' | 'removeItem'>;

/**
 * Persist an optional personal route without assuming browser storage is available.
 * Changing goals must clear the old saved selection, even across reloads.
 */
export function persistPersonalRoute(
  route: SavedRoute | null,
  getStorage: () => RouteStorage,
): boolean {
  try {
    const storage = getStorage();
    if (route === null) {
      storage.removeItem(PERSONAL_ROUTE_STORAGE_KEY);
    } else {
      storage.setItem(PERSONAL_ROUTE_STORAGE_KEY, serializeSavedRoute(route));
    }
    return true;
  } catch {
    // Private browsing, policy restrictions and quota errors must not crash learning.
    return false;
  }
}
