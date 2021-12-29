<script setup lang="ts">
import './style/defaultStyle.scss'
import PaintCanvas from './components/PaintCanvas.vue'
import Toolbar from './components/toolbar/Toolbar.vue'
import SideToolbar from './components/toolbar/SideToolbar.vue'
import Modals from './components/modals/Modals.vue';
import Toast from './components/common/Toast.vue';
import ConfirmBox from './components/common/ConfirmBox.vue';

</script>

<template>
  <div class="toolbar">
    <Toolbar />
  </div>
  <div class="sidetoolbar">
    <SideToolbar />
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
  <div class="confirm">
    <ConfirmBox />
  </div>
</template>

<style lang="scss">
#app {
  text-align: center;
  color: #2c3e50;
  .toolbar {
    position: absolute;
    z-index: 1;
    width: 100%;
    touch-action: none;
    pointer-events: none;
  }
  .sidetoolbar {
    position: absolute;
    z-index: 1;
    width: 60px;
    height: 100%;
    right: 0;
    touch-action: none;
    pointer-events: none;
  }
  .canvas {
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
