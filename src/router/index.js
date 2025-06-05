import { createRouter, createWebHistory } from 'vue-router'
import EpisodesDemo from '@/views/EpisodesDemo.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/movie/:slug',
      name: 'movie-detail',
      component: () => import('@/views/MovieDetailView.vue'),
      props: true
    },
    {
      path: '/watch/:slug/:episode?',
      name: 'watch',
      component: () => import('@/views/WatchView.vue'),
      props: true
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/SearchView.vue')
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('@/views/CategoriesView.vue')
    },
    {
      path: '/category/:slug',
      name: 'category-detail',
      component: () => import('@/views/CategoryDetailView.vue'),
      props: true
    },
    {
      path: '/donate',
      name: 'donate',
      component: () => import('@/views/DonateView.vue')
    },
    {
      path: '/demo/episodes',
      name: 'episodes-demo',
      component: EpisodesDemo
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router 