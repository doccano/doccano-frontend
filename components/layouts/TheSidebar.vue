<script lang="ts" setup>
import {
  mdiAccount,
  mdiBookOpenOutline,
  mdiChartBar,
  mdiCog,
  mdiCommentAccountOutline,
  mdiDatabase,
  mdiHome,
  mdiLabel
} from '@quasar/extras/mdi-v6'
import { useProjectStore } from '@/stores/project'

const { t } = useI18n()
const store = useProjectStore()
const route = useRoute()
const { $repositories } = useNuxtApp()
const member = await $repositories.member.fetchMyRole(route.params.id as string)

const menuList = computed(() => {
  const menuList = [
    {
      icon: mdiHome,
      label: t('projectHome.home'),
      link: '',
      isVisible: true,
      separator: false
    },
    {
      icon: mdiDatabase,
      label: t('dataset.dataset'),
      link: 'dataset',
      isVisible: true,
      separator: false
    },
    {
      icon: mdiLabel,
      label: t('labels.labels'),
      link: 'labels',
      isVisible:
        (member.isProjectAdmin || store.project!.allowMemberToCreateLabelType) &&
        store.project!.allowLabelTypeCreation,
      separator: false
    },
    {
      icon: mdiAccount,
      label: t('members.members'),
      link: 'members',
      isVisible: member.isProjectAdmin,
      separator: false
    },
    {
      icon: mdiCommentAccountOutline,
      label: 'Comments',
      link: 'comments',
      isVisible: member.isProjectAdmin,
      separator: false
    },
    {
      icon: mdiBookOpenOutline,
      label: t('guideline.guideline'),
      link: 'guideline',
      isVisible: member.isProjectAdmin,
      separator: false
    },
    {
      icon: mdiChartBar,
      label: t('statistics.statistics'),
      link: 'metrics',
      isVisible: member.isProjectAdmin,
      separator: true
    },
    {
      icon: mdiCog,
      label: t('settings.title'),
      link: 'settings',
      isVisible: member.isProjectAdmin,
      separator: false
    }
  ]
  return menuList.filter((item) => item.isVisible)
})
</script>

<template>
  <q-list>
    <template v-for="(menuItem, index) in menuList" :key="index">
      <q-item v-ripple clickable :active="menuItem.label === 'Outbox'">
        <q-item-section avatar>
          <q-icon :name="menuItem.icon" />
        </q-item-section>
        <q-item-section>
          {{ menuItem.label }}
        </q-item-section>
      </q-item>
      <q-separator v-if="menuItem.separator" :key="'sep' + index" />
    </template>
  </q-list>
</template>
