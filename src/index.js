#!/usr/bin/env node

import yargs from 'yargs'
import path from 'path'
import { hideBin } from 'yargs/helpers'
import { Worker } from 'worker_threads'

import WorkerListeners from './WorkerListeners.js'

async function main () {
  const args = yargs(hideBin(process.argv))
    .command('type [text]', 'Make the monkey type madly')
    .option('monkeys', {
      alias: 'm',
      type: 'number',
      description: 'Number of monkeys',
      default: 1
    })
    .parse()

  const dirname = path.dirname(new URL(import.meta.url).pathname)
  const worker = path.join(dirname, 'worker.js')

  Array(args.monkeys)
    .fill(undefined)
    .map((_, index) => new Worker(worker, {
      workerData: {
        id: index + 1,
        text: args.text
      }
    }))
    .forEach(monkey => {
      monkey.on('message', event => {
        WorkerListeners[event.type](event)
      })
    })
}

main()
