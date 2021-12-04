import { blobToImg } from './blobToImg'

const getContentRect = (bin: ImageData): DOMRect | undefined => {
  const { data, width: w, height: h } = bin

  // is pixel transparent?
  const isTransparent = (x: number, y: number): boolean =>
    data[(y * w + x) * 4 + 3] === 0
  // is row completely transparent?
  const isRowTransparent = (y: number) => {
    for (let x = 0; x < w; x++) if (!isTransparent(x, y)) return false
    return true
  }
  // get first row index that has non transparent pixel
  const getTop = () => {
    for (let y = 0; y < h; y++) if (!isRowTransparent(y)) return y
    return h
  }
  // get last row index that has non transparent pixel
  const getBottom = () => {
    for (let y = h - 1; y >= 0; y--) if (!isRowTransparent(y)) return y
    return -1
  }

  // is colummn completely transparent in specified row range?
  const isColTransparent = (x: number, yFrom: number, yTo: number) => {
    for (let y = yFrom; y <= yTo; y++) if (!isTransparent(x, y)) return false
    return true
  }
  // get first col index that has non transparent pixel
  const getLeft = (yFrom: number, yTo: number) => {
    for (let x = 0; x < w; x++) if (!isColTransparent(x, yFrom, yTo)) return x
    return w
  }
  // get last col index that has non transparent pixel
  const getRight = (yFrom: number, yTo: number) => {
    for (let x = w - 1; x >= 0; x--) if (!isColTransparent(x, yFrom, yTo)) return x
    return -1
  }

  const top = getTop()
  if (top === h) return undefined // No Content
  const bottom = getBottom()
  const left = getLeft(top, bottom)
  const right = getRight(top, bottom)
  return new DOMRect(left, top, right - left + 1, bottom - top + 1)
}

export const cropImg = async (
  img: HTMLImageElement
): Promise<HTMLImageElement | undefined> => {
  const canvas = document.createElement('canvas')
  canvas.width = img.naturalWidth
  canvas.height = img.naturalHeight
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.drawImage(img, 0, 0)
  const bin = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const rect = getContentRect(bin)
  if (!rect) return
  const cropped = ctx.getImageData(rect.x, rect.y, rect.width, rect.height)
  canvas.width = rect.width
  canvas.height = rect.height
  ctx.putImageData(cropped, 0, 0)
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) return
      resolve(blobToImg(blob))
    })
  })
}
