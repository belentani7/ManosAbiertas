import { aiRegistry, AIModelConfig } from './ai-provider';

export interface DocumentChunk {
  id: string;
  content: string;
  metadata: {
    source: string;
    title: string;
    url?: string;
    category?: string;
    tags?: string[];
    language?: string;
    verifiedAt?: string;
    expiresAt?: string;
    location?: { lat: number; lng: number; city?: string; country?: string };
    priority?: number;
    resourceId?: string;
    section?: string;
    pageNumber?: number;
  };
  embedding?: number[];
}

export interface SearchResult {
  chunk: DocumentChunk;
  score: number;
  rank: number;
}

export interface RAGConfig {
  embeddingModel: string;
  embeddingProvider: string;
  embeddingDimension: number;
  chunkSize: number;
  chunkOverlap: number;
  topK: number;
  similarityThreshold: number;
  maxContextTokens: number;
  rerankModel?: string;
}

const DEFAULT_RAG_CONFIG: RAGConfig = {
  embeddingModel: 'text-embedding-3-small',
  embeddingProvider: 'openai',
  embeddingDimension: 1536,
  chunkSize: 800,
  chunkOverlap: 150,
  topK: 10,
  similarityThreshold: 0.7,
  maxContextTokens: 4000,
  rerankModel: 'cross-encoder/ms-marco-MiniLM-L-6-v2'
};

interface VectorStore {
  upsert(chunks: DocumentChunk[]): Promise<void>;
  search(queryEmbedding: number[], topK: number, filter?: Record<string, any>): Promise<SearchResult[]>;
  delete(ids: string[]): Promise<void>;
  clear(): Promise<void>;
  count(): Promise<number>;
}

class InMemoryVectorStore implements VectorStore {
  private chunks: DocumentChunk[] = [];
  private embeddings: Map<string, number[]> = new Map();

  async upsert(chunks: DocumentChunk[]): Promise<void> {
    for (const chunk of chunks) {
      this.chunks = this.chunks.filter(c => c.id !== chunk.id);
      this.chunks.push(chunk);
      if (chunk.embedding) {
        this.embeddings.set(chunk.id, chunk.embedding);
      }
    }
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    let dot = 0, normA = 0, normB = 0;
    for (let i = 0; i < a.length; i++) {
      dot += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }
    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  async search(queryEmbedding: number[], topK: number, filter?: Record<string, any>): Promise<SearchResult[]> {
    const results: SearchResult[] = [];

    for (const chunk of this.chunks) {
      if (filter) {
        let match = true;
        for (const [key, value] of Object.entries(filter)) {
          const metaValue = (chunk.metadata as any)[key];
          if (Array.isArray(value)) {
            if (!value.includes(metaValue)) { match = false; break; }
          } else if (metaValue !== value) {
            match = false; break;
          }
        }
        if (!match) continue;
      }

      const embedding = this.embeddings.get(chunk.id);
      if (!embedding) continue;

      const score = this.cosineSimilarity(queryEmbedding, embedding);
      if (score >= 0.5) {
        results.push({ chunk, score, rank: 0 });
      }
    }

    results.sort((a, b) => b.score - a.score);
    return results.slice(0, topK).map((r, i) => ({ ...r, rank: i + 1 }));
  }

  async delete(ids: string[]): Promise<void> {
    this.chunks = this.chunks.filter(c => !ids.includes(c.id));
    for (const id of ids) this.embeddings.delete(id);
  }

  async clear(): Promise<void> {
    this.chunks = [];
    this.embeddings.clear();
  }

  async count(): Promise<number> {
    return this.chunks.length;
  }
}

class PineconeVectorStore implements VectorStore {
  private apiKey: string;
  private indexName: string;
  private baseUrl: string;

  constructor(apiKey: string, indexName: string, environment?: string) {
    this.apiKey = apiKey;
    this.indexName = indexName;
    this.baseUrl = `https://${indexName}.svc.${environment || 'us-east-1'}.pinecone.io`;
  }

