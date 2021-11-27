<template>
  <div class="PaintCanvas" ref="el"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import {PaintCanvas} from 'sym-paint'
import { useCanvasStore } from '../stores/CanvasStore';

const store = useCanvasStore()
const el = ref<HTMLElement>()
let canvas: PaintCanvas | undefined;

onMounted(() => {
  console.log('moun')
  const parent = el.value
  if (!parent) return
  canvas = new PaintCanvas(parent, parent.offsetWidth, parent.offsetHeight)
  canvas.penCount = store.penCount
  canvas.penColor = store.penColor
  canvas.penWidth = store.penWidth
  canvas.tool = store.isStraight ? 'draw:line' : 'draw'

  console.log(store.penColor)

  // iOSのスクロール無効化
  parent.addEventListener('touchmove', (event) => {
    event.preventDefault()
  })
})

watch(() => [store.$state.penColor], () => {
  if(!canvas) return
  canvas.penColor = store.$state.penColor
})
watch(() => [store.$state.penCount], () => {
  if(!canvas) return
  canvas.penCount = store.$state.penCount
})
watch(() => [store.$state.penWidth], () => {
  if(!canvas) return
  canvas.penWidth = store.$state.penWidth
})
watch(() => [store.$state.isStraight], () => {
  if(!canvas) return
  canvas.tool = store.isStraight ? 'draw:line' : 'draw'
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
