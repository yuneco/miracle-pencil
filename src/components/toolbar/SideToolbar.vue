<template>
  <div class="SideToolbar">
    <CheckItem v-model="isAnchorRotateTool" icon="rotate" cornerStyle="round" />
    <CheckItem v-model="isAnchorMoveTool" icon="move" cornerStyle="round" />
    <div class="clear">
      <PaletteItem
        @check="confirmAndClear"
        icon="trash"
        label=""
        :disabled="!enableUndo"
        cornerStyle="round"
      />
    </div>
    <div class="undo">
      <PaletteItem
        @check="undo"
        icon="undo"
        label=""
        :disabled="!enableUndo"
        cornerStyle="round"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useSymPaint } from '../../logics/canvas/useSymPaint'
import CheckItem from './items/CheckItem.vue'
import PaletteItem from './items/PaletteItem.vue'
import { useConfirmStore } from '../../stores/ConfirmStore'

const { state: store, clear, undo, enableUndo } = useSymPaint()
const { confirm } = useConfirmStore()

const isAnchorRotateTool = computed({
  set: (v: boolean) => {
    if (v) {
      store.tool = 'rotate:anchor'
    } else {
      store.tool = 'draw'
    }
  },
  get: () => store.tool === 'rotate:anchor',
})

const isAnchorMoveTool = computed({
  set: (v: boolean) => {
    if (v) {
      store.tool = 'scroll:anchor'
    } else {
      store.tool = 'draw'
    }
  },
  get: () => store.tool === 'scroll:anchor',
})

const confirmAndClear = async () => {
  const answer = await confirm(
    'Are you sure you want to clear all the canvas?',
    'CLEAR',
    'not clear',
    'danger'
  )
  if (answer === 'yes') {
    clear()
  }
}
</script>

<style lang="scss" scoped>
.SideToolbar {
  position: absolute;
  width: 100%;
  height: 80%;
  bottom: 20%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 4px;
  user-select: none !important;
  filter: drop-shadow(0px 0px 6px #00000033);
  pointer-events: none;
  > * {
    pointer-events: auto;
  }
  .radioGroup {
    display: flex;
    gap: 0;
  }

  .undo {
    padding-top: 12px;
  }
  .clear {
    padding-top: 12px;
  }
}
</style>