  async upsert(chunks: DocumentChunk[]): Promise<void> {
    const vectors = chunks.map(chunk => ({
      id: chunk.id,
      values: chunk.embedding || [],
      metadata: chunk.metadata
    });

    await fetch(`https://${this.indexName}.svc.pinecone.io/vectors/upsert`, {
      method: 'POST',
      headers: { 'Api-Key': this.apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ vectors, namespace: 'manos-abiertas' })
    });
  }

  async search(queryEmbedding: number[], topK: number, filter?: Record<string, any>): Promise<SearchResult[]> {
    const response = await fetch(`https://${this.indexName}.svc.pinecone.io/query`, {
      method: 'POST',
      headers: { 'Api-Key': this.apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        vector: queryEmbedding,
        topK,
        filter,
        includeMetadata: true,
        includeValues: false,
        namespace: 'manos-abiertas'
      })
    });

    const data = await response.json();
    return (data.matches || []).map((m: any, i: number) => ({
      chunk: { id: m.id, content: '', metadata: m.metadata },
      score: m.score,
      rank: i + 1
    }));
  }

  async delete(ids: string[]): Promise<void> {
    await fetch(`https://${this.indexName}.svc.pinecone.io/vectors/delete`, {
      method: 'POST',
      headers: { 'Api-Key': this.apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids, namespace: 'manos-abiertas' })
    });
  }

  async clear(): Promise<void> {
    await fetch(`https://${this.indexName}.svc.pinecone.io/vectors/delete`, {
      method: 'POST',
      headers: { 'Api-Key': this.apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ deleteAll: true, namespace: 'manos-abiertas' })
    });
  }

  async count(): Promise<number> {
    const res = await fetch(`https://${this.indexName}.svc.pinecone.io/describe_index_stats`, {
      headers: { 'Api-Key': this.apiKey }
    });
    const data = await res.json();
    return data.namespaces?.['manos-abiertas']?.vectorCount || 0;
  }
}

class ChromaVectorStore implements VectorStore {
  private baseUrl: string;
  private collectionName: string;

  constructor(baseUrl: string = 'http://localhost:8000', collectionName: string = 'manos-abiertas') {
    this.baseUrl = baseUrl;
    this.collectionName = collectionName;
  }

  async upsert(chunks: DocumentChunk[]): Promise<void> {
    await fetch(`${this.baseUrl}/api/v1/collections/${this.collectionName}/upsert`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ids: chunks.map(c => c.id),
        embeddings: chunks.map(c => c.embedding),
        metadatas: chunks.map(c => c.metadata),
        documents: chunks.map(c => c.content)
      })
    });
  }

  async search(queryEmbedding: number[], topK: number, filter?: Record<string, any>): Promise<SearchResult[]> {
    const response = await fetch(`${this.baseUrl}/api/v1/collections/${this.collectionName}/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query_embeddings: [queryEmbedding],
        n_results: topK,
        where: filter,
        include: ['metadatas', 'documents', 'distances']
      })
    });

    const data = await response.json();
    const results: SearchResult[] = [];
    if (data.ids?.[0]) {
      for (let i = 0; i < data.ids[0].length; i++) {
        results.push({
          chunk: {
            id: data.ids[0][i],
            content: data.documents[0][i],
            metadata: data.metadatas[0][i]
          },
          score: 1 - (data.distances[0][i] || 0),
          rank: i + 1
        });
      }
    }
    return results;
  }

  async delete(ids: string[]): Promise<void> {
    await fetch(`${this.baseUrl}/api/v1/collections/${this.collectionName}/delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids })
    });
  }

  async clear(): Promise<void> {
    await fetch(`${this.baseUrl}/api/v1/collections/${this.collectionName}`, {
      method: 'DELETE'
    });
  }

  async count(): Promise<number> {
    const res = await fetch(`${this.baseUrl}/api/v1/collections/${this.collectionName}/count`);
    const data = await res.json();
    return data.count || 0;
  }
}

function createVectorStore(): VectorStore {
  const provider = process.env.VECTOR_STORE || 'memory';

  if (provider === 'pinecone') {
    return new PineconeVectorStore(
      process.env.PINECONE_API_KEY!,
      process.env.PINECONE_INDEX || 'manos-abiertas',
      process.env.PINECONE_ENV
    );
  }

  if (provider === 'chroma') {
    return new ChromaVectorStore(
      process.env.CHROMA_URL || 'http://localhost:8000',
      process.env.CHROMA_COLLECTION || 'manos-abiertas'
    );
  }

  return new InMemoryVectorStore();
}

