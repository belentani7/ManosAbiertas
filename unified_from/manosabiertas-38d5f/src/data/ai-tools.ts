export type AIToolKind = 'chat' | 'image' | 'media';
export type AIAccess = 'no-account' | 'optional-account' | 'account-or-api';

export type AITool = {
  id: string;
  name: string;
  provider: string;
  description: string;
  url: string;
  kind: AIToolKind;
  access: AIAccess;
  tags: string[];
  note: string;
};

export const AI_TOOLS: AITool[] = [
  { id: 'duck-ai', name: 'Duck.ai', provider: 'DuckDuckGo', description: 'Chat web sencillo y privado para practicar preguntas, resúmenes y redacción.', url: 'https://duck.ai/', kind: 'chat', access: 'no-account', tags: ['chat', 'privacidad', 'principiante'], note: 'El acceso y los modelos disponibles pueden cambiar por país y momento.' },
  { id: 'copilot-web', name: 'Microsoft Copilot', provider: 'Microsoft', description: 'Chat web con búsqueda y ayuda para escribir; su uso básico no requiere iniciar sesión según Microsoft.', url: 'https://copilot.microsoft.com/', kind: 'chat', access: 'no-account', tags: ['chat', 'búsqueda', 'redacción'], note: 'La cuenta amplía historial, voz, imágenes y conversaciones.' },
  { id: 'le-chat', name: 'Le Chat', provider: 'Mistral AI', description: 'Asistente europeo para conversar, resumir y explorar ideas.', url: 'https://chat.mistral.ai/', kind: 'chat', access: 'optional-account', tags: ['chat', 'Europa', 'multilingüe'], note: 'El registro y los límites pueden variar.' },
  { id: 'perplexity', name: 'Perplexity', provider: 'Perplexity AI', description: 'Búsqueda conversacional para aprender a preguntar y contrastar fuentes.', url: 'https://www.perplexity.ai/', kind: 'chat', access: 'optional-account', tags: ['investigación', 'fuentes', 'chat'], note: 'Revisa las fuentes antes de usar información legal, médica o administrativa.' },
  { id: 'fal-playground', name: 'fal.ai Playground', provider: 'fal.ai', description: 'Laboratorio online para probar modelos de imágenes, ilustración, vídeo y audio.', url: 'https://fal.ai/playground', kind: 'image', access: 'account-or-api', tags: ['imágenes', 'ilustración', 'vídeo'], note: 'Es la vía recomendada para una futura integración de imágenes en Netlify sin usar GPT ni Python.' },
  { id: 'stability-platform', name: 'Stable Image', provider: 'Stability AI', description: 'Generación y edición de imágenes con modelos Stable Image.', url: 'https://platform.stability.ai/', kind: 'image', access: 'account-or-api', tags: ['fotografía', 'ilustración', 'edición'], note: 'La integración requiere clave protegida en servidor; nunca se expone en el navegador.' },
  { id: 'openverse', name: 'Openverse', provider: 'Openverse', description: 'Buscador de imágenes y audio con licencias abiertas para aprender y crear referencias.', url: 'https://openverse.org/', kind: 'media', access: 'no-account', tags: ['imágenes', 'audio', 'licencias'], note: 'No genera imágenes: ayuda a encontrar material reutilizable y atribuirlo correctamente.' },
];

