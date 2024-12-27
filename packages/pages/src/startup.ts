import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import {
  type RouteRecordRaw,
  createRouter,
  createWebHashHistory,
} from 'vue-router';
import App from './App.vue';
import { axios } from '@mpt/blocks';
import '@mpt/blocks/index.css';
import './index.css';


console.log(axios);

axios.get('https://jsonplaceholder.typicode.com/todos/1').then((response) => {
  console.log(response.data);
})

export const startup = (routes: Readonly<RouteRecordRaw[]>) => {
  const router = createRouter({
    routes,
    history: createWebHashHistory(),
  });
  createApp(App).use(ElementPlus).use(router).mount('#root');
};
