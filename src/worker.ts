import { parentPort, workerData } from 'node:worker_threads'

import Monkey from './Monkey'

const { id, text } = workerData

new Monkey({
  id,
  text,
})
  .on('match', (event) => {
    parentPort?.postMessage(event)
  })
  .on('progress', (event) => {
    parentPort?.postMessage(event)
  })
  .type()
