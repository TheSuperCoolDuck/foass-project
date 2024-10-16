<script setup lang="ts">
import { useUserStore } from '@/stores/user'

import BaseLayout from '@/components/BaseLayout.vue'
import BaseCard from '@/components/BaseCard.vue'

import SUNGLASSES_EMOJI from '@/assets/img/Sunglasses-Emoji.png'

const user = useUserStore()
</script>

<template>
  <BaseLayout>
    <div class="text-center w-full mt-4 max-w-[32rem] mx-auto">
      <BaseCard class="pb-32 w-full">
        <img :src="SUNGLASSES_EMOJI" alt="Logo" class="h-64 w-64 rounded-full mx-auto" />
        <div class="text-4xl w-full text-center">{{ user.username }}</div>
      </BaseCard>
    </div>
  </BaseLayout>
</template>
