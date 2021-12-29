<template>
<Modal>
  <StartDialog v-if="modalName === 'start'" @close="closeModal" />
  <ExportDialog v-if="modalName === 'export'" @close="closeModal" />
</Modal>
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue';
import { useAppStore } from '../../stores/AppStore';
import ExportDialog from './ExportDialog.vue';
import StartDialog from './StartDialog/StartDialog.vue';
import Modal from '../common/Modal.vue';
import { logModalEvent } from '../../logics/analytics/logEvent';

const store = useAppStore()
const modalName = computed(() => store.$state.modal)

watch(() => modalName.value, (newVal) => {
  if (!newVal) return
  logModalEvent(newVal)
})

const closeModal = () => {
  store.modal = undefined
}
</script>