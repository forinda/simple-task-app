import { createWebHistory, RouteRecordRaw, createRouter } from 'vue-router'


const routes: RouteRecordRaw[] = [
    {
        path: '/', name: 'landing-page', component: () => import('@/views/LandingPage.view.vue'),
        alias: ['/home', '/app']
    },
    {
        path: '/groups/:id', name: 'task-group', component: () => import('@/views/groups/TaskGroups.view.vue'),
        children: [{
            path: 'task',
            name:'task',
            component: () => import('@/views/groups/children/Task.view.vue')
        }]
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export { router }