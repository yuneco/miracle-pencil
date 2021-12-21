import { defineStore } from 'pinia'

type MirCanvasTool =
  | 'draw'
  | 'scroll'
  | 'scroll:anchor'
  | 'zoomup'
  | 'zoomdown'
  | 'rotate'
  | 'rotate:anchor'

export const useCanvasStore = defineStore('canvas', {
  state: () => ({
    penColor: '#3399aa',
    penCount: [6, 0] as [number, number],
    isKaleido: [true, true] as [boolean, boolean],
    penWidth: 20,
    isStraight: false,
    isEraser: false,
    penOpacity: 100,
    tool: 'draw' as MirCanvasTool,
  }),
})
