<script lang="ts" setup>
import type { Project } from '@/domain/models/project'

const { t } = useI18n()

const props = defineProps({
  selected: { type: Array as PropType<Project[]>, required: true, default: () => [] }
})

const emits = defineEmits<{
  'delete:project': []
}>()
</script>

<template>
  <q-card style="width: 300px">
    <q-card-section>
      <div class="text-h6">{{ t('overview.deleteProjectTitle') }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      {{ $t('overview.deleteProjectMessage') }}
      <q-list>
        <q-item v-for="(item, i) in props.selected" :key="i">
          <q-item-section>
            <q-item-label>{{ item.name }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>

    <q-card-actions align="right" class="bg-white text-teal">
      <q-btn v-close-popup flat no-caps :label="t('generic.cancel')" />
      <q-btn
        v-close-popup
        flat
        no-caps
        :label="t('generic.yes')"
        @click="emits('delete:project')"
      />
    </q-card-actions>
  </q-card>
</template>
domain/models/project
