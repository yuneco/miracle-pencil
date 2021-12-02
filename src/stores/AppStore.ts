import { defineStore } from 'pinia'

type ModalName = undefined | 'export'

export const useAppStore = defineStore('app', {
  state: () => ({
    modal: undefined as ModalName,
  }),
})