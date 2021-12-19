<template>
  <div class="SwitchList">
    <div class="label">{{ label }}</div>
    <ul class="list">
      <li
        v-for="opt in options"
        :key="opt.key"
        class="opt"
        :class="{ selected: opt.key === modelValue }"
        @pointerdown="onselect(opt.key)"
      >
        <div v-if="opt.icon" class="icon">
          <PaletteIcon :symbol="opt.icon" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { sleep } from '../../../../logics/utils/sleep'
import { SwitchOption } from './SwitchOption'
import PaletteIcon from '../../../icons/PaletteIcon.vue'
import { theme } from '../../../consts/theme'

const props = withDefaults(
  defineProps<{
    options?: SwitchOption[]
    modelValue: SwitchOption['key']
    label: string
  }>(),
  {
    options: () => [],
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: SwitchOption['key']): void
  (e: 'close'): void
}>()

const onselect = async (key: SwitchOption['key']) => {
  emit('update:modelValue', key)
  await sleep(200) // 選択項目がわかるよう、少し遅れてクローズする
  emit('close')
}
</script>

<style lang="scss" scoped>
.SwitchList {
  display: flex;
  align-items: center;

  .label {
    font-size: 13px;
    padding-right: 4px;
  }
  .list {
    list-style-type: none;
    display: flex;
    position: relative;
    z-index: 1;
    margin: 0;
    padding: 0;

    .opt {
      display: flex;
      padding: 2px;
      border-radius: 4px;
      &.selected {
        background-color: v-bind('theme.themeColor');
      }
      .icon {
        width: 30px;
        height: 30px;
        display: inline-block;
        background-repeat: no-repeat;
        background-position: center;
      }
    }
  }
}
</style>
