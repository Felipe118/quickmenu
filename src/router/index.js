import { createRouter, createWebHistory } from 'vue-router'




const routes = [
  {
    path: '/',
    name: 'intro',
    component: () => import('@/admin/pages/Intro/Intro.vue'),
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
    component: import('@/admin/components/Layout.vue'),
    children: [
      { path: '',  component: () => import('../admin/pages/Dash/Dashboard.vue') },
      { path: 'user', component: () => import('../admin/pages/Dash/UserProfile.vue'), },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
