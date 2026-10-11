// ESLint 9 flat config — gate de estilo del proyecto (Fase B1).
// Preset oficial de Next.js 16 (core-web-vitals + TypeScript).
// El alcance es la aplicación (`src/` + configuración); el contenido estático,
// datos generados y scripts de verificación tienen reglas propias (node:test).
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

export default [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'dist/**',
      'build/**',
      'public/**',
      'campus/**',
      'docs/**',
      'open-data/**',
      'prisma/**',
      'scripts/**',
      'tests/**',
      'packages/**',
      'apps/**',
      'unified_from/**',
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      // Política de lint (Fase B1 — ratchet):
      // - 0 errores es el gate; la deuda legada queda visible como warning.
      // - `no-explicit-any` (warn): 100 usos en módulos IA legados
      //   (agent-registry/function-calling/rag-engine) clasificados REFACTOR
      //   en docs/audit/BASELINE-TECHNICAL-AUDIT.md; se endurecerá al rehacerlos.
      // - `set-state-in-effect` (warn): patrones intencionales de hidratación
      //   SSR y sondeo de progreso (ai-assistant, use-progress, app-store).
      '@typescript-eslint/no-explicit-any': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
];
