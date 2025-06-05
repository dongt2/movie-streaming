import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/style.css'
import { disableConsoleLogs, preventDevTools } from './utils/security'

// Disable console logs in production
disableConsoleLogs()

// Prevent developer tools access
preventDevTools()

const app = createApp(App)

app.use(router)

app.mount('#app') 