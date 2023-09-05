import type { Member } from '@/domain/models/member'

export interface MemberRepository {
  list: (projectId: string) => Promise<Member[]>
  create: (projectId: string, item: Member) => Promise<Member>
  update: (projectId: string, item: Member) => Promise<Member>
  bulkDelete: (projectId: string, members: Member[]) => Promise<void>
  fetchMyRole: (projectId: string) => Promise<Member>
}
