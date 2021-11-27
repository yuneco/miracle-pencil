<template>
  <div class="SliderItem" @pointerdown.prevent="ondown">
    <PaletteItem :label="`${modelValue}${unit}`" :icon="icon"></PaletteItem>
    <div class="slider" v-show="state.isSliderVisible">
      <Slider :value="modelValue" :label="label" :min="min" :max="max" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue-demi'
import { constraint, stepValue } from '../../logics/utils/MathUtil'
import PaletteItem from './PaletteItem.vue'
import Slider from './Slider.vue'

const props = withDefaults(
  defineProps<{
    min?: number
    max?: number
    modelValue: number
    step?: number
    label?: string
    unit?: string
    icon?: string
  }>(),
  {
    min: 0,
    max: 100,
    step: 1,
    label: '',
    unit: '',
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', val: number): void
}>()

const state = reactive({
  startX: 0,
  startValue: 0,
  isSliderVisible: false,
})

const SLIDER_WIDTH = 120

const ondown = (ev: PointerEvent) => {
  state.startX = ev.screenX
  state.startValue = props.modelValue
  state.isSliderVisible = true
  document.body.style.cursor = 'ew-resize'
  const onmove = (ev: PointerEvent) => {
    ev.preventDefault()
    const dx = ev.screenX - state.startX
    const unitX = SLIDER_WIDTH / (props.max - props.min)
    const v = constraint(
      stepValue(state.startValue + dx / unitX, props.step, props.min),
      props.min,
      props.max
    )
    emit('update:modelValue', v)
  }
  const cancelEvents = () => {
    state.isSliderVisible = false
    document.body.removeEventListener('pointermove', onmove)
    document.body.removeEventListener('pointerup', cancelEvents)
    document.body.removeEventListener('pointercancel', cancelEvents)
    document.body.style.cursor = ''
  }
  document.body.addEventListener('pointermove', onmove)
  document.body.addEventListener('pointerup', cancelEvents)
  document.body.addEventListener('pointercancel', cancelEvents)
}
</script>

<style lang="scss" scoped>
.SliderItem {
  position: relative;
  cursor: ew-resize;
  .slider {
    position: absolute;
    top: 38px;
    left: 24px;
    filter: drop-shadow(0 0 8px #00000066);
    padding: 4px;
    background-color: #fff;
    border-radius: 4px;
    &::before {
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      top: -4px;
      left: 8px;
      background-color: #fff;
      border-radius: 2px;
      transform: rotate(45deg);
    }
  }
}
</style>
