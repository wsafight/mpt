import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import {
  type RouteRecordRaw,
  createRouter,
  createWebHashHistory,
} from 'vue-router';
import App from './App.vue';
import './index.css';

export const startup = (routes: Readonly<RouteRecordRaw[]>) => {
  const router = createRouter({
    routes,
    history: createWebHashHistory(),
  });
  createApp(App).use(ElementPlus).use(router).mount('#root');
};
