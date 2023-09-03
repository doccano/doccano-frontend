import type { Page } from '@/domain/models/page'
import type { Project } from '@/domain/models/project'

export interface ProjectRepository {
  list: (query: Record<string, any>) => Promise<Page<Project>>
  findById: (id: string) => Promise<Project>
  create: (project: Project) => Promise<Project>
  update: (project: Project) => Promise<void>
  bulkDelete: (projectIds: number[]) => Promise<void>
  clone: (project: Project) => Promise<Project>
}
