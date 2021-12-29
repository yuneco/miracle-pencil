import { defineStore } from 'pinia'
import { createSemaphor } from '../logics/utils/semaphor'

type Answer = 'yes' | 'no'
type ConfirmKind = 'normal' | 'danger'

type DialogContent = {
  message: string
  kind: ConfirmKind
  yesCaption: string
  noCaption?: string
  answer?: Answer
}

type StateType = {
  content?: DialogContent
}

type AnswerFunc = (answer: Answer) => void

const enterLock = createSemaphor()
let resolveAnswer: AnswerFunc | undefined = undefined

export const useConfirmStore = defineStore('confirm', {
  state: (): StateType => ({
    content: undefined 
  }),

  actions: {
    async confirm(message: string, yesCaption: string, noCaption?: string, kind: ConfirmKind = 'normal') {
      const release = await enterLock()
      this.content = {message, yesCaption, noCaption, kind}
      const answer = await new Promise<Answer>(resolve => {
        resolveAnswer = resolve
      })
      release()
      this.content = undefined
      resolveAnswer = undefined
      return answer
    },
    select(answer: 'yes' | 'no') {
      if (this.content) {
        this.content.answer = answer
      }
      resolveAnswer?.(answer)
    }
  }
})
