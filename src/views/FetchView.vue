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
  validation: any
}

export interface EndpointInfo {
  url: string
  requestFields: RequestField[]
  service: (request: any) => Promise<any>
}
</script>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { useTimeAgo } from '@vueuse/core'
import { getEveryone, getEssex, getLondon, getThanks, getIty } from '@/services/backend_services'

import BaseCard from '@/components/BaseCard.vue'
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
        fieldName: 'from',
        validation: {
          required: helpers.withMessage(`From Name is required`, required)
        }
      }
    ],
    service: getEveryone
  },
  {
    url: '/essex/:from',
    requestFields: [
      {
        displayName: 'From Name',
        fieldName: 'from',
        validation: {
          required: helpers.withMessage(`From Name is required`, required)
        }
      }
    ],
    service: getEssex
  },
  {
    url: '/london/:name/:from',
    requestFields: [
      {
        displayName: 'To Name',
        fieldName: 'name',
        validation: {
          required: helpers.withMessage(`To Name is required`, required)
        }
      },
      {
        displayName: 'From Name',
        fieldName: 'from',
        validation: {
          required: helpers.withMessage(`From Name is required`, required)
        }
      }
    ],
    service: getLondon
  },
  {
    url: '/thanks/:from',
    requestFields: [
      {
        displayName: 'From Name',
        fieldName: 'from',
        validation: {
          required: helpers.withMessage(`From Name is required`, required)
        }
      }
    ],
    service: getThanks
  },
  {
    url: '/ity/:name/:from',
    requestFields: [
      {
        displayName: 'To Name',
        fieldName: 'name',
        validation: {
          required: helpers.withMessage(`To Name is required`, required)
        }
      },
      {
        displayName: 'From Name',
        fieldName: 'from',
        validation: {
          required: helpers.withMessage(`From Name is required`, required)
        }
      }
    ],
    service: getIty
  }
]

const isLoading = ref(false)
const errorMessage = ref('')

const endpoint = ref<EndpointInfo>(endpointList[0])
const formFields = ref<any>({})

const callHistory = ref<CallInfo[]>([])
const validationRules = computed(() => {
  const _validationRules: any = {}

  const requestFields = endpoint.value.requestFields
  for (let i = 0; i < requestFields.length; i++) {
    _validationRules[requestFields[i].fieldName] = requestFields[i].validation
  }

  return _validationRules
})

const v$ = useVuelidate(validationRules, formFields)

// when the selected endpoint changes
// reset the form
watch(endpoint, clearForm)

function clearForm() {
  // reset form
  v$.value.$reset()

  // set form default values
  formFields.value = {}
  const selectedRequestFields = endpoint.value.requestFields
  for (let i = 0; i < selectedRequestFields.length; i++) {
    formFields.value[selectedRequestFields[i].fieldName] = ''
  }
}

function selectEndpoint(selectedEndpoint: EndpointInfo) {
  // set endpoint
  endpoint.value = selectedEndpoint
}

async function submitRequest() {
  // Disable form while getting response
  isLoading.value = true
  errorMessage.value = ''

  // // touch all form components to show potential errors
  v$.value.$touch()

  // // Return early if form is now valid
  if (v$.value.$invalid) {
    isLoading.value = false
    return
  }

  try {
    let requestPayload = formFields.value

    // call api
    const apiService = endpoint.value.service

    let response = await apiService(requestPayload)

    // find replace f-bombs in response so to keep it work-place friendly
    let censoredResponse: string = response.data
    censoredResponse = censoredResponse.replaceAll('fuck', 'duck')
    censoredResponse = censoredResponse.replaceAll('Fuck', 'duck')

    // store response/request
    let callInfo: CallInfo = {
      url: endpoint.value.url,
      request: requestPayload,
      responseData: censoredResponse,
      sentAt: new Date()
    }

    callHistory.value.unshift(callInfo)

    clearForm()
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
      <BaseCard class="divide-y divide-solid">
        <div class="text-xl">API</div>
        <div v-for="(endpointItem, index) in endpointList" :key="index">
          <div class="my-4 font-mono flex justify-between">
            <div>
              {{ endpointItem.url }}
            </div>
            <BaseButton @click.prevent="() => selectEndpoint(endpointItem)">Select</BaseButton>
          </div>
        </div>
      </BaseCard>

      <!--Form to call api-->
      <BaseCard>
        <div class="font-mono text-xl mt-2">{{ endpoint.url }}</div>

        <BaseInput
          class="my-8"
          v-for="(field, index) in endpoint.requestFields"
          :key="index"
          :label="field.displayName"
          v-model="formFields[field.fieldName]"
          :validator="v$[field.fieldName]"
        />

        <div class="space-y-2">
          <BaseButton :disabled="isLoading" @click.prevent="submitRequest">Submit</BaseButton>
          <InlineErrorBanner v-if:="errorMessage" :message="errorMessage" />
        </div>
      </BaseCard>

      <!-- History of API Calls-->
      <div class="space-y-2">
        <BaseCard v-for="(call, index) in callHistory" :key="index">
          <div class="text-xs w-full text-right text-gray-500 dark:text-gray-400">
            {{ useTimeAgo(call.sentAt) }}
          </div>
          <div class="font-mono text-xl text-red-700 dark:text-red-600">
            {{ call.responseData }}
          </div>
          <div class="mt-2 space-y-1 border-t">
            <div class="text-md text-blue-700 dark:text-blue-600 mt-2">
              <div>Request Details:</div>
              <div class="font-mono text-xs mb-1">{{ call.url }}</div>
            </div>
            <div
              class="ml-4 text-xs font-mono"
              v-for="(keyValuePair, index) in Object.entries(call.request)"
              :key="index"
            >
              {{ keyValuePair[0] }}: {{ keyValuePair[1] }}
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </BaseLayout>
</template>
