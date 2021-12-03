export const copyImgToClipboard = async (imgPromise: Promise<Blob>) => {
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
}
