<script setup lang="ts">
import { ref } from 'vue'

import BaseLayout from '@/components/BaseLayout.vue'
import BaseInput from '@/components/inputs/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
</script>

<template>
  <BaseLayout>
    <div class="mt-4 max-w-[48rem] mx-auto space-y-8">
      <div
        class="bg-white border border-gray-200 dark:border-gray-700 p-8 space-y-8 rounded-sm shadow"
      >
        <h1 class="text-3xl">Form</h1>
        <BaseInput label="Name" />
        <BaseInput label="From" />
        <BaseButton>Submit</BaseButton>
      </div>
      <div
        class="bg-white border border-gray-200 dark:border-gray-700 p-8 space-y-8 rounded-sm shadow"
      >
        <h1 class="text-3xl">Request</h1>
      </div>
      <div
        class="bg-white border border-gray-200 dark:border-gray-700 p-8 space-y-8 rounded-sm shadow"
      >
        <h1 class="text-3xl">Response</h1>
      </div>
    </div>
  </BaseLayout>
</template>
