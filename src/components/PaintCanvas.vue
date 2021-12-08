<template>
  <div ref="el" class="PaintCanvas" />
</template>

<script lang="ts" setup>
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
