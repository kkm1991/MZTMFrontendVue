 

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
 
 
import '../src/assets/custom.css'
 

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

 
 
 
 

app.mount('#app')
