<template>
  <div class="Toolbar">
    <ColorSelector v-model="store.$state.penColor" />
    <div class="radioGroup">
      <CheckItem
        v-model="isPenStraight"
        edge="left"
        icon="icons/icon-line.svg"
      />
      <CheckItem
        v-model="isPenFreehand"
        edge="right"
        icon="icons/icon-freehand.svg"
      />
    </div>
    <SliderItem
      v-model="penCount1"
      label="PenCount"
      icon="icons/icon-count.svg"
      :min="1"
      :max="16"
    />

    <div class="radioGroup">
      <CheckItem
        v-model="has2nd"
        edge="left"
        icon="icons/icon-2nd.svg"
      />
    <SliderItem
      v-model="penCount2"
      label="PenCount"
      icon="icons/icon-count.svg"
      :min="1"
      :max="16"
      edge="right"
    />
    </div>

<SliderItem
      v-model="store.penWidth"
      label="Width"
      icon="icons/icon-width.svg"
      :min="1"
      :max="50"
    />
  </div>
</template>

<script lang="ts" setup>
import ColorSelector from '@/components/commonUis/ColorSelector.vue'
import SliderItem from '@/components/commonUis/SliderItem.vue'
import CheckItem from '@/components/commonUis/CheckItem.vue'
import { useCanvasStore } from '../stores/CanvasStore'
import { computed } from 'vue'

const store = useCanvasStore()
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


const isPenStraight = computed({
  set: (v: boolean) => {
    store.isStraight = v
  },
  get: () => store.isStraight,
})

const isPenFreehand = computed({
  set: (v: boolean) => {
    store.isStraight = !v
  },
  get: () => !store.isStraight,
})
</script>

<style lang="scss" scoped>
.Toolbar {
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 8px;
  left: 0;
  gap: 4px;
  .radioGroup {
    display: flex;
    gap: 0;
  }
}
</style>
