import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'intro',
    component: () => import('@/admin/pages/intro/Intro.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/admin/pages/auth/Register.vue'),
  },
  {
    path: '/login',
    component: () => import('@/admin/components/AuthLayout.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('@/admin/pages/auth/Login.vue'),
      },
     
    ],
  },
   {
    path: '/app',
    component: () => import('@/admin/components/Layout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '',  component: () => import('../admin/pages/dash/Dashboard.vue') },
      { path: 'user', component: () => import('../admin/pages/dash/UserProfile.vue') },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  console.log(to)

  if (to.meta.requiresAuth && (!token || token == 'undefined')) {
    console.log('requiresAuth')
    next('/login')
  } else if (to.path === '/login' && token) {
    console.log('login')
    next('/app')
  } else {
    next()
  }
})

export default router
