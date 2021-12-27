import { blobToImg } from "./blobToImg"

export const createAlphaImg = async (img: HTMLImageElement): Promise<HTMLImageElement | undefined> => {
  const canvas = document.createElement('canvas')
  canvas.width = img.naturalWidth
  canvas.height = img.naturalHeight
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.drawImage(img, 0, 0)
  ctx.globalCompositeOperation = 'source-atop'
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) return
      resolve(blobToImg(blob))
    })
  })
}
