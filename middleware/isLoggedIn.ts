import { useAuthStore } from '@/stores/auth'

export default defineNuxtRouteMiddleware(async () => {
  const auth = useAuthStore()
  const localePath = useLocalePath()
  if (!auth.isLoggedIn) {
    return await navigateTo(localePath('/login'))
  }
})
