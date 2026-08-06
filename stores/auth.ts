
import type { LoginCredentials, ResponseLogin, UserData } from '@/types/auth'
import { authService } from '@/utils/api/authService'
import { defineStore } from 'pinia'
import { useToast } from '~/composables/useToast'

const toast = useToast()

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as UserData|null,
        token: null as string|null,
        isAuthenticated: false,
        initialized: false,
        loading: false
    }),

    getters: {
        isAuthenticated: state => !!state.token,
        hasMultippleRestaurants: (state) =>
            (state.user?.restaurants?.length ?? 0) > 1,
        handleUser: (state) => state.user
    },

    actions: {
        setUser(user: UserData | null) {
            console.log(user)
            this.user = user
        },

        async login(credentials: LoginCredentials) {
            this.loading = true

            try{
                const response = await authService.login<ResponseLogin>(credentials)

                this.setToken(response.access_token)

                this.isAuthenticated = true

                await this.fetchUser(true)

                toast.success('Login realizado com sucesso')
                    
            }catch(error){
                const message = handleError(error)
                toast.error(message)
            }finally {
                this.loading = false
            }
        },

        setToken(token: string) {
            this.token = token

            console.log('token',this.token)

            const tokenCookie = useCookie('accessToken',{
                maxAge: 60 * 60 * 24 * 3,
                path: '/',
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production',
               
            })
            tokenCookie.value = token
            console.log('teenCookie',tokenCookie.value)
        },
        
        async logout() {
            try{
                await authService.logout();

                const tokenCookie = useCookie('accessToken')
                tokenCookie.value = null
                this.token = null
                this.user = null
                this.isAuthenticated = false
                this.initialized = false
                
                toast.success('Logout realizado com sucesso')
                navigateTo('/login')
            }catch(error){
                const message = handleError(error)
                toast.error('Ops, algo deu errado , tente novamente')
                console.log(message)
            }
        },

        async fetchUser(force = false) {
            if (this.user && !force) return

            try{
                const response = await authService.me()
                this.setUser(response)
            }catch(error){
                const message = handleError(error)
                toast.error('Ops, algo deu errado , tente novamente')
            }
        },
        
        async bootstrap() {
            if (this.initialized) return

            const token = useCookie('accessToken').value

            if (!token) {
                this.initialized = true
                return
            }

            this.token = token

            try {
                await this.fetchUser()
            } catch {
                await this.logout()
            }

            this.initialized = true
        }
    }
    

 
})

