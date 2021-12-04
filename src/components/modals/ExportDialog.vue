<template>
  <div class="ExportDialog">
    <PlaneBox>
      <CloseButton @click="emit('close')" />
      Export Dialog
      <button @click="copy">Copy</button>
      <button @click="share" v-if="isShowShare">Share</button>
      <div class="images">
        <div class="image">
          <img
            v-if="state.imgSrc"
            :src="state.imgSrc"
            :style="imgStyle"
            :class="{ selected: state.selected === 'img' }"
            ref="imgRef"
            @click="state.selected = 'img'"
          />
        </div>
        <div class="image">
          <img
            v-if="state.croppedImgSrc"
            :src="state.croppedImgSrc"
            :style="croppedImgStyle"
            :class="{ selected: state.selected === 'croppedImg' }"
            ref="croppedImgRef"
            @click="state.selected = 'croppedImg'"
          />
        </div>
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
import { cropImg } from '../../logics/graphics/cropImg'
import { imgToBlob } from '../../logics/graphics/imgToBlob'
import { shareImage } from '../../logics/graphics/shareImg'

const IMG_BOX_SIZE = 300
type State = {
  imgSrc: string
  imgSize: { w: number; h: number }
  croppedImgSrc: string
  croppedImgSize: { w: number; h: number }
  selected: 'img' | 'croppedImg' | undefined
}

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { toImgBlob } = useSymPaint()
const state = reactive<State>({
  imgSrc: '',
  imgSize: { w: 0, h: 0 },
  croppedImgSrc: '',
  croppedImgSize: { w: 0, h: 0 },
  selected: undefined,
})

const imgRef = ref<HTMLImageElement>()
const croppedImgRef = ref<HTMLImageElement>()
const isShowShare = !!navigator.share

const imgStyle = computed(() => {
  const scale =
    IMG_BOX_SIZE / Math.max(state.imgSize.w, state.imgSize.h, IMG_BOX_SIZE)
  return {
    width: `${state.imgSize.w * scale}px`,
    height: `${state.imgSize.h * scale}px`,
  }
})

const croppedImgStyle = computed(() => {
  const scale =
    IMG_BOX_SIZE /
    Math.max(state.croppedImgSize.w, state.croppedImgSize.h, IMG_BOX_SIZE)
  return {
    width: `${state.croppedImgSize.w * scale}px`,
    height: `${state.croppedImgSize.h * scale}px`,
  }
})

const selectedImg = computed(() => {
  if (!state.selected) return
  return state.selected === 'img' ? imgRef.value : croppedImgRef.value
})

const copy = async () => {
  if (!selectedImg.value) return
  const copied = await copyImgToClipboard(selectedImg.value)
  alert(copied ? 'copied!' : 'failed to copy img')
}

const share = async () => {
  if (!selectedImg.value) return
  const blob = await imgToBlob(selectedImg.value)
  if (!blob) return
  await shareImage(blob)
}

const loadImg = async () => {
  const blob = await toImgBlob()
  if (!blob) return
  const img = await blobToImg(blob)
  state.imgSize.w = img.naturalWidth
  state.imgSize.h = img.naturalHeight
  state.imgSrc = img.src
  state.selected = 'img'
  const cropped = await cropImg(img)
  if (!cropped) return
  state.croppedImgSize.w = cropped.naturalWidth
  state.croppedImgSize.h = cropped.naturalHeight
  state.croppedImgSrc = cropped.src
}
loadImg()
</script>

<style lang="scss" scoped>
.images {
  display: flex;
  gap: 4px;
  .image {
    width: 300px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      outline: 1px solid #aaa;
      &.selected {
        outline: 2px solid var(--theme-color);
      }
    }
  }
}
</style>
