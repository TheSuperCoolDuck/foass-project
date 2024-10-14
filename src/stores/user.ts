import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    const loggedIn = ref(false)
    const lastLoginAt = ref<Date | undefined>(undefined)

    return { loggedIn, lastLoginAt }
  },
  {
    persist: true
  }
)
