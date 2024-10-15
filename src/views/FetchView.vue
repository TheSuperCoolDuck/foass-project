<script lang="ts">
export interface CallInfo {
  url: string
  request: object
  responseData: string
  sentAt: Date
}

export interface RequestField {
  displayName: string
  fieldName: string
  required: boolean
}

export interface EndpointInfo {
  url: string
  requestFields: RequestField[]
  service: (request: any) => Promise<any>
}
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { useTimeAgo } from '@vueuse/core'
import { getIty, getEveryone } from '@/services/backend_services'

import BaseLayout from '@/components/BaseLayout.vue'
import BaseInput from '@/components/Inputs/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import InlineErrorBanner from '@/components/InlineErrorBanner.vue'

const endpointList: EndpointInfo[] = [
  {
    url: '/everyone/:from',
    requestFields: [
      {
        displayName: 'From Name',
        fieldName: 'from'
      }
    ],
    service: getEveryone
  },
  {
    url: '/ity/:name/:from',
    requestFields: [
      {
        displayName: 'To Name',
        fieldName: 'name'
      },
      {
        displayName: 'From Name',
        fieldName: 'from'
      }
    ],
    service: getIty
  }
]

const isLoading = ref(false)
const errorMessage = ref('')

const endpoint = ref<EndpointInfo>(endpointList[0])
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

function selectEndpoint(selectedEndpoint: EndpointInfo) {
  endpoint.value = selectedEndpoint
}

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

    // call api
    let response = await getIty(requestPayload)

    // find replace f-bombs in response so to keep it work-place friendly
    let censoredResponse: string = response.data.replaceAll('fuck', 'duck')

    // store response/request
    let callInfo: CallInfo = {
      url: '/ity/:name/:from',
      request: {
        name: name.value,
        from: from.value
      },
      responseData: censoredResponse,
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
      <!-- List of Endpoints-->
      <div
        class="bg-white border border-gray-200 dark:border-gray-700 p-8 rounded-sm shadow divide-y divide-solid"
      >
        <span class="text-xl">API</span>
        <div v-for="(endpointItem, index) in endpointList" :key="index">
          <div class="my-4 font-mono flex justify-between">
            <span>
              {{ endpointItem.url }}
            </span>
            <BaseButton @click.prevent="() => selectEndpoint(endpointItem)">Select</BaseButton>
          </div>
        </div>
      </div>

      <!--Form to call api-->
      <div
        class="bg-white border border-gray-200 dark:border-gray-700 p-8 space-y-6 rounded-sm shadow"
      >
        <span class="text-xl">Form</span>

        <BaseInput label="To Name" v-model="name" :validator="v$.name" />
        <BaseInput label="From Name" v-model="from" :validator="v$.from" />
        <div class="space-y-2">
          <BaseButton :disabled="isLoading" @click.prevent="submitRequest">Submit</BaseButton>
          <InlineErrorBanner v-if:="errorMessage" :message="errorMessage" />
        </div>
      </div>

      <!-- History of API Calls-->
      <div
        class="bg-white border border-gray-200 dark:border-gray-700 p-4 rounded-sm shadow"
        v-for="(call, index) in callHistory"
        :key="index"
      >
        <div class="text-xs w-full text-right text-gray-500 dark:text-gray-400">
          {{ useTimeAgo(call.sentAt) }}
        </div>
        <span class="text-red-700 dark:text-red-600 font-black text-xl">
          {{ call.responseData }}
        </span>
        <div class="font-mono mt-2 space-y-1">
          <div class="text-md text-blue-700">
            <div>Request Details:</div>
            <div class="text-xs ml-2 mb-1">{{ call.url }}</div>
          </div>
          <div
            class="ml-4 text-xs"
            v-for="(keyValuePair, index) in Object.entries(call.request)"
            :key="index"
          >
            <span>{{ keyValuePair[0] }}: {{ keyValuePair[1] }}</span>
          </div>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>
