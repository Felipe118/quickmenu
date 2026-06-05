import { useAuthStore } from '@/stores/auth'

export const $api = $fetch.create({
  async onRequest({ options }) {
    options.baseURL = useRuntimeConfig().public.apiBaseUrl || '/api'
    const auth = useAuthStore()
    const token = auth.token || useCookie('accessToken').value

    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      }
    }
  },
  
  async onResponseError({ response, options }) {
  
    if (options.url?.includes('/auth/login') || options.url?.includes('/auth/')) {
      return
    }
    
    if (response.status === 401) {
      const auth = useAuthStore()
      const currentRoute = useRoute()
      
      if (!currentRoute.path.includes('/login')) {
        console.log('Token expirado, deslogando...')
        await auth.logout()
        navigateTo('/login')
      }
    }
  }
})
