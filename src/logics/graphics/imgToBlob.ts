export const imgToBlob = async (img: HTMLImageElement): Promise<Blob | undefined> => {
  if (!img.naturalWidth || !img.naturalHeight) return
  const canvas = document.createElement('canvas')
  canvas.width = img.naturalWidth
  canvas.height = img.naturalHeight
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.drawImage(img, 0, 0)

  return new Promise(resolve => {
    canvas.toBlob((blob) => {
      resolve(blob ?? undefined)
    })
  })
}