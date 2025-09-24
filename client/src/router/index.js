import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import ErrorPage from "../views/ErrorPage.vue"

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/:id(\\d+)',
    name: 'game',
    component: Index
  },
  {
    path: '/error',
    name: 'error',
    component: ErrorPage
  },
  // Catch-all must come last
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: ErrorPage,
    meta: {
      requiresAuth: false
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;