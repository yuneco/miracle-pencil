<template>
  <div class="Slider">
    <span class="label">{{ label }}</span>
    <div
      class="bar"
      @pointerdown="ondown"
      @pointermove="onmove"
      @pointercancel="onup"
      @pointerup="onup"
    >
      <div
        class="fill"
        :style="{
          transform: `scaleX(${barRate})`,
        }"
      ></div>
      <div class="value">{{ modelValue }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onUnmounted, reactive } from 'vue'
import { constraint, stepValue } from '../../../../logics/utils/mathUtil'
import { sleep } from '../../../../logics/utils/sleep'
import { theme } from '../../../../consts/theme'

const BAR_WIDTH = 120

const props = withDefaults(
  defineProps<{
    min?: number
    max?: number
    step?: number
    modelValue: number
    label?: string
  }>(),
  {
    min: 0,
    max: 100,
    step: 1,
    label: '',
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'close'): void
}>()

const state = reactive({
  isDragging: false,
})

const barRate = computed(() => {
  return (props.modelValue - props.min) / (props.max - props.min)
})

const updateValue = (ev: PointerEvent) => {
  const xRate = constraint(ev.offsetX / BAR_WIDTH, 0, 1)
  const value = stepValue(
    props.min + xRate * (props.max - props.min),
    props.step,
    props.min
  )
  emit('update:modelValue', value)
}

const ondown = (ev: PointerEvent) => {
  updateValue(ev)
  state.isDragging = true
}

const onmove = (ev: PointerEvent) => {
  if (!state.isDragging) return
  updateValue(ev)
}

const onup = async (ev: PointerEvent) => {
  if (!state.isDragging) return
  updateValue(ev)
  state.isDragging = false
  await sleep(200) // 選択値がわかるよう、少し遅れてクローズする
  close()
}

const close = () => {
  emit('close')
}
</script>

<style lang="scss" scoped>
.Slider {
  display: inline-flex;
  .label {
    display: inline-flex;
    user-select: none;
    font-size: 13px;
    padding-left: 2px;
    padding-right: 6px;
    align-items: center;
  }
  .bar {
    position: relative;
    width: 120px;
    height: 24px;
    border: 1px solid gray;
    border-radius: 3px;
    overflow: hidden;
    .fill {
      position: relative;
      width: 100%;
      height: 100%;
      transform-origin: left center;
      background-color: v-bind('theme.themeColor');
    }
    .value {
      position: absolute;
      user-select: none;
      display: flex;
      font-size: 13px;
      align-items: center;
      justify-content: center;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      text-align: center;
      font-size: 13px;
      user-select: none;
    }
  }
}
</style>
