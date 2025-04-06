import { parentPort, workerData } from 'node:worker_threads'

import Monkey from './Monkey.js'

const { id, text } = workerData

new Monkey({
  id,
  text,
})
  .on('match', ({ input, count }) => {
    parentPort?.postMessage({
      type: 'match',
      input,
      charactersCount: count,
    })
  })
  .type()
