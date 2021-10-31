<template>
<div class="PaintCanvas" ref="el"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import {PaintCanvas} from 'sym-paint'

const el = ref<HTMLElement>()
onMounted(() => {
  console.log('moun')
  const parent = el.value
  if (!parent) return
  const canvas = new PaintCanvas(parent, parent.offsetWidth, parent.offsetHeight)
  canvas.penCount = 12
  canvas.penColor = 'salmon'

  // iOSのスクロール無効化
  parent.addEventListener('touchmove', function (event) {
    event.preventDefault()
  })
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