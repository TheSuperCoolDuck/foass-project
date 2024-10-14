<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  validator: {
    type: [Object, undefined] as PropType<any>,
    required: false,
    default: undefined
  }
})
</script>

<template>
  <div>
    <slot />
    <div v-if="validator">
      <div class="mt-1 text-red-700" v-for="error of validator.$errors" :key="error.$uid">
        <div class="text-xs italic">{{ error.$message }}</div>
      </div>
    </div>
  </div>
</template>
