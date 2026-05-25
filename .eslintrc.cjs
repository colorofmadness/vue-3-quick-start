// .eslintrc.cjs
/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,

  env: {
    browser: true,
    es2022: true,
    node: true,
  },

  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    extraFileExtensions: ['.vue'],
  },

  plugins: [
    '@typescript-eslint',
    'import',
    'boundaries',
  ],

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:vue/vue3-recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],

  /* ─────────────────────────────────────────────────────────────
     FSD — правила границ слоёв
     Порядок импортов: app → pages → widgets → features → entities → shared
     Каждый слой может импортировать только нижележащие.
  ───────────────────────────────────────────────────────────── */
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },

    'boundaries/elements': [
      { type: 'app',      pattern: 'src/app/**' },
      { type: 'pages',    pattern: 'src/pages/**' },
      { type: 'widgets',  pattern: 'src/widgets/**' },
      { type: 'features', pattern: 'src/features/**' },
      { type: 'entities', pattern: 'src/entities/**' },
      { type: 'shared',   pattern: 'src/shared/**' },
    ],

    'boundaries/ignore': ['**/*.test.*', '**/*.spec.*', '**/*.stories.*'],
  },

  rules: {
    /* ── FSD import boundaries ──────────────────────────────── */
    'boundaries/element-types': [
      'error',
      {
        default: 'disallow',
        rules: [
          // app — может всё
          { from: 'app',      allow: ['app', 'pages', 'widgets', 'features', 'entities', 'shared'] },
          // pages — всё кроме app
          { from: 'pages',    allow: ['pages', 'widgets', 'features', 'entities', 'shared'] },
          // widgets — ниже pages
          { from: 'widgets',  allow: ['widgets', 'features', 'entities', 'shared'] },
          // features — ниже widgets
          { from: 'features', allow: ['features', 'entities', 'shared'] },
          // entities — только shared (и себя через @id)
          { from: 'entities', allow: ['entities', 'shared'] },
          // shared — только себя
          { from: 'shared',   allow: ['shared'] },
        ],
      },
    ],

    /* ── Порядок импортов ───────────────────────────────────── */
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
          'type',
        ],
        pathGroups: [
          { pattern: 'vue',       group: 'external', position: 'before' },
          { pattern: '@app/**',   group: 'internal', position: 'before' },
          { pattern: '@pages/**', group: 'internal' },
          { pattern: '@widgets/**', group: 'internal' },
          { pattern: '@features/**', group: 'internal' },
          { pattern: '@entities/**', group: 'internal' },
          { pattern: '@shared/**', group: 'internal', position: 'after' },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],

    'import/no-cycle': 'error',
    'import/no-self-import': 'error',
    'import/no-useless-path-segments': 'error',

    /* ── TypeScript ─────────────────────────────────────────── */
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    /* ── Vue ────────────────────────────────────────────────── */
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/define-macros-order': ['error', {
      order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'],
    }],
    'vue/no-unused-vars': 'error',
    'vue/no-v-html': 'warn',
    'vue/padding-line-between-blocks': 'error',
    'vue/prefer-import-from-vue': 'error',
    'vue/multi-word-component-names': 'error',
    'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
    'vue/component-api-style': ['error', ['script-setup']],

    /* ── Общие ──────────────────────────────────────────────── */
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'eqeqeq': ['error', 'always'],
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'arrow-body-style': ['error', 'as-needed'],
  },

  overrides: [
    // Конфигурационные файлы — без строгих TS-правил
    {
      files: ['*.config.*', '.eslintrc.*'],
      rules: {
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
}
