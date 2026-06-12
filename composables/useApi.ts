import { defu } from 'defu'
import type { UseFetchOptions } from 'nuxt/app'

export const useApi: typeof useFetch = <T>(url: MaybeRefOrGetter<string>, options: UseFetchOptions<T> = {}) => {
  const config = useRuntimeConfig()
  const accessToken = useCookie('accessToken')

  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.apiBaseUrl,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(accessToken.value ? { Authorization: `Bearer ${accessToken.value}` } : {})
      },
  }

  const params = defu(options, defaults)

  return useFetch(url, params)
}
