import { createApp } from 'vue'
//导入路由配置
import router from './router';

import './style.css'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.mount('#app')

