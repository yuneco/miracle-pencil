import { onMounted, onUnmounted } from 'vue-demi'

export const useOnPageVisible = (fn: () => void) => {
  const onchange = () => {
    if (document.visibilityState === 'visible') fn()
  }

  onMounted(() => {
    document.addEventListener('visibilitychange', onchange)
  })

  onUnmounted(() => {
    document.removeEventListener('visibilitychange', onchange)
  })
}
