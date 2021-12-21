<template>
  <teleport to="body">
    <transition name="fade" appear>
      <div class="Toast" v-if="!!storeText">
        <div class="content">{{ dispText }}</div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useDelayed } from '../../logics/utils/useDelay'
import { useAppStore } from '../../stores/AppStore'

const TOAST_DISP_MS = 1500
const TOAST_EXIT_TRANSITION_MS = 1000

const store = useAppStore()
const storeText = computed(() => store.$state.toast)
const delayedText = useDelayed(storeText, TOAST_EXIT_TRANSITION_MS)
const dispText = computed(() => storeText.value || delayedText.value)

let hideTimerId = 0
watch(storeText, () => {
  window.clearTimeout(hideTimerId)
  if (!storeText.value) return
  hideTimerId = window.setTimeout(() => {
    store.$state.toast = ''
  }, TOAST_DISP_MS)
})
</script>

<style lang="scss" scoped>
.Toast {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  .content {
    width: 200px;
    min-width: 30%;
    min-height: 80px;
    background-color: #0000008f;
    border-radius: 12px;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: #fff;
    font-size: 20px;
  }

  &.fade-enter-active {
    transition: 0.15s;
    .content {
      transition: transform cubic-bezier(0.08, 0.76, 0.57, 1.26) 0.15s,
        opacity 0.15s;
    }
  }
  &.fade-leave-active {
    transition: 0.35s;
    .content {
      transition: transform 0.35s, opacity 0.35s;
    }
  }
  &.fade-enter-from {
    opacity: 1;
    .content {
      opacity: 0;
      transform: translateY(-30px) scale(1.3);
    }
  }
  &.fade-leave-to {
    opacity: 1;
    .content {
      opacity: 0;
      transform: scale(1.5);
    }
  }
}
</style>
