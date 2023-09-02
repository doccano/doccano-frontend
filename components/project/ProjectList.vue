<script lang="ts" setup>
import { dateFormat } from '@vuejs-community/vue-filter-date-format'
import { useAuthStore } from '@/stores/auth'

const { t } = useI18n()
const localePath = useLocalePath()
const { $dateParse, $repositories } = useNuxtApp()
const { selected, projects, listProjects, deleteProjects, cloneProject, canClone, canDelete } =
  useProject($repositories.project)
const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const dialogDelete = ref(false)
const filter = ref('')
const pagination = ref({
  sortBy: 'name',
  descending: true,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 8
})
const columns = [
  {
    label: t('generic.name'),
    name: 'name',
    field: 'name',
    sortable: true,
    align: 'left'
  },
  {
    label: t('generic.description'),
    name: 'description',
    field: 'description',
    sortable: false,
    align: 'left'
  },
  {
    label: t('generic.type'),
    name: 'projectType',
    field: 'projectType',
    sortable: true,
    align: 'left'
  },
  {
    label: 'Created',
    name: 'createdAt',
    field: 'createdAt',
    sortable: true,
    align: 'left'
  },
  {
    label: 'Author',
    name: 'author',
    field: 'author',
    sortable: true,
    align: 'left'
  },
  {
    label: 'Tags',
    name: 'tags',
    field: 'tags',
    sortable: false,
    align: 'left'
  }
]

await listProjects(route.query)

const onRequest = async (props: any) => {
  const { page, rowsPerPage: limit, sortBy, descending: sortDesc } = props.pagination
  const q = props.filter
  const offset = (page - 1) * limit
  const query = { q, offset, limit, sortBy, sortDesc }
  await listProjects(query)
  await router.push({ query })
  pagination.value = props.pagination
  pagination.value.rowsNumber = projects.value.count
}
</script>

<template>
  <q-card bordered>
    <q-card-section v-if="auth.allowUserToCreateProject">
      <q-btn color="primary" no-caps :label="t('generic.create')" to="projects/create" />
      <q-btn
        color="primary"
        no-caps
        label="Clone"
        class="q-ml-sm"
        :disable="!canClone"
        @click="cloneProject"
      />
      <q-btn
        color="red"
        no-caps
        :label="t('generic.delete')"
        outline
        class="q-ml-sm"
        :disable="!canDelete"
        @click="dialogDelete = true"
      />

      <q-dialog v-model="dialogDelete">
        <project-form-delete :selected="selected" @delete:project="deleteProjects(route.query)" />
      </q-dialog>
    </q-card-section>

    <!-- @vue-ignore -->
    <q-table
      v-model:pagination="pagination"
      v-model:selected="selected"
      flat
      bordered
      :rows="projects.items"
      :columns="columns"
      row-key="id"
      selection="multiple"
      :filter="filter"
      binary-state-sort
      @request="onRequest"
    >
      <template #top>
        <q-input v-model="filter" filled debounce="300" placeholder="Search" class="full-width">
          <template #prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template #body-cell-name="name">
        <q-td :props="name">
          <nuxt-link :to="localePath(`/projects/${name.row.id}`)">
            {{ name.value }}
          </nuxt-link>
        </q-td>
      </template>

      <template #body-cell-createdAt="createdAt">
        <q-td :props="createdAt">
          {{ dateFormat($dateParse(createdAt.value, 'YYYY-MM-DDTHH:mm:ss'), 'YYYY/MM/DD HH:mm') }}
        </q-td>
      </template>

      <template #body-cell-tags="tags">
        <q-td :props="tags">
          <q-chip v-for="tag in tags.value" :key="tag.id" dense outline>
            {{ tag.text }}
          </q-chip>
        </q-td>
      </template>
    </q-table>
  </q-card>
</template>

<style scoped>
:deep(.q-table__top) {
  padding: 0 !important;
}
</style>
