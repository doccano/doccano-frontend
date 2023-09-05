import type { RoleName } from './role'

export class Member {
  constructor(
    readonly id: number,
    readonly user: number,
    readonly role: number,
    readonly username: string,
    readonly rolename: RoleName
  ) {}

  get isProjectAdmin(): boolean {
    return this.rolename === 'project_admin'
  }
}
