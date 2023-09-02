<script setup lang="ts">
const props = defineProps({
  modelValue: { type: Array<String>, required: true, default: () => [] }
})

const emits = defineEmits<{
  'update:modelValue': [value: String[]]
}>()
</script>

<template>
  <q-select
    v-bind="$attrs"
    :model-value="props.modelValue"
    label="Tags"
    outlined
    use-input
    use-chips
    multiple
    hide-dropdown-icon
    input-debounce="0"
    new-value-mode="add-unique"
    @update:model-value="emits('update:modelValue', $event)"
  />
</template>
