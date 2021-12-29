import { defineStore } from 'pinia'

export type ModalName = undefined | 'start' | 'export'
type AppState = {
  modal: ModalName | undefined
  toast: string
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    modal: undefined,
    /**
     * トースト表示する文字列。セットは任意のコンポーネントから行えます。
     * Toastコンポーネントがトーストの表示及び一定時間後のクリアを自動で行います。
     */
    toast: '',
  }),
})
