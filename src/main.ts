import { createApp } from 'vue'
import '@/assets/scss/root.scss'
import router from "./router";
import { createPinia } from "pinia";
import App from './App.vue'
import i18n from "@/core/plugins/i18n";


const app = createApp(App);
app.use(i18n);
app.use(router);
const store = createPinia()
app.use(store);


app.mount("#app");
