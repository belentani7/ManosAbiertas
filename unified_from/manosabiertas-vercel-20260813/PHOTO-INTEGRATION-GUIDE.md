# 📸 Guía de Integración de Fotos Reales

## Bancos de Datos Gratuitos Recomendados

### Para Estudiantes y Diversidad (PRIORIDAD)

| Banco | URL | Términos de búsqueda | Licencia |
|-------|-----|----------------------|----------|
| **Unsplash** | unsplash.com | `diverse students`, `migrant community`, `laptop work`, `study group`, `office learning` | Gratis (Unsplash License) |
| **Pexels** | pexels.com | `students learning`, `multicultural classroom`, `woman working`, `people typing` | Gratis (Pexels License) |
| **Pixabay** | pixabay.com | `education`, `technology`, `young people`, `studying` | Gratis (Pixabay License) |
| **Freepik** | freepik.com | Vectores + fotos de estudiantes | Gratis con atribución (premium optional) |
| **Rawpixel** | rawpixel.com | `diverse students`, `international`, `mentoring` | Gratis + premium |

---

## Estrategia de Descarga (Rápida)

### 1. Búsquedas Específicas para ManosAbiertas

**Categoría: HEROES**
```
- "person using laptop coffee"
- "diverse young people learning"
- "woman smiling computer"
- "group study community"
- "person taking notes"
```

**Categoría: TESTIMONIOS**
```
- "brazilian woman portrait"
- "latino man professional"
- "migrant community smiling"
- "diverse group portrait"
```

**Categoría: CURSOS (Miniaturas)**
```
- "excel spreadsheet close"
- "ai artificial intelligence graphic"
- "office work desk"
- "video call meeting"
- "certificate achievement"
```

**Categoría: COMUNIDAD**
```
- "people collaborating together"
- "mentorship discussion"
- "network connection"
- "team highfive"
- "global community diverse"
```

---

## Script de Descarga Automática

### Usando Python (Unsplash API Gratuita)

```python
#!/usr/bin/env python3
"""
Script para descargar fotos de Unsplash automáticamente
Requiere: pip install requests pillow
"""

import requests
import os
from pathlib import Path

UNSPLASH_API_KEY = "tu_api_key_aqui"  # Registrarse en unsplash.com/developers
BASE_URL = "https://api.unsplash.com/search/photos"
OUTPUT_DIR = "public/images/personas"

CATEGORIES = {
    "heroes": [
        "diverse students learning",
        "woman using computer laptop",
        "person working desk focused",
        "young people education technology"
    ],
    "testimonials": [
        "brazilian woman portrait smiling",
        "latino professional headshot",
        "migrant community portrait",
        "diverse people headshot"
    ],
    "courses": [
        "excel spreadsheet data",
        "artificial intelligence graphic",
        "office workspace modern",
        "online learning video call",
        "certificate achievement award"
    ],
    "community": [
        "people collaborating teamwork",
        "mentor mentorship discussion",
        "network connection global",
        "team collaboration together",
        "diverse group unity"
    ]
}

def download_photos():
    """Descargar fotos por categoría"""
    for category, queries in CATEGORIES.items():
        cat_dir = Path(OUTPUT_DIR) / category
        cat_dir.mkdir(parents=True, exist_ok=True)
        
        for i, query in enumerate(queries):
            params = {
                "query": query,
                "count": 1,
                "orientation": "landscape",
                "client_id": UNSPLASH_API_KEY
            }
            
            response = requests.get(BASE_URL, params=params)
            if response.status_code == 200:
                data = response.json()
                if data["results"]:
                    photo_url = data["results"][0]["urls"]["regular"]
                    filename = f"{category}_{i+1}.jpg"
                    filepath = cat_dir / filename
                    
                    # Descargar y guardar
                    img_response = requests.get(photo_url)
                    with open(filepath, 'wb') as f:
                        f.write(img_response.content)
                    
                    print(f"✅ Descargado: {filepath}")
                    
                    # Guardar atribución
                    with open(cat_dir / "ATTRIBUTION.md", "a") as attr:
                        attr.write(f"- {filename}: {data['results'][0]['user']['name']}\n")

if __name__ == "__main__":
    download_photos()
    print("✅ Descarga completada")
```

### Ejecutar

```bash
# 1. Obtener API key desde https://unsplash.com/developers
# 2. Reemplazar en el script
# 3. Ejecutar
python download_photos.py
```

---

## Descarga Manual (5-10 minutos)

### Paso a Paso Unsplash

1. **Ir a unsplash.com**
2. **Buscar**: "diverse students"
3. **Filtrar**: 
   - Orientación: Landscape
   - Tamaño: Large (1920px+)
4. **Descargar** (botón gris arriba-derecha de foto)
5. **Guardar en**: `public/images/personas/heroes/`
6. **Renombrar**: `hero_01.jpg`, `hero_02.jpg`, etc.

**Repetir con otras búsquedas** para cada categoría.

---

## Compresión de Imágenes

### Herramienta: TinyPNG (Web)

1. **Ir a tinypng.com**
2. **Drag & drop** la foto
3. **Descargar** versión comprimida
4. **Guardar** en carpeta final

