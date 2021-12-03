<template>
  <div class="ExportDialog">
    <PlaneBox>
      <CloseButton @click="emit('close')" />
      Export Dialog
      <button @click="copy">Copy</button>
      <div class="image">
        <img v-if="state.imgSrc" :src="state.imgSrc" :style="imgStyle" />
      </div>
    </PlaneBox>
  </div>
</template>

<script lang="ts" setup>
import CloseButton from '../common/CloseButton.vue'
import PlaneBox from '../common/PlaneBox.vue'
import { useSymPaint } from '../../logics/canvas/useSymPaint'
import { copyImgToClipboard } from '../../logics/graphics/copyToClipboard'
import { computed, reactive, ref } from 'vue-demi'
import { blobToImg } from '../../logics/graphics/blobToImg'

const IMG_BOX_SIZE = 300
type State = {
  imgSrc: string
  imgSize: { w: number; h: number }
}

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { toImgBlob } = useSymPaint()
const state = reactive<State>({
  imgSrc: '',
  imgSize: { w: 0, h: 0 },
})

const imgStyle = computed(() => {
  const scale =
    IMG_BOX_SIZE / Math.max(state.imgSize.w, state.imgSize.h, IMG_BOX_SIZE)
  return {
    width: `${state.imgSize.w * scale}px`,
    height: `${state.imgSize.h * scale}px`,
  }
})

const copy = async () => {
  const promise = toImgBlob()
  if (!promise) {
    alert('failed to copy img')
    return
  }
  await copyImgToClipboard(promise)
  alert('copied!')
}

const loadImg = async () => {
  const blob = await toImgBlob()
  if (!blob) return
  const img = blobToImg(blob)
  img.onload = () => {
    state.imgSize.w = img.naturalWidth
    state.imgSize.h = img.naturalHeight
    state.imgSrc = img.src
  }
}
loadImg()
</script>

<style lang="scss" scoped>
.image {
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    border: 1px solid gray;
  }
}
</style>
