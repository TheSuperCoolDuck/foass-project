<script setup lang="ts">
import NavBar from '@/components/BaseNavBar.vue'
import Footer from '@/components/BaseFooter.vue'
</script>

<template>
  <div class="flex flex-col min-h-full">
    <NavBar />
    <div class="flex-1 m-4">
      <slot>
        <h1 class="text-4xl mt-16 text-center w-full">Oi, You forgot to include content here!</h1>
      </slot>
    </div>
    <Footer />
  </div>
</template>
