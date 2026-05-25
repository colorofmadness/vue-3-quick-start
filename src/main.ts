import { createApp } from 'vue'

import App from '@app/App.vue'
import { router } from '@app/router'
import { setupStore } from '@app/providers/store'

const app = createApp(App)

setupStore(app)
app.use(router)

app.mount('#app')
