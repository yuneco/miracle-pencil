<template>
  <div class="CheckItem">
    <PaletteItem
      :label="label"
      :icon="icon"
      :checked="modelValue"
      :edge="edge"
      @check="oncheck"
    ></PaletteItem>
  </div>
</template>

<script lang="ts" setup>
import PaletteItem from './PaletteItem.vue'
const props = withDefaults(
  defineProps<{
    modelValue: boolean
    label?: string
    icon?: string
    edge?: 'left' | 'right' | 'both' | 'none'
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
