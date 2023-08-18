<template>
  <q-toolbar-title>
    <NuxtLink to="/" class="link-active">
      <q-avatar style="height: 48px; width: 48px">
        <img src="~/assets/images/icon.png" />
      </q-avatar>
      <span class="q-ml-sm" :class="$q.dark.isActive ? 'text-white' : 'text-black'">doccano</span>
    </NuxtLink>
  </q-toolbar-title>
</template>

<style scoped>
.link-active {
  text-decoration: none;
}
</style>
