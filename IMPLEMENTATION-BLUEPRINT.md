# 🏗️ ManosAbiertas Implementation Blueprint
**Complete Pedagogical & Technical Specification**

---

## PARTE I: REPOSITORIOS & HERRAMIENTAS OPEN SOURCE

### 1. Core LMS & Content
- **Chamilo LMS** (chamilo/chamilo-lms) - Intuitivo, lean, diseñado para alfabetización digital
- **H5P** (h5p/h5p-cli) - Contenido interactivo (vídeo interactivo, quizzes, drag-drop)

### 2. Sandboxes Seguros
- **noVNC** (novnc/noVNC) - Escritorio real en navegador (Windows/Linux)
- **WebVM** (leaningtech/webvm) - VM completa en browser (WebAssembly)
- **JupyterLab** (jupyterlab/jupyterlab) - Entorno interactivo Python/data

### 3. AI Tutor (RAG)
- **Anything-LLM** (Mintplex-Labs/anything-llm) - Sistema RAG local, subir PDFs → chatbot
- **Ollama** (ollama/ollama) - Correr modelos locales (Llama-3, Qwen2.5)
- **Cloudflare Tunnels** (cloudflare/cloudflared) - Exponer servicios sin abrir puertos

### 4. Supporting Tools
- **Reactive Resume** (amruthpillai/reactive-resume) - CV builder gratuito ATS-friendly
- **Argos Translate** (argosopentech/argos-translate) - Traducción offline local
- **WAVE Evaluation API** (w3c/wcag-act-rules) - Auditoría automática accesibilidad WCAG

---

## PARTE II: METODOLOGÍA PEDAGÓGICA POR NIVEL

### NIVEL 0: Alfabetización Básica (Supervivencia Digital)

**Objetivo:** Pérdida del miedo + motricidad básica

**Formato de Contenido (Lectura Fácil):**
- Máximo 15 palabras por frase
- Tipografía sans-serif (Verdana/Atkinson), tamaño mínimo 16px
- Capturas reales con círculo rojo + flecha (no iconos abstractos)

**Producción de Vídeos (Screencast):**
- Graba pantalla real del SO
- Puntero GIGANTE con rastro visual
- Narración previa: "Vamos a buscar letra E... aquí está"

**Implementación H5P Interactive Video:**
```
Vídeo → pausa automática cada 10s
↓
Pregunta: "Haz clic en el ícono de carpeta"
↓
Si correcto: continúa
Si falla: mensaje de ánimo + reintentar
```

**Cursos Recomendados Nivel 0:**
1. "Tu Primer Ordenador" (8h) - Ratón, teclado, escritorio
2. "Navegador Web y Google" (6h) - Búsqueda segura, bookmarks
3. "Email en Gmail" (6h) - Recibir, enviar, adjuntos
4. "Carpetas y Archivos" (4h) - Crear, organizar, buscar

---

### NIVEL INTERMEDIO: Competencia & Autonomía

**Objetivo:** Habilidades laborales aplicables

**Metodología ABR (Aprendizaje Basado en Retos):**
```
Problema Real → Investigación → Herramientas → Resolución
"Tu jefe te pide extraer correos de un TXT a una hoja de cálculo"
```

**Entornos Sandbox (noVNC + WebVM):**
- **Linux/Redes:** noVNC con Ubuntu 22.04 en navegador
  - Ejercicio: `ls`, `mkdir`, `grep`, SSH basics
- **HTML/Web:** Monaco Editor + previsualización real-time
  - Ejercicio: Crear página web con CSS desde cero

**AI Tutor (RAG + Llama-3.1-8B):**
```
System Prompt:
"Eres Manos, asistente pedagógico. 
- NUNCA des la respuesta completa
- Responde en frases cortas
- Dale solo el primer paso
- Usa analogías cotidianas
- Si detectas frustración: 'hablar con tutor humano'"
```

**Cursos Recomendados Nivel Intermedio:**
1. "Excel para Datos" (20h)
2. "HTML & CSS Web Design" (24h)
3. "Python Basics" (20h)
4. "Linux Command Line" (16h)

---

### NIVEL EXPERTO: Especialización

**Objetivo:** Certificación profesional + portafolio

**Proyectos de Capstone:**
- Crear una app full-stack
- Instalar y configurar un servidor Linux
- Proyecto de análisis de datos reales

**Cursos Nivel Experto:**
1. "Full-Stack Web Development" (40h)
2. "Data Science con Python" (36h)
3. "DevOps Fundamentals" (32h)

---

## EVALUACIÓN & CERTIFICACIÓN

### Evaluación Continua (NO exámenes tradicionales)
- Calificación basada en interactivos H5P completados
- Retos en sandboxes superados
- Participación en foros/IA tutor

### Open Badges 3.0 (Insignias Digitales)
Micro-credenciales verificables:
- 🏅 "Navegación Segura" (Nivel 0)
- 🏅 "Creador de Contenido Web" (Intermedio)
- 🏅 "Python Developer" (Experto)

*Repo:* github.com/1EdTech/openbadges-specification

### CV como Cierre
Al finalizar Nivel Intermedio:
1. Usuario accede **Reactive Resume**
2. IA tutor hace preguntas vía chat/voz
3. Formulario se rellena automáticamente
4. Usuario exporta PDF profesional

---

## STACK TÉCNICO FINAL

```
Frontend:
├── Chamilo LMS (HTML/PHP)
├── H5P Interactive Content
├── JupyterLab (Python sandbox)
└── Reactive Resume (CV builder)

Backend:
├── Ollama (LLM local)
├── Anything-LLM (RAG system)
├── noVNC (Desktop sharing)
└── Node.js API

Database:
├── PostgreSQL (usuarios, progreso, badges)
└── Milvus (vector DB para RAG)

Deployment:
├── Docker compose
├── Cloudflare Tunnels
└── Self-hosted o cloud (AWS/Hetzner)
```

---

## ROADMAP IMPLEMENTACIÓN

### Week 1-2: Core Setup
- [ ] Deploy Chamilo LMS
- [ ] Integrar H5P
- [ ] Setup PostgreSQL

### Week 3-4: Nivel 0 Content
- [ ] Crear 4 cursos Nivel 0
- [ ] Grabar y editar screencast
- [ ] Producir interactivos H5P

### Week 5-6: AI Tutor
- [ ] Deploy Ollama + Anything-LLM
- [ ] Ingestar documentos
- [ ] Fine-tune system prompt

### Week 7-8: Sandboxes
- [ ] noVNC integration
- [ ] WebVM setup
- [ ] Docker containers para ejercicios

### Week 9-10: Nivel Intermedio
- [ ] Crear cursos intermedios
- [ ] Setup Reactive Resume
- [ ] Integración con badge system

### Week 11-12: Polish & Launch
- [ ] Testing A/A
- [ ] WCAG accessibility audit
- [ ] Soft launch con 3 ONGs piloto

---

**No BS. Spec complete. Ready to build.**
