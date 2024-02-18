import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

console.log("process.env.NODE_ENV", process.env.NODE_ENV);
console.log("process.env.BASE_URL", process.env.BASE_URL);

createApp(App).use(router).mount('#app')
