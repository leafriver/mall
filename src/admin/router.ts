import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import Dashboard from './pages/Dashboard.vue';
import ProductManage from './pages/ProductManage.vue';
import UserManage from './pages/UserManage.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: { name: 'dashboard' } },
  { path: '/dashboard', name: 'dashboard', component: Dashboard },
  { path: '/product', name: 'product', component: ProductManage },
  { path: '/user', name: 'user', component: UserManage },
];

const router = createRouter({
  history: createWebHistory('/admin.html'),
  routes,
});

export default router; 