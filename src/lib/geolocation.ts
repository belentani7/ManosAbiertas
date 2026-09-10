export interface Coordinates {
  lat: number;
  lng: number;
}

export interface LocationResult {
  lat: number;
  lng: number;
  city: string;
  region: string;
  country: string;
  formattedAddress: string;
  confidence: number;
  source: 'ip' | 'gps' | 'manual';
}

export interface NearbyResource {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  address: string;
  city: string;
  region: string;
  country: string;
  lat: number;
  lng: number;
  distanceKm: number;
  phone?: string;
  email?: string;
  website?: string;
  hours?: string;
  services?: string[];
  languages?: string[];
  accessibility?: boolean;
  verifiedAt?: string;
  source: string;
  distanceMeters?: number;
}

export interface GeocodingResult {
  lat: number;
  lng: number;
  formattedAddress: string;
  city: string;
  region: string;
  country: string;
  confidence: number;
}

const NOMINATIM_BASE = 'https://nominatim.openstreetmap.org';
const USER_AGENT = 'ManosAbiertas/1.0 (contacto@manosabiertas.org)';

async function nominatimRequest<T>(endpoint: string, params: Record<string, string>): Promise<T> {
  const url = new URL(`${NOMINATIM_BASE}${endpoint}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  url.searchParams.set('format', 'json');
  url.searchParams.set('limit', '1');
  url.searchParams.set('accept-language', 'es');

  const response = await fetch(url.toString(), {
    headers: { 'User-Agent': USER_AGENT }
  });

  if (!response.ok) throw new Error(`Nominatim HTTP ${response.status}`);
  return response.json();
}

export async function geocodeAddress(address: string): Promise<GeocodingResult | null> {
  try {
    const results = await nominatimRequest<any[]>('/search', {
      q: address,
      addressdetails: '1',
      extratags: '1',
      namedetails: '1'
    });

    if (!results.length) return null;

    const result = results[0];
    return {
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
      formattedAddress: result.display_name,
      city: result.address?.city || result.address?.town || result.address?.village || result.address?.municipality || '',
      region: result.address?.state || result.address?.region || '',
      country: result.address?.country || '',
      confidence: parseFloat(result.importance || '0.5')
    };
  } catch {
    return null;
  }
}

export async function reverseGeocode(lat: number, lng: number): Promise<LocationResult | null> {
  try {
    const result = await nominatimRequest<any>('/reverse', {
      lat: lat.toString(),
      lon: lng.toString(),
      addressdetails: '1',
      extratags: '1',
      namedetails: '1',
      zoom: '18'
    });

    return {
      lat,
      lng,
      city: result.address?.city || result.address?.town || result.address?.village || result.address?.municipality || '',
      region: result.address?.state || result.address?.region || '',
      country: result.address?.country || '',
      formattedAddress: result.display_name,
      confidence: parseFloat(result.importance || '0.5'),
      source: 'gps'
    };
  } catch {
    return null;
  }
}

export async function getLocationFromIP(): Promise<LocationResult | null> {
  try {
    const response = await fetch('https://ipapi.co/json/', {
      headers: { 'User-Agent': USER_AGENT }
    });

    if (!response.ok) return null;

    const data = await response.json();
    if (!data.latitude || !data.longitude) return null;

    return {
      lat: data.latitude,
      lng: data.longitude,
      city: data.city || '',
      region: data.region || '',
      country: data.country_name || '',
      formattedAddress: `${data.city}, ${data.region}, ${data.country_name}`,
      confidence: 0.7,
      source: 'ip'
    };
  } catch {
    return null;
  }
}

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(toRad(lng2 - lng1) / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function toRad(deg: number): number {
  return deg * Math.PI / 180;
}

export async function findNearbyResources(
  lat: number,
  lng: number,
  options: {
    radiusKm?: number;
    categories?: string[];
    limit?: number;
    language?: string;
  } = {}
): Promise<NearbyResource[]> {
  const { radiusKm = 10, categories, limit = 20, language = 'es' } = options;

  try {
    const overpassQuery = buildOverpassQuery(lat, lng, radiusKm * 1000, categories);
    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `data=${encodeURIComponent(overpassQuery)}`
    });

    if (!response.ok) throw new Error('Overpass API error');

    const data = await response.json();
    return parseOverpassResults(data, lat, lng, limit);
  } catch {
    return [];
  }
}

function buildOverpassQuery(lat: number, lng: number, radiusMeters: number, categories?: string[]): string {
  const categoryFilters = categories?.map(cat => getOverpassCategoryFilter(cat)).filter(Boolean).join(' ') || '["amenity"]';
  return `[out:json][timeout:25];(
    node${categoryFilters}(around:${radiusMeters},${lat},${lng});
    way${categoryFilters}(around:${radiusMeters},${lat},${lng});
    relation${categoryFilters}(around:${radiusMeters},${lat},${lng});
  );out center meta;`;
}

function getOverpassCategoryFilter(category: string): string {
  const filters: Record<string, string> = {
    'extranjeria': '["office"="government"]["government"="immigration_office"]',
    'sepe': '["office"="government"]["government"="employment_office"]',
    'ayuntamiento': '["office"="government"]["government"="municipal"]',
    'salud': '["amenity"="hospital"]["healthcare"="hospital"]',
    'educacion': '["amenity"="school"]["amenity"="university"]["amenity"="college"]',
    'vivienda': '["office"="government"]["government"="housing"]',
    'ong': '["office"="ngo"]',
    'legal': '["office"="lawyer"]["office"="notary"]',
    'transporte': '["public_transport"="station"]["railway"="station"]',
    'alimentacion': '["shop"="supermarket"]["shop"="convenience"]["amenity"="food_bank"]',
    'empleo': '["office"="employment_agency"]',
    'educacion_idiomas': '["amenity"="language_school"]'
  };
  return filters[category] || '';
}

function parseOverpassResults(data: any, userLat: number, userLng: number, limit: number): NearbyResource[] {
  if (!data.elements) return [];

  const resources: NearbyResource[] = [];

  for (const element of data.elements) {
    const lat = element.lat || element.center?.lat;
    const lng = element.lon || element.center?.lon;
    if (!lat || !lng) continue;

    const tags = element.tags || {};
    const distance = haversineDistance(
      parseFloat(userLat.toString()), parseFloat(userLng.toString()),
      parseFloat(lat.toString()), parseFloat(lng.toString())
    );

    const resource: NearbyResource = {
      id: `osm-${element.type}-${element.id}`,
      name: tags.name || tags['official_name'] || tags['alt_name'] || 'Sin nombre',
      category: categorizeOSMElement(element),
      subcategory: tags.amenity || tags.office || tags.shop || tags.leisure,
      address: formatAddress(tags),
      city: tags['addr:city'] || tags['addr:town'] || tags['addr:village'] || '',
      region: tags['addr:state'] || tags['addr:region'] || '',
      country: tags['addr:country'] || 'ES',
      lat: parseFloat(lat.toString()),
      lng: parseFloat(lng.toString()),
      distanceKm: Math.round(distance * 100) / 100,
      phone: tags.phone || tags['contact:phone'],
      email: tags.email || tags['contact:email'],
      website: tags.website || tags['contact:website'],
      hours: tags.opening_hours,
      services: extractServices(tags),
      languages: extractLanguages(tags),
      accessibility: tags.wheelchair === 'yes',
      source: 'OpenStreetMap'
    };

    resources.push(resource);
  }

  return resources
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, 20);
}

function categorizeOSMElement(element: any): string {
  const tags = element.tags || {};
  if (tags.amenity) return tags.amenity;
  if (tags.office) return tags.office;
  if (tags.shop) return tags.shop;
  if (tags.leisure) return tags.leisure;
  if (tags.tourism) return tags.tourism;
  return 'unknown';
}

function formatAddress(tags: any): string {
  const parts = [
    tags['addr:street'],
    tags['addr:housenumber'],
    tags['addr:postcode'],
    tags['addr:city'],
    tags['addr:state']
  ].filter(Boolean);
  return parts.join(' ') || '';
}

function extractServices(tags: any): string[] {
  const services: string[] = [];
  if (tags.wheelchair === 'yes') services.push('Accesible');
  if (tags.internet_access === 'wlan') services.push('WiFi');
  if (tags['payment:cards'] === 'yes') services.push('Tarjeta');
  if (tags['payment:contactless'] === 'yes') services.push('Contactless');
  return services;
}

function extractLanguages(tags: any): string[] {
  const langs: string[] = [];
  if (tags['language:es']) langs.push('es');
  if (tags['language:en']) langs.push('en');
  if (tags['language:fr']) langs.push('fr');
  if (tags['language:ar']) langs.push('ar');
  return langs.length > 0 ? langs : ['es'];
}

export async function getUserLocation(): Promise<LocationResult | null> {
  // Try GPS first (would need client-side)
  // Fallback to IP-based
  return getLocationFromIP();
}

export async function findResourcesNearUser(
  query: string,
  userLocation?: { lat: number; lng: number },
  options: { radiusKm?: number; limit?: number } = {}
): Promise<NearbyResource[]> {
  if (!userLocation) {
    const location = await getLocationFromIP();
    if (!location) return [];
    userLocation = { lat: location.lat, lng: location.lng };
  }

  return findNearbyResources(userLocation.lat, userLocation.lng, {
    radiusKm: options.radiusKm || 10,
    limit: options.limit || 20
  });
}

export async function getDirections(
  from: Coordinates,
  to: Coordinates,
  mode: 'walking' | 'cycling' | 'driving' | 'transit' = 'walking'
): Promise<{ distance: number; duration: number; steps: any[] } | null> {
  try {
    const url = `https://router.project-osrm.org/route/v1/${mode}/${from.lng},${from.lat};${to.lng},${to.lat}?overview=false&steps=true&geometries=geojson`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.code !== 'Ok' || !data.routes?.length) return null;

    const route = data.routes[0];
    return {
      distance: route.distance / 1000, // km
      duration: route.duration / 60, // minutes
      steps: route.legs[0]?.steps?.map((step: any) => ({
        instruction: step.maneuver?.instruction || '',
        distance: step.distance / 1000,
        duration: step.duration / 60
      })) || []
    };
  } catch {
    return null;
  }
}

export function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(1)} km`;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${Math.round(minutes)} min`;
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
}