export const blobToImg = async (blob: Blob): Promise<HTMLImageElement> => {
  const img = new Image()
  img.src = URL.createObjectURL(blob)
  return new Promise(resolve => {
    img.onload = img.onabort = img.onerror = () => {resolve(img)}
  })
}