import { defineStore } from 'pinia'
import type { Project } from '@/domain/models/project'

export const useProjectStore = defineStore({
  id: 'project',

  state: () => ({
    project: null as Project | null
  }),

  getters: {
    isEmpty(): boolean {
      return this.project === null
    }
  },

  actions: {
    async setProject(projectId: string) {
      const { $repositories } = useNuxtApp()
      this.project = await $repositories.project.findById(projectId)
    },

    matchProject(projectId: string): boolean {
      return !this.isEmpty && this.project!.id === parseInt(projectId)
    }
  }
})
