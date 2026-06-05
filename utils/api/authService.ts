import type { LoginCredentials, UserData } from '@/types/auth'

export const authService = {
  async login<ResponseLogin>(access: LoginCredentials): Promise<ResponseLogin> {
    return $api<ResponseLogin>('/login', {
      method: 'POST',
      body: access,
    })
  },

  async logout() {
    return $api('/logout', {
      method: 'POST',
    })
  },

  async me() {
    return $api<UserData>('/me')
  },
}
