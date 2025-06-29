// src/router/index.ts
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(), // 关键修改：使用hash模式
  routes: [
    // 您的路由配置
    {
        path: '/',
        name: 'Home',
        component: () => import('../components/container.vue')
    },
    {
        path: '/404',
        name: '404',
        component: () => import('../components/404.vue')
    },
        {
        path: '/:pathMatch(.*)*',
        redirect: '/404'
    } ,

  ]
})

export default router;