import { useCanvasStore } from '../../stores/CanvasStore'
import { PEN_COUNT_RANGE_1, PEN_COUNT_RANGE_2 } from '../consts/toolConsts'
import { constraint } from '../utils/mathUtil'

export const usePenCount = () => {
  const store = useCanvasStore()
  const changePenCount = (isUp: boolean) => {

    const [c1, c2] = store.$state.penCount
    if (c2) {
      const newC2 = constraint(c2 + (isUp ? 1 : -1), PEN_COUNT_RANGE_2.min, PEN_COUNT_RANGE_2.min)
      store.$state.penCount = [c1, newC2]
    } else {
      const newC1 = constraint(c1 + (isUp ? 1 : -1), PEN_COUNT_RANGE_1.min, PEN_COUNT_RANGE_1.max)
      store.$state.penCount = [newC1, c2]
    }
  }

  const penCountUp = () => changePenCount(true)
  const penCountDown = () => changePenCount(false)

  return { penCountUp, penCountDown }
}
