export const shareImage = async (pngImgBlob: Blob) => {
  const imgFile = new File([pngImgBlob], 'image.png', {
    type: pngImgBlob.type,
    lastModified: Date.now(),
  })

  const data: ShareData = {
    files: [imgFile],
    title: 'miracle-pencil',
    text: 'Made with https://yuneco.github.io/miracle-pencil/  #ミラクルペンシル'
  }

  return navigator.share(data)
}

