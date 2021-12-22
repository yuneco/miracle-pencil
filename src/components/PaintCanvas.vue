<template>
  <div ref="el" class="PaintCanvas" />
  <CanvasOverlay />
</template>

<script lang="ts" setup>
import CanvasOverlay from './CanvasOverlay.vue'
import { onMounted, ref } from 'vue'
import { useSymPaint } from '../logics/canvas/useSymPaint'

const el = ref<HTMLElement>()
const { init } = useSymPaint()

onMounted(() => {
  const parent = el.value
  if (!parent) return

  // iOSのスクロール無効化
  parent.addEventListener('touchmove', (event) => {
    event.preventDefault()
  })

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
</style>
