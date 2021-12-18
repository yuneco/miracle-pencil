const MIN_MOVE = 5

export const startDragX = (ev: PointerEvent, onchange: (dx: number) => void, onend: (isDrag: boolean) => void) => {
  document.body.style.cursor = 'ew-resize'
  const startX = ev.screenX
  let isDragStarted = false

  const onmove = (ev: PointerEvent) => {
    ev.preventDefault()
    const dx = ev.screenX - startX
    if (!isDragStarted && Math.abs(dx) < MIN_MOVE) return
    onchange(dx)
    isDragStarted = true
  }
  const onup = () => {
    document.body.removeEventListener('pointermove', onmove)
    document.body.removeEventListener('pointerup', onup)
    document.body.removeEventListener('pointercancel', onup)
    document.body.style.cursor = ''
    onend(isDragStarted)
  }

  document.body.addEventListener('pointermove', onmove)
  document.body.addEventListener('pointerup', onup)
  document.body.addEventListener('pointercancel', onup)
}
