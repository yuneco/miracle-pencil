export const shareImage = async (pngImgBlob: Blob) => {
  const imgFile = new File([pngImgBlob], 'image.png', {
    type: pngImgBlob.type,
    lastModified: Date.now(),
  })

  const data: ShareData = {
    files: [imgFile],
    title: 'Share Image',
  }

  return navigator.share(data)
}

