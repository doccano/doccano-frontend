import { AuthRepository } from '@/repositories/authRepository'
import BaseRepository from '@/repositories/baseRepository'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const baseRepository = new BaseRepository(runtimeConfig.public.apiBase)
  return {
    provide: {
      repositories: {
        auth: new AuthRepository(baseRepository)
      }
    }
  }
})
