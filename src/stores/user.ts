import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    const loggedIn = ref(false)
    const lastLoginAt = ref<Date | undefined>(undefined)
    const username = ref('')

    return { loggedIn, lastLoginAt, username }
  },
  {
    persist: true
  }
)
