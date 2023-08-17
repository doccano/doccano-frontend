<script lang="ts" setup>
import { QForm } from 'quasar'
import { useAuthStore } from '@/stores/auth'

const { $router } = useNuxtApp()
const localePath = useLocalePath()
const auth = useAuthStore()

const username = ref('')
const password = ref('')
const loginForm = ref<QForm | null>(null)
const showErrorMessage = ref(false)

const login = async () => {
  if (await loginForm.value!.validate()) {
    auth
      .login(username.value, password.value)
      .then(async () => {
        await $router.push(localePath('/projects'))
      })
      .catch((_) => {
        showErrorMessage.value = true
      })
  }
}
</script>

<template>
  <q-card class="base-card">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6">{{ $t('user.login') }}</div>
    </q-card-section>

    <q-card-section>
      <q-form ref="loginForm" class="q-gutter-md">
        <q-input
          v-model="username"
          :label="$t('user.username')"
          lazy-rules
          outlined
          :rules="[
            (val) => (val && val.length > 0) || $t('rules.userNameIsRequired'),
            (val) => val.length <= 30 || $t('rules.userNameMustBeLessThan30Chars')
          ]"
        />
        <q-input
          v-model="password"
          type="password"
          :label="$t('user.password')"
          lazy-rules
          outlined
          :rules="[(val) => (val && val.length > 0) || $t('rules.passwordRules.passwordRequired')]"
        />
      </q-form>
      <q-banner v-if="showErrorMessage" inline-actions class="text-white bg-red">
        {{ $t('errors.invalidUserOrPass') }}
        <template #action>
          <q-btn
            flat
            no-caps
            color="white"
            :label="$t('generic.close')"
            @click="showErrorMessage = false"
          />
        </template>
      </q-banner>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat no-caps @click="login">{{ $t('user.login') }}</q-btn>
    </q-card-actions>
  </q-card>
</template>

<style scoped>
.base-card {
  width: 480px;
}
</style>
