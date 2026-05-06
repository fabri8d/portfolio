import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomeView,
      meta: { title: 'Fabrizio Biondi — Portfolio' },
    },
    {
      path: '/projects/iot-robot',
      component: () => import('../views/projects/IotRobotView.vue'),
      meta: { title: 'IoT Robot + Data Pipeline — Fabrizio Biondi' },
    },
    {
      path: '/projects/mobile-app',
      component: () => import('../views/projects/MobileAppView.vue'),
      meta: { title: 'App Accesibilidad — Fabrizio Biondi' },
    },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = to.meta.title ?? 'Fabrizio Biondi — Portfolio'
})

export default router
