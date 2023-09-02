<script setup lang="ts">
import { validateMinLength } from '~/models/project'

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
    :label="t('generic.description')"
    :rules="[(val) => validateMinLength(val) || t('rules.description.required')]"
    @update:model-value="emits('update:modelValue', $event)"
  />
</template>
