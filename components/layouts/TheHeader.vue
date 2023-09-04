<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'

const { $router } = useNuxtApp()
const auth = useAuthStore()
const localePath = useLocalePath()

const logout = async () => {
  await auth.logout()
  await $router.push(localePath('/'))
}
</script>

<template>
  <q-header elevated>
    <q-toolbar
      :class="$q.dark.isActive ? 'bg-grey-9 text-white' : 'bg-grey-1 text-black'"
      style="height: 64px"
    >
      <slot name="leftDrawerIcon"></slot>
      <layouts-the-header-title v-if="!auth.isLoggedIn" class="desktop-only" />
      <q-space />
      <layouts-the-header-button-dark-mode />
      <layouts-the-header-button-locale />
      <q-btn
        v-if="!auth.isLoggedIn"
        outline
        no-caps
        :label="$t('user.login')"
        @click="$router.push(localePath('/login'))"
      />
      <q-btn v-if="auth.isLoggedIn" outline no-caps :label="$t('user.signOut')" @click="logout" />
    </q-toolbar>
  </q-header>
</template>
