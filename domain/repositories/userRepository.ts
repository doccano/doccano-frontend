import type { User } from '@/domain/models/user'

export interface UserRepository {
  getProfile: () => Promise<User>
  list: (query: string) => Promise<User[]>
}
