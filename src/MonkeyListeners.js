'use strict'

import { parentPort } from 'worker_threads'

export default class MonkeyListeners {
  static match({ input, count }) {
    parentPort.postMessage({
      input,
      charactersCount: count
    })
  }

  static update(event) {}
}
