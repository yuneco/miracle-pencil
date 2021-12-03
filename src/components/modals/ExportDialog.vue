<template>
  <div class="ExportDialog">
    <PlaneBox>
      <CloseButton @click="emit('close')" />
      Export Dialog
      <button @click="copy">Copy</button>
    </PlaneBox>
  </div>
</template>

<script lang="ts" setup>
import CloseButton from '../common/CloseButton.vue'
import PlaneBox from '../common/PlaneBox.vue'
import { useSymPaint } from '../../logics/canvas/useSymPaint'
import { copyImgToClipboard } from '../../logics/graphics/copyToClipboard'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const {toImgBlob} = useSymPaint() 

const copy = async () => {
  const promise = toImgBlob()
  if (!promise) {
    alert('failed to copy img')
    return
  }
  await copyImgToClipboard(promise)
  alert('copied!')
}
</script>
