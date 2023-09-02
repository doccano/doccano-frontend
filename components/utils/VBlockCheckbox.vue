<script setup lang="ts">
const props = defineProps({
  modelValue: { type: Boolean, required: true, default: false }
})

const emits = defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<template>
  <div>
    <q-checkbox
      v-bind="$attrs"
      :model-value="props.modelValue"
      @update:model-value="emits('update:modelValue', $event === true)"
    />
  </div>
</template>
