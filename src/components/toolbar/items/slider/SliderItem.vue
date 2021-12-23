<template>
  <div class="SliderItem">
    <PaletteItem
      @pointerdown.prevent="ondown"
      :label="`${modelValue}${unit}`"
      :icon="icon"
      :edge="edge"
      :disabled="disabled"
    ></PaletteItem>
    <div class="slider" v-if="state.isSliderVisible">
      <Slider
        :modelValue="modelValue"
        @update:model-value="changeValue"
        :label="label"
        :min="min"
        :max="max"
        @close="closeSlider"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from "vue"
import { constraint, stepValue } from '../../../../logics/utils/mathUtil'
import PaletteItem from '../PaletteItem.vue'
import Slider from './Slider.vue'
import { startDragX } from '../startDrag'
import { useToolbarStore } from '../../../../stores/ToolbarStore'
import { PaletteIconSymbol } from '../../../icons/PaletteIconSymbol'

const props = withDefaults(
  defineProps<{
    min?: number
    max?: number
    modelValue: number
    step?: number
    label?: string
    unit?: string
    icon?: PaletteIconSymbol
    edge?: 'left' | 'right' | 'both' | 'none'
    disabled?: boolean
  }>(),
  {
    min: 0,
    max: 100,
    step: 1,
    label: '',
    unit: '',
    disabled: false
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', val: number): void
}>()

const store = useToolbarStore()
const id = `slider-${Math.random()}`
const state = reactive({
  startValue: 0,
  isSliderVisible: false,
})

const SLIDER_WIDTH = 120

watch(
  () => store.$state.activeItemId,
  () => {
    if (store.$state.activeItemId !== id) {
      state.isSliderVisible = false
    }
  }
)

const closeSlider = () => {
  if (store.$state.activeItemId === id) {
    store.$state.activeItemId = ''
  }
}

watch(
  () => props.disabled,
  () => {
    if (props.disabled) closeSlider()
  }
)

const openSlider = (ev: PointerEvent) => {
  state.startValue = props.modelValue
  state.isSliderVisible = true
  store.$state.activeItemId = id
  startDragX(
    ev,
    (dx: number) => {
      const unitX = SLIDER_WIDTH / (props.max - props.min)
      const v = constraint(
        stepValue(state.startValue + dx / unitX, props.step, props.min),
        props.min,
        props.max
      )
      emit('update:modelValue', v)
    },
    (isDragged: boolean) => {
      if (isDragged) closeSlider()
    }
  )
}

const ondown = (ev: PointerEvent) => {
  if (props.disabled) return
  if (!state.isSliderVisible) {
    openSlider(ev)
  } else {
    closeSlider()
  }
}

const changeValue = (v: number) => {
  emit('update:modelValue', v)
}
</script>

<style lang="scss" scoped>
.SliderItem {
  position: relative;
  cursor: ew-resize;
  .slider {
    position: absolute;
    z-index: 1;
    top: 42px;
    left: 60px;
    transform: translateX(-50%);
    filter: drop-shadow(0 0 8px #00000066);
    padding: 4px;
    background-color: #fff;
    border-radius: 4px;
    &::before {
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      top: -3px;
      left: calc(50% - 28px);
      background-color: #fff;
      border-radius: 2px;
      transform: rotate(45deg);
    }
  }
}
</style>
