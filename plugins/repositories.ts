import { ApiAuthRepository } from '@/repositories/authRepository'
import BaseRepository from '@/repositories/baseRepository'
import { ApiProjectRepository } from '@/repositories/projectRepository'
import { ApiUserRepository } from '@/repositories/userRepository'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const baseRepository = new BaseRepository(runtimeConfig.public.apiBase)
  return {
    provide: {
      repositories: {
        auth: new ApiAuthRepository(baseRepository),
        user: new ApiUserRepository(baseRepository),
        project: new ApiProjectRepository(baseRepository)
      }
    }
  }
})
