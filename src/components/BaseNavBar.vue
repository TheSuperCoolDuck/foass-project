<script lang="ts">
export interface NavBar {
  id: number
  label: string
  link: string
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { DateTime } from 'luxon'

import Button from '@/components/BaseButton.vue'
import ANGRY_EMOJI from '@/assets/img/Angry-Emoji.png'

const user = useUserStore()

let id = 0

const configs = ref([
  {
    id: id++,
    label: 'Home',
    href: '/'
  },
  {
    id: id++,
    label: 'Profile',
    href: '/profile'
  },
  {
    id: id++,
    label: 'Fetch',
    href: 'fetch'
  }
])

function loginUser() {
  user.loggedIn = true
  user.lastLoginAt = DateTime.local().toUTC()
}

function logoutUser() {
  user.loggedIn = false
}
</script>

<template>
  <header class="sticky left-0 right-0 top-0 z-10 flex-none">
    <nav class="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div class="pr-16 flex items-center space-x-1 rtl:space-x-reverse">
          <img :src="ANGRY_EMOJI" alt="Logo" class="h-16 w-16" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            >FOASS <span class="text-red-500">PROJECT</span></span
          >
        </div>
        <div class="w-full md:block md:w-auto flex-1">
          <ul
            class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
          >
            <li v-for="config in configs" :key="config.id">
              <a
                :href="config.href"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0 dark:text-white md:dark:hover:text-red-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                {{ config.label }}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <Button v-if="!user.loggedIn" @click="loginUser" class="w-20">Login</Button>
          <Button v-else @click="logoutUser" class="w-20">Logout</Button>
        </div>
      </div>
    </nav>
  </header>
</template>
