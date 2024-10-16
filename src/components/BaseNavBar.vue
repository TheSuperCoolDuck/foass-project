<script lang="ts">
export interface NavBar {
  id: number
  label: string
  link: string
  loginRequired?: boolean
}
</script>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'

import BaseButton from '@/components/BaseButton.vue'
import ANGRY_EMOJI from '@/assets/img/Angry-Emoji.png'
import IconBars from '@/components/icons/IconBars.vue'

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
    label: 'Fetch',
    href: 'fetch'
  },
  {
    id: id++,
    label: 'Profile',
    href: '/profile',
    loginRequired: true
  }
])

const filteredConfigs = computed(() => {
  if (!user.loggedIn) {
    return configs.value.filter((c) => {
      return !c.loginRequired
    })
  }
  return configs.value
})

const showMobileMenu = ref(false)

function loginUser() {
  window.location.href = '/login'
}

function logoutUser() {
  user.loggedIn = false
  window.location.reload()
}

function toggleShowMenu() {
  showMobileMenu.value = !showMobileMenu.value
}
</script>

<template>
  <header class="sticky left-0 right-0 top-0 z-10 flex-none">
    <nav class="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto pt-2 px-4">
        <div class="pr-16 flex items-center space-x-1 rtl:space-x-reverse">
          <img :src="ANGRY_EMOJI" alt="Logo" class="h-16 w-16" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            >FOASS <span class="text-red-500">PROJECT</span></span
          >
        </div>
        <div class="hidden md:block flex-1">
          <ul class="flex space-x-8 font-medium">
            <li v-for="config in filteredConfigs" :key="config.id">
              <a :href="config.href" class="hover:text-red-700 dark:text-red-600">
                {{ config.label }}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <BaseButton v-if="!user.loggedIn" @click="loginUser" class="w-20 text-right"
            >Login</BaseButton
          >
          <BaseButton v-else @click="logoutUser" class="w-20 text-right">Logout</BaseButton>
        </div>
        <div class="md:hidden">
          <IconBars
            class="hover:cursor-pointer text-gray-500 hover:text-gray-300 dark:text-gray-300 dark:hover:text-gray-500"
            @click="toggleShowMenu"
          />
        </div>
      </div>
      <div class="md:hidden border-t shadow">
        <ul v-if="showMobileMenu">
          <li v-for="config in filteredConfigs" :key="config.id" class="py-3 px-2 hover:bg-gray-50">
            <a :href="config.href" class="block">
              {{ config.label }}
            </a>
          </li>
        </ul>
      </div>
      <hr class="border-gray-200 dark:border-text-700 w-full mx-auto" />
    </nav>
  </header>
</template>
