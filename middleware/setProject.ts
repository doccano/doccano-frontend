import { useProjectStore } from '@/stores/project'

export default defineNuxtRouteMiddleware(async () => {
  const store = useProjectStore()
  const route = useRoute()
  if (!store.matchProject(route.params.id as string)) {
    await store.setProject(route.params.id as string)
  }
})
