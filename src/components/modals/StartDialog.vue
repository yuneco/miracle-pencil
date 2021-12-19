<template>
  <div class="StartDialog">
    <PlaneBox :backgroundColor="theme.themeDark">
      <div class="close">
        <CloseButton
          @click="emit('close')"
          :bgColor="theme.themeDark"
          foreColor="#fff"
        />
      </div>
      <div class="content">
        <div class="title">Miracle Pencil</div>
        <div class="body">
          簡単な使い方の説明など
        </div>
        <div class="buttons">
          <PureButton @click="emit('close')">START</PureButton>
        </div>
      </div>
    </PlaneBox>
  </div>
</template>

<script lang="ts" setup>
import CloseButton from '../common/CloseButton.vue'
import PlaneBox from '../common/PlaneBox.vue'
import PureButton from '../common/PureButton.vue'
import { useAppStore } from '../../stores/AppStore'
import { theme } from '../consts/theme'

const appStore = useAppStore()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<style lang="scss" scoped>
.StartDialog {
  min-width: 50vw;
  max-width: 90vw;
  .close {
    position: absolute;
    top: 4px;
    right: 4px;
  }
  .content {
    min-height: 400px;
    display: grid;
    grid-template-rows: 2em 1fr 80px;
    .title {
      grid-area: 'title';
      font-weight: bold;
      color: #fff;
      padding-bottom: 16px;
    }
    .body {
      grid-area: 'body';

    }
    .buttons {
      grid-area: 'buttons';
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      padding-top: 20px;
    }
  }
}
</style>
