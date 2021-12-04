<template>
  <div class="PlaneBox">
    <slot />
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.PlaneBox {
  position: relative;
  background-color: #fff;
  border-radius: 8px;
  padding: 24px;
  filter: drop-shadow(0 0 24px #00000066);
}
</style>