import { Project } from '@/domain/models/project'
import { Tag } from '@/domain/models/tag'
import type { ProjectRepository } from '@/repositories/projectRepository'

interface ProjectFields {
  name: string
  description: string
  guideline: string
  projectType: string
  enableRandomOrder: boolean
  enableSharingMode: boolean
  exclusiveCategories: boolean
  tags: string[]
  allowOverlappingSpans: boolean
  enableGraphemeMode: boolean
  useRelation: boolean
  allowMemberToCreateLabelType: boolean
}

export class CreateProjectUsecase {
  constructor(private readonly repository: ProjectRepository) {}

  public async handle({
    name,
    description,
    projectType,
    enableRandomOrder,
    enableSharingMode,
    exclusiveCategories,
    allowOverlappingSpans,
    enableGraphemeMode,
    useRelation,
    tags,
    guideline = '',
    allowMemberToCreateLabelType = false
  }: ProjectFields): Promise<Project> {
    const project = Project.create(
      0,
      name,
      description,
      guideline,
      projectType,
      enableRandomOrder,
      enableSharingMode,
      exclusiveCategories,
      allowOverlappingSpans,
      enableGraphemeMode,
      useRelation,
      tags.map((tag) => Tag.create(tag)),
      allowMemberToCreateLabelType
    )
    try {
      return await this.repository.create(project)
    } catch (e: any) {
      throw new Error(e.response.data.detail)
    }
  }
}
