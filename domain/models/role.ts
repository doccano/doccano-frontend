export type RoleName = 'project_admin' | 'annotator' | 'annotation_approver'

export class Role {
  constructor(
    readonly id: number,
    readonly name: RoleName
  ) {}
}
