import { createApp } from 'vue'
import App from './App.vue'
import VueSocialSharing from 'vue-social-sharing'
import cors from 'cors'
import router from './router'
import 'bootstrap'

createApp(App).use(router).use(VueSocialSharing).use(cors).mount('#app')
