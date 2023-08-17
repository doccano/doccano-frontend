import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  id: 'auth',

  state: () => ({
    isLoggedIn: false,
    isStaff: false
  }),

  getters: {
    allowUserToCreateProject(): boolean {
      return this.isStaff
    }
  },

  actions: {
    async login(username: string, password: string) {
      const { $repositories } = useNuxtApp()
      try {
        await $repositories.auth.login(username, password)
        this.isLoggedIn = true
      } catch (error) {
        throw new Error('The credential is invalid')
      }
    },

    async logout() {
      const { $repositories } = useNuxtApp()
      await $repositories.auth.logout()
      this.isLoggedIn = false
      // commit('setIsStaff', false)
      // commit('clearUsername')
    }
  }
})
