<template>
  <div class="Toolbar">
    <ColorSelector v-model="store.$state.penColor" />
    <div class="radioGroup">
      <CheckItem
        v-model="isPenStraight"
        edge="left"
        icon="/src/assets/icons/icon-line.svg"
      />
      <CheckItem
        v-model="isPenFreehand"
        edge="right"
        icon="/src/assets/icons/icon-freehand.svg"
      />
    </div>
    <SliderItem
      v-model="penCount1"
      label="PenCount"
      icon="/src/assets/icons/icon-count.svg"
      :min="1"
      :max="16"
    />
    <SliderItem
      v-model="store.penWidth"
      label="Width"
      icon="/src/assets/icons/icon-width.svg"
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
