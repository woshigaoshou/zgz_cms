import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const Home = () => import('@/views/Home.vue');
const Login = () => import('@/views/Login.vue');

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/login',
    component: Login,
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
