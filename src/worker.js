import { workerData } from 'worker_threads'

import Monkey from './Monkey.js'
import MonkeyListeners from './MonkeyListeners.js'

const { id, text } = workerData

const monkey = new Monkey({
  id,
  text
})

monkey.on('update', MonkeyListeners.update)
monkey.on('match', MonkeyListeners.match)

monkey.type()
