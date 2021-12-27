<script lang="ts" setup>
const props = withDefaults(defineProps<{
  backgroundColor?: string
}>(),{
  backgroundColor: '#fff'
})
</script>
<template>
  <div class="PlaneBox">
    <slot />
  </div>
</template>



<style lang="scss" scoped>
.PlaneBox {
  position: relative;
  background-color: v-bind('props.backgroundColor');
  border-radius: 8px;
  padding: 24px;
  filter: drop-shadow(0 0 24px #00000066);
}
</style>