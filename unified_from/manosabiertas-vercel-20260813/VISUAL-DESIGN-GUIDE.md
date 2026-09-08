# 🎨 Guía Visual - ManosAbiertas v2.0

## Paleta de Colores Mejorada

### Colores Primarios

| Nombre | Valor HEX | OKLch | Uso |
|--------|-----------|-------|-----|
| **Naranja Cálido** | #FF7F3F | oklch(0.55 0.16 45) | Brand primario, botones, iconos |
| **Naranja Suave** | #FFB84D | oklch(0.75 0.15 75) | Acentos, backgrounds |
| **Azul Dinámico** | #0099FF | oklch(0.55 0.16 250) | Heros, gradientes, CTA secundarios |
| **Blanco Puro** | #FFFFFF | oklch(1 0 0) | Fondos claros, texto |
| **Gris Suave** | #F5F5F5 | oklch(0.96 0.01 80) | Backgrounds secundarios |

### Colores Funcionales

| Nombre | Uso |
|--------|-----|
| **Verde Éxito** | oklch(0.60 0.18 130) - Logros, certificados, checkmarks |
| **Azul Información** | oklch(0.55 0.14 250) - Tooltips, guías, info |
| **Ámbar Atención** | oklch(0.75 0.15 75) - Alertas, recordatorios |
| **Rojo Error** | oklch(0.58 0.22 25) - Errores, destructivos |
| **Gris Deshabilitado** | oklch(0.50 0.02 60) - Elementos inactivos |

---

## Gradientes Recomendados

### Hero Gradient (Azul → Naranja)
```css
background: linear-gradient(
  135deg,
  #0099FF 0%,
  #FF7F3F 50%,
  #FFB84D 100%
);
```

### Card Hover Gradient
```css
background: linear-gradient(
  135deg,
  rgba(255, 127, 63, 0.1) 0%,
  rgba(255, 184, 77, 0.05) 100%
);
```

### Success Gradient (Verde)
```css
background: linear-gradient(
  135deg,
  #10B981 0%,
  #6EE7B7 100%
);
```

---

## Tipografía

### Familia de Fuentes
- **Headings (H1-H4)**: Geist Sans (bold, 0.95-1.05 letter-spacing)
- **Body**: Inter o Geist Sans (regular, 0.5 letter-spacing)
- **Monospace**: JetBrains Mono (para código)

### Pesos Recomendados
- H1: 700 (bold)
- H2: 600 (semibold)
- H3: 600 (semibold)
- Body: 400 (regular)
- Captions: 500 (medium)

### Tamaños
```
H1: 2.5rem (40px) / md: 3rem (48px)
H2: 2rem (32px)
H3: 1.5rem (24px)
Body: 1rem (16px)
Caption: 0.875rem (14px)
```

---

## Componentes Visuales

### Cards
- **Background**: Blanco con borde sutil (border: 1px, opacity: 10%)
- **Border Color**: Naranja clara (rgba(255, 127, 63, 0.1))
- **Hover State**: 
  - Elevación: `translateY(-2px)`
  - Sombra: `0 12px 24px -8px rgba(255, 127, 63, 0.18)`
  - Borde: `rgba(255, 127, 63, 0.3)`

### Botones Primarios
- **Background**: Gradiente naranja (from-brand-warm to-brand-saffron)
- **Text**: Blanco
- **Padding**: `px-6 py-3` (large)
- **Border Radius**: 0.75rem
- **Hover**: Darken by 10%, shadow-lg

### Botones Secundarios
- **Background**: Transparente
- **Border**: 1px white/40%
- **Text**: Blanco
- **Hover**: `bg-white/10`, `border-white/60`

### Badges/Tags
```
Nivel 1: `bg-blue-100 text-blue-700`
Nivel 2: `bg-emerald-100 text-emerald-700`
Nivel 3: `bg-amber-100 text-amber-700`
Naranja: `bg-orange-100 text-orange-700`
```

### Input Fields
- **Background**: `oklch(0.92 0.015 70)` (gris muy claro)
- **Border**: `oklch(0.90 0.015 70)` (gris sutil)
- **Focus**: `ring: 2px offset 2px, ring-color: brand-warm`
- **Placeholder**: `text-muted-foreground opacity-60`

### Iconos
- **Tamaño pequeño (nav)**: 20px
- **Tamaño medio (buttons)**: 24px
- **Tamaño grande (featured)**: 32-48px
- **Color**: Heredar del contexto, hover → brand-warm

