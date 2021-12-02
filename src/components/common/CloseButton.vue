<template>
  <button class="CloseButton" @click="emit('click')">CLOSE</button>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<style lang="scss" scoped>
.CoseButton {
  font-size: 0;
  width: 32px;
  height: 32px;
  border: 1px solid #aaa;
  position: relative;
  &::before {
    position: absolute;
    content: '';
    width: 100%;
    height: 2px;
    background-color: currentColor;
    transform: rotate(45deg);
  }
  &::after {
    position: absolute;
    content: '';
    width: 100%;
    height: 2px;
    background-color: currentColor;
    transform: rotate(45deg);
  }
}
</style>