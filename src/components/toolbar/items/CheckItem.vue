<template>
  <div class="CheckItem">
    <PaletteItem
      :label="label"
      :icon="icon"
      :checked="modelValue"
      :edge="edge"
      :cornerStyle="cornerStyle"
      @check="oncheck"
      ><slot />
    </PaletteItem>
  </div>
</template>

<script lang="ts" setup>
import { PaletteIconSymbol } from '../../icons/PaletteIconSymbol'
import PaletteItem from './PaletteItem.vue'
const props = withDefaults(
  defineProps<{
    modelValue: boolean
    label?: string
    icon?: PaletteIconSymbol
    edge?: 'left' | 'right' | 'both' | 'none'
    cornerStyle?: 'default' | 'round'
  }>(),
  {
    label: '',
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
}>()

const oncheck = (v: boolean) => {
  emit('update:modelValue', v)
}
</script>