---

## Animaciones y Transiciones

### Micro-interacciones
```css
/* Card hover */
transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);

/* Button press */
transition: all 0.15s ease-out;

/* Icon color change */
transition: color 0.2s ease;
```

### Framer Motion
```tsx
// Fade in
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.3 }}

// Slide up
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, delay: 0.2 }}

// Float
animate={{
  y: [0, -8, 0],
}}
transition={{
  duration: 4,
  repeat: Infinity,
  ease: "easeInOut"
}}
```

### Keyframe Animations
```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
```

---

## Espaciado

### Margin/Padding Scale
```
xs: 0.25rem (4px)
sm: 0.5rem (8px)
md: 1rem (16px)
lg: 1.5rem (24px)
xl: 2rem (32px)
2xl: 3rem (48px)
```

### Component Spacing
- Cards: `p-6` (24px)
- Sections: `gap-8` o `space-y-8`
- Grid: `gap-4` (16px) o `gap-6` (24px)

---

## Respuestas Visuales

### Breakpoints
```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Grid Layouts
- **Mobile (< md)**: 1 columna
- **Tablet (md-lg)**: 2-3 columnas
- **Desktop (≥ lg)**: 3-4 columnas máx

---

## Dark Mode

### Variables CSS Dark
```css
.dark {
  --background: oklch(0.18 0.015 50);
  --foreground: oklch(0.96 0.01 80);
  --primary: oklch(0.70 0.16 50);  /* Naranja más claro */
  --brand-warm: oklch(0.70 0.16 50);
}
```

### Diferencias
- Backgrounds: Más oscuros (slate-900, slate-800)
- Borders: Más sutiles (white/10%)
- Cards: Gris oscuro (slate-900/50)
- Gradientes hero: Más oscuros pero conservan color

---

## Accesibilidad

### Contraste
- Texto en naranja: requiere fondo claro (ratio ≥ 4.5:1)
- CTA naranja: garantizar contraste blanco o gris oscuro
- Bordes sutiles: no usar para información crítica

### Focus States
```css
*:focus-visible {
  outline: 2px solid var(--brand-warm);
  outline-offset: 2px;
  border-radius: 4px;
}
```

### Motion Preferences
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Recursos de Imagen

### Fotos Recomendadas
1. **Unsplash**: buscar "diverse students", "migrant community", "office learning"
2. **Pexels**: términos similares, filtrar por licencia
3. **Generación IA**: stable-diffusion con prompts en español/portugués

### Almacenamiento
```
/public/images/personas/
├── heroes/
├── testimonials/
├── courses/
└── community/
```

### Optimización
- JPG para fotos (80% calidad)
- WebP para mejor compresión (80-85% calidad)
- PNG para gráficos/iconos (máx 8KB)
- Tamaño máx: 400KB por imagen (después compresión)

---

## Ejemplos de Uso

### Hero Section
```tsx
<section className="rounded-2xl p-8 md:p-12">
  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500 via-orange-500 to-orange-700 opacity-90 rounded-2xl" />
  <h1 className="text-4xl md:text-6xl font-bold text-white">Bienvenido</h1>
  <Button className="bg-white text-orange-600 hover:bg-white/90">Empezar</Button>
</section>
```

### Card Component
```tsx
<Card className="overflow-hidden border-l-4 border-l-brand-warm bg-gradient-to-br from-brand-saffron/10 to-transparent hover:shadow-lg transition-all">
  <CardHeader>
    <Badge variant="default" className="bg-brand-warm">Nivel 1</Badge>
  </CardHeader>
  <CardContent>
    <p className="text-brand-warm font-semibold">✅ Acceso disponible</p>
  </CardContent>
</Card>
```

### Info Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {items.map(item => (
    <div className="p-6 rounded-xl bg-white/50 border border-brand-warm/10 hover:border-brand-warm/30 transition-all">
      <h3 className="font-bold text-foreground">{item.title}</h3>
    </div>
  ))}
</div>
```

---

## Próximas Etapas

✅ **COMPLETADO**: Paleta visual mejorada, gradientes, componentes base  
⏳ **TODO**: Integrar 20+ fotos reales en heroes y cards  
⏳ **TODO**: Crear variaciones dark mode para todas las secciones  
⏳ **TODO**: Auditar accesibilidad WCAG 2.2 AAA  
⏳ **TODO**: Tests visuales con Chromatic  

---

*Última actualización: 2026-08-26*
