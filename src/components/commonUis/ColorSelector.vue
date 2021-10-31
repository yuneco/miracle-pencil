<template>
  <div class="ColorSelector" @click="open">
    <div
      class="view"
      :style="{
        backgroundColor: value,
      }"
    ></div>
    <input
      type="color"
      ref="inp"
      :value="value"
      @input="(ev) => changeColor(ev)"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const inp = ref<HTMLElement>()

const props = defineProps<{
  value: string
}>()

const emit = defineEmits<{
  (e: 'input', value: string): void
}>()

const open = () => {
  inp.value?.click()
}

const changeColor = (ev: Event) => {
  emit('input', (ev.target as HTMLInputElement).value)
}
</script>

<style lang="scss" scoped>
.ColorSelector {
  position: relative;
  width: 32px;
  height: 32px;
  border: 1px solid #888;
  border-radius: 50%;
  overflow: hidden;
  .view {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 0;
    left: 0;
    border: 2px solid #fff;
    border-radius: 50%;
  }

  input {
    position: relative;
    top: 32px;
    width: 1px;
    height: 1px;
  }
}
</style>
