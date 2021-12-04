import { imgToBlob } from "./imgToBlob"

export const copyBlobImgToClipboard = async (imgPromise: Promise<Blob>) => {
  // see: https://stackoverflow.com/questions/61187374/how-to-fix-the-cannot-find-name-clipboarditem-error
  let item: ClipboardItem | undefined
  try {
    // for safari
    item = new ClipboardItem({
      'image/png': imgPromise,
    })
  } catch {
    // for chrome
    item = new ClipboardItem({
      'image/png': (await imgPromise) as unknown as ClipboardItemData,
    })
  }
  await navigator.clipboard.write([item])
  return true
}

export const copyImgToClipboard = async (img: HTMLImageElement) => {
  const promise = imgToBlob(img)
  if (!promise) {
    return false
  }
  const isCopied = await copyBlobImgToClipboard(promise.then(blob => {
    if (!blob) {
      throw new Error('failed to copy img')
    }
    return blob
  })).catch(err => {
    console.warn(err)
    return false
  })
  return isCopied
}