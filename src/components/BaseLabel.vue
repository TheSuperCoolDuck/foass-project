<script setup lang="ts">
const props = defineProps({
  isError: {
    type: Boolean,
    required: false
  }
})
</script>

<template>
  <label
    :class="
      'block mb-2 text-sm font-medium' +
      (isError ? ' text-red-700 dark:text-red-600' : ' text-gray-900 dark:text-white')
    "
  >
    <slot />
  </label>
</template>
