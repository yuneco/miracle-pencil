import { reactive, readonly } from 'vue'
import { useSymPaint } from '../../logics/canvas/useSymPaint'
import { blobToImg } from '../graphics/blobToImg'
import { createAlphaImg } from '../graphics/createAlphaImg'
import { cropImg } from '../graphics/cropImg'

export type ExportImgKind = 'original' | 'cropped' | 'texture'
type ImgInfo = {
  src: string
  size: {
    w: number
    h: number
  }
}
export type ExportImgsState = {[k in ExportImgKind]: ImgInfo | undefined}


export const useExportImgs = () => {
  const { toImgBlob } = useSymPaint()
  const state = reactive<ExportImgsState>({
    original: undefined,
    cropped: undefined,
    texture: undefined
  })

  const setImg = (kind: ExportImgKind, img: HTMLImageElement) => {
    state[kind] = {
      src: img.src,
      size: {
        w: img.naturalWidth,
        h: img.naturalHeight
      }
    }
  }

  const create = async () => {
    const blob = await toImgBlob()
    if (!blob) return
    const img = await blobToImg(blob)
    setImg('original', img)

    const cropped = await cropImg(img)
    if (cropped) {
      setImg('cropped', cropped)
    }

    const texture = cropped && await createAlphaImg(cropped)
    if (texture) {
      setImg('texture', texture)
    }
  }

  return {
    imgs: readonly(state),
    create
  }
}