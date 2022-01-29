import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import storage from '@/utils/storage';
import store from '@/store';

const Login = () => import('@/views/login/login.vue');
const Main = () => import('@/views/main/main.vue');
const Dashboard = () => import('@/views/main/analysis/dashboard/dashboard.vue');
const Overview = () => import('@/views/main/analysis/overview/overview.vue');
const Category = () => import('@/views/main/product/category/category.vue');
const Goods = () => import('@/views/main/product/goods/goods.vue');
const Chat = () => import('@/views/main/story/chat/chat.vue');
const List = () => import('@/views/main/story/list/list.vue');
const Department = () => import('@/views/main/system/department/department.vue');
const Menu = () => import('@/views/main/system/menu/menu.vue');
const Role = () => import('@/views/main/system/role/role.vue');
const User = () => import('@/views/main/system/user/user.vue');

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main',
  },
  {
    name: 'main',
    path: '/main',
    component: Main,
    children: [
      {
        name: 'dashboard',
        path: 'analysis/dashboard',
        component: Dashboard,
      },
      {
        name: 'overview',
        path: 'analysis/overview',
        component: Overview,
      },
      {
        name: 'category',
        path: 'product/category',
        component: Category,
      },
      {
        name: 'goods',
        path: 'product/goods',
        component: Goods,
      },
      {
        name: 'chat',
        path: 'story/chat',
        component: Chat,
      },
      {
        name: 'list',
        path: 'story/list',
        component: List,
      },
      {
        name: 'department',
        path: 'system/department',
        component: Department,
      },
      {
        name: 'menu',
        path: 'system/menu',
        component: Menu,
      },
      {
        name: 'role',
        path: 'system/role',
        component: Role,
      },
      {
        name: 'user',
        path: 'system/user',
        component: User,
      },
    ]
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

router.beforeEach((to, from) => {
  if (to.path !== '/login') {
    const token = storage.getCache('token');
    if (!token) return './login';
  }
});

export default router;
