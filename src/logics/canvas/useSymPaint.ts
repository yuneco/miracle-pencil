import { PaintCanvas, Coordinate, utils, Point } from 'sym-paint'
import { computed, reactive, ref, watch } from 'vue'
import { useCanvasStore } from '../../stores/CanvasStore'
import { usePenCount } from './usePenCount'

const canvas = ref<PaintCanvas | undefined>()
const penCount = ref<ReturnType<typeof usePenCount>>()
const canvasState = reactive({
  /** Undo可能か？ */
  enableUndo: false,
})
const updateCanvasState = () => {
  canvasState.enableUndo = (canvas.value?.historyCount ?? 0) > 0
}

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
  cv.anchor = store.anchor[0] as Coordinate
  cv.childAnchor = store.anchor[1] as Coordinate
  cv.enableCapture = false //スタンプ機能は当面使用しない

  // キャンバスからの変更要求を受け取りパレットの設定を変更
  cv.listenRequestZoom((scale) => {
    store.coord = store.coord.clone({ scale })
  })
  cv.listenRequestScrollTo(({ point, target }) => {
    if (target === 'canvas') {
      store.coord = store.coord.clone({ scroll: point })
    }
    if (target === 'anchor') {
      const index = cv.hasSubPen ? 1 : 0
      store.anchor[index] = store.anchor[index].clone({ scroll: point })
    }
  })
  cv.listenRequestRotateTo(({ angle, target }) => {
    if (target === 'canvas') {
      store.coord = store.coord.clone({ angle })
    }
    if (target === 'anchor') {
      const index = cv.hasSubPen ? 1 : 0
      store.anchor[index] = store.anchor[index].clone({ angle })
    }
  })
  cv.listenRequestUndo(() => {
    cv.undo()
    updateCanvasState()
  })
  cv.listenRequestAnchorTransform((coord) => {
    cv.activeAnchor = coord
  })
  cv.listenRequestAnchorReset(() => {
    cv.anchor = new Coordinate()
  })
  cv.listenStrokeEnd(() => {
    updateCanvasState()
  })

  const toolKeyWatcher = new utils.ToolKeyWatcher()
  toolKeyWatcher.listenChange((tool) => {
    if (tool === 'draw' || tool === 'draw:stamp') {
      // タスンプは現時点ではサポートしないため、通常のペンツールとして扱う
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
    () => [store.penColor],
    () => {
      cv.penColor = store.penColor
    }
  )
  watch(
    () => [store.penCount],
    () => {
      cv.penCount = store.penCount
      if (store.penCount[0] === 1) {
        cv.isKaleido = [false, store.isKaleido[1]]
      }
    }
  )
  watch(
    () => [store.penWidth],
    () => {
      cv.penWidth = store.penWidth
    }
  )
  watch(
    () => [store.isStraight],
    () => {
      cv.tool = store.isStraight ? 'draw:line' : 'draw'
    }
  )
  watch(
    () => [store.isKaleido],
    () => {
      cv.isKaleido = store.isKaleido
      if (store.penCount[0] === 1) {
        cv.isKaleido = [false, store.isKaleido[1]]
      }
    }
  )
  watch(
    () => [store.isEraser],
    () => {
      cv.penKind = store.isEraser ? 'eraser' : 'normal'
    }
  )
  watch(
    () => [store.penOpacity],
    () => {
      cv.penAlpha = store.penOpacity / 100
    }
  )
  watch(
    () => [store.tool],
    () => {
      if (store.tool === 'draw') {
        cv.tool = store.isStraight ? 'draw:line' : 'draw'
      } else {
        cv.tool = store.tool
      }
    }
  )
  watch(
    () => [store.coord],
    () => {
      cv.coord = store.coord as Coordinate
    }
  )
  watch(
    () => [store.anchor[0]],
    () => {
      cv.anchor = store.anchor[0] as Coordinate
    }
  )
  watch(
    () => [store.anchor[1]],
    () => {
      cv.childAnchor = store.anchor[1] as Coordinate
    }
  )

  canvas.value = cv
}

export const useSymPaint = () => {
  const store = useCanvasStore()

  const initCanvas = (parent: HTMLElement) => {
    init(parent)
    updateCanvasState()
  }

  // キャンバス状態の算出プロパティ
  const hasSubAnchor = computed(() => store.penCount[1] >= 1)
  const activeAnchor = computed(() => store.anchor[hasSubAnchor.value ? 1 : 0])
  const activeAnchorColor = computed(
    () => canvas.value?.anchorColor[hasSubAnchor.value ? 1 : 0]
  )
  const activeAnchorPos = computed(() =>
    canvas.value?.canvas2displayPos(activeAnchor.value.scroll, 'current')
  )
  const enableUndo = computed(() => canvasState.enableUndo)

  return {
    state: store,
    init: initCanvas,
    toImgBlob: () => canvas.value?.toImgBlob(),
    clear: () => {
      canvas.value?.clear(true)
      store.coord = new Coordinate()
      store.anchor = [
        new Coordinate(),
        new Coordinate({ scroll: new Point(300, 0) }),
      ]
      store.penCount = [store.penCount[0], 0]
      updateCanvasState()
    },
    undo: () => {
      canvas.value?.undo()
      updateCanvasState()
    },
    view2canvas: (p: { x: number; y: number }) =>
      canvas.value?.display2canvasPos(new Point(p.x, p.y), 'current'),
    canvas2view: (p: { x: number; y: number }) =>
      canvas.value?.canvas2displayPos(new Point(p.x, p.y), 'current'),
    inited: computed(() => !!canvas.value),
    activeAnchor,
    activeAnchorColor,
    activeAnchorPos,
    enableUndo,
  }
}
