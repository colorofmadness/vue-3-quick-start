/// <reference types="vite/client" />

// CSS Modules — объявляем тип, чтобы TS не ругался
declare module '*.module.css' {
  const classes: Record<string, string>
  export default classes
}

declare module '*.module.postcss' {
  const classes: Record<string, string>
  export default classes
}

// Переменные окружения
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_APP_TITLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
