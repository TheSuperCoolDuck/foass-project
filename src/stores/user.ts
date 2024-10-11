import { ref } from 'vue'
import { defineStore } from 'pinia'
import { DateTime } from 'luxon'

export const useUserStore = defineStore(
  'user',
  () => {
    const loggedIn = ref(false)
    const lastLoginAt = ref<DateTime | undefined>(undefined)

    return { loggedIn, lastLoginAt }
  },
  {
    persist: true
  }
)
