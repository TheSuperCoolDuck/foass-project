<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style>
html,
body,
#app {
  height: 100vh;
}

body.isvisible {
  overflow: hidden;
}

::-webkit-scrollbar-track {
  /* // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  // background-color: #f5f5f5; */
  background-color: transparent;
  /* // border-radius: 2px; */
}

::-webkit-scrollbar {
  width: 5px;
  height: 6px;
  /* // background-color: #f5f5f5; */
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background: #758ca3;
  border-radius: 3px;
  /* // transition: background 1s ease-in-out; */
}

::-webkit-scrollbar-thumb::hover {
  cursor: pointer;
}
</style>
