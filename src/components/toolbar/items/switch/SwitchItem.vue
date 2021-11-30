<template>
  <div class="SwitchItem">
    <PaletteItem
      @pointerdown.prevent="ondown"
      :icon="selected?.icon"
      :edge="edge"
      :disabled="disabled"
    ></PaletteItem>
    <div class="list" v-show="state.isListVisible">
      <SwitchList
        :label="label"
        :options="options"
        v-model="modelValue"
        @close="closeList"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed, watch } from 'vue'
import { constraint, stepValue } from '../../../../logics/utils/mathUtil'
import PaletteItem from '../PaletteItem.vue'
import SwitchList from './SwitchList.vue'
import { SwitchOption } from './SwitchOption'
import { startDragX } from '../startDrag'
import { useToolbarStore } from '../../../../stores/ToolbarStore'

const props = withDefaults(
  defineProps<{
    modelValue: SwitchOption['key']
    options?: SwitchOption[]
    label?: string
    edge?: 'left' | 'right' | 'both' | 'none'
    disabled?: boolean
  }>(),
  {
    options: () => [],
    label: '',
    disabled: false,
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

const store = useToolbarStore()
const id = `switch-${Math.random()}`
const state = reactive({
  startIndex: 0,
  isListVisible: false,
})

const ITEM_WIDTH = 120

watch(
  () => store.$state.activeItemId,
  () => {
    if (store.$state.activeItemId !== id) {
      state.isListVisible = false
    }
  }
)

const closeList = () => {
  if (store.$state.activeItemId === id) {
    store.$state.activeItemId = ''
  }
}

watch(
  () => props.disabled,
  () => {
    if (props.disabled) closeList()
  }
)

const openList = (ev: PointerEvent) => {
  state.startIndex = selectedIndex.value
  state.isListVisible = true
  store.$state.activeItemId = id
  startDragX(
    ev,
    (dx: number) => {
      const unitX = ITEM_WIDTH
      const v = constraint(
        stepValue(state.startIndex + dx / unitX, 1, 0),
        0,
        props.options.length - 1
      )
      emit('update:modelValue', props.options[v].key)
    },
    (isDragged: boolean) => {
      if (isDragged) closeList()
    }
  )
}

const ondown = (ev: PointerEvent) => {
  if (props.disabled) return
  if (!state.isListVisible) {
    openList(ev)
  } else {
    closeList()
  }
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
