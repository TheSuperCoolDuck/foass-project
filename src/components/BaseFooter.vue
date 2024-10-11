<script setup lang="ts">
import DUCK_EMOJI from '@/assets/img/Duck-Emoji.png'
</script>

<template>
  <footer class="bg-white dark:bg-gray-900 m-4 flex-none">
    <hr class="border-gray-200 dark:border-text-700 w-full mx-auto py-2" />
    <div class="flex items-center justify-center space-x-1">
      <span class="text-red-500 dark:text-red-400"> 2024 </span>
      <img :src="DUCK_EMOJI" alt="Duck" class="h-6" />
      <span class="text-red-500 dark:text-red-400"> Daniel Chen </span>
    </div>
  </footer>
</template>
