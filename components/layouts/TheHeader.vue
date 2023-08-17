<script lang="ts" setup>
const localePath = useLocalePath()
</script>

<template>
  <q-header elevated>
    <q-toolbar
      :class="$q.dark.isActive ? 'bg-grey-9 text-white' : 'bg-grey-1 text-black'"
      style="height: 64px"
    >
      <layouts-the-header-title class="desktop-only" />
      <q-space />
      <layouts-the-header-button-dark-mode />
      <layouts-the-header-button-locale />
      <q-btn
        outline
        no-caps
        :label="$t('user.login')"
        @click="$router.push(localePath('/login'))"
      />
    </q-toolbar>
  </q-header>
</template>
