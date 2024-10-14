<script lang="ts">
export interface CallInfo {
  request: object
  responseData: string
  sentAt: Date
}
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { useTimeAgo } from '@vueuse/core'
import { getIty } from '@/services/backend_services'

import BaseLayout from '@/components/BaseLayout.vue'
import BaseInput from '@/components/Inputs/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import InlineErrorBanner from '@/components/InlineErrorBanner.vue'

const isLoading = ref(false)
const errorMessage = ref('')

const name = ref('')
const from = ref('')

const callHistory = ref<CallInfo[]>([])
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
    let requestPayload = {
      name: name.value,
      from: from.value
    }

    let response = await getIty(requestPayload)

    // store response/request
    let callInfo: CallInfo = {
      request: {
        name: name.value,
        from: from.value
      },
      responseData: response.data,
      sentAt: new Date()
    }

    callHistory.value.unshift(callInfo)

    // reset form
    v$.value.$reset()

    // clear fields
    name.value = ''
    from.value = ''
  } catch (error: any) {
    // populate error message
    errorMessage.value = error
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
        class="bg-white border border-gray-200 dark:border-gray-700 p-4 rounded-sm shadow"
        v-for="(call, index) in callHistory"
        :key="index"
      >
        <div class="text-xs w-full text-right">{{ useTimeAgo(call.sentAt) }}</div>
        <span class="text-red-700 font-black text-5xl">
          {{ call.responseData }}
        </span>
        <div class="text-sm font-mono mt-8 ml-8">
          <div v-for="(keyValuePair, index) in Object.entries(call.request)" :key="index">
            <span>{{ keyValuePair[0] }}: {{ keyValuePair[1] }}</span>
          </div>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>
