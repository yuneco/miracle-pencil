<template>
  <div class="Slider">
    <span class="label">{{ label }}</span>
    <div class="bar">
      <div
        class="fill"
        :style="{
          transform: `scaleX(${barRate})`,
        }"
      ></div>
      <div class="value">{{ value }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue-demi'

const props = withDefaults(
  defineProps<{
    min?: number
    max?: number
    value: number
    label?: string
  }>(),
  {
    min: 0,
    max: 100,
    label: '',
  }
)

const barRate = computed(() => {
  return (props.value - props.min) / (props.max - props.min)
})
</script>

<style lang="scss" scoped>
.Slider {
  display: inline-flex;
  pointer-events: none;
  .label {
    display: inline-flex;
    font-size: 13px;
    padding-right: 4px;
    align-items: center;
  }
  .bar {
    position: relative;
    width: 120px;
    height: 24px;
    border: 1px solid gray;
    .fill {
      position: relative;
      width: 100%;
      height: 100%;
      transform-origin: left center;
      background-color: var(--theme-color);
    }
    .value {
      position: absolute;
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
