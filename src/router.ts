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
  },
  {
    path: '/build',
    component: () => import('@/components/build/index.vue')
  },
  {
    path: '/editor',
    component: () => import('@/components/editor/index.vue')
  },
  {
    path: '/schema',
    component: () => import('@/components/schema/index.vue')
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});


