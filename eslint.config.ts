import pluginVue from 'eslint-plugin-vue'
import pluginBoundaries from 'eslint-plugin-boundaries'
import pluginImport from 'eslint-plugin-import'
import {defineConfigWithVueTs, vueTsConfigs} from '@vue/eslint-config-typescript'

export default defineConfigWithVueTs(
  {
    ignores: ['dist/**', 'node_modules/**', '*.d.ts'],
  },

  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommendedTypeChecked,

  {
    plugins: {
      boundaries: pluginBoundaries,
    },
    settings: {
      'boundaries/dependency-nodes': ['import'],

      'boundaries/elements': [
        {type: 'app', mode: 'full', pattern: 'src/app/**/*'},
        {type: 'pages', mode: 'full', pattern: 'src/pages/**/*'},
        {type: 'widgets', mode: 'full', pattern: 'src/widgets/**/*'},
        {type: 'features', mode: 'full', pattern: 'src/features/**/*'},
        {type: 'entities', mode: 'full', pattern: 'src/entities/**/*'},
        {type: 'shared', mode: 'full', pattern: 'src/shared/**/*'},
      ],
      'boundaries/include': ['src/**/*'],

      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          message: '[FSD] "${file.type}" не может импортировать "${dependency.type}"',
          rules: [
            {from: 'app', allow: ['app', 'pages', 'widgets', 'features', 'entities', 'shared']},
            {from: 'pages', allow: ['pages', 'widgets', 'features', 'entities', 'shared']},
            {from: 'widgets', allow: ['widgets', 'features', 'entities', 'shared']},
            {from: 'features', allow: ['features', 'entities', 'shared']},
            {from: 'entities', allow: ['entities', 'shared']},
            {from: 'shared', allow: ['shared']},
          ],
        },
      ],
      'boundaries/no-unknown': 'error',
      'boundaries/no-unknown-files': 'warn',
    },
  },

  {
    plugins: {
      import: pluginImport,
    },
    rules: {
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'type'],
          pathGroups: [
            {pattern: 'vue', group: 'external', position: 'before'},
            {pattern: '@app/**', group: 'internal', position: 'before'},
            {pattern: '@pages/**', group: 'internal'},
            {pattern: '@widgets/**', group: 'internal'},
            {pattern: '@features/**', group: 'internal'},
            {pattern: '@entities/**', group: 'internal'},
            {pattern: '@shared/**', group: 'internal', position: 'after'},
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: {order: 'asc', caseInsensitive: true},
        },
      ],
      'import/no-cycle': 'error',
      'import/no-self-import': 'error',
      'import/no-useless-path-segments': 'error',
    },
  },

  {
    files: ['**/*.ts', '**/*.vue'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': ['error', {prefer: 'type-imports'}],
      '@typescript-eslint/no-unused-vars': ['error', {argsIgnorePattern: '^_', varsIgnorePattern: '^_'}],
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },

  {
    files: ['**/*.vue'],
    rules: {
      'vue/block-order': ['error', {order: ['template', 'script', 'style']}],
      'vue/component-api-style': ['error', ['script-setup']],
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/define-macros-order': ['error', {
        order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'],
      }],
      'vue/multi-word-component-names': 'error',
      'vue/no-unused-vars': 'error',
      'vue/no-v-html': 'warn',
      'vue/padding-line-between-blocks': 'error',
      'vue/prefer-import-from-vue': 'error',
    },
  },

  {
    rules: {
      'no-console': ['warn', {allow: ['warn', 'error']}],
      'no-debugger': 'error',
      'eqeqeq': ['error', 'always'],
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'arrow-body-style': ['error', 'as-needed'],
    },
  },

  {
    files: ['*.config.*', 'vite.config.*', 'postcss.config.*'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
  },
)
