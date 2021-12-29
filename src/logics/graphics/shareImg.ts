export const shareImage = async (pngImgBlob: Blob) => {
  const imgFile = new File([pngImgBlob], 'image.png', {
    type: pngImgBlob.type,
    lastModified: Date.now(),
  })

  const data: ShareData = {
    files: [imgFile],
    title: 'Miracle Pencil',
    text: 'Made with https://mirape.web.app  #ミラクルペンシル'
  }

  return navigator.share(data)
}

