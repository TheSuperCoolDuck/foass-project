import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
      meta: {
        loginRequired: true
      }
    },
    {
      path: '/fetch',
      name: 'fetch',
      component: () => import('@/views/FetchView.vue')
    },
    {
      path: '/403',
      name: '403-forbidden',
      component: () => import('@/views/_403Forbidden.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  console.log('widjwdo')

  // check if login is required for this route
  console.log(to)
  const loginRequired = to.matched.some((route) => route.meta.loginRequired)

  console.log(loginRequired)
  if (!loginRequired) {
    return next()
  }

  const user = useUserStore()

  console.log(user.loggedIn)

  if (user.loggedIn) {
    return next()
  } else {
    return next('403')
  }
})

export default router
