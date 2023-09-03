import type BaseRepository from './baseRepository'
import { Page } from '@/domain/models/page'
import { Project } from '@/domain/models/project'
import { Tag } from '@/domain/models/tag'

function toModel(item: Record<string, any>): Project {
  return new Project(
    item.id,
    item.name,
    item.description,
    item.guideline,
    item.project_type,
    item.random_order,
    item.collaborative_annotation,
    item.single_class_classification,
    item.allow_overlapping,
    item.grapheme_mode,
    item.use_relation,
    item.tags.map((tag: Record<string, any>) => new Tag(tag.id, tag.text, tag.project)),
    item.allow_member_to_create_label_type,
    item.users,
    item.created_at,
    item.updated_at,
    item.author,
    item.is_text_project
  )
}

function toPayload(item: Project): { [key: string]: any } {
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    guideline: item.guideline,
    project_type: item.projectType,
    random_order: item.enableRandomOrder,
    collaborative_annotation: item.enableSharingMode,
    single_class_classification: item.exclusiveCategories,
    allow_overlapping: item.allowOverlappingSpans,
    grapheme_mode: item.enableGraphemeMode,
    use_relation: item.useRelation,
    tags: item.tags,
    allow_member_to_create_label_type: item.allowMemberToCreateLabelType,
    resourcetype: item.resourceType
  }
}

export class SearchQuery {
  limit = 10
  offset = 0
  q = ''
  sortBy = 'created_at'
  sortDesc = true

  constructor(query: Record<string, any>) {
    this.limit = /^\d+$/.test(query.limit) ? parseInt(query.limit) : 10
    this.offset = /^\d+$/.test(query.offset) ? parseInt(query.offset) : 0
    this.q = typeof query.q === 'string' ? query.q : ''
    const fieldMapping: Record<string, string> = {
      name: 'name',
      createdAt: 'created_at',
      projectType: 'project_type',
      author: 'created_by'
    }
    this.sortBy = query.sortBy in fieldMapping ? fieldMapping[query.sortBy] : 'createdAt'
    this.sortDesc = typeof query.sortDesc === 'string' ? query.sortDesc === 'true' : query.sortDesc
  }

  get ordering(): string {
    return this.sortDesc ? `-${this.sortBy}` : this.sortBy
  }
}

export class ProjectRepository {
  constructor(private readonly request: BaseRepository) {}

  async list(query: Record<string, any>): Promise<Page<Project>> {
    const params = new SearchQuery(query)
    const url = `/projects?limit=${params.limit}&offset=${params.offset}&q=${params.q}&ordering=${params.ordering}`
    const response = await this.request.get(url)
    return new Page(
      response.data.count,
      response.data.next,
      response.data.previous,
      response.data.results.map((project: Record<string, any>) => toModel(project))
    )
  }

  async findById(id: string): Promise<Project> {
    const url = `/projects/${id}`
    const response = await this.request.get(url)
    return toModel(response.data)
  }

  async create(item: Project): Promise<Project> {
    const url = `/projects`
    const payload = toPayload(item)
    const response = await this.request.post(url, payload)
    return toModel(response.data)
  }

  async update(item: Project): Promise<void> {
    const url = `/projects/${item.id}`
    const payload = toPayload(item)
    await this.request.patch(url, payload)
  }

  async bulkDelete(projectIds: number[]): Promise<void> {
    const url = `/projects`
    await this.request.delete(url, { ids: projectIds })
  }

  async clone(project: Project): Promise<Project> {
    const url = `/projects/${project.id}/clone`
    const response = await this.request.post(url)
    return toModel(response.data)
  }
}
