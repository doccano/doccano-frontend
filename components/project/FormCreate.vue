<script lang="ts" setup>
import { QForm } from 'quasar'
import {
  DocumentClassification,
  ImageClassification,
  SequenceLabeling,
  allProjectTypes,
  allowLabelTypeCreation
} from '@/domain/models/project'
import { CreateProjectUsecase } from 'usecases/createProjectUsecase'

const { t } = useI18n()
const { $repositories } = useNuxtApp()
const router = useRouter()
const initializeProject = () => {
  return reactive({
    name: '',
    description: '',
    projectType: DocumentClassification,
    enableRandomOrder: false,
    enableSharingMode: false,
    exclusiveCategories: false,
    allowOverlappingSpans: false,
    enableGraphemeMode: false,
    useRelation: false,
    tags: [] as string[],
    guideline: '',
    allowMemberToCreateLabelType: false
  })
}
let editedItem = initializeProject()

const showExclusiveCategories = computed((): boolean => {
  return [DocumentClassification, ImageClassification].includes(editedItem.projectType)
})

const isSequenceLabelingProject = computed((): boolean => {
  return editedItem.projectType === SequenceLabeling
})

const _canDefineLabel = computed((): boolean => {
  return allowLabelTypeCreation(editedItem.projectType as any)
})

const formCreate = ref<QForm | null>(null)

const createProject = async () => {
  if (await formCreate.value!.validate()) {
    const usecase = new CreateProjectUsecase($repositories.project)
    const project = await usecase.handle(editedItem)
    await router.push(`/projects/${project.id}`)
    await nextTick(() => {
      editedItem = initializeProject()
    })
  }
}

const useAsset = (path: string): string => {
  const assets = import.meta.glob('~/assets/**/*', {
    eager: true,
    import: 'default'
  })
  // @ts-expect-error: wrong type info
  return assets['/assets/' + path]
}

const url = computed(() => {
  const i = allProjectTypes.indexOf(editedItem.projectType as any)
  const images = [
    'images/tasks/text_classification.png',
    'images/tasks/sequence_labeling.png',
    'images/tasks/seq2seq.png',
    'images/tasks/intent_detection.png',
    'images/tasks/image_classification.png',
    'images/tasks/image_captioning.jpg',
    'images/tasks/object_detection.jpg',
    'images/tasks/segmentation.jpg',
    'images/tasks/speech_to_text.png'
  ]
  return useAsset(images[i])
})
</script>

<template>
  <q-card bordered>
    <q-card-section>
      <div class="text-h6">{{ t('overview.createProjectTitle') }}</div>
    </q-card-section>

    <q-card-section>
      <q-form ref="formCreate" class="q-gutter-md">
        <q-img :src="url" fit="contain" height="200px" position="left" class="rounded-borders" />
        <project-field-project-type v-model="editedItem.projectType" class="q-pb-md" />
        <project-field-name v-model="editedItem.name" />
        <project-field-description v-model="editedItem.description" />
        <project-field-tag-list v-model="editedItem.tags" />
        <utils-v-block-checkbox
          v-if="showExclusiveCategories"
          v-model="editedItem.exclusiveCategories"
          :label="$t('overview.multiLabel')"
        />
        <utils-v-block-checkbox
          v-if="_canDefineLabel"
          v-model="editedItem.allowMemberToCreateLabelType"
          label="Allow project members to create label types"
        />
        <template v-if="isSequenceLabelingProject">
          <utils-v-block-checkbox
            v-model="editedItem.allowOverlappingSpans"
            label="Allow overlapping spans"
          />
          <q-img
            :src="useAsset('images/project/creation.gif')"
            fit="contain"
            height="200px"
            position="left"
            class="rounded-borders"
          />
          <utils-v-block-checkbox v-model="editedItem.useRelation" label="Use relation labeling" />
          <utils-v-block-checkbox
            id="grapheme"
            v-model="editedItem.enableGraphemeMode"
            label="Count grapheme clusters as a character"
          />
          <q-tooltip target="#grapheme" anchor="bottom left">
            Like emoji(🌷, 💩, and 👍), CRLF(\r\n), and so on.
          </q-tooltip>
        </template>
        <utils-v-block-checkbox
          v-model="editedItem.enableRandomOrder"
          :label="t('overview.randomizeDocOrder')"
        />
        <utils-v-block-checkbox
          v-model="editedItem.enableSharingMode"
          :label="t('overview.shareAnnotations')"
        />
      </q-form>
    </q-card-section>

    <q-card-actions align="left">
      <q-btn color="primary" no-caps class="q-ml-sm" @click="createProject">{{
        t('generic.create')
      }}</q-btn>
    </q-card-actions>
  </q-card>
</template>
