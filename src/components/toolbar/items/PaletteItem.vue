<template>
  <button class="PaletteItem" :style="{
    backgroundColor: checked ? '#ddd' : '#fff',
    ...borderStyle
  }"
  :class="{PaletteItem__disabled: disabled}"
  @click="check"
  >
      <span
        class="icon"
        v-if="icon"
        :style="{
          backgroundImage: `url(${icon})`,
        }"
      />
      <div class="content"><slot /></div>
      <span class="label" v-if="label">{{ label }}</span>
  </button>
</template>

<script lang="ts" setup>import { computed } from 'vue-demi'

const props = withDefaults(
  defineProps<{
    icon?: string
    label?: string
    checked?: boolean
    edge?: 'left' | 'right' | 'both' | 'none'
    disabled?: boolean
  }>(),
  { 
    checked: false,
    edge: 'both',
    disabled: false
   }
)

const emit = defineEmits<{
  (e: 'check', v: boolean): void
}>()

const check = () => {
  emit('check', !props.checked)
}

const borderStyle = computed(() => {
  const borderRadius = {
    left: [true, false, false, true],
    right: [false, true, true, false],
    both: [true, true, true, true],
    none: [false, false, false, false],
  }[props.edge].map(v => v ? '4px' : '0').join(' ')
  return {
    borderRadius,
    borderRightWidth: (props.edge === 'right' || props.edge === 'both') ? '1px' : '0'
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
  padding: 0 4px;
  cursor: inherit;
  margin: 0;
  &__disabled {
    opacity: 0.3;
    pointer-events: none;
  }

  .content {
    display: inline-block;
    position: relative;
  }

  .icon {
    display: inline-block;
    width: 30px;
    height: 30px;
    background-repeat: no-repeat;
    background-position: center;
    pointer-events: none;
  }

  .label {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    height: 100%;
    min-width: 24px;
    color: var(--text-color);
  }
}
</style>
