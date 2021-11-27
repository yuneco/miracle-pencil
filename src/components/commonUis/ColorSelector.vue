<template>
  <label class="ColorSelector" @click="open">
    <div
      v-if="icon"
      class="icon"
      :style="{
        backgroundImage: `url(${icon})`,
      }"
    ></div>
    <div
      class="view"
      :style="{
        backgroundColor: modelValue,
      }"
    ></div>
    <input
      type="color"
      ref="inp"
      :value="modelValue"
      @input="(ev) => changeColor(ev)"
    />
  </label>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const inp = ref<HTMLElement>()

const props = defineProps<{
  modelValue: string
  icon?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const open = () => {
  inp.value?.click()
}

const changeColor = (ev: Event) => {
  emit('update:modelValue', (ev.target as HTMLInputElement).value)
}
</script>

<style lang="scss" scoped>
.ColorSelector {
  position: relative;
  height: 32px;
  border: 1px solid #888;
  border-radius: 4px;
  background-color: #fff;

  .icon {
    position: relative;
    display: inline-block;
    width: 32px;
    height: 32px;
    background-repeat: no-repeat;
    background-position: left center;
  }
  .view {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 0;
    right: 0px;
    border: 2px solid #fff;
    border-radius: 4px;
    z-index: 1;
  }

  input {
    position: relative;
    width: 30px;
    height: 30px;
    border-radius: 4px;
    border: none;
  }
}
</style>
