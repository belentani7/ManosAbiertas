# 🌐 Deployment Mirrors

Manos Abiertas está desplegada en múltiples plataformas para garantizar disponibilidad:

## Servidores Activos

| Plataforma | URL | Estado | Setup |
|---|---|---|---|
| **Vercel** ✅ | https://manosabiertas-seven.vercel.app | Activo (producción) | Conectado |
| **GitHub Pages** ⚠️ | https://belentani7.github.io/ManosAbiertas/ | No funcional | Solo renderiza el README; GitHub Pages no ejecuta apps Next.js |

**Nota:** GitHub Pages no puede servir esta app Next.js (necesita servidor para rutas `/api/*` y middleware). El sitio público funcional es el despliegue de Vercel.

## Fallback Automático

Copia `fallback-loader.html` a tu sitio raíz o úsalo como página de inicio para auto-detectar servidores disponibles:

```html
<!-- fallback-loader.html probará en orden y redirigirá al primero disponible -->
```

## Status Monitor

```bash
# Verificar qué servidores están vivos
for url in \
  "https://belentani7.github.io/ManosAbiertas/" \
  "https://manos-abiertas-belentani.netlify.app" \
  "https://manos-abiertas-belentani.vercel.app" \
  "https://manos-abiertas-belentani.surge.sh"
do
  echo "$url: $(curl -s -o /dev/null -w '%{http_code}' $url)"
done
```

---

## Flujo de Auto-Deploy

```
Push a main
  ↓
GitHub Actions (CI/CD)
  ↓
Build: npm run build
  ↓
Deploy a Netlify/Vercel/Surge (si están conectados)
  ↓
All servidores actualizados
```

## Para Desarrolladores

### Agregar nuevo servidor

1. Crear cuenta en plataforma (Netlify, Vercel, Surge, etc.)
2. Conectar repo desde dashboard
3. Configurar build:
   - Build command: `npm run build`
   - Publish dir: `.next`
   - Node version: 22
4. Obtener URL y agregarla aquí

### Remover servidor

1. Ir a dashboard y deletear proyecto
2. Actualizar esta tabla
3. Commit + Push

