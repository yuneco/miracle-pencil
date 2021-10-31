<template>
  <div class="PaintCanvas" ref="el"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import {PaintCanvas} from 'sym-paint'
import { useCanvasStore } from '../stores/CanvasStore';

const el = ref<HTMLElement>()
let canvas: PaintCanvas | undefined;

onMounted(() => {
  console.log('moun')
  const parent = el.value
  if (!parent) return
  canvas = new PaintCanvas(parent, parent.offsetWidth, parent.offsetHeight)
  canvas.penCount = 12
  canvas.penColor = 'salmon'

  // iOSのスクロール無効化
  parent.addEventListener('touchmove', function (event) {
    event.preventDefault()
  })
})

const store = useCanvasStore()
watch(() => [store.$state.penColor], () => {
  if(!canvas) return
  canvas.penColor = store.$state.penColor
})
watch(() => [store.$state.penCount], () => {
  if(!canvas) return
  canvas.penCount = store.$state.penCount
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
