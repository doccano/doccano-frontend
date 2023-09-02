import { defineStore } from 'pinia'
import type { UserItem } from '@/domain/models/user'

export const useAuthStore = defineStore({
  id: 'auth',

  persist: true,

  state: () => ({
    isLoggedIn: false,
    user: null as UserItem | null
  }),

  getters: {
    allowUserToCreateProject(): boolean {
      return this.user !== null ? this.user.isStaff : false
    }
  },

  actions: {
    async login(username: string, password: string) {
      const { $repositories } = useNuxtApp()
      try {
        await $repositories.auth.login(username, password)
        const user = await $repositories.user.getProfile()
        this.isLoggedIn = true
        this.user = user
      } catch (error) {
        throw new Error('The credential is invalid')
      }
    },

    async logout() {
      const { $repositories } = useNuxtApp()
      await $repositories.auth.logout()
      this.isLoggedIn = false
      this.user = null
    }
  }
})
