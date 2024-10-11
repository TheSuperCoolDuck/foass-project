<script setup lang="ts">
import BaseLayout from '@/components/BaseLayout.vue'

import SUNGLASSES_EMOJI from '@/assets/img/Sunglasses-Emoji.png'
</script>

<template>
  <BaseLayout>
    <div class="text-center w-full mt-8">
      <img :src="SUNGLASSES_EMOJI" alt="Logo" class="h-64 w-64 rounded-full mx-auto" />
      <p class="text-5xl mb-2">Daniel Chen</p>
      <p class="text-xl">da.chen@alfred.org.au</p>
    </div>
  </BaseLayout>
</template>
