<script setup lang="ts">
import { computed, ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

import BaseLayout from '@/components/BaseLayout.vue'
import BaseInput from '@/components/Inputs/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'

const isLoading = ref(false)

const name = ref('')
const from = ref('')

const validationRules = computed(() => ({
  name: {
    required: helpers.withMessage('To Name is required!', required)
  },
  from: {
    required: helpers.withMessage('From Name is required!', required)
  }
}))

const v$ = useVuelidate(validationRules, {
  name,
  from
})

async function submitRequest() {
  // Disable form while getting response
  isLoading.value = true

  // touch all form components to show potential errors
  v$.value.$touch()

  // Return early if form is now valid
  if (v$.value.$invalid) {
    isLoading.value = false
    return
  }

  console.log('valid')

  isLoading.value = true
}
</script>

<template>
  <BaseLayout>
    <div class="mt-4 max-w-[48rem] mx-auto space-y-8">
      <div
        class="bg-white border border-gray-200 dark:border-gray-700 p-8 space-y-8 rounded-sm shadow"
      >
        <h1 class="text-3xl">Form</h1>
        <BaseInput label="To Name" v-model="name" :validator="v$.name" />
        <BaseInput label="From Name" v-model="from" :validator="v$.from" />
        <BaseButton :disabled="isLoading" @click.prevent="submitRequest">Submit</BaseButton>
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
