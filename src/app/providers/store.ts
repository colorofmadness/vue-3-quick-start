import { createPinia } from 'pinia'

import type { App } from 'vue'

export const setupStore = (app: App): void => {
  const pinia = createPinia()
  app.use(pinia)
}
