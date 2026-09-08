# ðŸš€ FASE 2 Setup â€” Backend Local

## Prerequisites

- Node.js 20+
- Docker & Docker Compose
- Git

## Quick Start

### 1. Levantar servicios base

```bash
cd manosabiertas-vercel-20260813
docker-compose up -d
```

Verifica:
```bash
docker ps
# DeberÃ­as ver: postgres, redis, kafka, zookeeper
```

### 2. Setup Prisma

```bash
cd backend

# Copiar .env
cp .env.example .env

# Instalar dependencias
npm install

# Generar tipos Prisma
npx prisma generate

# Correr migraciones (crear tablas)
npx prisma migrate dev --name init
```

### 3. Setup Auth Service

```bash
cd auth-service

# Instalar dependencias
npm install

# Correr dev
npm run start:dev
```

DeberÃ­a ver:
```
âœ“ Prisma connected to database
ðŸš€ Auth Service running on http://localhost:3001
```

### 4. Test endpoints

#### Registrarse
```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@ejemplo.com",
    "password": "Password123",
    "name": "Juan PÃ©rez"
  }'
```

Respuesta esperada:
```json
{
  "success": true,
  "user": {
    "id": "abc123...",
    "email": "usuario@ejemplo.com",
    "name": "Juan PÃ©rez"
  },
  "token": "eyJhbGc..."
}
```

#### Login
```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@ejemplo.com",
    "password": "Password123"
  }'
```

#### Get profile
```bash
curl -X GET http://localhost:3001/auth/me \
  -H "Authorization: Bearer <TU_TOKEN>"
```

## Estructura Actual

```
backend/
â”œâ”€â”€ auth-service/
â”‚   â”œâ”€â”€ src/
â”‚   â”‚   â”œâ”€â”€ main.ts              â† Entry point
â”‚   â”‚   â”œâ”€â”€ app.module.ts        â† NestJS mÃ³dulo
â”‚   â”‚   â”œâ”€â”€ auth.controller.ts   â† Endpoints
â”‚   â”‚   â”œâ”€â”€ auth.service.ts      â† LÃ³gica
â”‚   â”‚   â”œâ”€â”€ prisma.service.ts    â† DB connection
â”‚   â”œâ”€â”€ package.json
â”‚   â””â”€â”€ tsconfig.json
â”œâ”€â”€ prisma/
â”‚   â”œâ”€â”€ schema.prisma            â† Modelos
â”‚   â””â”€â”€ migrations/              â† Cambios DB
â”œâ”€â”€ shared-lib/
â”‚   â””â”€â”€ validation/
â”‚       â””â”€â”€ pvc-u.ts             â† ValidaciÃ³n 7 esferas
â”œâ”€â”€ .env.example
â””â”€â”€ docker-compose.yml
```

## Variables Entorno

Crear `backend/.env`:
```
DATABASE_URL=postgresql://manos:abiertas_dev@localhost:5432/manosabiertas
JWT_SECRET=dev-secret-key-change-in-prod
REDIS_URL=redis://localhost:6379
KAFKA_BROKERS=kafka:9092
NODE_ENV=development
```

## PrÃ³ximos Servicios (TODO)

```bash
# Course Service (CRUD + progreso)
cd course-service && npm run start:dev

# CV Service (generador + plantillas)
cd cv-service && npm run start:dev

# Legal Service (bÃºsqueda)
cd legal-service && npm run start:dev

# Community Service (foros + chat)
cd community-service && npm run start:dev
```

## Debugging

### Ver logs Prisma
```bash
export DEBUG=prisma:*
npm run start:dev
```

### Conectar a DB directamente
```bash
psql postgresql://manos:abiertas_dev@localhost:5432/manosabiertas
```

### Ver Kafka topics
```bash
docker exec -it ma-kafka kafka-topics --list --bootstrap-server localhost:9092
```

### Ver Redis
```bash
docker exec -it ma-redis redis-cli
> PING
> KEYS *
```

## Troubleshooting

**Error: "connect ECONNREFUSED 127.0.0.1:5432"**
- Verifica: `docker ps` (Â¿postgres corriendo?)
- Reinicia: `docker-compose down && docker-compose up -d`

**Error: "JWT_SECRET not set"**
- Copia `.env.example` a `.env`
- AsegÃºrate JWT_SECRET estÃ¡ definido

**Error: Prisma "no migrations found"**
- Corre: `npx prisma migrate dev --name init`

## Comandos Ãštiles

```bash
# Ver estado de servicios
docker-compose ps

# Ver logs
docker-compose logs -f postgres

# Resetear DB (CUIDADO - borra todo)
npx prisma migrate reset

# Seed DB con datos prueba
npm run seed

# Build production
npm run build

# Lint
npm run lint

# Tests
npm run test
```

## Proxima Etapa

Cuando Auth Service estÃ© estable:
1. Crear Course Service (similar)
2. Integrar Kafka (eventos cross-service)
3. Agregar cachÃ© Redis
4. Tests E2E

---

**Status**: Auth Service âœ… ready | Otros: TODO


