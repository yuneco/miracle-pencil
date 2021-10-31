<script setup lang="ts">
import "./defaultStyle.scss";
import PaintCanvas from "./components/PaintCanvas.vue";
import Toolbar from "./components/Toolbar.vue";
import ColorSelector from "./components/commonUis/ColorSelector.vue";
import { useCanvasStore } from "./stores/CanvasStore";

const store = useCanvasStore()
</script>

<template>
  <div class="toolbar">
    <Toolbar>
      <ColorSelector :value="store.$state.penColor" @input="v => store.setPenColor(v)" />
    </Toolbar>
  </div>
  <div class="canvas">
    <PaintCanvas />
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
