<template>
  <div class="Toolbar" @touchstart="preventEvent">
    <div class="radioGroup">
      <ColorSelectItem
        v-model="store.$state.penColor"
        :checked="!store.isEraser"
        @update:checked="(v) => v && selectPen()"
        edge="left"
        icon="pen"
      />
      <CheckItem
        :modelValue="store.isEraser"
        @update:modelValue="(v) => v && selectEraser()"
        edge="right"
        icon="eraser"
      />
    </div>

    <div class="radioGroup">
      <SliderItem
        v-model="store.penOpacity"
        label="Opacity"
        icon="opacity"
        :min="1"
        :max="100"
        edge="left"
      />
      <SliderItem
        v-model="store.penWidth"
        label="Width"
        icon="width"
        :min="1"
        :max="50"
        edge="none"
      />
      <SwitchItem
        label="LineType"
        v-model="penStraightType"
        :options="penStraightOpts"
        edge="right"
      />
    </div>

    <div class="radioGroup">
      <SliderItem
        v-model="penCount1"
        label="PenCount"
        icon="count"
        :min="PEN_COUNT_RANGE_1.min"
        :max="PEN_COUNT_RANGE_1.max"
        edge="left"
      />
      <SwitchItem
        label="MirrorType"
        v-model="pen1Kaleido"
        :options="penKaleidoOpts"
        edge="right"
      />
    </div>

    <div class="radioGroup">
      <CheckItem v-model="has2nd" edge="left" icon="2nd" />
      <SliderItem
        v-model="penCount2"
        label="PenCount"
        icon="count"
        :min="PEN_COUNT_RANGE_2.min"
        :max="PEN_COUNT_RANGE_2.max"
        edge="none"
        :disabled="!has2nd"
      />
      <SwitchItem
        label="MirrorType"
        v-model="pen2Kaleido"
        :options="penKaleidoOpts"
        edge="right"
        :disabled="!has2nd"
      />
    </div>
    <PaletteItem icon="export" @check="openExport" />
  </div>
</template>

<script lang="ts" setup>
import ColorSelectItem from './items/color/ColorSelectItem.vue'
import SliderItem from './items/slider/SliderItem.vue'
import SwitchItem from './items/switch/SwitchItem.vue'
import CheckItem from './items/CheckItem.vue'
import PaletteItem from './items/PaletteItem.vue'
import { useCanvasStore } from '../../stores/CanvasStore'
import { computed } from 'vue'
import { SwitchOption } from './items/switch/SwitchOption'
import { useAppStore } from '../../stores/AppStore'
import { PEN_COUNT_RANGE_1, PEN_COUNT_RANGE_2 } from '../../logics/consts/toolConsts'

const store = useCanvasStore()
const appStore = useAppStore()

const penCount1 = computed({
  set: (v: number) => {
    store.penCount = [v, store.penCount[1]]
  },
  get: () => store.penCount[0],
})
const penCount2 = computed({
  set: (v: number) => {
    store.penCount = [store.penCount[0], v]
  },
  get: () => store.penCount[1],
})
const has2nd = computed({
  set: (v: boolean) => {
    penCount2.value = v ? penCount1.value : 0
  },
  get: () => penCount2.value >= 1,
})

const penStraightOpts: SwitchOption[] = [
  { key: 'line', label: 'line', icon: 'line' },
  { key: 'free', label: 'free', icon: 'freehand' },
]

const penStraightType = computed<'line' | 'free'>({
  set: (v: string) => {
    store.isStraight = v === 'line'
  },
  get: () => (store.isStraight ? 'line' : 'free'),
})

const selectPen = () => {
  store.isEraser = false
}
const selectEraser = () => {
  store.isEraser = true
}

const penKaleidoOpts: SwitchOption[] = [
  { key: 'mirror', label: 'mirror', icon: 'mode_mirror' },
  { key: 'kaleido', label: 'kaleido', icon: 'mode_kaleido' },
]
const pen1Kaleido = computed<'mirror' | 'kaleido'>({
  set: (v: string) => {
    store.isKaleido = [v === 'kaleido', store.isKaleido[1]]
  },
  get: () => (store.isKaleido[0] ? 'kaleido' : 'mirror'),
})
const pen2Kaleido = computed<'mirror' | 'kaleido'>({
  set: (v: string) => {
    store.isKaleido = [store.isKaleido[0], v === 'kaleido']
  },
  get: () => (store.isKaleido[1] ? 'kaleido' : 'mirror'),
})

const openExport = () => {
  if (appStore.$state.modal) return
  appStore.$state.modal = 'export'
}

// パレット上でのズームやテキスト選択を防止するためpreventDefaultする
// ただし、<input type=color>のみ標準起用を利用しているので、この場合はpreventDefaultしない
const preventEvent = (ev: TouchEvent) => {
  const target = ev.target
  if (target && target instanceof HTMLInputElement) {
    if (target.type === 'color') return true
  }
  ev.preventDefault()
}
</script>

<style lang="scss" scoped>
.Toolbar {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  position: absolute;
  top: 8px;
  left: 0;
  gap: 4px;
  user-select: none !important;
  filter: drop-shadow(0px 0px 6px #00000033);
  .radioGroup {
    display: flex;
    gap: 0;
  }
}
</style>
