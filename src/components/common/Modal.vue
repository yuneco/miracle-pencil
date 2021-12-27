<template>
  <teleport to="body">
    <transition name="fade" appear>
      <!-- show only has slot contents -->
      <div class="Modal" v-if="hasContent">
        <div class="bg" />
        <div class="content">
          <slot />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { computed, useSlots, watch } from 'vue'
const slots = useSlots()

/** slot has content? */
const hasContent = computed(() => {
  const contents = slots.default?.() ?? []
  return contents.some(content => content.el || typeof content.type === 'object')
})
</script>

<style lang="scss" scoped>
.Modal {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  opacity: 1;
  .bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #00000044;
    backdrop-filter: blur(8px);
    // -webkit-backdrop-filter: blur(8px);
    opacity: 1;
  }
  .content {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &.fade-enter-active {
    transition: 0.35s;
    .bg {
      transition: opacity 0.35s;
    }
    .content {
      transition: transform cubic-bezier(.08,.76,.57,1.26) 0.35s, opacity 0.35s;
    }
  }
  &.fade-leave-active {
    transition: 0.25s;
    .bg {
      transition: opacity 0.25s;
    }
    .content {
      transition: transform 0.25s, opacity 0.25s;
    }
  }
  &.fade-enter-from {
    opacity: 1;
    .bg {
      opacity: 0;
    }
    .content {
      opacity: 0.5;
      transform: translateY(100px) scale(0.7);
    }
  }
  &.fade-leave-to {
    opacity: 1;
    .bg {
      opacity: 0;
    }
    .content {
      opacity: 0;
      transform: translateY(100px);
    }
  }
}
</style>
