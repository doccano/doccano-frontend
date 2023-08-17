<script lang="ts" setup>
const { locale: currentLocale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

interface Locale {
  code: string
  name: string
}

const availableLocales = computed((): Locale[] => {
  return locales.value.map((locale: any) => {
    return {
      code: locale.code,
      name: locale.name
    }
  })
})
</script>

<template>
  <q-btn-dropdown flat no-caps :label="currentLocale">
    <q-list>
      <q-item v-for="locale in availableLocales" :key="locale.code" clickable>
        <q-item-section>
          <q-item-label>
            <NuxtLink :to="switchLocalePath(locale.code)">{{ locale.name }}</NuxtLink>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>
