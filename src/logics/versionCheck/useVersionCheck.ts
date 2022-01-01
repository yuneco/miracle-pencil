import { ref } from "vue"
import { hasNewVersion } from "./hasNewVersion"
import { isInPwa } from "./isInPwa"

const MIN_INTERVAL_SEC = 60
// PWAで動作している時は起動時に即座にチェックを行う
let lastCheckedMs = isInPwa() ? 0 : Date.now()
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
