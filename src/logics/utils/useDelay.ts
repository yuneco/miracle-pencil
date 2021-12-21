import { onUnmounted, ref, Ref, shallowRef, watch } from 'vue'

export const useDelayed = <T>(inRef: Ref<T>, delayMs: number) => {
  const outRef = shallowRef(inRef.value)
  let timers: NodeJS.Timeout[] = []

  watch(inRef, () => {
    const val = inRef.value
    const id = setTimeout(() => {
      outRef.value = val
      timers = timers.filter((t) => t !== id)
    }, delayMs)
    timers.push(id)
  })

  onUnmounted(() => {
    timers.forEach((t) => clearTimeout(t))
  })

  return outRef
}
