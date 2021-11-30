<template>
  <div class="SwitchList">
    <div class="label">{{ label }}</div>
    <ul class="list">
      <li
        v-for="opt in options"
        :key="opt.key"
        class="opt"
        :class="{ selected: opt.key === selected }"
      >
        <div
          v-if="opt.icon"
          class="icon"
          :style="{
            backgroundImage: `url(${opt.icon})`,
          }"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { SwitchOption } from './SwitchOption'

const props = withDefaults(
  defineProps<{
    options?: SwitchOption[]
    selected: SwitchOption['key']
    label: string
  }>(),
  {
    options: () => [],
  }
)
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
    margin: 0;
    padding: 0;

    .opt {
      display: flex;
      padding: 2px;
      border-radius: 4px;
      &.selected {
        background-color: var(--theme-color);
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
