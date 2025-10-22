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
      { path: 'restaurante', component: () => import('../admin/pages/dash/UserProfile.vue') },
      { path: 'restaurante/cadastro', component: () => import('../admin/pages/dash/restaurante/Cadastro.vue') },
      { path: 'restaurante/listagem', component: () => import('../admin/pages/dash/restaurante/Listagem.vue') },
      { path: 'restaurante/no-restaurant', component: () => import('../admin/pages/dash/BemVindo.vue') },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  const isAuthenticated = token && token !== 'undefined'
  console.log('to',to)

   // 🔒 Rotas que exigem autenticação
  if (to.meta.requiresAuth && !isAuthenticated) {
    console.log('🔒 Redirecionando para /login (sem token)')
    return next('/login')
  }

  // 🚫 Evita acessar /login se já está autenticado
  if ((to.path === '/login' || to.name === 'login') && isAuthenticated) {
    console.log('✅ Já autenticado, indo para /app')
    return next('/app')
  }

  // ✅ Caso padrão
  console.log('➡️ Continuando para', to.path)
  next()
})

export default router
