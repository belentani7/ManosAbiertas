const reactPlugin = (await import('eslint-plugin-react')).default
const reactHooksPlugin = (await import('eslint-plugin-react-hooks')).default
const nextPlugin = (await import('@next/eslint-plugin-next')).default
const typescriptPlugin = (await import('@typescript-eslint/eslint-plugin')).default
const typescriptParser = (await import('@typescript-eslint/parser')).default

export default [
  {
    ignores: ['.next/**', 'public/**'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: ['./tsconfig.json', './packages/dashboard/tsconfig.json'],
      },
    },
    settings: { react: { version: '18.2' } },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      '@next/next': nextPlugin,
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      '@next/next/no-img-element': 'warn',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
]
