export const useAfterLogin = () => {
  const authStore = useAuthStore()

  const redirectUser = async () => {
    if (!authStore.user) return navigateTo('/login')

    const user = authStore.user

    if (user?.roles[0] === 'admin_master')
      return navigateTo('/')

    await authStore.fetchUser()

    const count = user?.restaurants.length

    if (count === 1) {
      const restaurant = user.restaurants[0]

      return navigateTo(`/restaurant/${restaurant?.id}`)
    }

    return navigateTo('/select-restaurant')
  }

  return {
    redirectUser,
  }
}
