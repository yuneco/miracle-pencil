export const blobToImg = (blob: Blob): HTMLImageElement => {
  const img = new Image()
  img.src = URL.createObjectURL(blob)
  return img
}