<script setup lang="ts">
import { computed, ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { getIty } from '@/services/backend_services'

import BaseLayout from '@/components/BaseLayout.vue'
import BaseInput from '@/components/Inputs/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import InlineErrorBanner from '@/components/InlineErrorBanner.vue'

const isLoading = ref(false)
const errorMessage = ref('')

const name = ref('')
const from = ref('')

const requestData = ref('')
const responseData = ref('')

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
  errorMessage.value = ''

  // touch all form components to show potential errors
  v$.value.$touch()

  // Return early if form is now valid
  if (v$.value.$invalid) {
    isLoading.value = false
    return
  }

  try {
    let response = await getIty(name.value, from.value)

    // store response/request
    requestData.value = JSON.stringify({
      name: name.value,
      from: from.value
    })

    responseData.value = response.data

    // untouch form
    v$.value.$reset()

    // clear fields
    name.value = ''
    from.value = ''
  } catch (error) {
    console.log(error)
    // populate error message
    errorMessage.value = error.ToString()
  } finally {
    // enable form when finished
    isLoading.value = false
  }
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
        <div class="space-y-2">
          <BaseButton :disabled="isLoading" @click.prevent="submitRequest">Submit</BaseButton>
          <InlineErrorBanner v-if:="errorMessage" :message="errorMessage" />
        </div>
      </div>
      <div
        class="bg-white border border-gray-200 dark:border-gray-700 p-8 space-y-8 rounded-sm shadow"
        v-if="requestData"
      >
        <h1 class="text-3xl">Request</h1>
        <span> {{ requestData }} </span>
      </div>
      <div
        class="bg-white border border-gray-200 dark:border-gray-700 p-8 space-y-8 rounded-sm shadow"
        v-if="responseData"
      >
        <h1 class="text-3xl">Response</h1>
        <span> {{ responseData }}</span>
      </div>
    </div>
  </BaseLayout>
</template>
