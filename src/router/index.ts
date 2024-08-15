import { createWebHistory, RouteRecordRaw, createRouter } from 'vue-router'


const routes: RouteRecordRaw[] = [
    {
        path: '/', name: 'dashboard', component: () => import('@/views/dashboard.vue'),
        alias: ['/home', '/app']
    },
    {
        path: '/tasks', name: 'tasks', component: () => import('@/views/task-list.vue'),

    }

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export { router }