<script lang="ts" setup>
import { mdiMoonWaxingCrescent, mdiWhiteBalanceSunny } from '@quasar/extras/mdi-v6'
</script>

<template>
  <q-btn
    flat
    round
    dense
    :icon="$q.dark.isActive ? mdiMoonWaxingCrescent : mdiWhiteBalanceSunny"
    class="q-mr-xs"
    @click="$q.dark.toggle"
  />
</template>
