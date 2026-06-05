export default defineNuxtRouteMiddleware(async () => {
  const auth = useAuthStore()
    console.log('AUTH',auth.token)
  if (!auth.token) {
    console.log('sem token')
    return navigateTo('/login')
  }

//   if (!auth.user) {
//     try {
//       await auth.fetchUser()
//        console.log('sem token')
//     } catch {
//       return navigateTo('/login')
//     }
//   }
})
