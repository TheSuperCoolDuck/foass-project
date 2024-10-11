<script setup lang="ts">
import NavBar from '@/components/BaseNavBar.vue'
import Footer from '@/components/BaseFooter.vue'
</script>

<template>
  <div class="flex flex-col min-h-full">
    <NavBar />
    <div class="flex-1">
      <slot />
    </div>
    <Footer />
  </div>
</template>
