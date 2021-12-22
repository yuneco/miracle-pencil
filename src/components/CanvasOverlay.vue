<template>
  <div class="CanvasOverlay">
    <div v-if="activeAnchorPos" class="marker">
      <transition name="fade" appear>
        <CanvasAnchorMaker
          v-if="markerSymbol"
          class="markerImage"
          :symbol="markerSymbol"
          :color="activeAnchorColor"
        />
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import CanvasAnchorMaker from './icons/CanvasAnchorMaker.vue'
import { useSymPaint } from '../logics/canvas/useSymPaint'
const { state: store, activeAnchorPos, activeAnchorColor } = useSymPaint()

const markerPosTransform = computed(
  () =>
    `translate(${activeAnchorPos.value?.x}px, ${activeAnchorPos.value?.y}px)`
)
const markerSymbol = computed(() => {
  const tool = store.tool
  if (tool === 'rotate:anchor') return 'rotate'
  if (tool === 'scroll:anchor') return 'move'
})
</script>

<style lang="scss" scoped>
.CanvasOverlay {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  .marker {
    position: absolute;
    width: 0px;
    height: 0px;
    transform: v-bind('markerPosTransform');
    .markerImage {
      width: 20vw;
      height: 20vw;
      transform: translate(-50%, -50%);
      opacity: 0.25;
    }

    .fade-enter-active {
      transition: opacity 2s 1s;
    }
    .fade-leave-active {
      transition: opacity 0.2s;
    }
    .fade-enter-from {
      opacity: 1;
    }
    .fade-leave-to {
      opacity: 0;
    }
  }
}
</style>
