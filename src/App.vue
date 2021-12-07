<script setup lang="ts">
import './style/defaultStyle.scss'
import PaintCanvas from './components/PaintCanvas.vue'
import Toolbar from './components/toolbar/Toolbar.vue'
import Modals from './components/modals/Modals.vue';
import Toast from './components/common/Toast.vue';
</script>

<template>
  <div class="toolbar">
    <Toolbar />
  </div>
  <div class="canvas">
    <PaintCanvas />
  </div>
  <div class="moldals">
    <Modals />
  </div>
  <div class="toast">
    <Toast />
  </div>
</template>

<style lang="scss" scoped>
#app {
  text-align: center;
  color: #2c3e50;
  .toolbar {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 64px;
  }
  .canvas {
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
