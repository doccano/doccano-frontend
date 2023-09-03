import type BaseRepository from './baseRepository'
import type { AuthRepository } from '@/domain/repositories/authRepository'

export class ApiAuthRepository implements AuthRepository {
  constructor(private readonly request: BaseRepository) {}

  async login(username: string, password: string): Promise<void> {
    const url = '/auth/login/'
    await this.request.post(url, { username, password })
  }

  async logout(): Promise<void> {
    const url = '/auth/logout/'
    await this.request.post(url)
  }
}
