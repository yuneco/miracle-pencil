import { defineStore } from 'pinia'

export const useCanvasStore = defineStore('canvas', {
  state: () => ({
    penColor: '#3399aa',
    penCount: [6, 0] as [number, number],
    penWidth: 20,
    isStraight: false,
  }),
})