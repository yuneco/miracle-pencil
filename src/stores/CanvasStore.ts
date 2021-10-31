import { defineStore } from 'pinia'

export const useCanvasStore = defineStore('canvas', {
  state: () => ({
    penColor: '#000000',
    penCount: 12
  }),

  actions: {
    setPenColor(v: string) {
      this.$state.penColor = v
    },
    setPenCount(v: number) {
      this.$state.penCount = v
    }
  }
})