<template>
<Modal>
  <ExportDialog v-if="modalName === 'export'" @close="closeModal" />
</Modal>
</template>

<script lang="ts" setup>
import { computed } from 'vue-demi';
import { useAppStore } from '../../stores/AppStore';
import ExportDialog from './ExportDialog.vue';
import Modal from '../common/Modal.vue';

const store = useAppStore()
const modalName = computed(() => store.$state.modal)

const closeModal = () => {
  store.modal = undefined
}
</script>