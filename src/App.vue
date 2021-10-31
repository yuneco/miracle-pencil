<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import PaintCanvas from './components/PaintCanvas.vue'
</script>

<template>
  <PaintCanvas />
</template>

<style>
* {
  box-sizing: border-box;
}
html, body, #app {
  margin: 0;
  position: relative;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
