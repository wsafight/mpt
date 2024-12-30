import { axios } from '@mpt/blocks';
import ElementPlus from 'element-plus';
import { createApp } from 'vue';
import {
  type RouteRecordRaw,
  createRouter,
  createWebHashHistory,
} from 'vue-router';
import App from './App.vue';
// #if NODE_ENV === 'development'
import '@mpt/blocks/index.css';
console.log('Debug version')
// #endif

import 'uno.css';
import './index.css';

console.log(axios);

axios.get('https://jsonplaceholder.typicode.com/todos/1').then((response) => {
  console.log(response.data);
});

export const startup = (routes: Readonly<RouteRecordRaw[]>) => {
  const router = createRouter({
    routes,
    history: createWebHashHistory(),
  });
  createApp(App).use(ElementPlus).use(router).mount('#root');
};
