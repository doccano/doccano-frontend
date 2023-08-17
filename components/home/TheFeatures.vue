<script lang="ts" setup>
const { t } = useI18n()

const featureCards = [
  {
    imageSrc: 'images/home/feature3.png',
    title: t('home.featuresTitle1'),
    text: t('home.featuresText1')
  },
  {
    imageSrc: 'images/home/feature2.png',
    title: t('home.featuresTitle2'),
    text: t('home.featuresText2')
  },
  {
    imageSrc: 'images/home/feature1.png',
    title: t('home.featuresTitle3'),
    text: t('home.featuresText3')
  }
]
const useAsset = (path: string): string => {
  const assets = import.meta.glob('~/assets/**/*', {
    eager: true,
    import: 'default'
  })
  // @ts-expect-error: wrong type info
  return assets['/assets/' + path]
}
</script>

<template>
  <div class="row justify-center q-my-xl">
    <div class="q-mb-lg col col-12 text-center">
      <span class="text-h5">{{ $t('home.featuresTitle') }}</span>
    </div>
    <div class="row q-gutter-lg justify-center">
      <q-card v-for="card in featureCards" :key="card.imageSrc" class="col-12 col-md-3">
        <img :src="useAsset(card.imageSrc)" height="200" />

        <q-card-section>
          <div class="text-h6">{{ card.title }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ card.text }}
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
