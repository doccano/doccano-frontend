import { AuthRepository } from '@/repositories/authRepository'
import BaseRepository from '@/repositories/baseRepository'
import { ProjectRepository } from '@/repositories/projectRepository'
import { UserRepository } from '@/repositories/userRepository'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const baseRepository = new BaseRepository(runtimeConfig.public.apiBase)
  return {
    provide: {
      repositories: {
        auth: new AuthRepository(baseRepository),
        user: new UserRepository(baseRepository),
        project: new ProjectRepository(baseRepository)
      }
    }
  }
})
