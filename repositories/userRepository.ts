import type BaseRepository from './baseRepository'
import { User } from '@/domain/models/user'
import type { UserRepository } from '@/domain/repositories/userRepository'

function toModel(item: { [key: string]: any }): User {
  return new User(item.id, item.username, item.is_superuser, item.is_staff)
}

export class ApiUserRepository implements UserRepository {
  constructor(private readonly request: BaseRepository) {}

  async getProfile(): Promise<User> {
    const url = '/me'
    const response = await this.request.get(url)
    return toModel(response.data)
  }

  async list(query: string): Promise<User[]> {
    const url = `/users?q=${query}`
    const response = await this.request.get(url)
    return response.data.map((item: { [key: string]: any }) => toModel(item))
  }
}
