import { defineStore } from 'pinia'

type CanvasToolName = 'draw' | 'scroll' | 'scroll:anchor' | 'zoomup' | 'zoomdown' | 'rotate' | 'rotate:anchor' | 'draw:line' | 'draw:stamp';

export const useCanvasStore = defineStore('canvas', {
  state: () => ({
    penColor: '#3399aa',
    penCount: [6, 0] as [number, number],
    isKaleido: [true, true] as [boolean, boolean],
    penWidth: 20,
    isStraight: false,
    isEraser: false,
    penOpacity: 100,
    tool: 'draw' as CanvasToolName
  }),
})