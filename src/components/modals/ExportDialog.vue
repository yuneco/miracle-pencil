<template>
  <div class="ExportDialog">
    <PlaneBox>
      <div class="close">
        <CloseButton @click="emit('close')" />
      </div>
      <div class="title">Export Image</div>
      <div class="images">
        <div class="image" :class="{ selected: state.selected === 'original' }">
          <div class="title">Original</div>
          <img
            v-if="imgs.original"
            :src="imgs.original.src"
            :style="originalStyle"
            ref="originalImgRef"
            @click="state.selected = 'original'"
          />
        </div>
        <div class="image" :class="{ selected: state.selected === 'cropped' }">
          <div class="title">Cropped</div>
          <img
            v-if="imgs.cropped"
            :src="imgs.cropped.src"
            :style="croppedImgStyle"
            ref="croppedImgRef"
            @click="state.selected = 'cropped'"
          />
        </div>
        <div class="image" :class="{ selected: state.selected === 'texture' }">
          <div class="title">Texture</div>
          <img
            v-if="imgs.texture"
            :src="imgs.texture.src"
            :style="textureImgStyle"
            ref="textureImgRef"
            @click="state.selected = 'texture'"
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
import { copyImgToClipboard } from '../../logics/graphics/copyToClipboard'
import { computed, reactive, Ref, ref } from 'vue'
import { imgToBlob } from '../../logics/graphics/imgToBlob'
import { shareImage } from '../../logics/graphics/shareImg'
import PureButton from '../common/PureButton.vue'
import { useAppStore } from '../../stores/AppStore'
import { theme } from '../../consts/theme'
import { ExportImgKind, useExportImgs } from '../../logics/canvas/useExportImgs'

const IMG_BOX_SIZE = 240
const appStore = useAppStore()
type State = {
  selected: ExportImgKind | undefined
}

const emit = defineEmits<{
  (e: 'close'): void
}>()

const state = reactive<State>({
  selected: undefined,
})
const { imgs, create } = useExportImgs()

const originalImgRef = ref<HTMLImageElement>()
const croppedImgRef = ref<HTMLImageElement>()
const textureImgRef = ref<HTMLImageElement>()

const imgRefs: { [k in ExportImgKind]: Ref<HTMLImageElement | undefined> } = {
  original: originalImgRef,
  cropped: croppedImgRef,
  texture: textureImgRef,
}

const isShowShare = !!navigator.share

const getImgStyle = (kind: ExportImgKind) => {
  const info = imgs[kind]
  if (!info) return {}
  const { w, h } = info.size
  const scale = IMG_BOX_SIZE / Math.max(w, h, IMG_BOX_SIZE)
  return {
    width: `${w * scale}px`,
    height: `${h * scale}px`,
    backgroundColor: kind === 'texture' ? '#000' : '#fff',
  }
}

const originalStyle = computed(() => getImgStyle('original'))
const croppedImgStyle = computed(() => getImgStyle('cropped'))
const textureImgStyle = computed(() => getImgStyle('texture'))

const selectedImg = computed(() => {
  return state.selected ? imgRefs[state.selected].value : undefined
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

create()
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
      height: 300px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: 8px;
      border-radius: 4px;
        &.selected {
          background-color: v-bind('theme.themeLight');
        }
      img {
        box-shadow: 0 0 8px #00000033;
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
