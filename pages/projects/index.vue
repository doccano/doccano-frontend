<script lang="ts" setup>
definePageMeta({
  middleware: ['is-logged-in']
})
</script>

<template>
  <project-list style="margin: 12px" />
</template>
