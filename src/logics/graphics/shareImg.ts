export const shareImage = async (pngImgBlob: Blob) => {
  const imgFile = new File([pngImgBlob], 'image.png', {
    type: pngImgBlob.type,
    lastModified: Date.now(),
  })

  const data: ShareData = {
    files: [imgFile],
    url: 'https://yuneco.github.io/miracle-pencil/',
    title: 'miracle-pencil',
    text: 'Made with miracle-pencil'
  }

  return navigator.share(data)
}

