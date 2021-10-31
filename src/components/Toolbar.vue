<template>
  <div class="Toolbar">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.Toolbar {
  width: 100%;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
}
</style>