import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import storage from '@/utils/storage';
import store from '@/store';
import { defaultRoute } from '@/utils/handleRoutes';

const Login = () => import('@/views/login/login.vue');
const Main = () => import('@/views/main/main.vue');
const notFound = () => import('@/views/not-found/not-found.vue');

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main',
  },
  {
    name: 'main',
    path: '/main',
    component: Main,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: notFound,
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

router.beforeEach((to, from) => {
  console.log(to.path);

  if (to.path !== '/login') {
    const token = storage.getCache('token');
    if (!token) return '/login';
  }
  if (to.path === '/main') {
    console.log(defaultRoute);

    return defaultRoute.path;
  }
});

export default router;
