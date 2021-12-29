type Releaser = () => void
type Resolve = (releaser: Releaser) => void

export const createSemaphor = (max = 1) => {
  let rooms: Symbol[] = []
  const waitingList: Resolve[] = []

  /**
   * ロックを取得します。他の処理でいっぱいの場合、空きが出るまで待ちます。
   * @return ロック開放関数。処理が終わったら必ず呼び出してください。
   */
  const enter = () => {
    const promise = new Promise<Releaser>((resolve) => {
      waitingList.push(resolve)
    })
    tryNext()
    return promise
  }

  /**
   * ロックを開放します
   * @param room 割り当てられた部屋のキー
   */
  const release = (room: Symbol) => {
    rooms = rooms.filter((r) => r !== room)
    tryNext()
  }

  /**
   * 部屋の空きがあり、待ちリストに待機している処理があれば、部屋を割り当てて処理を開始
   */
  const tryNext = () => {
    if (rooms.length >= max) return
    const next = waitingList.shift()
    if (!next) return
    const room = Symbol()
    rooms.push(room)
    next(() => {
      release(room)
    })
  }

  return enter
}
