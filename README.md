# Vue 3 FSD Template

Современный стартовый шаблон на **Vue 3 + Vite + TypeScript + PostCSS Modules** с архитектурой **Feature-Sliced Design**.

## Стек

| Инструмент | Версия | Роль |
|---|---|---|
| Vue 3 | ^3.4 | UI-фреймворк (Composition API + `<script setup>`) |
| Vite 5 | ^5.2 | Сборщик |
| TypeScript | ^5.4 | Типизация |
| PostCSS | ^8.4 | CSS-процессор |
| CSS Modules | встроено в Vite | Изоляция стилей |
| postcss-nested | ^6 | Вложенные правила (как в Sass) |
| autoprefixer | ^10 | Кроссбраузерные префиксы |
| Pinia | ^2.1 | Стейт-менеджмент |
| Vue Router | ^4.3 | Маршрутизация |
| ESLint | ^9.0 | Линтер (flat config) |
| typescript-eslint | ^8.0 | TS-правила для flat config |
| eslint-plugin-boundaries | ^5.0 | Проверка FSD-импортов |

---

## Структура проекта (FSD)

```
src/
├── app/                    # Слой: инициализация приложения
│   ├── App.vue             # Корневой компонент
│   ├── router/             # Настройка маршрутизатора
│   ├── providers/          # store, i18n, theme и т.д.
│   └── styles/             # Глобальные стили + CSS-переменные
│
├── pages/                  # Слой: страницы (роуты)
│   ├── home/
│   │   └── ui/HomePage.vue
│   └── not-found/
│       └── ui/NotFoundPage.vue
│
├── widgets/                # Слой: самодостаточные блоки (Header, Sidebar…)
│
├── features/               # Слой: пользовательские действия (auth, search…)
│
├── entities/               # Слой: бизнес-сущности (User, Product…)
│
└── shared/                 # Слой: переиспользуемый код без бизнес-логики
    ├── ui/                 # Базовые компоненты (AppButton…)
    ├── api/                # HTTP-клиент
    ├── lib/                # Composables / утилиты
    ├── config/             # Константы, env-переменные
    └── types/              # Глобальные TypeScript-типы
```

### Правила импортов (FSD)

```
app  →  pages  →  widgets  →  features  →  entities  →  shared
```

Каждый слой может импортировать **только нижележащие** слои.  
Нарушение правил автоматически фиксируется ESLint (`eslint-plugin-boundaries`).

Конфигурация использует **flat config** (`eslint.config.ts`) — стандарт ESLint 9+. Устаревший `.eslintrc` не используется.

---

## Алиасы путей

| Алиас | Путь |
|---|---|
| `@/*` | `src/*` |
| `@app/*` | `src/app/*` |
| `@pages/*` | `src/pages/*` |
| `@widgets/*` | `src/widgets/*` |
| `@features/*` | `src/features/*` |
| `@entities/*` | `src/entities/*` |
| `@shared/*` | `src/shared/*` |

---

## CSS Modules + PostCSS

Все `.vue`-файлы используют `<style module>` для автоматической изоляции стилей.  
Внутри можно писать вложенные правила благодаря `postcss-nested`:

```vue
<style module>
.card {
  padding: var(--spacing-4);

  &__title {
    font-size: var(--text-xl);
    color: var(--color-primary);
  }
}
</style>
```

Глобальные CSS-переменные (дизайн-токены) определены в `src/app/styles/global.css`.

---

## Быстрый старт

```bash
# Установка pnpm (если ещё нет)
corepack enable

# Установка зависимостей
pnpm install

# Разработка
pnpm dev

# Проверка типов
pnpm type-check

# Линтинг
pnpm lint

# Сборка
pnpm build
```

---

## Соглашения по коду

- Компоненты — `PascalCase.vue`, только `<script setup>`
- Порядок блоков в SFC: `<template>` → `<script>` → `<style>`
- Экспорты из слоя — через `index.ts` (barrel-файл)
- Стили — только CSS Modules (`<style module>`)
- Типы — `type` вместо `interface` для union/aliases, `interface` для объектов
- `import type` для импорта типов TypeScript
