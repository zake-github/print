import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import aa from './packages';
const app = createApp(App)
app.use(ElementPlus)
app.use(aa)
app.mount('#app');