function chunkText(text: string, chunkSize: number, overlap: number): string[] {
  const chunks: string[] = [];
  let start = 0;
  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length);
    chunks.push(text.slice(start, end));
    start += chunkSize - overlap;
  }
  return chunks.filter(c => c.trim().length > 50);
}

async function generateEmbedding(text: string, model: AIModelConfig): Promise<number[]> {
  const apiKey = process.env[model.apiKeyEnv] || process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('No API key for embedding');

  const response = await fetch(`${model.baseUrl.replace(/\/+$/, '')}/embeddings`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${model.apiKeyEnv.startsWith('OPENAI') ? process.env.OPENAI_API_KEY : process.env[model.apiKeyEnv]}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: model.model, input: text, encoding_format: 'float' })
  });

  if (!response.ok) throw new Error(`Embedding failed: ${response.statusText}`);
  const data = await response.json();
  return data.data[0].embedding;
}

export class RAGEngine {
  private store: VectorStore;
  private config: RAGConfig;
  private embeddingModel: AIModelConfig;
  private chunkSize: number;
  private chunkOverlap: number;

  constructor(config: Partial<RAGConfig> = {}) {
    this.config = { ...DEFAULT_RAG_CONFIG, ...config };
    this.chunkSize = this.config.chunkSize;
    this.chunkOverlap = this.config.chunkOverlap;
    this.store = createVectorStore();

    this.embeddingModel = {
      id: 'text-embedding-3-small',
      name: 'text-embedding-3-small',
      provider: 'openai',
      baseUrl: 'https://api.openai.com/v1',
      model: 'text-embedding-3-small',
      apiKeyEnv: 'OPENAI_API_KEY',
      maxTokens: 8192,
      supportsStreaming: false,
      supportsTools: false,
      supportsVision: false,
      supportsAudio: false,
      modalities: { text: true }
    };
  }

  async initialize(): Promise<void> {
    await this.ensureCollection();
  }

  private async ensureCollection(): Promise<void> {
    // Collection auto-created on first upsert
  }

