<script setup lang="ts">
import { computed, ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

import BaseCard from '@/components/BaseCard.vue'
import BaseInput from '@/components/Inputs/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'

import DUCK_EMOJI from '@/assets/img/Duck-Emoji.png'

const user = useUserStore()
const router = useRouter()

const username = ref('')
const password = ref('')

const validationRules = computed(() => ({
  username: {
    required: helpers.withMessage(`Username is required`, required)
  },
  password: {
    required: helpers.withMessage(`Password is required`, required)
  }
}))

let v$ = useVuelidate(validationRules, { username, password })

function login() {
  // touch all form components to show potential errors
  v$.value.$touch()

  if (v$.value.$invalid) {
    return
  }

  user.loggedIn = true
  user.lastLoginAt = new Date()
  user.username = username.value

  // redirect to home page
  router.push('/')
}
</script>

<template>
  <BaseCard class="w-[32rem] mx-auto mt-16">
    <div class="w-full">
      <img :src="DUCK_EMOJI" alt="Logo" class="h-16 w-16 mx-auto" />
      <div class="font-medium text-4xl text-center">Welcome to DOASS</div>
    </div>
    <div class="font-medium text-2xl mt-12">Login</div>
    <div class="mt-8 space-y-8">
      <BaseInput label="Username" v-model="username" :validator="v$.username" />
      <BaseInput label="Password" type="password" v-model="password" :validator="v$.password" />
      <BaseButton class="w-full" @click.prevent="login">Login</BaseButton>
    </div>
  </BaseCard>
</template>
