import { createApp } from "vue";
import App from "./App.vue";
import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";
import { layout } from "@mpt/layouts";
import ElementPlus from "element-plus";
import "./index.css";

export const startup = (routes: Readonly<RouteRecordRaw[]>) => {
  const router = createRouter({
    routes,
    history: createWebHashHistory(),
  });
  createApp(App).use(ElementPlus).use(router).mount("#root");
  layout();
};
