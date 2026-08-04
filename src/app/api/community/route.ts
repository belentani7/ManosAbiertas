import { getStore } from '@netlify/blobs';
import { z } from 'zod';

const STORE_NAME = 'manos-abiertas-community';
const POST_PREFIX = 'post:';
const MAX_BODY_BYTES = 12_000;
const POST_COOLDOWN_MS = 30_000;

const postSchema = z.object({
  title: z.string().trim().min(5).max(140),
  category: z.enum(['legal', 'work', 'cities', 'tips']),
  author: z.string().trim().min(2).max(40).default('Mi gente'),
});

type CommunityPost = {
  id: string;
  title: string;
  category: 'legal' | 'work' | 'cities' | 'tips';
  author: string;
  replies: number;
  createdAt: string;
  source: 'community';
};

function response(data: unknown, status = 200) {
  return Response.json(data, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });
}

async function requestFingerprint(request: Request) {
  const address = request.headers.get('x-nf-client-connection-ip')
    || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || 'anonymous';
  const bytes = new TextEncoder().encode(address);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest)).map((value) => value.toString(16).padStart(2, '0')).join('').slice(0, 32);
}

export async function GET() {
  try {
    // Keep getStore inside the request handler. Netlify configures its runtime here.
    const store = getStore(STORE_NAME);
    const { blobs } = await store.list({ prefix: POST_PREFIX });
    const posts = await Promise.all(
      blobs.slice(-100).map(async ({ key }) => {
        const value = await store.get(key, { type: 'json', consistency: 'strong' }) as unknown;
        return value && typeof value === 'object' ? value as CommunityPost : null;
      })
    );

    return response({
      mode: 'shared',
      posts: posts
        .filter((post): post is CommunityPost => post !== null)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    });
  } catch {
    return response({ mode: 'local', posts: [], message: 'La comunidad compartida se activará al publicar en Netlify.' }, 503);
  }
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return response({ error: 'La solicitud es demasiado grande.' }, 413);
  }

  try {
    const parsed = postSchema.safeParse(await request.json());
    if (!parsed.success) {
      return response({ error: 'Tema no válido. Revisa el título, categoría y nombre.' }, 400);
    }

    const store = getStore(STORE_NAME);
    const rateKey = `rate:${await requestFingerprint(request)}`;
    const lastPost = await store.get(rateKey, { type: 'json', consistency: 'strong' }) as unknown;
    if (lastPost && typeof lastPost === 'object' && 'at' in lastPost && typeof lastPost.at === 'number' && Date.now() - lastPost.at < POST_COOLDOWN_MS) {
      return response({ error: 'Espera unos segundos antes de publicar otro tema.' }, 429);
    }

    const post: CommunityPost = {
      id: crypto.randomUUID(),
      title: parsed.data.title,
      category: parsed.data.category,
      author: parsed.data.author,
      replies: 0,
      createdAt: new Date().toISOString(),
      source: 'community',
    };

    // Keep getStore inside the request handler. No separate server is required.
    await store.setJSON(`${POST_PREFIX}${post.id}`, post, {
      metadata: { category: post.category },
    });
    await store.setJSON(rateKey, { at: Date.now() });

    return response({ mode: 'shared', post }, 201);
  } catch {
    return response({ error: 'La comunidad compartida no está disponible todavía.' }, 503);
  }
}
