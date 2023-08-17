<script lang="ts" setup></script>

<template>
  <div class="q-gutter-none">
    <q-parallax src="~/assets/images/home/top_banner.jpg" :height="400">
      <div class="row justify-center items-center" style="width: 100%">
        <div class="col-6">
          <q-img src="~/assets/images/home/ner_demo.png" fit="contain" style="height: 300px" />
        </div>
        <div class="col-6">
          <span class="text-h4 text-white">{{ $t('home.footerTitle') }}</span>
          <div class="q-mt-md">
            <q-btn color="blue-4" no-caps label="Try demo" />
          </div>
        </div>
      </div>
    </q-parallax>
  </div>
</template>
