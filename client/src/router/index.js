import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import ErrorPage from "../views/ErrorPage.vue"

    const routes = [
      {
        path: "/:catchAll(.*)",
        name: "NotFound",
        component: ErrorPage,
        meta: {
          requiresAuth: false
        }
      },
      {
        path: '/',
        name: 'index',
        component: Index
      },
      {
        path: '/:id',
        name: 'game',
        component: Index
      },
      {
        path: '/error',
        name: 'error',
        component: ErrorPage
      },
    ]

    const router = createRouter({
      history: createWebHistory(process.env.BASE_URL),
      routes
    })

    export default router;