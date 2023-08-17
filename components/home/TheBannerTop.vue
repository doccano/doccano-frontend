<script lang="ts" setup>
import { mdiGithub } from '@quasar/extras/mdi-v6'
</script>

<template>
  <div class="q-gutter-none">
    <q-parallax src="~/assets/images/home/top_banner.jpg" :height="400">
      <div class="row justify-center items-center">
        <div class="q-mr-lg">
          <img src="~/assets/images/icon.png" alt="doccano" style="height: 200px" />
        </div>
        <div>
          <span class="text-h4 text-white">{{ $t('home.mainTitle') }}</span>
          <div class="q-mt-md">
            <q-btn
              outline
              no-caps
              :icon="mdiGithub"
              color="white"
              label="GitHub"
              to="https://github.com/doccano/doccano"
            />
            <q-btn color="blue-4 q-ml-md" no-caps label="Get Started" />
          </div>
        </div>
      </div>
    </q-parallax>
  </div>
</template>
