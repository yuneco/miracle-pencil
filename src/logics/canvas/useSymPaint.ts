import { PaintCanvas, Coordinate, utils } from 'sym-paint'
import { ref, watch } from 'vue'
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
    cv.coord = cv.coord.clone({ scale })
  })
  cv.listenRequestScrollTo(({point, target}) => {
    if (target === 'canvas') {
      cv.coord = cv.coord.clone({ scroll: point })
    }
    if (target === 'anchor') {
      cv.activeAnchor = cv.activeAnchor.clone({ scroll: point })
    }
  })
  cv.listenRequestRotateTo(({angle, target}) => {
    if (target === 'canvas') {
      cv.coord = cv.coord.clone({ angle })
    }
    if (target === 'anchor') {
      cv.activeAnchor = cv.activeAnchor.clone({ angle })
    }
  })
  cv.listenRequestUndo(() => {
    cv.undo()
  })
  cv.listenRequestAnchorTransform((coord) => {
    cv.activeAnchor = coord
  })
  cv.listenRequestAnchorReset(() => {
    cv.anchor = new Coordinate()
  })

  const toolKeyWatcher = new utils.ToolKeyWatcher()
  toolKeyWatcher.listenChange((tool) => {
    if (tool === 'draw' || tool === 'draw:stamp') { // stampは現時点ではサポートしないため、通常のペンツールとして扱う
      store.tool = 'draw'
      store.isStraight = false
      return
    }
    if (tool === 'draw:line') {
      store.tool = 'draw'
      store.isStraight = true
      return
    }
    store.tool = tool
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
      if (store.$state.penCount[0] === 1) {
        cv.isKaleido = [false, store.$state.isKaleido[1]]
      }
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
      if (store.$state.penCount[0] === 1) {
        cv.isKaleido = [false, store.$state.isKaleido[1]]
      }
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
  watch(
    () => [store.$state.tool],
    () => {
      cv.tool = store.$state.tool
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
    undo: () => canvas.value?.undo()
  }
}
