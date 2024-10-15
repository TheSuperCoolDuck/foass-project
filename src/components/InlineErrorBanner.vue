<script setup lang="ts">
const props = defineProps({
  message: {
    type: String,
    required: true,
    default: 'An Error Occurred'
  }
})
</script>

<template>
  <div
    class="italic text-red-400 dark:text-red-500 border border-red-400 dark:border-red-500 bg-red-50 rounded-md px-4 py-2"
  >
    {{ message }}
  </div>
</template>
