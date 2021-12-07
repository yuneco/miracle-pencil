import { useCanvasStore } from '../../stores/CanvasStore'
import { constraint } from '../utils/mathUtil'

export const usePenCount = () => {
  const store = useCanvasStore()
  const changePenCount = (isUp: boolean) => {
    const COUNT_MIN = 1
    const COUNT_MAX = 16
    const [c1, c2] = store.$state.penCount
    const newCount = (c: number, add: number) =>
      constraint(c + add, COUNT_MIN, COUNT_MAX)
    if (c2) {
      store.$state.penCount = [c1, newCount(c2, isUp ? 1 : -1)]
    } else {
      store.$state.penCount = [newCount(c1, isUp ? 1 : -1), c2]
    }
  }

  const penCountUp = () => changePenCount(true)
  const penCountDown = () => changePenCount(false)

  return { penCountUp, penCountDown }
}
