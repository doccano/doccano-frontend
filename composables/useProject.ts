import { Page } from '@/domain/models/page'
import type { Project } from '@/domain/models/project'
import type { ProjectRepository } from '@/repositories/projectRepository'

export const useProject = (repository: ProjectRepository) => {
  const router = useRouter()
  const localePath = useLocalePath()

  const selected = ref([]) as Ref<Project[]>
  const projects = ref(Page.create<Project>())

  const listProjects = async (query: Record<string, any>) => {
    projects.value = await repository.list(query)
    selected.value = []
  }

  const deleteProjects = async (query: Record<string, any>) => {
    await repository.bulkDelete(selected.value.map((p) => p.id))
    await listProjects(query)
  }

  const cloneProject = async () => {
    const project = await repository.clone(selected.value[0])
    await router.push(localePath(`/projects/${project.id}/settings`))
  }

  const canDelete = computed(() => selected.value.length > 0)
  const canClone = computed(() => selected.value.length === 1)

  return { projects, selected, listProjects, deleteProjects, cloneProject, canDelete, canClone }
}
