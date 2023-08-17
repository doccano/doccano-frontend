<script lang="ts" setup></script>

<template>
  <q-layout view="hHh lpR fFf">
    <LayoutsTheHeader />

    <q-page-container>
      <q-page>
        <slot />
      </q-page>
    </q-page-container>

    <LayoutsTheFooter />
  </q-layout>
</template>

<style scoped></style>
