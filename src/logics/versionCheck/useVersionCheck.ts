import { ref } from "vue"
import { hasNewVersion } from "./hasNewVersion"

const MIN_INTERVAL_SEC = 60
let lastCheckedMs = 0
const hasNew = ref(false)

const doCheck = async () => {
  const now = Date.now()
  if (now - lastCheckedMs < MIN_INTERVAL_SEC * 1000) return
  lastCheckedMs = now
  hasNew.value = await hasNewVersion()
}

export const useVersionCheck = () => {
  doCheck()
  return hasNew
}
