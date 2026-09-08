# 🚀 FASE 2 Backend — Roadmap Microservicios

## Status: INICIANDO (Semanas 2-3)

### Entregables Esta Fase

#### Semana 1: Fundación
- [x] Docker Compose (PostgreSQL, Redis, Kafka, Zookeeper)
- [x] Prisma schema (User, Course, CV, Legal, Forum, Mentorship)
- [x] PVC-U validation (esferas 1-7)
- [ ] Auth Service (registro, login, JWT)
  - [ ] User model + repository
  - [ ] Password hashing (bcrypt)
  - [ ] JWT estrategia
  - [ ] Endpoints: `/auth/register`, `/auth/login`, `/auth/me`
- [ ] Course Service (CRUD + progreso)
  - [ ] Course model + repository
  - [ ] CourseProgress tracker
  - [ ] Endpoints: `/courses`, `/courses/:id`, `/progress`

#### Semana 2: Integración
- [ ] CV Service (generador + plantillas)
- [ ] Legal Service (búsqueda + actualizaciones)
- [ ] Community Service (foros + chats básicos)
- [ ] Kafka eventos (CourseCompleted, UserLevelUp, etc.)
- [ ] Redis caché (sesiones, rate limiting)
- [ ] Tests E2E básicos

### Stack Confirmado

```
Backend:
- NestJS 10 (Typescript)
- Prisma 5 (ORM)
- PostgreSQL 16 (DB)
- Redis 7 (caché/sesiones)
- Kafka 7.6 (eventos)
- JWT (auth)

Frontend:
- Next.js 16
- React 19
- Tailwind CSS 4
- Zustand (state)

Deployment:
- Netlify (frontend)
- Docker Compose (local)
- Kubernetes-ready (futuro)
```

### Microservicios (Estructura)

```
backend/
├── auth-service/        ← Login, registro, JWT
├── course-service/      ← Cursos, módulos, progreso
├── cv-service/          ← CV builder, plantillas
├── legal-service/       ← Guías, búsqueda
├── community-service/   ← Foros, chats, eventos
├── shared-lib/          ← PVC-U, tipos, utils
└── prisma/              ← Schema + migraciones
```

### Comandos de Desarrollo

```bash
# Levantar DB + Redis + Kafka
docker-compose up -d

# Generar tipos Prisma
npx prisma generate

# Correr migraciones
npx prisma migrate dev --name init

# Dev local (cada servicio)
cd backend/auth-service && npm run start:dev

# Tests
npm run test

# Build
npm run build
```

### Validación PVC-U Integrada

Cada endpoint valida:
- **Esfera 1**: Estructura (tipos correctos)
- **Esfera 2**: Semántica (email válido, URL correcta)
- **Esfera 3**: Estado (valores permitidos)
- **Esfera 4**: Seguridad (passwords fuertes, sin datos sensibles)
- **Esfera 5**: Protocolo (HTTP methods, endpoints válidos)
- **Esfera 6**: Integridad (hashes verificados)
- **Esfera 7**: Cumplimiento (datos sensibles no expuestos)

### Próximas Etapas (Fase 3)

- Gemelo digital (Three.js)
- MLOps (monitoreo de modelos)
- Agentes autónomos (LangGraph)
- Auditoría WCAG 2.2 AAA
- Stress tests + documentación

---

**Inicio: Semana 2 de desarrollo (2026-08-26)**
**Meta: v0.3.0 con API funcional completa**
