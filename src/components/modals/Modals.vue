<template>
<Modal>
  <StartDialog v-if="modalName === 'start'" @close="closeModal" />
  <ExportDialog v-if="modalName === 'export'" @close="closeModal" />
</Modal>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useAppStore } from '../../stores/AppStore';
import ExportDialog from './ExportDialog.vue';
import StartDialog from './StartDialog.vue';
import Modal from '../common/Modal.vue';

const store = useAppStore()
const modalName = computed(() => store.$state.modal)

const closeModal = () => {
  store.modal = undefined
}
</script>