<template>
  <div ref="el" class="PaintCanvas" />
  <div class="overlayContainer">
    <div class="overlay">
      <CanvasOverlay />
    </div>
  </div>
</template>

<script lang="ts" setup>
import CanvasOverlay from './CanvasOverlay.vue'
import { onMounted, ref } from 'vue'
import { useSymPaint } from '../logics/canvas/useSymPaint'

const el = ref<HTMLElement>()
const { init } = useSymPaint()
const canvasSize = ref({ width: '0', height: '0' })

onMounted(() => {
  const parent = el.value
  if (!parent) return

  // iOSのスクロール無効化
  parent.addEventListener('touchmove', (event) => {
    event.preventDefault()
  })

  canvasSize.value = {
    width: `${parent.offsetWidth}px`,
    height: `${parent.offsetHeight}px`,
  }

  init(parent)
})
</script>

<style lang="scss" scoped>
.PaintCanvas {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.overlayContainer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
    pointer-events: none;

  .overlay {
    width: v-bind('canvasSize.width');
    height: v-bind('canvasSize.height');
  }
}
</style>
