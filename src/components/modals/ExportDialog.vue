<template>
  <div class="ExportDialog">
    <PlaneBox>
      <CloseButton @click="emit('close')" />
      Export Dialog
    </PlaneBox>
  </div>
</template>

<script lang="ts" setup>
import CloseButton from '../common/CloseButton.vue'
import PlaneBox from '../common/PlaneBox.vue'

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>
