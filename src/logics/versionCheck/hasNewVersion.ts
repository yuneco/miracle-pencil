const getCurrentAppSrc = (): string | undefined => {
  const src = Array.from(document.querySelectorAll('script'))
    .map((el) => el.src)
    .filter((src) => src.includes('/assets/index.js'))[0]
  return src ?? undefined
}

const isSrcExists = async (src: string): Promise<boolean | undefined> => {
  try {
    const resp = await window.fetch(src)
    if (resp.status === 200 || resp.status === 304) return true
    if (resp.status === 404) return false
    return undefined
  } catch {
    return undefined
  }
}

export const hasNewVersion = async () => {
  const current = getCurrentAppSrc()
  if (!current) return false
  const isCurrentExists = await isSrcExists(current)
  if (isCurrentExists !== false) return false

  return true
}
