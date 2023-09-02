<script setup lang="ts">
import { validateMinLength, validateNameMaxLength } from '~/models/project'

const { t } = useI18n()
const props = defineProps({
  modelValue: { type: String, required: true, default: '' }
})

const emits = defineEmits<{
  'update:modelValue': [value: string | number | null]
}>()
</script>

<template>
  <q-input
    v-bind="$attrs"
    :model-value="props.modelValue"
    outlined
    :label="t('overview.projectName')"
    :rules="[
      (val) => validateMinLength(val) || t('rules.projectName.required'),
      (val) => validateNameMaxLength(val) || t('rules.projectName.maxLength')
    ]"
    @update:model-value="emits('update:modelValue', $event)"
  />
</template>
