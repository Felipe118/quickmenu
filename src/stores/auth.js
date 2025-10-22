import { defineStore } from 'pinia'
import authService from '@/services/authService'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null      
    }),

    actions: {
        async login(dados) {
            const {data} = await authService.login(dados)
            this.token = data.access_token
            localStorage.setItem('token', token)
        },
        async fetchUser() {
            if (!this.token) delete api.defaults.headers.common['Authorization']
            const { data } = await api.get('/me')
            this.user = data
        },
        async logout() {
            this.user = null
            this.token = null

            await authService.logout();
            
            localStorage.removeItem('token')
            delete api.defaults.headers.common['Authorization']
        }
    }
})