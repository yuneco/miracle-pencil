<template>
  <div class="ExportDialog">
    <PlaneBox>
      <div class="close">
        <CloseButton @click="emit('close')" />
      </div>
      <div class="title">
        Export Image
      </div>
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
      <div class="buttons">
        <PureButton @click="copy" :disabled="!state.selected">Copy</PureButton>
        <PureButton @click="share" v-if="isShowShare">Share</PureButton>
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
import PureButton from '../common/PureButton.vue'
import { useAppStore } from '../../stores/AppStore'
import { theme } from '../consts/theme'

const IMG_BOX_SIZE = 240
const appStore = useAppStore()
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
  appStore.$state.toast = copied ? 'copied!' : 'failed to copy img'
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
.ExportDialog {
  max-width: 90vw;
  .title {
    font-weight: bold;
    color: #444;
    padding-bottom: 16px;
  }
  .close {
    position: absolute;
    top: 4px;
    right: 4px;
  }
  .images {
    display: flex;
    gap: 6px;
    width: 100%;
    overflow-x: scroll;
    .image {
      width: 240px;
      height: 240px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        border: 2px solid #ddd;
        box-shadow: 0 0 8px #00000011;
        &.selected {
          border: 2px solid v-bind('theme.themeColor');
        }
      }
    }
  }

  .buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding-top: 20px;
  }
}
</style>
