import { defineStore } from 'pinia'

type ModalName = undefined | 'start' | 'export'

export const useAppStore = defineStore('app', {
  state: () => ({
    modal: 'start' as ModalName,
    /**
     * トースト表示する文字列。セットは任意のコンポーネントから行えます。
     * Toastコンポーネントがトーストの表示及び一定時間後のクリアを自動で行います。
     */
    toast: '',
  }),
})
