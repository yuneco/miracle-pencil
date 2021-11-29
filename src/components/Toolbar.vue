<template>
  <div class="Toolbar">
    <div class="radioGroup">
      <ColorSelectItem
        v-model="store.$state.penColor"
        v-model:checked="isNotPenEraser"
        edge="left"
        icon="icons/icon-pen.svg"
      />
      <CheckItem
        v-model="isPenEraser"
        edge="right"
        icon="icons/icon-eraser.svg"
      />
    </div>

    <div class="radioGroup">
      <SliderItem
        v-model="store.penOpacity"
        label="Opacity"
        icon="icons/icon-opacity.svg"
        :min="1"
        :max="100"
        edge="left"
      />
      <SliderItem
        v-model="store.penWidth"
        label="Width"
        icon="icons/icon-width.svg"
        :min="1"
        :max="50"
        edge="right"
      />
    </div>

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
      <CheckItem v-model="has2nd" edge="left" icon="icons/icon-2nd.svg" />
      <SliderItem
        v-model="penCount2"
        label="PenCount"
        icon="icons/icon-count.svg"
        :min="1"
        :max="16"
        edge="right"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ColorSelectItem from '@/components/commonUis/ColorSelectItem.vue'
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

const isPenEraser = computed({
  set: (v: boolean) => {
    store.isEraser = v
  },
  get: () => store.isEraser,
})

const isNotPenEraser = computed({
  set: (v: boolean) => {
    isPenEraser.value = !v
  },
  get: () => !isPenEraser.value,
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
