<script setup lang="ts">
import type { PropType } from 'vue'

import BaseLabel from '@/components/BaseLabel.vue'
import BaseEditElement from '@/components/BaseEditElement.vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    required: false
  },
  validator: {
    type: Object as PropType<any>,
    required: false
  }
})

const emit = defineEmits(['update:modelValue'])

const emitChange = (e: any) => {
  const value: String = e.target.value
  emit('update:modelValue', value)
}
</script>

<template>
  <BaseEditElement :validator="validator">
    <BaseLabel :is-error="validator && validator.$dirty && validator.$invalid">{{
      label
    }}</BaseLabel>
    <input
      type="text"
      :value="modelValue"
      @input="emitChange"
      @blur="validator && validator.$touch && validator.$touch()"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
    />
  </BaseEditElement>
</template>
