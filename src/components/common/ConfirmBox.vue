<template>
  <transition name="fade">
    <div class="ConfirmBox" v-if="content">
      <div class="bg"></div>
      <div class="content">
        <div class="text">{{ content.message }}</div>
        <div class="buttons">
          <PureButton @click="store.select('yes')" class="yes" :color="color">
            {{ content.yesCaption }}
          </PureButton>
          <PureButton
            v-if="content.noCaption"
            @click="store.select('no')"
            class="no"
          >
            {{ content.noCaption }}
          </PureButton>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import PureButton from './PureButton.vue'
import { useConfirmStore } from '../../stores/ConfirmStore'
import { computed } from 'vue'
import { theme } from '../../consts/theme'

const store = useConfirmStore()
const content = computed(() => store.$state.content)
const color = computed(() =>
  content.value?.kind === 'danger' ? theme.danger : theme.themeDark
)
</script>

<style lang="scss" scoped>
.ConfirmBox {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .bg {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-color: #44444488;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
  .content {
    width: min(300px, 50vw);
    min-height: 100px;
    background-color: #fff;
    padding: 12px 24px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    box-shadow: 0 0 16px #00000044;
    .buttons {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 12px;
    }
  }
}

.fade-enter-active {
  transition: 0.35s;
  .bg {
    transition: opacity 0.35s;
  }
  .content {
    transition: transform cubic-bezier(0.08, 0.76, 0.57, 1.26) 0.35s,
      opacity 0.35s;
  }
}
.fade-leave-active {
  transition: 0.25s;
  .bg {
    transition: opacity 0.25s;
  }
  .content {
    transition: transform 0.25s, opacity 0.25s;
  }
}
.fade-enter-from {
  opacity: 1;
  .bg {
    opacity: 0;
  }
  .content {
    opacity: 0.5;
    transform: translateY(100px) scale(0.7);
  }
}
.fade-leave-to {
  opacity: 1;
  .bg {
    opacity: 0;
  }
  .content {
    opacity: 0;
    transform: translateY(100px);
  }
}
</style>
