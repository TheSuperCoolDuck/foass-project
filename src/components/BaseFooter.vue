<script setup lang="ts">
import { computed } from 'vue'
import { useTimeAgo } from '@vueuse/core'
import { useUserStore } from '@/stores/user'

import DUCK_EMOJI from '@/assets/img/Duck-Emoji.png'

const user = useUserStore()

const lastLogin = computed(() => {
  return user.lastLoginAt ?? 'NEVER'
})
</script>

<template>
  <footer class="bg-white dark:bg-gray-900 pb-4 flex-none">
    <hr class="border-gray-200 dark:border-text-700 w-full mx-auto py-2" />
    <div class="grid grid-cols-3 content-center">
      <div />
      <div class="mx-auto flex space-x-1">
        <span class="text-red-500 dark:text-red-400"> 2024 </span>
        <img :src="DUCK_EMOJI" alt="Duck" class="h-6" />
        <span class="text-red-500 dark:text-red-400"> Daniel Chen </span>
      </div>
      <div class="ml-auto mr-2">
        <span class="text-sm text-gray-400 dark:border-text-500">
          Last Login:
          <span class="font-mono text-red-400 dark:text-red-500 pl-2">{{
            useTimeAgo(lastLogin)
          }}</span>
        </span>
      </div>
    </div>
  </footer>
</template>
