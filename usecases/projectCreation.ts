import { Project } from '@/models/project'
import { TagItem } from '@/models/tag'
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

export class ProjectApplicationService {
  constructor(private readonly repository: ProjectRepository) {}

  public async create({
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
      tags.map((tag) => TagItem.create(tag)),
      allowMemberToCreateLabelType
    )
    try {
      return await this.repository.create(project)
    } catch (e: any) {
      throw new Error(e.response.data.detail)
    }
  }

  public async update(
    projectId: number,
    {
      name,
      description,
      projectType,
      enableRandomOrder,
      enableSharingMode,
      exclusiveCategories,
      allowOverlappingSpans,
      enableGraphemeMode,
      useRelation,
      guideline = '',
      allowMemberToCreateLabelType
    }: Omit<ProjectFields, 'tags'>
  ): Promise<void> {
    const project = Project.create(
      projectId,
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
      [],
      allowMemberToCreateLabelType
    )

    try {
      await this.repository.update(project)
    } catch (e: any) {
      throw new Error(e.response.data.detail)
    }
  }
}
