import { parentPort } from 'worker_threads'

export default class MonkeyListeners {
  static match ({ input, count }) {
    parentPort.postMessage({
      type: MonkeyListeners.match.name,
      input,
      charactersCount: count
    })
  }
}
