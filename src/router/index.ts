import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: HomePage,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
