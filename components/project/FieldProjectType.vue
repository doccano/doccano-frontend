<script setup lang="ts">
import type { ProjectType } from '@/domain/models/project'
import { allProjectTypes } from '@/domain/models/project'

const { t } = useI18n()

const props = defineProps({
  modelValue: { type: String, required: true }
})

const emits = defineEmits<{
  'update:modelValue': [value: string | number | null]
}>()

const translateTypeName = (type: string): string => {
  const index = allProjectTypes.indexOf(type as ProjectType)
  return t(`overview.projectTypes[${index}]`)
}
</script>

<template>
  <q-select
    v-bind="$attrs"
    :model-value="props.modelValue"
    outlined
    :options="allProjectTypes"
    :display-value="translateTypeName(props.modelValue)"
    label="Project Type"
    @update:model-value="emits('update:modelValue', $event)"
  >
    <template #option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section>
          <q-item-label>{{ translateTypeName(scope.opt) }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>
