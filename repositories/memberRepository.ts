import type BaseRepository from './baseRepository'
import { Member } from '@/domain/models/member'
import type { MemberRepository } from '@/domain/repositories/memberRepository'

function toModel(item: { [key: string]: any }): Member {
  return new Member(item.id, item.user, item.role, item.username, item.rolename)
}

function toPayload(item: Member): { [key: string]: any } {
  return {
    id: item.id,
    user: item.user,
    role: item.role,
    username: item.username,
    rolename: item.rolename
  }
}

export class ApiMemberRepository implements MemberRepository {
  constructor(private readonly request: BaseRepository) {}

  async list(projectId: string): Promise<Member[]> {
    const url = `/projects/${projectId}/members`
    const response = await this.request.get(url)
    return response.data.map((item: { [key: string]: any }) => toModel(item))
  }

  async create(projectId: string, item: Member): Promise<Member> {
    const url = `/projects/${projectId}/members`
    const payload = toPayload(item)
    const response = await this.request.post(url, payload)
    return toModel(response.data)
  }

  async update(projectId: string, item: Member): Promise<Member> {
    const url = `/projects/${projectId}/members/${item.id}`
    const payload = toPayload(item)
    const response = await this.request.patch(url, payload)
    return toModel(response.data)
  }

  async bulkDelete(projectId: string, members: Member[]): Promise<void> {
    const url = `/projects/${projectId}/members`
    const ids = members.map((member) => member.id)
    await this.request.delete(url, { ids })
  }

  async fetchMyRole(projectId: string): Promise<Member> {
    const url = `/projects/${projectId}/my-role`
    const response = await this.request.get(url)
    return toModel(response.data)
  }
}
