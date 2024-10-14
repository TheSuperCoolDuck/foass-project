<script setup lang="ts"></script>

<template>
  <button
    type="button"
    class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 disabled:bg-red-700/50 dark:disabled:bg-red-600/50"
  >
    <slot />
  </button>
</template>
