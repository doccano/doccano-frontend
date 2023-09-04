<script lang="ts" setup>
definePageMeta({
  middleware: ['is-logged-in'],

  validate: (route) => {
    return /^\d+$/.test(route.params.id)
  }
})

const { t } = useI18n()
const step = ref(0)

const videos = [
  { title: t('projectHome.importData'), videoId: 'dA4ID1DSxCE' },
  { title: t('projectHome.createLabels'), videoId: '1bSML270quU' },
  { title: t('projectHome.addMembers'), videoId: 'NI09dcBz-qA' },
  {
    title: t('projectHome.defineGuideline'),
    videoId: 'AvvX3Xs32nA'
  },
  {
    title: t('projectHome.annotateDataset'),
    videoId: 'F3XoSdyiMhA'
  },
  {
    title: t('projectHome.viewStatistics'),
    videoId: 'kfRpa0mNQMY'
  },
  { title: t('projectHome.exportDataset'), videoId: 'Pfy_QcHEeQ4' }
]
</script>

<template>
  <q-card bordered style="margin: 12px">
    <q-card-section>
      <div class="text-h6">{{ t('projectHome.welcome') }}</div>
    </q-card-section>
    <q-stepper v-model="step" vertical color="primary" animated flat>
      <q-step
        v-for="(video, index) in videos"
        :key="index"
        :name="index"
        :title="video.title"
        :done="index >= step"
      >
        <q-video :ratio="16 / 9" :src="`https://www.youtube.com/embed/${video.videoId}`" />
        <q-stepper-navigation>
          <q-btn v-if="index < videos.length - 1" color="primary" label="Next" @click="step += 1" />
          <q-btn
            v-if="index > 0"
            flat
            color="primary"
            label="Back"
            :class="index !== videos.length - 1 ? 'q-mt-sm' : ''"
            @click="step -= 1"
          />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </q-card>
</template>
