<template>
<button class="CircleButton"><slot /></button>
</template>

<script lang="ts" setup>
import { theme } from '../../consts/theme';

const props = withDefaults(defineProps<{
  size?: number,
  color?: string,
  border?: number 
}>(), {
  size: 32,
  color: '#fff',
  border: 1
})
</script>

<style lang="scss" scoped>
  .CircleButton {
    appearance: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: v-bind('props.size + "px"');
    height: v-bind('props.size + "px"');
    color: #fff;
    border: v-bind('props.border + "px solid currentColor"');
    background-color: v-bind('theme.themeDark');
    font-weight: bold;
    border-radius: 100%;
    cursor: pointer;
    &:active {
      filter: brightness(0.8);
    }
    &:disabled {
      background-color: #aaa;
    }
  }
</style>