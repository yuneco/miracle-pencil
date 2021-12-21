<template>
  <button
    class="PaletteItem"
    :style="{
      ...borderStyle,
    }"
    :class="{ PaletteItem__disabled: disabled, PaletteItem__checked: checked, PaletteItem__flash: isFlashing }"
    @pointerdown="check"
  >
    <span class="icon" v-if="icon">
      <PaletteIcon :symbol="icon" />
    </span>
    <div class="content"><slot /></div>
    <span class="label" v-if="label">{{ label }}</span>
  </button>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { sleep } from '../../../logics/utils/sleep'
import PaletteIcon from '../../icons/PaletteIcon.vue'
import { PaletteIconSymbol } from '../../icons/PaletteIconSymbol'
import { theme } from '../../consts/theme';

const props = withDefaults(
  defineProps<{
    icon?: PaletteIconSymbol
    label?: string
    checked?: boolean
    edge?: 'left' | 'right' | 'both' | 'none'
    disabled?: boolean
    enableFlash?: boolean
  }>(),
  {
    checked: false,
    edge: 'both',
    disabled: false,
    enableFlash: true
  }
)

const emit = defineEmits<{
  (e: 'check', v: boolean): void
}>()

const isFlashing = ref(false)

const check = async () => {
  const newValue = !props.checked
  emit('check', newValue)
  if (newValue && props.enableFlash) {
    isFlashing.value = true
    await sleep(100)
    isFlashing.value = false
  }
}

const borderStyle = computed(() => {
  const borderRadius = {
    left: [true, false, false, true],
    right: [false, true, true, false],
    both: [true, true, true, true],
    none: [false, false, false, false],
  }[props.edge]
    .map((v) => (v ? '4px' : '0'))
    .join(' ')
  return {
    borderRadius,
    borderRightWidth:
      props.edge === 'right' || props.edge === 'both' ? '1px' : '0',
  }
})
</script>

<style lang="scss" scoped>
.PaletteItem {
  display: inline-flex;
  position: relative;
  height: 32px;
  border: 1px solid #aaa;
  background-color: #fff;
  transition: background-color 0.25s;
  padding: 2px;
  cursor: inherit;
  margin: 0;
  appearance: none;
  &__disabled {
    opacity: 0.3;
    pointer-events: none;
  }
  &__checked {
    background-color: #ddd;
  }
  &__flash {
    background-color: #ddd;
    transition: background-color 0s;
  }

  .content {
    display: inline-block;
    position: relative;
  }

  .icon {
    display: inline-block;
    position: relative;
    top: -2px;
    width: 30px;
    height: 30px;
    background-repeat: no-repeat;
    background-position: center;
    user-select: none !important;
    pointer-events: none !important;
  }

  .label {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    height: 100%;
    min-width: 24px;
    color: v-bind('theme.textColor');
    user-select: none !important;
    pointer-events: none !important;
  }
}
</style>