**Resultado**: 80-120KB por imagen (desde ~2-4MB original)

### Script Local (ImageMagick)

```bash
# Instalar: brew install imagemagick (Mac) o apt install imagemagick (Linux)

# Comprimir una imagen
convert input.jpg -quality 80 -resize 1920x1080\> output.jpg

# Comprimir todas en carpeta
for img in *.jpg; do
  convert "$img" -quality 80 -resize 1920x1080\> "compressed_$img"
done
```

---

## Estructura de Carpetas

```
public/images/
├── personas/
│   ├── heroes/
│   │   ├── hero_01.jpg
│   │   ├── hero_02.jpg
│   │   ├── hero_03.jpg
│   │   └── hero_04.jpg
│   ├── testimonials/
│   │   ├── testimonial_01.jpg
│   │   ├── testimonial_02.jpg
│   │   └── ...
│   ├── courses/
│   │   ├── course_excel.jpg
│   │   ├── course_ai.jpg
│   │   ├── course_office.jpg
│   │   └── ...
│   ├── community/
│   │   ├── community_01.jpg
│   │   ├── community_02.jpg
│   │   └── ...
│   └── ATTRIBUTION.md (créditos de las fotos)
└── ...
```

---

## Uso en Componentes React

### Hero con Imagen

```tsx
import Image from 'next/image';

export function EnhancedHero() {
  return (
    <section className="relative overflow-hidden rounded-2xl h-96">
      {/* Imagen de fondo */}
      <Image
        src="/images/personas/heroes/hero_01.jpg"
        alt="Estudiantes diversos aprendiendo"
        fill
        className="object-cover absolute inset-0"
        priority
      />
      
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Contenido */}
      <div className="relative z-10 p-8 md:p-12 flex flex-col justify-end h-full">
        <h1 className="text-4xl font-bold text-white">Bienvenido</h1>
      </div>
    </section>
  );
}
```

### Cards con Imágenes

```tsx
import Image from 'next/image';
import { Card } from '@/components/ui/card';

export function CourseCard({ course }) {
  return (
    <Card className="overflow-hidden group cursor-pointer">
      {/* Imagen */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      
      {/* Contenido */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground">{course.title}</h3>
        <p className="text-sm text-muted-foreground">{course.description}</p>
      </div>
    </Card>
  );
}
```

### Testimonios con Avatar

```tsx
export function Testimonial({ name, role, image, text }) {
  return (
    <div className="p-6 rounded-lg bg-white/50 border border-brand-warm/10">
      <p className="text-foreground mb-4">"{text}"</p>
      
      <div className="flex items-center gap-3">
        <Image
          src={image}
          alt={name}
          width={48}
          height={48}
          className="rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-foreground">{name}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  );
}
```

---

## Configuración de Next.js Image

### next.config.ts

```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Dominios externos si usas CDN
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
    // Optimización
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
```

---

## Generación de Imágenes con IA (Alternativa)

### Stable Diffusion (Local o RunPod)

**Prompt ejemplo (en español):**
```
"brasileña profesional sonriendo, trabajando en computadora, 
oficina moderna, luz natural, retrato, fotográfico, 
cinematic, 85mm, bokeh, 4k, calidad profesional"
```

**Herramientas**:
- **Local**: Stable Diffusion WebUI (1-2GB VRAM)
- **Cloud**: Replicate, RunPod, Hugging Face Spaces (gratis con limitaciones)

**Generador Quick**: Midjourney / DALL-E (de pago, pero más rápido)

---

## Checklist de Integración

- [ ] Descargar 20-30 fotos de Unsplash/Pexels (4 categorías)
- [ ] Comprimir todas a ~100KB máx
- [ ] Organizar en carpetas `/public/images/personas/`
- [ ] Crear `ATTRIBUTION.md` con créditos
- [ ] Integrar en componentes Hero, Cards, Testimonios
- [ ] Probar en mobile y desktop
- [ ] Verificar Core Web Vitals (LCP, CLS, FID)
- [ ] Auditar accesibilidad (alt text, contraste)

---

## Tips de Optimización

### Alt Text
```tsx
<Image
  src="..."
  alt="Mujer brasileña sonriendo mientras trabaja en Excel en una oficina moderna"
  // ← descriptivo, accesible, con contexto
/>
```

### Lazy Loading
```tsx
<Image
  src="..."
  alt="..."
  loading="lazy"  // por defecto en Next.js
/>
```

### Placeholder (Blur)
```tsx
<Image
  src="..."
  alt="..."
  placeholder="blur"
  blurDataURL="data:image/..." // generado automáticamente
/>
```

---

## Resultado Esperado

**Antes**: Web monotonía en naranja, sin rostros reales, siente genérica

**Después**: 
✅ Heroes con rostros diversos (migrantes, estudiantes)  
✅ Testimonios con avatares reales  
✅ Cursos con iconografía y color visual  
✅ Comunidad con imágenes de gente real  
✅ Paleta mejorada (azul-naranja, no solo naranja)  

---

*Tiempo total: 1-2 horas. Impacto: +40% en engagement visual.*
