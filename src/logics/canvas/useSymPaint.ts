import { PaintCanvas, Coordinate } from 'sym-paint'
import { ref, watch } from 'vue-demi'
import { useCanvasStore } from '../../stores/CanvasStore'
import { usePenCount } from './usePenCount'

const canvas = ref<PaintCanvas | undefined>()
const penCount = ref<ReturnType<typeof usePenCount>>()

const onKeydown = (ev: KeyboardEvent) => {
  if (ev.key === 'ArrowUp') {
    penCount.value?.penCountUp()
  }
  if (ev.key === 'ArrowDown') {
    penCount.value?.penCountDown()
  }
  if (ev.key === 'z' && ev.metaKey) {
    canvas.value?.undo()
  }
}
window.removeEventListener('keydown', onKeydown)
window.addEventListener('keydown', onKeydown)
console.log('init')

const init = (parent: HTMLElement) => {
  const store = useCanvasStore()
  penCount.value = usePenCount()
  const isAlreadyInited = !!canvas.value
  if (isAlreadyInited) {
    console.warn('SymPaint init called multiple times.')
  }

  const cv = new PaintCanvas(parent, parent.offsetWidth, parent.offsetHeight)
  cv.penCount = store.penCount
  cv.penColor = store.penColor
  cv.penWidth = store.penWidth
  cv.tool = store.isStraight ? 'draw:line' : 'draw'
  cv.isKaleido = store.isKaleido
  cv.penKind = store.isEraser ? 'eraser' : 'normal'

  // キャンバスからの変更要求を受け取りパレットの設定を変更
  cv.listenRequestZoom((scale) => {
    //setting.scale = scale
    cv.coord = cv.coord.clone({ scale })
  })
  cv.listenRequestScrollTo((pos) => {
    cv.coord = cv.coord.clone({ scroll: pos })
  })
  cv.listenRequestRotateTo((angle) => {
    cv.coord = cv.coord.clone({ angle })
  })
  cv.listenRequestUndo(() => {
    cv.undo()
  })
  cv.listenRequestAnchorTransform(({ coord, target }) => {
    if (target === 'root') cv.anchor = coord
    if (target === 'child') cv.childAnchor = coord
  })
  cv.listenRequestAnchorReset(() => {
    cv.anchor = new Coordinate()
  })

  watch(
    () => [store.$state.penColor],
    () => {
      cv.penColor = store.$state.penColor
    }
  )
  watch(
    () => [store.$state.penCount],
    () => {
      cv.penCount = store.$state.penCount
    }
  )
  watch(
    () => [store.$state.penWidth],
    () => {
      cv.penWidth = store.$state.penWidth
    }
  )
  watch(
    () => [store.$state.isStraight],
    () => {
      cv.tool = store.isStraight ? 'draw:line' : 'draw'
    }
  )
  watch(
    () => [store.$state.isKaleido],
    () => {
      cv.isKaleido = store.isKaleido
    }
  )
  watch(
    () => [store.$state.isEraser],
    () => {
      cv.penKind = store.isEraser ? 'eraser' : 'normal'
    }
  )
  watch(
    () => [store.$state.penOpacity],
    () => {
      cv.penAlpha = store.$state.penOpacity / 100
    }
  )

  canvas.value = cv
}

export const useSymPaint = () => {
  const store = useCanvasStore()

  return {
    state: store.$state,
    init: (parent: HTMLElement) => init(parent),
    toImgBlob: () => canvas.value?.toImgBlob(),
  }
}
