<template>
  <div class="SwitchItem" @pointerdown.prevent="ondown">
    <PaletteItem
      :icon="selected?.icon"
      :edge="edge"
      :disabled="disabled"
    ></PaletteItem>
    <div class="list" v-show="state.isListVisible">
      <SwitchList :label="label" :options="options" :selected="modelValue" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed } from 'vue'
import { constraint, stepValue } from '../../logics/utils/MathUtil'
import PaletteItem from './PaletteItem.vue'
import SwitchList from './SwitchList.vue'
import { SwitchOption } from './SwitchOption'

const props = withDefaults(
  defineProps<{
    modelValue: SwitchOption['key']
    options?: SwitchOption[]
    label?: string,
    edge?: 'left' | 'right' | 'both' | 'none'
    disabled?: boolean
  }>(),
  {
    options: () => [],
    label: '',
  disabled: false
  }
)

const selected = computed(() =>
  props.options.find((item) => item.key === props.modelValue)
)

const selectedIndex = computed(() =>
  props.options.findIndex((item) => item.key === props.modelValue)
)

const emit = defineEmits<{
  (e: 'update:modelValue', val: SwitchOption['key']): void
}>()

const state = reactive({
  startX: 0,
  startIndex: 0,
  isListVisible: false,
})

const ITEM_WIDTH = 120

const ondown = (ev: PointerEvent) => {
  if (props.disabled) return
  state.startX = ev.screenX
  state.startIndex = selectedIndex.value
  state.isListVisible = true
  document.body.style.cursor = 'ew-resize'
  const onmove = (ev: PointerEvent) => {
    ev.preventDefault()
    const dx = ev.screenX - state.startX
    const unitX = ITEM_WIDTH
    const v = constraint(
      stepValue(state.startIndex + dx / unitX, 1, 0),
      0,
      props.options.length - 1
    )
    emit('update:modelValue', props.options[v].key)
  }
  const cancelEvents = () => {
    state.isListVisible = false
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
.SwitchItem {
  position: relative;
  cursor: ew-resize;
  .list {
    position: absolute;
    top: 38px;
    left: 8px;
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
