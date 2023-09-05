<script lang="ts" setup>
const leftDrawerOpen = ref(false)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <LayoutsTheHeader />
    <layouts-the-header>
      <template #leftDrawerIcon>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
      </template>
    </layouts-the-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above side="left" bordered>
      <layouts-the-sidebar />
    </q-drawer>

    <q-page-container>
      <q-page>
        <slot></slot>
      </q-page>
    </q-page-container>

    <LayoutsTheFooter />
  </q-layout>
</template>
