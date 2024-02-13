import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/vote',
      name: 'vote',
      component: () => import('../views/VoteView.vue')
    },
    {
      path: '/import',
      name: 'import',
      component: () => import('../views/ImportView.vue')
    }, 
    {
      path: '/results',
      name: 'results',
      component: () => import('../views/VoteResult.vue')
    }
  ]
})

export default router
