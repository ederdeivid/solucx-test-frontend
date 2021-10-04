import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'popper.js/dist/popper.min.js'
import 'popper.js/dist/popper-utils.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.css'
import '@mdi/font/css/materialdesignicons.css'

createApp(App).use(router).mount('#app')
