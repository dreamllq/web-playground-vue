import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router';


const routes = [
  {
    path: '/',
    redirect: '/base'
  },
  {
    path: '/base',
    component: () => import('@/components/base/index.vue') 
  },
  {
    path: '/page',
    component: () => import('@/components/page/index.vue')
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});


