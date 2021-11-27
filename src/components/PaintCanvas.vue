<template>
  <div class="PaintCanvas" ref="el"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import {PaintCanvas, Coordinate} from 'sym-paint'
import { useCanvasStore } from '../stores/CanvasStore';

const store = useCanvasStore()
const el = ref<HTMLElement>()
let canvas: PaintCanvas | undefined;

onMounted(() => {
  console.log('moun')
  const parent = el.value
  if (!parent) return
  const cv = canvas = new PaintCanvas(parent, parent.offsetWidth, parent.offsetHeight)
  cv.penCount = store.penCount
  cv.penColor = store.penColor
  cv.penWidth = store.penWidth
  cv.tool = store.isStraight ? 'draw:line' : 'draw'
  cv.isKaleido = store.isKaleido

  // iOSのスクロール無効化
  parent.addEventListener('touchmove', (event) => {
    event.preventDefault()
  })

// キャンバスからの変更要求を受け取りパレットの設定を変更
cv.listenRequestZoom((scale) => {
  //setting.scale = scale
  cv.coord = cv.coord.clone({ scale })
})
cv.listenRequestScrollTo((pos) => {
  cv.coord = cv.coord.clone({ scroll: pos })
})
cv.listenRequestRotateTo((angle) => {
  cv.coord = cv.coord.clone({ angle })
})
cv.listenRequestUndo(() => {
  cv.undo()
})
cv.listenRequestAnchorTransform(({ coord, target }) => {
  if (target === 'root') cv.anchor = coord
  if (target === 'child') cv.childAnchor = coord
})
cv.listenRequestAnchorReset(() => {
  cv.anchor = new Coordinate()
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
watch(() => [store.$state.isKaleido], () => {
  if(!canvas) return
  canvas.isKaleido = store.isKaleido
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
