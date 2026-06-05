import type { RestaurantMe } from "./restaurant"

export interface LoginCredentials {
    email: string
    password: string,
    identity: string
}
export interface ResponseLogin {
  access_token: string
  token_type?: string

  error?: {
    code?: string
    message: string
  }
}
export interface User {
  id: number
  name: string
  email: string
  token: string
  permissions: string[]
  roles: string[]
}

export interface UserData {
  id: number
  name: string
  email: string,
  roles: string[]
  restaurants: RestaurantMe[]
}
