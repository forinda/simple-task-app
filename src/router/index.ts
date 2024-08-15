import { createWebHistory, RouteRecordRaw, createRouter } from 'vue-router'


const routes: RouteRecordRaw[] = [
    {
        path: '/', name: 'landing-page', component: () => import('@/views/LandingPage.view.vue'),
        alias: ['/home', '/app']
    },
    {
        path: '/tasks', name: 'task-group', component: () => import('@/views/task-list.vue'),

    }

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export { router }