  async embedText(text: string): Promise<number[]> {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error('OPENAI_API_KEY not set');

    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'text-embedding-3-small', input: text, encoding_format: 'float' })
    });

    if (!response.ok) throw new Error(`Embedding failed: ${response.statusText}`);
    const data = await response.json();
    return data.data[0].embedding;
  }

  async embedBatch(texts: string[]): Promise<number[][]> {
    const embeddings: number[][] = [];
    const batchSize = 100;
    for (let i = 0; i < texts.length; i += batchSize) {
      const batch = texts.slice(i, i + batchSize);
      const response = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'text-embedding-3-small', input: batch, encoding_format: 'float' })
      });
      const data = await response.json();
      embeddings.push(...data.data.map((d: any) => d.embedding));
    }
    return embeddings;
  }

  async indexResources(resources: any[]): Promise<number> {
    const chunks: DocumentChunk[] = [];

    for (const resource of resources) {
      const content = [
        resource.title || '',
        resource.description || '',
        resource.content || '',
        resource.category || '',
        resource.tags?.join(' ') || ''
      ].filter(Boolean).join('\n\n');

      const chunks_ = chunkText(content, this.chunkSize, this.chunkOverlap);
      const embeddings = await this.embedBatch(chunks_);

      for (let i = 0; i < chunks_.length; i++) {
        chunks.push({
          id: `${resource.id || 'unknown'}-chunk-${i}`,
          content: chunks_[i],
          metadata: {
            source: resource.source || 'unknown',
            title: resource.title || 'Untitled',
            url: resource.url,
            category: resource.category,
            tags: resource.tags,
            language: resource.language,
            verifiedAt: resource.verifiedAt,
            expiresAt: resource.expiresAt,
            location: resource.location,
            priority: resource.priority,
            resourceId: resource.id,
            section: `chunk-${i}`
          },
          embedding: embeddings[i]
        });
      }
    }

    await this.store.upsert(chunks);
    return chunks.length;
  }

  async indexGuides(guides: any[]): Promise<number> {
    const chunks: DocumentChunk[] = [];

    for (const guide of guides) {
      const sections = this.extractSections(guide.content || guide.body || '');
      for (const section of sections) {
        const embedding = await this.embedText(section.content);
        chunks.push({
          id: `${guide.id || 'guide'}-${section.title}`,
          content: section.content,
          metadata: {
            source: 'guide',
            title: guide.title || section.title,
            category: 'rights-guide',
            tags: guide.tags,
            language: guide.language,
            verifiedAt: guide.verifiedAt,
            expiresAt: guide.expiresAt,
            priority: guide.priority,
            resourceId: guide.id,
            section: section.title,
            pageNumber: section.pageNumber
          },
          embedding
        });
      }
    }

    await this.store.upsert(chunks);
    return chunks.length;
  }

  private extractSections(text: string): { title: string; content: string }[] {
    const sections: { title: string; content: string }[] = [];
    const lines = text.split('\n');
    let currentTitle = 'Introduction';
    let currentContent = '';

    for (const line of lines) {
      const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
      if (headingMatch) {
        if (currentContent.trim()) {
          sections.push({ title: currentTitle, content: currentContent.trim() });
        }
        currentTitle = headingMatch[2];
        currentContent = '';
      } else {
        currentContent += line + '\n';
      }
    }
    if (currentContent.trim()) {
      sections.push({ title: currentTitle, content: currentContent.trim() });
    }
    return sections.length > 0 ? sections : [{ title: 'Full Content', content: text }];
  }

  async search(query: string, options: {
    topK?: number;
    filter?: Record<string, any>;
    minScore?: number;
    includeEmbeddings?: boolean;
  } = {}): Promise<SearchResult[]> {
    const { topK = this.config.topK, filter, minScore = this.config.similarityThreshold } = options;

    const queryEmbedding = await this.embedText(query);
    const results = await this.store.search(queryEmbedding, topK * 2);

    let filtered = results.filter(r => r.score >= minScore);
    if (filter) {
      filtered = filtered.filter(r => {
        for (const [key, value] of Object.entries(filter)) {
          const metaValue = r.chunk.metadata[key as keyof typeof r.chunk.metadata];
          if (Array.isArray(value)) {
            if (!value.includes(metaValue)) return false;
          } else if (metaValue !== value) return false;
        }
        return true;
      });
    }

    return filtered.slice(0, topK).map((r, i) => ({ ...r, rank: i + 1 }));
  }

  async generateContext(query: string, options: {
    topK?: number;
    filter?: Record<string, any>;
    maxTokens?: number;
  } = {}): Promise<{ context: string; sources: SearchResult[] }> {
    const { topK = this.config.topK, filter, maxTokens = this.config.maxContextTokens } = options;
    const results = await this.search(query, { topK, filter });

    let context = '';
    let tokens = 0;
    const sources: SearchResult[] = [];

    for (const result of results) {
      const chunkText = `[Fuente: ${result.chunk.metadata.title}] ${result.chunk.content}`;
      const chunkTokens = Math.ceil(chunkText.length / 4);

      if (tokens + chunkTokens > maxTokens) break;

      context += chunkText + '\n\n---\n\n';
      tokens += chunkTokens;
      sources.push(result);
    }

    return { context: context.trim(), sources };
  }

  async deleteResource(resourceId: string): Promise<void> {
    // In a real implementation, we'd delete by metadata filter
    // For now, we'd need to track IDs by resourceId
  }

  async getStats(): Promise<{ totalChunks: number; storeType: string }> {
    return {
      totalChunks: await this.store.count(),
      storeType: this.store.constructor.name
    };
  }

  async healthCheck(): Promise<{ healthy: boolean; latencyMs: number; details: any }> {
    const start = Date.now();
    try {
      await this.embedText('health check');
      return { healthy: true, latencyMs: Date.now() - start, details: { store: this.store.constructor.name } };
    } catch (error) {
      return { healthy: false, latencyMs: Date.now() - start, details: { error: String(error) } };
    }
  }
}

export const ragEngine = new RAGEngine();
export { InMemoryVectorStore, PineconeVectorStore, ChromaVectorStore, createVectorStore };